import React, {useEffect} from 'react';
import { useRubiksCube } from './RubiksCubeContext';
import * as THREE from "three";

const RubiksCube2D: React.FC = () => {

    // Ability to use matrix in parent 'shared layout'
    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();

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

    window.addEventListener('keydown', handleKeyDown);


    const renderFace = (face: string[][], label: string) => {
        return (
            <div>
                <h5 style={{ textAlign: 'center', fontSize: '10px' }}>{label}</h5>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 15px)', // Smaller squares
                        gridTemplateRows: 'repeat(3, 15px)',
                        gap: '2px', // Small spacing between squares
                    }}
                >
                    {face.flat().map((color, index) => (
                        <div
                            key={index}
                            style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: color,
                                border: '1px solid #000',
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    };

    // Layout of 2D faces
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            {renderFace(rubiksCubeMatrix.top, 'Top')}
            {renderFace(rubiksCubeMatrix.front, 'Front')}
            {renderFace(rubiksCubeMatrix.back, 'Back')}
            {renderFace(rubiksCubeMatrix.left, 'Left')}
            {renderFace(rubiksCubeMatrix.right, 'Right')}
            {renderFace(rubiksCubeMatrix.bottom, 'Bottom')}
        </div>
    );
};

export default RubiksCube2D;