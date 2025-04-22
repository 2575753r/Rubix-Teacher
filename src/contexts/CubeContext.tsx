import React, {createContext, useContext, useState, ReactNode} from "react";
import {sendRequest, sendRequestInput} from "../Api";

export type CubeFace = 'front' | 'back' | 'left' | 'right' | 'up' | 'down';

export type RubiksCubeState = Record<CubeFace, string[][]>;


// Define the shape of the Rubik's Cube state (2D face representation)


// Define the shape of the 3D cube representation (27 small cubes, each with 6 possible faces)
export type Cube3D = (string | null)[][];

// Create the context
const CubeContext = createContext<{
    rubiksCubeMatrix: RubiksCubeState;
    rubiksCube3D: Cube3D;
    setRubiksCube: (updatedCube: RubiksCubeState) => void;
    setRubiksCube3DOnly: () => void;
} | null>(null);

// Provider component
export const RubiksCubeProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    // Define default cube state corresponding to a solved configuration
    const [rubiksCubeMatrix, setRubiksCubeState] = useState<RubiksCubeState>({
        front: Array.from({length: 3}, () => Array(3).fill("red")),
        back: Array.from({length: 3}, () => Array(3).fill("orange")),
        left: Array.from({length: 3}, () => Array(3).fill("blue")),
        right: Array.from({length: 3}, () => Array(3).fill("green")),
        up: Array.from({length: 3}, () => Array(3).fill("yellow")),
        down: Array.from({length: 3}, () => Array(3).fill("white")),
    });

    // New state for storing the 27-cube representation
    const [rubiksCube3D, setRubiksCube3D] = useState<Cube3D>(
        Array.from({length: 27}, () => ["G", "B", "Y", "W", "R", "O"]) // Default cube setup
    );

    // Function to update ONLY the 2D Rubik's Cube state and trigger event
    const setRubiksCube = (updatedCube: RubiksCubeState) => {
        setRubiksCubeState(updatedCube);
        window.dispatchEvent(new CustomEvent("cube-update", {detail: updatedCube}));
    };

    // Function to update ONLY the 3D Rubik's Cube state and trigger event
    const setRubiksCube3DOnly = async () => {
        try {
            console.log("Sending request to update 3D cube layout...");
            const result = await sendRequestInput(rubiksCubeMatrix);

            if (result) {
                console.log("Updating rubiksCube3D with new layout:", result);
                setRubiksCube3D(result);
                window.dispatchEvent(new CustomEvent("cube-3d-update", {detail: result}));
            } else {
                console.error("Failed to update 3D cube - received invalid data");
            }
        } catch (error) {
            console.error("Failed to update 3D cube state:", error);
        }
    };


    return (
        // Export states and functions
        <CubeContext.Provider
            value={{
                rubiksCubeMatrix,
                rubiksCube3D,
                setRubiksCube,
                setRubiksCube3DOnly,
            }}
        >
            {children}
        </CubeContext.Provider>
    );
};

// Hook for using the context
export const useRubiksCube = () => {
    const context = useContext(CubeContext);
    if (!context) {
        throw new Error("useRubiksCube must be used within a RubiksCubeProvider");
    }
    return context;
};
