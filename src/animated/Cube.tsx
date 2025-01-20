import React, {useRef, useEffect, useState} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {MoveContextState, useMoveContext} from "../hooks/MoveContext";

const Cube: React.FC = () => {


    const mountRef = useRef<HTMLDivElement | null>(null);
    const {Moves} = useMoveContext();
    const [currentMove, setCurrentMove]= useState(' ');




    useEffect(()=>{
        const setCurrentMove = Moves.Moves[Moves.MoveIndex];
    }, [Moves.MoveIndex])

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xadd8e6);

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const cubeGroup = new THREE.Group();
        scene.add(cubeGroup);

        const cubeSize = 0.9;
        const offset = cubeSize + 0.05;

        const cubes: THREE.Mesh[] = [];

        // Create 27 small cubes to form the Rubik's Cube
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

                    // Assign colors to faces based on position
                    const materials = [
                        // Right face green
                        new THREE.MeshBasicMaterial({color: x === 1 ? 0x00ff00 : 0x000000}),
                        // Left face green
                        new THREE.MeshBasicMaterial({color: x === -1 ? 0x0000ff : 0x000000}),
                        // Top face yellow
                        new THREE.MeshBasicMaterial({color: y === 1 ? 0xffff00 : 0x000000}),
                        // Down face white
                        new THREE.MeshBasicMaterial({color: y === -1 ? 0xffffff : 0x000000}),
                        // Front face red
                        new THREE.MeshBasicMaterial({color: z === 1 ? 0xff0000 : 0x000000}),
                        // Back face orange
                        new THREE.MeshBasicMaterial({color: z === -1 ? 0xffa500 : 0x000000}),
                    ];

                    const cube = new THREE.Mesh(geometry, materials);
                    cube.position.set(x * offset, y * offset, z * offset);
                    cubeGroup.add(cube);
                    cubes.push(cube);
                }
            }
        }

        // Helper function to get cubes on a specific face
        const getFaceCubes = (axis: 'x' | 'y' | 'z', index: number) => {
            return cubes.filter(cube => {
                const pos = cube.position[axis];
                return Math.abs(pos - index * offset) < 0.01;
            });
        };

        // Rotate a face of the cube
        const rotateFace = (
            axis: 'x' | 'y' | 'z',
            index: number,
            totalAngle: number,
            duration: number = 1
        ): Promise<void> => {
            return new Promise((resolve) => {
                const faceCubes = getFaceCubes(axis, index);

                const pivot = new THREE.Group();
                scene.add(pivot);

                faceCubes.forEach((cube) => {
                    cubeGroup.remove(cube);
                    pivot.add(cube);
                });

                const steps = 16; // Number of animation steps
                const angleIncrement = totalAngle / steps;
                const interval = duration / steps;
                let currentStep = 0;

                const animateRotation = () => {
                    if (currentStep < steps) {
                        if (axis === 'x') {
                            pivot.rotation.x += angleIncrement;
                        } else if (axis === 'y') {
                            pivot.rotation.y += angleIncrement;
                        } else if (axis === 'z') {
                            pivot.rotation.z += angleIncrement;
                        }

                        renderer.render(scene, camera); // Re-render the scene
                        currentStep++;
                        setTimeout(animateRotation, interval);
                    } else {
                        // Finalize rotation
                        pivot.updateMatrixWorld();
                        faceCubes.forEach((cube) => {
                            cube.applyMatrix4(pivot.matrixWorld);
                            pivot.remove(cube);
                            cubeGroup.add(cube);
                        });

                        scene.remove(pivot); // Clean up pivot
                        resolve(); // Resolve the promise
                    }
                };

                animateRotation();
            });
        };

        const moveQueue: { axis: 'x' | 'y' | 'z'; index: number; angle: number }[] = [];
        let isAnimating = false;

        const processNextMove = () => {
            if (moveQueue.length > 0 && !isAnimating) {
                isAnimating = true; // Set the animation flag
                const { axis, index, angle } = moveQueue.shift()!;
                rotateFace(axis, index, angle, 100).then(() => {
                    isAnimating = false; // Reset the animation flag
                    processNextMove(); // Process the next move
                });
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'B':
                    moveQueue.push({ axis: 'z', index: -1, angle: -Math.PI / 2 });
                    break;
                case 'b':
                    moveQueue.push({ axis: 'z', index: -1, angle: Math.PI / 2 });
                    break;
                case 'L':
                    moveQueue.push({ axis: 'x', index: -1, angle: -Math.PI / 2 });
                    break;
                case 'l':
                    moveQueue.push({ axis: 'x', index: -1, angle: Math.PI / 2 });
                    break;
                case 'r':
                    moveQueue.push({ axis: 'x', index: 1, angle: -Math.PI / 2 });
                    break;
                case 'R':
                    moveQueue.push({ axis: 'x', index: 1, angle: Math.PI / 2 });
                    break;
                case 'u':
                    moveQueue.push({ axis: 'y', index: 1, angle: -Math.PI / 2 });
                    break;
                case 'U':
                    moveQueue.push({ axis: 'y', index: 1, angle: Math.PI / 2 });
                    break;
                case 'D':
                    moveQueue.push({ axis: 'y', index: -1, angle: -Math.PI / 2 });
                    break;
                case 'd':
                    moveQueue.push({ axis: 'y', index: -1, angle: Math.PI / 2 });
                    break;
                case 'f':
                    moveQueue.push({ axis: 'z', index: 1, angle: -Math.PI / 2 });
                    break;
                case 'F':
                    moveQueue.push({ axis: 'z', index: 1, angle: Math.PI / 2 });
                    break;
            }
            processNextMove(); // Start processing the queue
        };




        const handleMove = (event: CustomEvent) => {
            const { move } = event.detail;
            console.log('------------------');
            console.log(move);

            switch (move) {
                case 'Start':
                    break;

                // Single Moves
                case "B'":
                    moveQueue.push({ axis: 'z', index: -1, angle: -Math.PI / 2 });
                    break;

                case 'B':
                    moveQueue.push({ axis: 'z', index: -1, angle: Math.PI / 2 });
                    break;

                case "L'":
                    moveQueue.push({ axis: 'x', index: -1, angle: -Math.PI / 2 });
                    break;

                case 'L':
                    moveQueue.push({ axis: 'x', index: -1, angle: Math.PI / 2 });
                    break;

                case "R'":

                    moveQueue.push({ axis: 'x', index: 1, angle: Math.PI / 2 });
                    break;


                case 'R':
                    moveQueue.push({ axis: 'x', index: 1, angle: -Math.PI / 2 });
                    break;

                case 'U':
                    moveQueue.push({ axis: 'y', index: 1, angle: -Math.PI / 2 });
                    break;

                case "U'":
                    moveQueue.push({ axis: 'y', index: 1, angle: Math.PI / 2 });
                    break;

                case 'D':
                    moveQueue.push({ axis: 'y', index: -1, angle: -Math.PI / 2 });
                    break;

                case "D'":
                    moveQueue.push({ axis: 'y', index: -1, angle: Math.PI / 2 });
                    break;

                case 'F':
                    moveQueue.push({ axis: 'z', index: 1, angle: -Math.PI / 2 });
                    break;

                case "F'":
                    moveQueue.push({ axis: 'z', index: 1, angle: Math.PI / 2 });
                    break;

                // Double Moves (e.g., "B'2", "L2")
                case "B'2":
                    moveQueue.push({ axis: 'z', index: -1, angle: -Math.PI / 2 });
                    moveQueue.push({ axis: 'z', index: -1, angle: -Math.PI / 2 });
                    break;

                case 'B2':
                    moveQueue.push({ axis: 'z', index: -1, angle: Math.PI / 2 });
                    moveQueue.push({ axis: 'z', index: -1, angle: Math.PI / 2 });
                    break;

                case "L'2":
                    moveQueue.push({ axis: 'x', index: -1, angle: -Math.PI / 2 });
                    moveQueue.push({ axis: 'x', index: -1, angle: -Math.PI / 2 });
                    break;

                case 'L2':
                    moveQueue.push({ axis: 'x', index: -1, angle: Math.PI / 2 });
                    moveQueue.push({ axis: 'x', index: -1, angle: Math.PI / 2 });
                    break;

                case "R'2":
                    moveQueue.push({ axis: 'x', index: 1, angle: -Math.PI / 2 });
                    moveQueue.push({ axis: 'x', index: 1, angle: -Math.PI / 2 });
                    break;

                case 'R2':
                    moveQueue.push({ axis: 'x', index: 1, angle: Math.PI / 2 });
                    moveQueue.push({ axis: 'x', index: 1, angle: Math.PI / 2 });
                    break;

                case 'U2':
                    moveQueue.push({ axis: 'y', index: 1, angle: -Math.PI / 2 });
                    moveQueue.push({ axis: 'y', index: 1, angle: -Math.PI / 2 });
                    break;

                case "U'2":
                    moveQueue.push({ axis: 'y', index: 1, angle: Math.PI / 2 });
                    moveQueue.push({ axis: 'y', index: 1, angle: Math.PI / 2 });
                    break;

                case 'D2':
                    moveQueue.push({ axis: 'y', index: -1, angle: -Math.PI / 2 });
                    moveQueue.push({ axis: 'y', index: -1, angle: -Math.PI / 2 });
                    break;

                case "D'2":
                    moveQueue.push({ axis: 'y', index: -1, angle: Math.PI / 2 });
                    moveQueue.push({ axis: 'y', index: -1, angle: Math.PI / 2 });
                    break;

                case 'F2':
                    moveQueue.push({ axis: 'z', index: 1, angle: -Math.PI / 2 });
                    moveQueue.push({ axis: 'z', index: 1, angle: -Math.PI / 2 });
                    break;

                case "F'2":
                    moveQueue.push({ axis: 'z', index: 1, angle: Math.PI / 2 });
                    moveQueue.push({ axis: 'z', index: 1, angle: Math.PI / 2 });
                    break;
            }

            processNextMove(); // Start processing the queue
        };



        // Move list controls


        window.addEventListener('keydown', handleKeyDown);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('cube-move', handleMove as EventListener);



        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('cube-move', handleMove as EventListener);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

        };

    }, []);

    // Listen for MoveIndex changes


    return <div ref={mountRef} style={{ width: '100vw', height: '100vh', background: 'lightblue'}}
    />;
};

export default Cube;