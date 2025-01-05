import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define MoveContextState with Moves defaulting to an empty array
export interface MoveContextState {
    Moves: string[];
    MoveIndex: number;
}

// Context definition
const MoveContext = createContext<{
    Moves: MoveContextState;
    updateMoveIndex: (newIndex: number) => void;
    setMoves: (updatedMoves: MoveContextState) => void;
} | null>(null);

// Provider component
export const MoveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [Moves, setMoves] = useState<MoveContextState>({ Moves: [] ,MoveIndex: 0});

    // Function to update MoveIndex
    const updateMoveIndex = (newIndex: number) => {
        setMoves((prevState) => ({
            ...prevState,
            MoveIndex: newIndex,
        }));
    };

    return (
        <MoveContext.Provider value={{ Moves, updateMoveIndex, setMoves }}>
            {children}
        </MoveContext.Provider>
    );
};

// Hook for using the context
export const useMoveContext = () => {
    const context = useContext(MoveContext);
    if (!context) {
        throw new Error('useMoveContext must be used within a MoveProvider');
    }
    return context;
};
