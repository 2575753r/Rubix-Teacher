import React, {useEffect} from 'react';
import {RubiksCubeState, useRubiksCube} from './RubiksCubeContext';

const RubiksCube2D: React.FC = () => {

    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();

    const rotateFaceCounterclockwise = (matrix: string[][]): string[][] => {

        const transposed = matrix[0].map((_, colIndex) =>
            matrix.map(row => row[colIndex])
        );

        const rotated = transposed.reverse();

        console.log('Matrix after counterclockwise rotation:', rotated);
        return rotated;
    };


    const rotateFaceClockwise = (matrix: string[][]): string[][] => {
        const rotated = matrix[0].map((_, index) =>
            matrix.map(row => row[index]).reverse()
        );
        console.log('Matrix after clockwise rotation:', rotated);
        return rotated;
    };



    // Keydown event handler to rotate faces
    const handleKeyDown = (event: KeyboardEvent) => {

        switch (event.key) {
            case 'u': // Up clockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.up = rotateFaceClockwise(newRubiksCubeMatrix.up);

                // Extract correct rows
                const frontRow = [...newRubiksCubeMatrix.front[0]];
                const leftRow = [...newRubiksCubeMatrix.left[0]];
                const backRow = [...newRubiksCubeMatrix.back[0]];
                const rightRow = [...newRubiksCubeMatrix.right[0]];

                // Update deep copy
                newRubiksCubeMatrix.left[0] = frontRow;
                newRubiksCubeMatrix.back[0] = leftRow;
                newRubiksCubeMatrix.right[0] = backRow;
                newRubiksCubeMatrix.front[0] = rightRow;

                // Update matrix
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'U': // Up counterclockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.up = rotateFaceCounterclockwise(newRubiksCubeMatrix.up);

                // Extract correct rows
                const frontRow = [...newRubiksCubeMatrix.front[0]];
                const leftRow = [...newRubiksCubeMatrix.left[0]];
                const backRow = [...newRubiksCubeMatrix.back[0]];
                const rightRow = [...newRubiksCubeMatrix.right[0]];

                // Update deep copy
                newRubiksCubeMatrix.right[0] = frontRow;
                newRubiksCubeMatrix.back[0] = rightRow;
                newRubiksCubeMatrix.left[0] = backRow;
                newRubiksCubeMatrix.front[0] = leftRow;

                // Update matrix
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'd': // Down clockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.down = rotateFaceClockwise(newRubiksCubeMatrix.down);

                // Extract correct rows
                const frontRow = [...newRubiksCubeMatrix.front[2]];
                const leftRow = [...newRubiksCubeMatrix.left[2]];
                const backRow = [...newRubiksCubeMatrix.back[2]];
                const rightRow = [...newRubiksCubeMatrix.right[2]];

                // Update deep copy
                newRubiksCubeMatrix.left[2] = backRow;
                newRubiksCubeMatrix.back[2] = rightRow;
                newRubiksCubeMatrix.right[2] = frontRow;
                newRubiksCubeMatrix.front[2] = leftRow;

                // Update matrix
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'D': // Down counterclockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.down = rotateFaceClockwise(newRubiksCubeMatrix.down);

                // Extract correct rows
                const frontRow = [...newRubiksCubeMatrix.front[2]];
                const leftRow = [...newRubiksCubeMatrix.left[2]];
                const backRow = [...newRubiksCubeMatrix.back[2]];
                const rightRow = [...newRubiksCubeMatrix.right[2]];

                // Update deep copy
                newRubiksCubeMatrix.left[2] = frontRow;
                newRubiksCubeMatrix.back[2] = leftRow;
                newRubiksCubeMatrix.right[2] = backRow;
                newRubiksCubeMatrix.front[2] = rightRow;

                // Update matrix
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'l': // Left clockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.left = rotateFaceClockwise(newRubiksCubeMatrix.left);

                // Extract correct columns
                const frontColumn = newRubiksCubeMatrix.front.map(row => row[0]);
                const downColumn = newRubiksCubeMatrix.down.map(row => row[0]).reverse();
                const backColumn = newRubiksCubeMatrix.back.map(row => row[2]).reverse();
                const upColumn = newRubiksCubeMatrix.up.map(row => row[0]);

                // Update deep copy
                // up column 1 becomes front column 1 CORRECT
                newRubiksCubeMatrix.front.forEach((row, i) => (row[0] = upColumn[i]));
                // down column 1 becomes front column 1 CORRECT
                newRubiksCubeMatrix.down.forEach((row, i) => (row[0] = frontColumn[i]));
                // back column 2 becomes down column 1 reversed CORRECT
                newRubiksCubeMatrix.back.forEach((row, i) => (row[2] = downColumn[i]));
                // back column 2 becomes down column 1 reversed CORRECT
                newRubiksCubeMatrix.up.forEach((row, i) => (row[0] = backColumn[i]));

                // Update matrix
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            // case 'L': // Left counterclockwise
            // {
            //     // create deep copy
            //     const newRubiksCubeMatrix = {
            //         front: rubiksCubeMatrix.front.map(row => [...row]),
            //         back: rubiksCubeMatrix.back.map(row => [...row]),
            //         left: rubiksCubeMatrix.left.map(row => [...row]),
            //         right: rubiksCubeMatrix.right.map(row => [...row]),
            //         up: rubiksCubeMatrix.up.map(row => [...row]),
            //         down: rubiksCubeMatrix.down.map(row => [...row]),
            //     };
            //
            //     newRubiksCubeMatrix.left = rotateFaceCounterclockwise(newRubiksCubeMatrix.left);
            //
            //     // Extract correct rows
            //     const frontColumn = newRubiksCubeMatrix.front.map(row => row[0]);
            //     const downColumn = newRubiksCubeMatrix.down.map(row => row[0])
            //     const backColumn = newRubiksCubeMatrix.back.map(row => row[2]).reverse();
            //     const upColumn = newRubiksCubeMatrix.up.map(row => row[0]).reverse();
            //
            //
            //     // Update deep copy
            //     newRubiksCubeMatrix.front.forEach((row, i) => (row[0] = downColumn[i]));
            //     newRubiksCubeMatrix.down.forEach((row, i) => (row[0] = backColumn[i]));
            //     newRubiksCubeMatrix.back.forEach((row, i) => (row[2] = upColumn[i]));
            //     newRubiksCubeMatrix.up.forEach((row, i) => (row[0] = frontColumn[i]));
            //
            //     // Update matrix
            //     setRubiksCube(newRubiksCubeMatrix);
            //     break;
            // }

            case 'r': // Right clockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.right = rotateFaceClockwise(newRubiksCubeMatrix.right);

                // Extract correct columns
                const frontColumn = newRubiksCubeMatrix.front.map(row => row[2]);
                const downColumn = newRubiksCubeMatrix.down.map(row => row[2])
                const backColumn = newRubiksCubeMatrix.back.map(row => row[0]).reverse();
                const upColumn = newRubiksCubeMatrix.up.map(row => row[2]).reverse();

                // Update deep copy
                // down column 2 becomes front column 2 CORRECT
                newRubiksCubeMatrix.front.forEach((row, i) => (row[2] = downColumn[i]));

                newRubiksCubeMatrix.down.forEach((row, i) => (row[2] = backColumn[i]));
                newRubiksCubeMatrix.back.forEach((row, i) => (row[0] = upColumn[i]));
                newRubiksCubeMatrix.up.forEach((row, i) => (row[2] = frontColumn[i]));

                // Update matrix
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            // case 'R': // right counterclockwise
            // {
            //     // create deep copy
            //     const newRubiksCubeMatrix = {
            //         front: rubiksCubeMatrix.front.map(row => [...row]),
            //         back: rubiksCubeMatrix.back.map(row => [...row]),
            //         left: rubiksCubeMatrix.left.map(row => [...row]),
            //         right: rubiksCubeMatrix.right.map(row => [...row]),
            //         up: rubiksCubeMatrix.up.map(row => [...row]),
            //         down: rubiksCubeMatrix.down.map(row => [...row]),
            //     };
            //
            //     newRubiksCubeMatrix.right = rotateFaceCounterclockwise(newRubiksCubeMatrix.right);
            //
            //     // Extract correct rows
            //     const frontColumn = newRubiksCubeMatrix.front.map(row => row[2]);
            //     const downColumn = newRubiksCubeMatrix.down.map(row => row[2]).reverse();
            //     const backColumn = newRubiksCubeMatrix.back.map(row => row[0]).reverse();
            //     const upColumn = newRubiksCubeMatrix.up.map(row => row[2]);
            //
            //
            //     // Update deep copy
            //     newRubiksCubeMatrix.front.forEach((row, i) => (row[2] = upColumn[i]));
            //     newRubiksCubeMatrix.down.forEach((row, i) => (row[2] = frontColumn[i]));
            //     newRubiksCubeMatrix.back.forEach((row, i) => (row[0] = downColumn[i]));
            //     newRubiksCubeMatrix.up.forEach((row, i) => (row[2] = backColumn[i]));
            //
            //     // Update matrix
            //     setRubiksCube(newRubiksCubeMatrix);
            //     break;
            // }
            case 'f': // Front clockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.front = rotateFaceClockwise(newRubiksCubeMatrix.front);

                // Extract correct rows and columns
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[2]).reverse(); // Left column 2
                const upRow = newRubiksCubeMatrix.up[2];
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[0]).reverse();
                const downRow = newRubiksCubeMatrix.down[0];              // Down row 1

                newRubiksCubeMatrix.up[2] = leftColumn;
                newRubiksCubeMatrix.right.forEach((row, i) => {row[0] = upRow[i];});
                newRubiksCubeMatrix.down[0] = rightColumn;
                newRubiksCubeMatrix.left.forEach((row, i) => {row[2] = downRow[i];});

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            // case 'F': // Front clockwise
            // {
            //     // Create a deep copy
            //     const newRubiksCubeMatrix = {
            //         front: rubiksCubeMatrix.front.map(row => [...row]),
            //         back: rubiksCubeMatrix.back.map(row => [...row]),
            //         left: rubiksCubeMatrix.left.map(row => [...row]),
            //         right: rubiksCubeMatrix.right.map(row => [...row]),
            //         up: rubiksCubeMatrix.up.map(row => [...row]),
            //         down: rubiksCubeMatrix.down.map(row => [...row]),
            //     };
            //
            //     newRubiksCubeMatrix.front = rotateFaceCounterclockwise(newRubiksCubeMatrix.front);
            //
            //     // Extract correct rows and columns
            //     const leftColumn = newRubiksCubeMatrix.left.map(row => row[2]); // Left column 2
            //     const upRow = newRubiksCubeMatrix.up[2].reverse();
            //     const rightColumn = newRubiksCubeMatrix.right.map(row => row[0]);
            //     const downRow = newRubiksCubeMatrix.down[0].reverse();              // Down row 1
            //
            //     newRubiksCubeMatrix.up[2] = rightColumn;
            //     newRubiksCubeMatrix.right.forEach((row, i) => {row[0] = downRow[i];});
            //     newRubiksCubeMatrix.down[0] = leftColumn;
            //     newRubiksCubeMatrix.left.forEach((row, i) => {row[2] = upRow[i];});
            //
            //     // Update the Rubik's Cube state
            //     setRubiksCube(newRubiksCubeMatrix);
            //     break;
            // }

            case 'b': // Front clockwise
            {
                // Create a deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.back = rotateFaceCounterclockwise(newRubiksCubeMatrix.back);

                // Extract correct rows and columns
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[0]).reverse(); // Left column 2
                const upRow = newRubiksCubeMatrix.up[0];
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[2]).reverse();
                const downRow = newRubiksCubeMatrix.down[2];

                newRubiksCubeMatrix.up[0] = leftColumn;
                newRubiksCubeMatrix.right.forEach((row, i) => {row[2] = upRow[i];});
                newRubiksCubeMatrix.down[2] = rightColumn;
                newRubiksCubeMatrix.left.forEach((row, i) => {row[0] = downRow[i];});

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            // case 'B': // Front clockwise
            // {
            //     // Create a deep copy
            //     const newRubiksCubeMatrix = {
            //         front: rubiksCubeMatrix.front.map(row => [...row]),
            //         back: rubiksCubeMatrix.back.map(row => [...row]),
            //         left: rubiksCubeMatrix.left.map(row => [...row]),
            //         right: rubiksCubeMatrix.right.map(row => [...row]),
            //         up: rubiksCubeMatrix.up.map(row => [...row]),
            //         down: rubiksCubeMatrix.down.map(row => [...row]),
            //     };
            //
            //     newRubiksCubeMatrix.back = rotateFaceClockwise(newRubiksCubeMatrix.back);
            //
            //     // Extract correct rows and columns
            //     const leftColumn = newRubiksCubeMatrix.left.map(row => row[0]); // Left column 2
            //     const upRow = newRubiksCubeMatrix.up[0].reverse();
            //     const rightColumn = newRubiksCubeMatrix.right.map(row => row[2]);
            //     const downRow = newRubiksCubeMatrix.down[2].reverse();              // Down row 1bbbbbbb
            //
            //     newRubiksCubeMatrix.up[0] = rightColumn;
            //     newRubiksCubeMatrix.right.forEach((row, i) => {row[2] = downRow[i];});
            //     newRubiksCubeMatrix.down[2] = leftColumn;
            //     newRubiksCubeMatrix.left.forEach((row, i) => {row[2] = upRow[i];});
            //
            //     // Update the Rubik's Cube state
            //     setRubiksCube(newRubiksCubeMatrix);
            //     break;
            // }

        }
    };

    useEffect(() => {
        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [rubiksCubeMatrix]);


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
            {renderFace(rubiksCubeMatrix.up, 'Up')}
            {renderFace(rubiksCubeMatrix.down, 'Down')}
            {renderFace(rubiksCubeMatrix.left, 'Left')}
            {renderFace(rubiksCubeMatrix.front, 'Front')}
            {renderFace(rubiksCubeMatrix.right, 'Right')}
            {renderFace(rubiksCubeMatrix.back, 'Back')}




        </div>
    );
};
export default RubiksCube2D;