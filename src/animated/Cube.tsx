import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRubiksCube } from './RubiksCubeContext';

const Cube: React.FC = () => {
    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();
    const mountRef = useRef<HTMLDivElement | null>(null);


    const rotateFaceCounterclockwise = (matrix: string[][]): string[][] => {
        const rotated = matrix[0].map((_, index) =>
            matrix.map(row => row[index]).reverse()
        );
        console.log('Matrix after clockwise rotation:', rotated);
        return rotated;
    };

    const rotateFaceClockwise = (matrix: string[][]): string[][] => {
        const rotated = matrix[0].map((_, index) =>
            matrix.map(row => row[matrix.length - 1 - index])
        );
        console.log('Matrix after counterclockwise rotation:', rotated);
        return rotated;
    };

    const scrambleMatrix = () => {
        const axes = ['x', 'y', 'z'] as const;
        const directions = [-1, 1];
        const layers = [-1, 0, 1];

        // Number of random moves to scramble
        const scrambleMoves = 20;

        for (let i = 0; i < scrambleMoves; i++) {
            const axis = axes[Math.floor(Math.random() * axes.length)];
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const layer = layers[Math.floor(Math.random() * layers.length)];

            const angle = direction * Math.PI / 2;


            // Update the logical matrix
            if (axis === 'x') {
                if (layer === -1) rubiksCubeMatrix.left = direction === 1
                    ? rotateFaceClockwise(rubiksCubeMatrix.left)
                    : rotateFaceCounterclockwise(rubiksCubeMatrix.left);
                if (layer === 1) rubiksCubeMatrix.right = direction === 1
                    ? rotateFaceClockwise(rubiksCubeMatrix.right)
                    : rotateFaceCounterclockwise(rubiksCubeMatrix.right);
            } else if (axis === 'y') {
                if (layer === -1) rubiksCubeMatrix.bottom = direction === 1
                    ? rotateFaceClockwise(rubiksCubeMatrix.bottom)
                    : rotateFaceCounterclockwise(rubiksCubeMatrix.bottom);
                if (layer === 1) rubiksCubeMatrix.top = direction === 1
                    ? rotateFaceClockwise(rubiksCubeMatrix.top)
                    : rotateFaceCounterclockwise(rubiksCubeMatrix.top);
            } else if (axis === 'z') {
                if (layer === -1) rubiksCubeMatrix.back = direction === 1
                    ? rotateFaceClockwise(rubiksCubeMatrix.back)
                    : rotateFaceCounterclockwise(rubiksCubeMatrix.back);
                if (layer === 1) rubiksCubeMatrix.front = direction === 1
                    ? rotateFaceClockwise(rubiksCubeMatrix.front)
                    : rotateFaceCounterclockwise(rubiksCubeMatrix.front);
            }
        }

        // Update the Cube state
        setRubiksCube({ ...rubiksCubeMatrix });


    };




    // End of matrix handling






    useEffect(() => {


        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff);

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const cubeGroup = new THREE.Group();
        scene.add(cubeGroup);

        const colors = [
            0xff0000, // Red
            0x00ff00, // Green
            0x0000ff, // Blue
            0xffff00, // Yellow
            0xffa500, // Orange
            0xffffff, // White
        ];

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
                        new THREE.MeshBasicMaterial({color: x === 1 ? 0x0000ff : 0x000000}), // Right: Blue
                        new THREE.MeshBasicMaterial({color: x === -1 ? 0x00ff00 : 0x000000}), // Left: Green
                        new THREE.MeshBasicMaterial({color: y === 1 ? 0xff0000 : 0x000000}), // Top: Red
                        new THREE.MeshBasicMaterial({color: y === -1 ? 0xffa500 : 0x000000}), // Bottom: Orange
                        new THREE.MeshBasicMaterial({color: z === 1 ? 0xffffff : 0x000000}), // Front: gray
                        new THREE.MeshBasicMaterial({color: z === -1 ? 0xffff00 : 0x000000}), // Back: Yellow
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
                cubeGroup.remove(cube); // Remove from the main group
                pivot.add(cube); // Add to the pivot group
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
                pivot.remove(cube); // Remove from the pivot group
                cubeGroup.add(cube); // Reattach to the main group
            });

            scene.remove(pivot); // Remove the pivot from the scene
        };

        // Keydown event handler to rotate faces
        const handleKeyDown = (event: KeyboardEvent) => {

            switch (event.key) {
                // Front face (Z=1)
                case 'v': // Front clockwise
                {

                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    newRubiksCubeMatrix.front = rotateFaceClockwise(newRubiksCubeMatrix.front);


                    const topRowV = [...newRubiksCubeMatrix.top[2]];
                    const rightColV = newRubiksCubeMatrix.right.map(row => row[0]);
                    const bottomRowV = [...newRubiksCubeMatrix.bottom[0]];
                    const leftColV = newRubiksCubeMatrix.left.map(row => row[2]);

                    newRubiksCubeMatrix.top[2] = leftColV.reverse();
                    newRubiksCubeMatrix.right.forEach((row, i) => (row[0] = topRowV[topRowV.length - 1 - i]));
                    newRubiksCubeMatrix.bottom[0] = rightColV.reverse();
                    newRubiksCubeMatrix.left.forEach((row, i) => (row[2] = bottomRowV[i]));

                    setRubiksCube(newRubiksCubeMatrix); // Ensure matrix is updated
                    break;
                }





                // Back face (Z=-1)
                case 'b': // Back clockwise
                {

                    rotateFace('z', -1, -Math.PI / 2);
                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    newRubiksCubeMatrix.back = rotateFaceClockwise(newRubiksCubeMatrix.back);

                    const topRow = [...newRubiksCubeMatrix.top[0]];
                    const rightCol = newRubiksCubeMatrix.right.map((row: string[]) => row[2]);
                    const bottomRow = [...newRubiksCubeMatrix.bottom[2]];
                    const leftCol = newRubiksCubeMatrix.left.map((row: string[]) => row[0]);

                    newRubiksCubeMatrix.top[0] = leftCol.reverse();
                    newRubiksCubeMatrix.right.forEach((row: string[], i: number) => (row[2] = topRow[i]));
                    newRubiksCubeMatrix.bottom[2] = rightCol.reverse();
                    newRubiksCubeMatrix.left.forEach((row: string[], i: number) => (row[0] = bottomRow[i]));
                    setRubiksCube(newRubiksCubeMatrix)

                    break;
                }

                case 'n': // Back counterclockwise
                {
                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    rotateFace('z', -1, Math.PI / 2);
                    newRubiksCubeMatrix.back = rotateFaceCounterclockwise(newRubiksCubeMatrix.back);

                    const topRow = [...newRubiksCubeMatrix.top[0]];
                    const rightCol = newRubiksCubeMatrix.right.map((row: string[]) => row[2]);
                    const bottomRow = [...newRubiksCubeMatrix.bottom[2]];
                    const leftCol = newRubiksCubeMatrix.left.map((row: string[]) => row[0]);


                    newRubiksCubeMatrix.top[0] = rightCol.reverse();
                    newRubiksCubeMatrix.right.forEach((row: string[], i: number) => (row[2] = bottomRow[i]));
                    newRubiksCubeMatrix.bottom[2] = leftCol.reverse();
                    newRubiksCubeMatrix.left.forEach((row: string[], i: number) => (row[0] = topRow[i]));
                    setRubiksCube(newRubiksCubeMatrix);



                    break;
                }

                case 'f': // Front counterclockwise
                {
                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    rotateFace('z', 1, Math.PI / 2);
                    newRubiksCubeMatrix.front = rotateFaceCounterclockwise(newRubiksCubeMatrix.front);

                    const topRow = [...newRubiksCubeMatrix.top[2]];
                    const rightCol = newRubiksCubeMatrix.right.map((row: string[]) => row[0]);
                    const bottomRow = [...newRubiksCubeMatrix.bottom[0]];
                    const leftCol = newRubiksCubeMatrix.left.map((row: string[]) => row[2]);

                    newRubiksCubeMatrix.top[2] = rightCol;
                    newRubiksCubeMatrix.right.forEach((row: string[], i: number) => (row[0] = bottomRow[i]));
                    newRubiksCubeMatrix.bottom[0] = leftCol.reverse();
                    newRubiksCubeMatrix.left.forEach((row: string[], i: number) => (row[2] = topRow[i]));
                    setRubiksCube(newRubiksCubeMatrix)

                    break;
                }

                case 't': // Right counterclockwise
                {
                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    rotateFace('x', 1, Math.PI / 2);
                    newRubiksCubeMatrix.right = rotateFaceCounterclockwise(newRubiksCubeMatrix.right);

                    const topCol = newRubiksCubeMatrix.top.map((row: string[]) => row[2]);
                    const frontCol = newRubiksCubeMatrix.front.map((row: string[]) => row[2]);
                    const bottomCol = newRubiksCubeMatrix.bottom.map((row: string[]) => row[2]);
                    const backCol = newRubiksCubeMatrix.back.map((row: string[]) => row[0]).reverse();

                    newRubiksCubeMatrix.top.forEach((row: string[], i: number) => (row[2] = backCol[i]));
                    newRubiksCubeMatrix.front.forEach((row: string[], i: number) => (row[2] = topCol[i]));
                    newRubiksCubeMatrix.bottom.forEach((row: string[], i: number) => (row[2] = frontCol[i]));
                    newRubiksCubeMatrix.back.forEach((row: string[], i: number) => (row[0] = bottomCol[i]));
                    setRubiksCube(newRubiksCubeMatrix);

                    break;
                }
                // Left face (X=-1)
                case 'l': // Left clockwise
                {
                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    rotateFace('x', -1, -Math.PI / 2);
                    newRubiksCubeMatrix.left = rotateFaceClockwise(newRubiksCubeMatrix.left);

                    const topCol = newRubiksCubeMatrix.top.map((row: string[]) => row[0]);
                    const frontCol = newRubiksCubeMatrix.front.map((row: string[]) => row[0]);
                    const bottomCol = newRubiksCubeMatrix.bottom.map((row: string[]) => row[0]);
                    const backCol = newRubiksCubeMatrix.back.map((row: string[]) => row[2]).reverse();

                    newRubiksCubeMatrix.top.forEach((row: string[], i: number) => (row[0] = frontCol[i]));
                    newRubiksCubeMatrix.front.forEach((row: string[], i: number) => (row[0] = bottomCol[i]));
                    newRubiksCubeMatrix.bottom.forEach((row: string[], i: number) => (row[0] = backCol[i]));
                    newRubiksCubeMatrix.back.forEach((row: string[], i: number) => (row[2] = topCol[i]));
                    setRubiksCube(newRubiksCubeMatrix);

                    break;
                }

                case 'k': // Left counterclockwise
                {
                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    rotateFace('x', -1, Math.PI / 2);
                    newRubiksCubeMatrix.left = rotateFaceCounterclockwise(newRubiksCubeMatrix.left);

                    const topCol = newRubiksCubeMatrix.top.map((row: string[]) => row[0]);
                    const frontCol = newRubiksCubeMatrix.front.map((row: string[]) => row[0]);
                    const bottomCol = newRubiksCubeMatrix.bottom.map((row: string[]) => row[0]);
                    const backCol = newRubiksCubeMatrix.back.map((row: string[]) => row[2]).reverse();

                    newRubiksCubeMatrix.top.forEach((row: string[], i: number) => (row[0] = backCol[i]));
                    newRubiksCubeMatrix.front.forEach((row: string[], i: number) => (row[0] = topCol[i]));
                    newRubiksCubeMatrix.bottom.forEach((row: string[], i: number) => (row[0] = frontCol[i]));
                    newRubiksCubeMatrix.back.forEach((row: string[], i: number) => (row[2] = bottomCol[i]));
                    setRubiksCube(newRubiksCubeMatrix);

                    break;
                }

                case 'r': // Right clockwise
                {
                    const newRubiksCubeMatrix = { ...rubiksCubeMatrix };
                    rotateFace('x', 1, -Math.PI / 2);
                    newRubiksCubeMatrix.right = rotateFaceClockwise(newRubiksCubeMatrix.right);

                    const topCol = newRubiksCubeMatrix.top.map((row: string[]) => row[2]);
                    const frontCol = newRubiksCubeMatrix.front.map((row: string[]) => row[2]);
                    const bottomCol = newRubiksCubeMatrix.bottom.map((row: string[]) => row[2]);
                    const backCol = newRubiksCubeMatrix.back.map((row: string[]) => row[0]).reverse();

                    newRubiksCubeMatrix.top.forEach((row: string[], i: number) => (row[2] = frontCol[i]));
                    newRubiksCubeMatrix.front.forEach((row: string[], i: number) => (row[2] = bottomCol[i]));
                    newRubiksCubeMatrix.bottom.forEach((row: string[], i: number) => (row[2] = backCol[i]));
                    newRubiksCubeMatrix.back.forEach((row: string[], i: number) => (row[0] = topCol[i]));
                    setRubiksCube(newRubiksCubeMatrix);

                    break;
                }



                // Add cases for top (`u`, `i`) and bottom (`d`, `c`)...

                case 'q': // Reset the matrix
                    setRubiksCube({
                        front: Array(3).fill(null).map(() => Array(3).fill('white')),
                        back: Array(3).fill(null).map(() => Array(3).fill('yellow')),
                        left: Array(3).fill(null).map(() => Array(3).fill('green')),
                        right: Array(3).fill(null).map(() => Array(3).fill('blue')),
                        top: Array(3).fill(null).map(() => Array(3).fill('red')),
                        bottom: Array(3).fill(null).map(() => Array(3).fill('orange')),
                    });
                    break;

                case 's': // Shuffle
                {
                    const shuffledRubiksCubeMatrix = {
                        front: [
                            ['green', 'white', 'blue'],
                            ['orange', 'red', 'green'],
                            ['blue', 'yellow', 'orange'],
                        ],
                        back: [
                            ['yellow', 'orange', 'white'],
                            ['green', 'red', 'yellow'],
                            ['blue', 'red', 'white'],
                        ],
                        left: [
                            ['red', 'green', 'yellow'],
                            ['blue', 'orange', 'red'],
                            ['white', 'yellow', 'green'],
                        ],
                        right: [
                            ['yellow', 'blue', 'orange'],
                            ['white', 'green', 'red'],
                            ['yellow', 'orange', 'blue'],
                        ],
                        top: [
                            ['red', 'yellow', 'blue'],
                            ['orange', 'white', 'green'],
                            ['green', 'blue', 'white'],
                        ],
                        bottom: [
                            ['blue', 'red', 'yellow'],
                            ['green', 'orange', 'white'],
                            ['red', 'yellow', 'orange'],
                        ],
                    };

                    setRubiksCube(shuffledRubiksCubeMatrix);

                    break;
                }


            }





        };

        // Functions to alter matrix





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

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [rubiksCubeMatrix, setRubiksCube]);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}
    />;
};

export default Cube;