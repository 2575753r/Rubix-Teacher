import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define MoveContextState with Moves defaulting to an empty array
export interface MoveContextState {

    Moves: string[];
}

// Context definition
const MoveContext = createContext<{
    Moves: MoveContextState;
    setMoves: (updatedMoves: MoveContextState) => void;
} | null>(null);

// Provider component
export const MoveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [Moves, setMoves] = useState<MoveContextState>({ Moves: [] });

    return (
        <MoveContext.Provider value={{ Moves, setMoves }}>
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
