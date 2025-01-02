import React, { createContext, useContext, useState, ReactNode } from 'react';

// This is a hook. Should be in its own directory
// Define the shape of the Rubik's Cube state
export interface RubiksCubeState {
    front: string[][];
    back: string[][];
    left: string[][];
    right: string[][];
    up: string[][];
    down: string[][];
}

// Create the context
const RubiksCubeContext = createContext<{
    rubiksCubeMatrix: RubiksCubeState;
    setRubiksCube: (updatedCube: RubiksCubeState) => void;
} | null>(null);

// Provider component
export const RubiksCubeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [rubiksCubeMatrix, setRubiksCube] = useState<RubiksCubeState>({
        front: Array(3).fill(Array(3).fill('red')),
        back: Array(3).fill(Array(3).fill('orange')),
        left: Array(3).fill(Array(3).fill('blue')),
        right: Array(3).fill(Array(3).fill('green')),
        up: Array(3).fill(Array(3).fill('yellow')),
        down: Array(3).fill(Array(3).fill('white')),
    });

    return (
        <RubiksCubeContext.Provider value={{ rubiksCubeMatrix, setRubiksCube }}>
            {children}
        </RubiksCubeContext.Provider>
    );
};

// Hook for using the context
export const useRubiksCube = () => {
    const context = useContext(RubiksCubeContext);
    if (!context) {
        throw new Error('useRubiksCube must be used within a RubiksCubeProvider');
    }
    return context;
};
