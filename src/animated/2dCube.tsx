import React, {useEffect, useState} from 'react';
import {RubiksCubeState, useRubiksCube} from './RubiksCubeContext';

const RubiksCube2D: React.FC = () => {
    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();
    const [currentCubeState, setCurrentCubeState] = useState<RubiksCubeState>(rubiksCubeMatrix);
    const [renderKey, setRenderKey] = useState(0); // Key to force re-render

    // Function to handle cube updates via window event
    const handleCubeUpdate = (event: Event) => {
        const newCubeState = (event as CustomEvent).detail as RubiksCubeState;
        console.log("Received new cube state:", newCubeState);
        setCurrentCubeState(newCubeState); // Update local state
        setRenderKey((prev) => prev + 1); // Change key to force re-render
    };

    useEffect(() => {
        // Listen for Rubik's Cube updates from the context
        window.addEventListener("cube-update", handleCubeUpdate);

        return () => {
            window.removeEventListener("cube-update", handleCubeUpdate);
        };
    }, []);

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


    // todo fix problems with counterclockwise rotations
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
            case "D": { // Down Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // ✅ Rotate the down face itself counterclockwise
                newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down);

                // ✅ Extract the bottom rows correctly (row 2 of each face)
                const frontRow = [...rubiksCubeMatrix.front[2]];  // Original Front Bottom Row
                const leftRow = [...rubiksCubeMatrix.left[2]];    // Original Left Bottom Row
                const backRow = [...rubiksCubeMatrix.back[2]];    // Original Back Bottom Row
                const rightRow = [...rubiksCubeMatrix.right[2]];  // Original Right Bottom Row

                // ✅ Apply the correct counterclockwise row shifts
                newRubiksCubeMatrix.left[2] = frontRow;  // Front → Left
                newRubiksCubeMatrix.back[2] = leftRow;   // Left → Back
                newRubiksCubeMatrix.right[2] = backRow;  // Back → Right
                newRubiksCubeMatrix.front[2] = rightRow; // Right → Front

                // ✅ Update the Rubik's Cube state
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
            case 'L': // Left counterclockwise
            {
                // create deep copy
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                newRubiksCubeMatrix.left = rotateFaceCounterclockwise(newRubiksCubeMatrix.left);

                // Extract correct rows
                const frontColumn = newRubiksCubeMatrix.front.map(row => row[0]);
                const downColumn = newRubiksCubeMatrix.down.map(row => row[0])
                const backColumn = newRubiksCubeMatrix.back.map(row => row[2]).reverse();
                const upColumn = newRubiksCubeMatrix.up.map(row => row[0]).reverse();


                // Update deep copy
                newRubiksCubeMatrix.front.forEach((row, i) => (row[0] = downColumn[i]));
                newRubiksCubeMatrix.down.forEach((row, i) => (row[0] = backColumn[i]));
                newRubiksCubeMatrix.back.forEach((row, i) => (row[2] = upColumn[i]));
                newRubiksCubeMatrix.up.forEach((row, i) => (row[0] = frontColumn[i]));

                // Update matrix
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

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
            case 'F': { // Front Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the front face itself counterclockwise
                newRubiksCubeMatrix.front = rotateFaceCounterclockwise(newRubiksCubeMatrix.front);

                // Extract the rows and columns for transformation
                const upRow = [...newRubiksCubeMatrix.up[2]]; // Up row 2 (unchanged)
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[2]); // Left column 2
                const downRow = [...newRubiksCubeMatrix.down[0]]; // Down row 1 (unchanged)
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[0]); // Right column 1

                // Apply the transformations
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.left[i][2] = upRow[2 - i]; // Up row (reversed) → Left column
                    newRubiksCubeMatrix.down[0][i] = leftColumn[i]; // Left column → Down row
                    newRubiksCubeMatrix.right[i][0] = downRow[2 - i]; // Down row (reversed) → Right column
                    newRubiksCubeMatrix.up[2][i] = rightColumn[i]; // Right column → Up row
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }


            case 'B': { // Back Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the back face itself counterclockwise
                newRubiksCubeMatrix.back = rotateFaceCounterclockwise(newRubiksCubeMatrix.back);

                // Extract the rows and columns for transformation
                const upRow = [...newRubiksCubeMatrix.up[0]]; // Up row 1
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[2]); // Right column 3
                const downRow = [...newRubiksCubeMatrix.down[2]]; // Down row 2
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[0]); // Left column 1

                // Apply the transformations
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.up[0][i] = leftColumn[2 - i]; // Left column (reversed) → Up row
                    newRubiksCubeMatrix.left[i][0] = downRow[i]; // Down row → Left column
                    newRubiksCubeMatrix.down[2][i] = rightColumn[2 - i]; // Right column (reversed) → Down row
                    newRubiksCubeMatrix.right[i][2] = upRow[i]; // Up row → Right column
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case 'b': { // Back face Clockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the back face itself clockwise
                newRubiksCubeMatrix.back = rotateFaceClockwise(newRubiksCubeMatrix.back);

                // Extract the rows and columns for transformation
                const upRow = [...newRubiksCubeMatrix.up[0]].reverse(); // Up row 1 (reversed)
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[0]); // Left column 1
                const downRow = [...newRubiksCubeMatrix.down[2]].reverse(); // Down row 2 (reversed)
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[2]); // Right column 3

                // Apply the transformations
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.left[i][0] = upRow[i];  // Up row (reversed) → Left column
                    newRubiksCubeMatrix.down[2][i] = leftColumn[i]; // Left column → Down row
                    newRubiksCubeMatrix.right[i][2] = downRow[i]; // Down row (reversed) → Right column
                    newRubiksCubeMatrix.up[0][i] = rightColumn[i]; // Right column → Up row
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }


            case 'U': { // Up Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the up face itself counterclockwise
                newRubiksCubeMatrix.up = rotateFaceCounterclockwise(newRubiksCubeMatrix.up);

                // Extract the top rows for transformation
                const frontRow = [...newRubiksCubeMatrix.front[0]];
                const rightRow = [...newRubiksCubeMatrix.right[0]];
                const backRow = [...newRubiksCubeMatrix.back[0]];
                const leftRow = [...newRubiksCubeMatrix.left[0]];

                // Apply the transformations (Shifting rows counterclockwise)
                newRubiksCubeMatrix.front[0] = rightRow;
                newRubiksCubeMatrix.right[0] = backRow;
                newRubiksCubeMatrix.back[0] = leftRow;
                newRubiksCubeMatrix.left[0] = frontRow;

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'R': { // Right Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the right face itself counterclockwise
                newRubiksCubeMatrix.right = rotateFaceCounterclockwise(newRubiksCubeMatrix.right);

                // Extract the necessary columns
                const upColumn = newRubiksCubeMatrix.up.map(row => row[2]);         // Up column 3
                const frontColumn = newRubiksCubeMatrix.front.map(row => row[2]);   // Front column 3
                const downColumn = newRubiksCubeMatrix.down.map(row => row[2]);     // Down column 3
                const backColumn = newRubiksCubeMatrix.back.map(row => row[0]);     // Back column 1

                // Apply transformations correctly
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.front[i][2] = upColumn[i];            // Up → Front
                    newRubiksCubeMatrix.down[i][2] = frontColumn[i];          // Front → Down
                    newRubiksCubeMatrix.back[2 - i][0] = downColumn[i];       // Down (reversed) → Back
                    newRubiksCubeMatrix.up[i][2] = backColumn[2 - i];         // Back (reversed) → Up
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }


            case 'L': { // Left Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the left face itself counterclockwise
                newRubiksCubeMatrix.left = rotateFaceCounterclockwise(newRubiksCubeMatrix.left);

                // Extract relevant columns
                const upColumn = newRubiksCubeMatrix.up.map(row => row[0]);          // Up column 1
                const frontColumn = newRubiksCubeMatrix.front.map(row => row[0]);    // Front column 1
                const downColumn = newRubiksCubeMatrix.down.map(row => row[0]);      // Down column 1
                const backColumn = newRubiksCubeMatrix.back.map(row => row[2]);      // Back column 3

                // Apply the transformations
                newRubiksCubeMatrix.up.forEach((row, i) => (row[0] = frontColumn[i]));      // Front column → Up column
                newRubiksCubeMatrix.front.forEach((row, i) => (row[0] = downColumn[i]));    // Down column → Front column
                newRubiksCubeMatrix.down.forEach((row, i) => (row[0] = backColumn[2 - i])); // Back column → Down column (reversed)
                newRubiksCubeMatrix.back.forEach((row, i) => (row[2] = upColumn[2 - i]));   // Up column → Back column (reversed)

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'y': { // Y Rotation (Whole Cube Clockwise around Y-Axis)
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Perform the Y movement: reassign faces clockwise
                const originalFront = newRubiksCubeMatrix.front;
                const originalLeft = newRubiksCubeMatrix.left;
                const originalRight = newRubiksCubeMatrix.right;
                const originalBack = newRubiksCubeMatrix.back;

                newRubiksCubeMatrix.front = originalRight;
                newRubiksCubeMatrix.right = originalBack;
                newRubiksCubeMatrix.back = originalLeft;
                newRubiksCubeMatrix.left = originalFront;

                // Rotate the up and down faces
                newRubiksCubeMatrix.up = rotateFaceClockwise(newRubiksCubeMatrix.up);
                newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down);

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }






        }
    };
    const handleMoveEvent = (event: CustomEvent) => {
        const { move } = event.detail;

        // Only process specified clockwise moves
        if (!['F', 'U', 'D', 'L', 'R', 'B', "F'", "B'", "D'", "U'", "L'", "R'", "Y"].includes(move)) return;

        switch (move) {
            case 'Y': { // Y Rotation (Whole Cube Clockwise around Y-Axis)
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Perform the Y movement: reassign faces clockwise
                const originalFront = newRubiksCubeMatrix.front;
                const originalLeft = newRubiksCubeMatrix.left;
                const originalRight = newRubiksCubeMatrix.right;
                const originalBack = newRubiksCubeMatrix.back;

                newRubiksCubeMatrix.front = originalRight;
                newRubiksCubeMatrix.right = originalBack;
                newRubiksCubeMatrix.back = originalLeft;
                newRubiksCubeMatrix.left = originalFront;

                // Rotate the up and down faces
                newRubiksCubeMatrix.up = rotateFaceClockwise(newRubiksCubeMatrix.up);
                newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down);

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }


            case "R'": { // Right Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the right face itself counterclockwise
                newRubiksCubeMatrix.right = rotateFaceCounterclockwise(newRubiksCubeMatrix.right);

                // Extract the necessary columns
                const upColumn = newRubiksCubeMatrix.up.map(row => row[2]);         // Up column 3
                const frontColumn = newRubiksCubeMatrix.front.map(row => row[2]);   // Front column 3
                const downColumn = newRubiksCubeMatrix.down.map(row => row[2]);     // Down column 3
                const backColumn = newRubiksCubeMatrix.back.map(row => row[0]);     // Back column 1

                // Apply transformations correctly
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.front[i][2] = upColumn[i];            // Up → Front
                    newRubiksCubeMatrix.down[i][2] = frontColumn[i];          // Front → Down
                    newRubiksCubeMatrix.back[2 - i][0] = downColumn[i];       // Down (reversed) → Back
                    newRubiksCubeMatrix.up[i][2] = backColumn[2 - i];         // Back (reversed) → Up
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case "L'": { // Left Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the left face itself counterclockwise
                newRubiksCubeMatrix.left = rotateFaceCounterclockwise(newRubiksCubeMatrix.left);

                // Extract relevant columns
                const upColumn = newRubiksCubeMatrix.up.map(row => row[0]);          // Up column 1
                const frontColumn = newRubiksCubeMatrix.front.map(row => row[0]);    // Front column 1
                const downColumn = newRubiksCubeMatrix.down.map(row => row[0]);      // Down column 1
                const backColumn = newRubiksCubeMatrix.back.map(row => row[2]);      // Back column 3

                // Apply the transformations
                newRubiksCubeMatrix.up.forEach((row, i) => (row[0] = frontColumn[i]));      // Front column → Up column
                newRubiksCubeMatrix.front.forEach((row, i) => (row[0] = downColumn[i]));    // Down column → Front column
                newRubiksCubeMatrix.down.forEach((row, i) => (row[0] = backColumn[2 - i])); // Back column → Down column (reversed)
                newRubiksCubeMatrix.back.forEach((row, i) => (row[2] = upColumn[2 - i]));   // Up column → Back column (reversed)

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case "U'": { // Up Counterclockwise (U')
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // ✅ Rotate the up face itself counterclockwise
                newRubiksCubeMatrix.up = rotateFaceCounterclockwise(newRubiksCubeMatrix.up);

                // ✅ Extract the top row of each face (row 0)
                const leftRow = [...rubiksCubeMatrix.left[0]];    // Original Left Top Row
                const frontRow = [...rubiksCubeMatrix.front[0]];  // Original Front Top Row
                const rightRow = [...rubiksCubeMatrix.right[0]];  // Original Right Top Row
                const backRow = [...rubiksCubeMatrix.back[0]];    // Original Back Top Row

                // ✅ Apply the correct counterclockwise row shifts
                newRubiksCubeMatrix.front[0] = leftRow;  // Left → Front
                newRubiksCubeMatrix.right[0] = frontRow; // Front → Right
                newRubiksCubeMatrix.back[0] = rightRow;  // Right → Back
                newRubiksCubeMatrix.left[0] = backRow;   // Back → Left

                // ✅ Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }


            case "B'": { // Back Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the back face itself counterclockwise
                newRubiksCubeMatrix.back = rotateFaceCounterclockwise(newRubiksCubeMatrix.back);

                // Extract the rows and columns for transformation
                const upRow = [...newRubiksCubeMatrix.up[0]]; // Up row 1
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[2]); // Right column 3
                const downRow = [...newRubiksCubeMatrix.down[2]]; // Down row 2
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[0]); // Left column 1

                // Apply the transformations
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.up[0][i] = leftColumn[2 - i]; // Left column (reversed) → Up row
                    newRubiksCubeMatrix.left[i][0] = downRow[i]; // Down row → Left column
                    newRubiksCubeMatrix.down[2][i] = rightColumn[2 - i]; // Right column (reversed) → Down row
                    newRubiksCubeMatrix.right[i][2] = upRow[i]; // Up row → Right column
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case 'F': // Front clockwise
            {
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

            case 'U': // Up clockwise
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

            case 'D': // Down clockwise
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
            case 'L': // Left clockwise
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

            case 'R': // Right clockwise
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
            case 'B': { // Back face Clockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the back face itself clockwise
                newRubiksCubeMatrix.back = rotateFaceClockwise(newRubiksCubeMatrix.back);

                // Extract the rows and columns for transformation
                const upRow = [...newRubiksCubeMatrix.up[0]].reverse(); // Up row 1 (reversed)
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[0]); // Left column 1
                const downRow = [...newRubiksCubeMatrix.down[2]].reverse(); // Down row 2 (reversed)
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[2]); // Right column 3

                // Apply the transformations
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.left[i][0] = upRow[i];  // Up row (reversed) → Left column
                    newRubiksCubeMatrix.down[2][i] = leftColumn[i]; // Left column → Down row
                    newRubiksCubeMatrix.right[i][2] = downRow[i]; // Down row (reversed) → Right column
                    newRubiksCubeMatrix.up[0][i] = rightColumn[i]; // Right column → Up row
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "F'": { // Front Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // Rotate the front face itself counterclockwise
                newRubiksCubeMatrix.front = rotateFaceCounterclockwise(newRubiksCubeMatrix.front);

                // Extract the rows and columns for transformation
                const upRow = [...newRubiksCubeMatrix.up[2]]; // Up row 2 (unchanged)
                const leftColumn = newRubiksCubeMatrix.left.map(row => row[2]); // Left column 2
                const downRow = [...newRubiksCubeMatrix.down[0]]; // Down row 1 (unchanged)
                const rightColumn = newRubiksCubeMatrix.right.map(row => row[0]); // Right column 1

                // Apply the transformations
                for (let i = 0; i < 3; i++) {
                    newRubiksCubeMatrix.left[i][2] = upRow[2 - i]; // Up row (reversed) → Left column
                    newRubiksCubeMatrix.down[0][i] = leftColumn[i]; // Left column → Down row
                    newRubiksCubeMatrix.right[i][0] = downRow[2 - i]; // Down row (reversed) → Right column
                    newRubiksCubeMatrix.up[2][i] = rightColumn[i]; // Right column → Up row
                }

                // Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "D'": { // Down Counterclockwise
                const newRubiksCubeMatrix = {
                    front: rubiksCubeMatrix.front.map(row => [...row]),
                    back: rubiksCubeMatrix.back.map(row => [...row]),
                    left: rubiksCubeMatrix.left.map(row => [...row]),
                    right: rubiksCubeMatrix.right.map(row => [...row]),
                    up: rubiksCubeMatrix.up.map(row => [...row]),
                    down: rubiksCubeMatrix.down.map(row => [...row]),
                };

                // ✅ Rotate the down face itself counterclockwise
                newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down);

                // ✅ Extract the bottom rows correctly (row 2 of each face)
                const frontRow = [...rubiksCubeMatrix.front[2]];  // Original Front Bottom Row
                const leftRow = [...rubiksCubeMatrix.left[2]];    // Original Left Bottom Row
                const backRow = [...rubiksCubeMatrix.back[2]];    // Original Back Bottom Row
                const rightRow = [...rubiksCubeMatrix.right[2]];  // Original Right Bottom Row

                // ✅ Apply the correct counterclockwise row shifts
                newRubiksCubeMatrix.left[2] = frontRow;  // Front → Left
                newRubiksCubeMatrix.back[2] = leftRow;   // Left → Back
                newRubiksCubeMatrix.right[2] = backRow;  // Back → Right
                newRubiksCubeMatrix.front[2] = rightRow; // Right → Front

                // ✅ Update the Rubik's Cube state
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }




        }


    };
    const handleMoveYEvent = (event: CustomEvent) => {
        const newRubiksCubeMatrix = {
            front: rubiksCubeMatrix.front.map(row => [...row]),
            back: rubiksCubeMatrix.back.map(row => [...row]),
            left: rubiksCubeMatrix.left.map(row => [...row]),
            right: rubiksCubeMatrix.right.map(row => [...row]),
            up: rubiksCubeMatrix.up.map(row => [...row]),
            down: rubiksCubeMatrix.down.map(row => [...row]),
        };

        // Perform the Y movement: reassign faces clockwise
        const originalFront = newRubiksCubeMatrix.front;
        const originalLeft = newRubiksCubeMatrix.left;
        const originalRight = newRubiksCubeMatrix.right;
        const originalBack = newRubiksCubeMatrix.back;

        newRubiksCubeMatrix.front = originalRight;
        newRubiksCubeMatrix.right = originalBack;
        newRubiksCubeMatrix.back = originalLeft;
        newRubiksCubeMatrix.left = originalFront;

        // Rotate the up and down faces
        newRubiksCubeMatrix.up = rotateFaceClockwise(newRubiksCubeMatrix.up);
        newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down);

        // Update the Rubik's Cube state
        setRubiksCube(newRubiksCubeMatrix);


    }

    const handleMoveYReverseEvent = (event: CustomEvent) => {

            const newRubiksCubeMatrix = {
                front: rubiksCubeMatrix.front.map(row => [...row]),
                back: rubiksCubeMatrix.back.map(row => [...row]),
                left: rubiksCubeMatrix.left.map(row => [...row]),
                right: rubiksCubeMatrix.right.map(row => [...row]),
                up: rubiksCubeMatrix.up.map(row => [...row]),
                down: rubiksCubeMatrix.down.map(row => [...row]),
            };

            // Perform the Y' movement: reassign faces counterclockwise
            const originalFront = newRubiksCubeMatrix.front;
            const originalLeft = newRubiksCubeMatrix.left;
            const originalRight = newRubiksCubeMatrix.right;
            const originalBack = newRubiksCubeMatrix.back;

            newRubiksCubeMatrix.front = originalLeft;
            newRubiksCubeMatrix.left = originalBack;
            newRubiksCubeMatrix.back = originalRight;
            newRubiksCubeMatrix.right = originalFront;

            // Rotate the up and down faces
            newRubiksCubeMatrix.up = rotateFaceCounterclockwise(newRubiksCubeMatrix.up);
            newRubiksCubeMatrix.down = rotateFaceClockwise(newRubiksCubeMatrix.down);

            // Update the Rubik's Cube state
            setRubiksCube(newRubiksCubeMatrix);



    }



    useEffect(() => {
        // Add event listeners
        window.addEventListener('cube-move', handleMoveEvent as EventListener);
        window.addEventListener('cube-move-Y', handleMoveYEvent as EventListener);
        window.addEventListener('cube-move-Y-reverse', handleMoveYReverseEvent as EventListener);
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('cube-move', handleMoveEvent as EventListener);
            window.removeEventListener('cube-move-Y', handleMoveEvent as EventListener);
            window.removeEventListener('cube-move-Y-reverse', handleMoveEvent as EventListener);

        };
    }, [rubiksCubeMatrix]);


    const renderFace = (face: string[][], label: string) => {
        return (
            <div>
                <h5 style={{ textAlign: "center", fontSize: "10px" }}>{label}</h5>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 15px)",
                        gridTemplateRows: "repeat(3, 15px)",
                        gap: "2px",
                    }}
                >
                    {face.flat().map((color, index) => (
                        <div
                            key={index}
                            style={{
                                width: "15px",
                                height: "15px",
                                backgroundColor: color,
                                border: "1px solid #000",
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
            key={renderKey} // This forces full re-render
            style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            {renderFace(currentCubeState.up, "Up")}
            {renderFace(currentCubeState.down, "Down")}
            {renderFace(currentCubeState.left, "Left")}
            {renderFace(currentCubeState.front, "Front")}
            {renderFace(currentCubeState.right, "Right")}
            {renderFace(currentCubeState.back, "Back")}
        </div>
    );
};

export default RubiksCube2D;