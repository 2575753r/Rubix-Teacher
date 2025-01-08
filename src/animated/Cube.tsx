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
        const rotateFace = (axis: 'x' | 'y' | 'z', index: number, angle: number) => {
            const faceCubes = getFaceCubes(axis, index);

            // Create a pivot group to rotate the selected cubes
            const pivot = new THREE.Group();
            scene.add(pivot);

            // Attach the cubes to the pivot for rotation
            faceCubes.forEach(cube => {
                cubeGroup.remove(cube);
                pivot.add(cube);
            });

            // Rotate the pivot group
            if (axis === 'x') {
                pivot.rotation.x += angle;
            } else if (axis === 'y') {
                pivot.rotation.y += angle;
            } else if (axis === 'z') {
                pivot.rotation.z += angle;
            }

            // Update the world positions of the cubes after rotation
            pivot.updateMatrixWorld();
            faceCubes.forEach(cube => {
                cube.applyMatrix4(pivot.matrixWorld);

                // Remove from the pivot group
                pivot.remove(cube);

                // Reattach to the main group
                cubeGroup.add(cube);
            });

            // Remove the pivot
            scene.remove(pivot);
        };


        // User controls
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                // Back clockwise
                // case 'B':
                //     rotateFace('z', -1, -Math.PI / 2);
                //     break;

                // Back counterclockwise
                case 'b':
                    rotateFace('z', -1, Math.PI / 2);
                    break;

                // Left counterclockwise
                case 'o':
                    rotateFace('x', -1, -Math.PI / 2);
                    break;

                // Left clockwise
                case 'l':
                    rotateFace('x', -1, Math.PI / 2);
                    break;

                // Right counterclockwise
                case 'r':
                    rotateFace('x', 1, -Math.PI / 2);
                    break;

                // case 'R': // Right clockwise
                //     rotateFace('x', 1, Math.PI / 2);
                //     break;

                // Top rotate clockwise
                case 'u':
                    rotateFace('y', 1, -Math.PI / 2);
                    break;

                // Top counterclockwise
                case 'U':
                    rotateFace('y', 1, Math.PI / 2);
                    break;

                // Bottom rotate clockwise
                case 'D':
                    rotateFace('y', -1, -Math.PI / 2);
                    break;

                // Bottom counterclockwiseSS
                case 'd':
                    rotateFace('y', -1, Math.PI / 2);
                    break;
                // Front clockwise
                case 'f':
                    rotateFace('z', 1, -Math.PI / 2);
                    break;
                    // Front counterclockwise
                // case 'F':
                //     rotateFace('z', 1, Math.PI / 2);
                //     break;
            }
        };

        // Handle custom move events
        const handleMove = (event: CustomEvent) => {
            const { move } = event.detail;
            console.log('------------------')
            console.log(move)
            switch (move) {

                case 'Start':

                    break;
                case "B'":
                    rotateFace('z', -1, -Math.PI / 2);
                    break;

                // Back counterclockwise
                case "B":
                    rotateFace('z', -1, Math.PI / 2);
                    break;

                // Left counterclockwise
                case "L'":
                    rotateFace('x', -1, -Math.PI / 2);
                    break;

                // Left clockwise
                case 'L':
                    rotateFace('x', -1, Math.PI / 2);
                    break;

                // Right counterclockwise
                case "R'":
                    rotateFace('x', 1, -Math.PI / 2);
                    break;

                case 'R': // Right clockwise
                    rotateFace('x', 1, Math.PI / 2);
                    break;

                // Top rotate clockwise
                case 'U':
                    rotateFace('y', 1, -Math.PI / 2);
                    break;

                // Top counterclockwise
                case "U'":
                    rotateFace('y', 1, Math.PI / 2);
                    break;

                // Bottom rotate clockwise
                case 'D':
                    rotateFace('y', -1, -Math.PI / 2);
                    break;

                // Bottom counterclockwises
                case "D'":
                    rotateFace('y', -1, Math.PI / 2);
                    break;
                // Front clockwise
                case 'F':
                    rotateFace('z', 1, -Math.PI / 2);
                    break;
                // Front counterclockwise
                case "F'":
                    rotateFace('z', 1, Math.PI / 2);
                    break;



                // two moves
                case "B'2":
                    rotateFace('z', -1, -Math.PI / 2);
                    rotateFace('z', -1, -Math.PI / 2);
                    break;

                // Back counterclockwise
                case "B2":
                    rotateFace('z', -1, Math.PI / 2);
                    rotateFace('z', -1, Math.PI / 2);
                    break;

                // Left counterclockwise
                case "L'2":
                    rotateFace('x', -1, -Math.PI / 2);
                    rotateFace('x', -1, -Math.PI / 2);
                    break;

                // Left clockwise
                case 'L2':
                    rotateFace('x', -1, Math.PI / 2);
                    rotateFace('x', -1, Math.PI / 2);
                    break;

                // Right counterclockwise
                case "R'2":
                    rotateFace('x', 1, -Math.PI / 2);
                    rotateFace('x', 1, -Math.PI / 2);
                    break;

                case 'R2': // Right clockwise
                    rotateFace('x', 1, Math.PI / 2);
                    rotateFace('x', 1, Math.PI / 2);
                    break;

                // Top rotate clockwise
                case 'U2':
                    rotateFace('y', 1, -Math.PI / 2);
                    rotateFace('y', 1, -Math.PI / 2);
                    break;

                // Top counterclockwise
                case "U'2":
                    rotateFace('y', 1, Math.PI / 2);
                    rotateFace('y', 1, Math.PI / 2);
                    break;

                // Bottom rotate clockwise
                case 'D2':
                    rotateFace('y', -1, -Math.PI / 2);
                    rotateFace('y', -1, -Math.PI / 2);
                    break;

                // Bottom counterclockwises
                case "D'2":
                    rotateFace('y', -1, Math.PI / 2);
                    rotateFace('y', -1, Math.PI / 2);
                    break;
                // Front clockwise
                case 'F2':
                    rotateFace('z', 1, -Math.PI / 2);
                    rotateFace('z', 1, -Math.PI / 2);
                    break;
                // Front counterclockwise
                case "F'2":
                    rotateFace('z', 1, Math.PI / 2);
                    rotateFace('z', 1, Math.PI / 2);
                    break;

            }
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