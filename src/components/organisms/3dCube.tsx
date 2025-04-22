import React, {useRef, useEffect, useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {MoveContextState, useMoveContext} from "../../contexts/MoveContext";
import {useRubiksCube} from "../../contexts/CubeContext";

const Cube: React.FC = () => {

    const mountRef = useRef<HTMLDivElement | null>(null);
    const {Moves} = useMoveContext();
    const {rubiksCube3D} = useRubiksCube();
    const [localCube3D, setLocalCube3D] = useState(rubiksCube3D);
    const [cubeY, setCubeRotation] = useState(0); // Tracks Y-axis rotation (0, 90, 180, 270)


    // Listen for "cube-3d-update" event and update local state
    useEffect(() => {
        const handleCube3DUpdate = (event: Event) => {
            const newCubeState = (event as CustomEvent).detail;
            console.log("Received new 3D Cube State:", newCubeState);
            setLocalCube3D(newCubeState); // Force re-render with updated state
        };

        window.addEventListener("cube-3d-update", handleCube3DUpdate);

        return () => {
            window.removeEventListener("cube-3d-update", handleCube3DUpdate);
        };
    }, []);

    useEffect(() => {
        const setCurrentMove = Moves.Moves[Moves.MoveIndex];
    }, [Moves.MoveIndex])

    useEffect(() => {

        // Configure Three.js Scene
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

        // Default Rubik's Cube layout
        // Right, Left, Top, Down, Front, Back
        const defaultCubeState = localCube3D

        // Create 27 small cubes based on the default state
        let cubeIndex = 0;

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

                    // Assign colors to faces based on defaultCubeState
                    const cubeColors = defaultCubeState[cubeIndex];

                    const materials = [
                        new THREE.MeshBasicMaterial({color: cubeColors[0] ? getColor(cubeColors[0]) : 0x000000}), // Left
                        new THREE.MeshBasicMaterial({color: cubeColors[1] ? getColor(cubeColors[1]) : 0x000000}), // Right
                        new THREE.MeshBasicMaterial({color: cubeColors[2] ? getColor(cubeColors[2]) : 0x000000}), // Up
                        new THREE.MeshBasicMaterial({color: cubeColors[3] ? getColor(cubeColors[3]) : 0x000000}), // Down
                        new THREE.MeshBasicMaterial({color: cubeColors[4] ? getColor(cubeColors[4]) : 0x000000}), // Front
                        new THREE.MeshBasicMaterial({color: cubeColors[5] ? getColor(cubeColors[5]) : 0x000000}), // Back
                    ];

                    const cube = new THREE.Mesh(geometry, materials);
                    cube.position.set(x * offset, y * offset, z * offset);
                    cubeGroup.add(cube);
                    cubes.push(cube);

                    // Add a black outline
                    const edges = new THREE.EdgesGeometry(geometry);
                    const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2});
                    const wireframe = new THREE.LineSegments(edges, lineMaterial);
                    cube.add(wireframe); // Attach wireframe to cube

                    cubeIndex++;
                }
            }
        }


        function getColor(face: string) {
            switch (face) {
                case 'Y':
                    return 0xffff00; // Yellow
                case 'W':
                    return 0xffffff; // White
                case 'B':
                    return 0x0000ff; // Blue
                case 'G':
                    return 0x00ff00; // Green
                case 'R':
                    return 0xff0000; // Red
                case 'O':
                    return 0xffa500; // Orange
                default:
                    return 0x000000;  // Black
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

                // Add cubes to temporary pivot group
                faceCubes.forEach((cube) => {
                    cubeGroup.remove(cube);
                    pivot.add(cube);
                });

                // Animation playback configurations
                const steps = 16;
                const angleIncrement = totalAngle / steps;
                const interval = duration / steps;
                let currentStep = 0;

                const animateRotation = () => {

                    // Increment indicated axis of pivot group
                    if (currentStep < steps) {
                        if (axis === 'x') {
                            pivot.rotation.x += angleIncrement;
                        } else if (axis === 'y') {
                            pivot.rotation.y += angleIncrement;
                        } else if (axis === 'z') {
                            pivot.rotation.z += angleIncrement;
                        }

                        renderer.render(scene, camera); // Render the changes incrementaly
                        currentStep++;
                        setTimeout(animateRotation, interval);
                    } else {

                        // Finalize rotation and update main group
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
                const {axis, index, angle} = moveQueue.shift()!;
                rotateFace(axis, index, angle, 100).then(() => {
                    isAnimating = false; // Reset the animation flag
                    processNextMove(); // Process the next move
                });
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            // Build the move string based on key and shift key
            let move = event.key.toUpperCase();
            if (event.shiftKey) {
                move += "'"; // Shift + key indicates counterclockwise
            }

            let transformedMove = moveTransformer(move); // Maintain rotation awareness

            if (transformedMove === "Y") {

                // Push move to be made to the queue
                moveQueue.push({axis: 'y', index: 0, angle: -Math.PI / 2});
                moveQueue.push({axis: 'y', index: 1, angle: -Math.PI / 2});
                moveQueue.push({axis: 'y', index: -1, angle: -Math.PI / 2});
                setCubeRotation(prev => (prev + 90) % 360);
            } else {

                // Individual move logic for each rotation
                switch (transformedMove) {
                    case "B":
                        moveQueue.push({axis: 'z', index: -1, angle: Math.PI / 2});
                        break;
                    case "B'":
                        moveQueue.push({axis: 'z', index: -1, angle: -Math.PI / 2});
                        break;
                    case "L":
                        moveQueue.push({axis: 'x', index: -1, angle: Math.PI / 2});
                        break;
                    case "L'":
                        moveQueue.push({axis: 'x', index: -1, angle: -Math.PI / 2});
                        break;
                    case "R":
                        moveQueue.push({axis: 'x', index: 1, angle: -Math.PI / 2});
                        break;
                    case "R'":
                        moveQueue.push({axis: 'x', index: 1, angle: Math.PI / 2});
                        break;
                    case "U":
                        moveQueue.push({axis: 'y', index: 1, angle: -Math.PI / 2});
                        break;
                    case "U'":
                        moveQueue.push({axis: 'y', index: 1, angle: Math.PI / 2});
                        break;
                    case "D":
                        moveQueue.push({axis: 'y', index: -1, angle: Math.PI / 2});
                        break;
                    case "D'":
                        moveQueue.push({axis: 'y', index: -1, angle: -Math.PI / 2});
                        break;
                    case "F":
                        moveQueue.push({axis: 'z', index: 1, angle: -Math.PI / 2});
                        break;
                    case "F'":
                        moveQueue.push({axis: 'z', index: 1, angle: Math.PI / 2});
                        break;
                }
            }

            processNextMove(); // Ensure animation queue is handled
        };


        // Ensure rotations are performed on correct faces depending on full orientation
        const moveTransformer = (move: string): string => {

            // Mapping based on Y-rotation state
            const moveMappings: Record<number, Record<string, string>> = {
                0: {R: 'R', L: 'L', F: 'F', B: 'B', U: 'U', D: 'D'},
                90: {R: 'B', L: 'F', F: 'R', B: 'L', U: 'U', D: 'D'},
                180: {R: 'L', L: 'R', F: 'B', B: 'F', U: 'U', D: 'D'},
                270: {R: 'F', L: 'B', F: 'L', B: 'R', U: 'U', D: 'D'},
            };

            // Extract base move & modifier
            let baseMove = move.replace(/['2]/g, '');
            let modifier = move.includes("'") ? "'" : move.includes("2") ? "2" : "";

            // Ensure baseMove exists in the mapping before transforming
            if (moveMappings[cubeY] && moveMappings[cubeY][baseMove]) {
                baseMove = moveMappings[cubeY][baseMove]; // Map to rotated move
            }

            return `${baseMove}${modifier}`; // Ensure it returns a valid string
        };

        // Handle move queue traversals
        const handleMove = (event: CustomEvent) => {
            const {move} = event.detail;

            // Determine rotation case and push to queue for processing
            switch (move) {
                case 'Start':
                    break;

                case "B'":
                    moveQueue.push({axis: 'z', index: -1, angle: -Math.PI / 2});
                    break;

                case 'B':
                    moveQueue.push({axis: 'z', index: -1, angle: Math.PI / 2});
                    break;

                case "L'":
                    moveQueue.push({axis: 'x', index: -1, angle: -Math.PI / 2});
                    break;

                case 'L':
                    moveQueue.push({axis: 'x', index: -1, angle: Math.PI / 2});
                    break;

                case "R'":
                    moveQueue.push({axis: 'x', index: 1, angle: Math.PI / 2});
                    break;

                case 'R':
                    moveQueue.push({axis: 'x', index: 1, angle: -Math.PI / 2});
                    break;

                case 'U':
                    moveQueue.push({axis: 'y', index: 1, angle: -Math.PI / 2});
                    break;

                case "U'":
                    moveQueue.push({axis: 'y', index: 1, angle: Math.PI / 2});
                    break;

                case 'D':
                    moveQueue.push({axis: 'y', index: -1, angle: Math.PI / 2});
                    break;

                case "D'":
                    moveQueue.push({axis: 'y', index: -1, angle: -Math.PI / 2});
                    break;

                case 'F':
                    moveQueue.push({axis: 'z', index: 1, angle: -Math.PI / 2});
                    break;

                case "F'":
                    moveQueue.push({axis: 'z', index: 1, angle: Math.PI / 2});
                    break;
            }

            processNextMove(); // Start processing the queue
        }


        // Mount event listener for key inputs
        window.addEventListener('keydown', handleKeyDown);

        // Animate continuously rereading the scene
        const animate = () => {
            // Browser function to be called before next scene
            requestAnimationFrame(animate);
            // Update camera controls
            controls.update();
            // Render current scene using camera configuration
            renderer.render(scene, camera);
        };

        // Animation loop
        animate();

        // Handle window resize and alter aspect ratio
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('cube-move', handleMove as EventListener);


        return () => {
            // Unmount events
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('cube-move', handleMove as EventListener);

            // Remove 3D render's DOM element
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

        };

    }, [localCube3D]);


    return <div ref={mountRef} style={{width: '100vw', height: '100vh', background: 'lightblue'}}
    />;
};

export default Cube;