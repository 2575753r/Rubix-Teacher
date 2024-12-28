import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Cube: React.FC = () => {

    const mountRef = useRef<HTMLDivElement | null>(null);

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
                        new THREE.MeshBasicMaterial({color: x === 1 ? 0x0000ff : 0x000000}),
                        new THREE.MeshBasicMaterial({color: x === -1 ? 0x00ff00 : 0x000000}),
                        new THREE.MeshBasicMaterial({color: y === 1 ? 0xff0000 : 0x000000}),
                        new THREE.MeshBasicMaterial({color: y === -1 ? 0xffa500 : 0x000000}),
                        new THREE.MeshBasicMaterial({color: z === 1 ? 0xffffff : 0x000000}),
                        new THREE.MeshBasicMaterial({color: z === -1 ? 0xffff00 : 0x000000}),
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

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {

                // Front rotate clockwise
                case 'v':
                    rotateFace('z', 1, -Math.PI / 2);
                    break;

                // Front counterclockwise
                case 'f':
                    rotateFace('z', 1, Math.PI / 2);
                    break;

                // Back clockwise
                case 'b':
                    rotateFace('z', -1, -Math.PI / 2);
                    break;

                // Back counterclockwise
                case 'n':
                    rotateFace('z', -1, Math.PI / 2);
                    break;

                // Left clockwise
                case 'l':
                    rotateFace('x', -1, -Math.PI / 2);
                    break;

                // Left counterclockwise
                case 'k':
                    rotateFace('x', -1, Math.PI / 2);
                    break;

                // Right clockwise
                case 'r':
                    rotateFace('x', 1, -Math.PI / 2);
                    break;

                case 't': // Right counterclockwise
                    rotateFace('x', 1, Math.PI / 2);
                    break;


            }

        };

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
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}
    />;
};

export default Cube;