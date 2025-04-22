import React, {useEffect, useState} from 'react';
import {RubiksCubeState, useRubiksCube} from '../../contexts/CubeContext';
import type { CubeFace } from '../../contexts/CubeContext';
import {rotationConfigs} from "../configurations/CubeConfig";
const RubiksCube2D: React.FC = () => {
    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();

    // Define local state for cube configuration
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
            // Unmount event listener
            window.removeEventListener("cube-update", handleCubeUpdate);
        };
    }, []);

    // Utility functions simulate face rotations on cube configuration
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

    // Utility functions to extract and update specific rows of the configuration
    function getRow(matrix: string[][], index: number): string[] {
        return [...matrix[index]];
    }
    function setRow(matrix: string[][], index: number, values: string[]): void {
        matrix[index] = [...values];
    }
    function getCol(matrix: string[][], index: number): string[] {
        return matrix.map(row => row[index]);
    }
    function setCol(matrix: string[][], index: number, values: string[]): void {
        values.forEach((val, rowIdx) => {
            matrix[rowIdx][index] = val;
        });
    }

    function rotateFaceSlices(
        newMatrix: RubiksCubeState,
        rotationConfig: { face: CubeFace, type: 'row' | 'col', index: number, reverse?: boolean }[],
        setRubiksCube: (updatedCube: RubiksCubeState) => void,

    ) {
        // Extract affected rows or columns and reverse if required
        const values = rotationConfig.map(({ face, type, index, reverse }) => {
            const slice = type === 'row'
                ? getRow(newMatrix[face], index)
                : getCol(newMatrix[face], index);
            return reverse ? slice.reverse() : slice;
        });

        // Rotate the slices and shift the values
        const rotated = [...values.slice(1), values[0]];

        // Place altered rows and columns back into the configuration matrices
        rotationConfig.forEach(({ face, type, index, reverse }, i) => {
            const value = reverse ? [...rotated[i]].reverse() : rotated[i];
            if (type === 'row') {
                setRow(newMatrix[face], index, value);
            } else {
                setCol(newMatrix[face], index, value);
            }
        });

        // Update shared configuration state
        setRubiksCube(newMatrix);
    }

    // Create a deep copy of the Rubik's Cube state
    const createDeepCopy = (rubiksCubeMatrix: RubiksCubeState) => {
        const newRubiksCubeMatrix = Object.fromEntries(
            Object.entries(rubiksCubeMatrix).map(([face, grid]) => [face, grid.map(row => [...row])])
        ) as RubiksCubeState;

        return newRubiksCubeMatrix;
    }

    // Keydown event handler to rotate faces
    const handleKeyDown = (event: KeyboardEvent) => {

        switch (event.key) {
            case 'u': // Up clockwise - Comments apply to all cases
            {
                // Make Deep Copy
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);

                // Rotate face
                newRubiksCubeMatrix.up = rotateFaceClockwise(newRubiksCubeMatrix.up)

                // Exchange faces
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.u, setRubiksCube);
                break;
            }
            case 'U': // Up counterclockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.up = rotateFaceCounterclockwise(newRubiksCubeMatrix.up)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.U, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'd': // Down clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.down = rotateFaceClockwise(newRubiksCubeMatrix.down)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.d, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "D": // Down Counterclockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.D, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'l': // Left clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.left = rotateFaceClockwise(newRubiksCubeMatrix.left)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.l, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'L': // Left counterclockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.left = rotateFaceCounterclockwise(newRubiksCubeMatrix.left)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.L, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case 'r': // Right clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.right = rotateFaceClockwise(newRubiksCubeMatrix.right)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.r, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case 'f': // Front clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.front = rotateFaceClockwise(newRubiksCubeMatrix.front)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.f, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'F': { // Front Counterclockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.front = rotateFaceCounterclockwise(newRubiksCubeMatrix.front)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.F, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'B': { // Back Counterclockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.back = rotateFaceCounterclockwise(newRubiksCubeMatrix.back)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.B, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'b': { // Back face Clockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.back = rotateFaceClockwise(newRubiksCubeMatrix.back)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.b, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'R': { // Right Counterclockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.right = rotateFaceCounterclockwise(newRubiksCubeMatrix.right)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.R, setRubiksCube );
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

    // Y move event with seperated logic performing a full clockwise cube rotation
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


            case "U": // Up clockwise - Comments apply to all cases
            {
                // Make Deep Copy
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);

                // Rotate face
                newRubiksCubeMatrix.up = rotateFaceClockwise(newRubiksCubeMatrix.up)

                // Exchange faces
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.u, setRubiksCube);
                break;
            }
            case "U'": // Up counterclockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.up = rotateFaceCounterclockwise(newRubiksCubeMatrix.up)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.U, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "D": // Down clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.down = rotateFaceClockwise(newRubiksCubeMatrix.down)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.d, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "D'": // Down Counterclockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.D, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'L': // Left clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.left = rotateFaceClockwise(newRubiksCubeMatrix.left)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.l, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "L'": // Left counterclockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.left = rotateFaceCounterclockwise(newRubiksCubeMatrix.left)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.L, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case 'R': // Right clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.right = rotateFaceClockwise(newRubiksCubeMatrix.right)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.r, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }

            case 'F': // Front clockwise
            {
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.front = rotateFaceClockwise(newRubiksCubeMatrix.front)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.f, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "F'": { // Front Counterclockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.front = rotateFaceCounterclockwise(newRubiksCubeMatrix.front)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.F, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "B'": { // Back Counterclockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.back = rotateFaceCounterclockwise(newRubiksCubeMatrix.back)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.B, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case 'B': { // Back face Clockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.back = rotateFaceClockwise(newRubiksCubeMatrix.back)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.b, setRubiksCube );
                setRubiksCube(newRubiksCubeMatrix);
                break;
            }
            case "R'": { // Right Counterclockwise
                let newRubiksCubeMatrix = createDeepCopy(rubiksCubeMatrix);
                newRubiksCubeMatrix.right = rotateFaceCounterclockwise(newRubiksCubeMatrix.right)
                rotateFaceSlices(newRubiksCubeMatrix, rotationConfigs.R, setRubiksCube );
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

        const originalFront = newRubiksCubeMatrix.front;
        const originalLeft = newRubiksCubeMatrix.left;
        const originalRight = newRubiksCubeMatrix.right;
        const originalBack = newRubiksCubeMatrix.back;

        newRubiksCubeMatrix.front = originalRight;
        newRubiksCubeMatrix.right = originalBack;
        newRubiksCubeMatrix.back = originalLeft;
        newRubiksCubeMatrix.left = originalFront;

        newRubiksCubeMatrix.up = rotateFaceClockwise(newRubiksCubeMatrix.up);
        newRubiksCubeMatrix.down = rotateFaceCounterclockwise(newRubiksCubeMatrix.down);

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

            const originalFront = newRubiksCubeMatrix.front;
            const originalLeft = newRubiksCubeMatrix.left;
            const originalRight = newRubiksCubeMatrix.right;
            const originalBack = newRubiksCubeMatrix.back;

            newRubiksCubeMatrix.front = originalLeft;
            newRubiksCubeMatrix.left = originalBack;
            newRubiksCubeMatrix.back = originalRight;
            newRubiksCubeMatrix.right = originalFront;

            newRubiksCubeMatrix.up = rotateFaceCounterclockwise(newRubiksCubeMatrix.up);
            newRubiksCubeMatrix.down = rotateFaceClockwise(newRubiksCubeMatrix.down);

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
            key={renderKey} // Forcer for full re-render
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