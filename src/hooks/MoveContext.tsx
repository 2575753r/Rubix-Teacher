import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    scrambleCube: () => void; // Add scrambleCube function
} | null>(null);

// List of possible moves (clockwise only for simplicity)
const possibleMoves = ['F', 'U',  'L', 'R'];

export const MoveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [Moves, setMoves] = useState<MoveContextState>({ Moves: [], MoveIndex: 0 });

    // Function to update MoveIndex
    const updateMoveIndex = (newIndex: number) => {
        setMoves((prevState) => ({
            ...prevState,
            MoveIndex: newIndex,
        }));
    };

    // Globally indicate a move change
    const triggerMove = (move: string) => {
        const event = new CustomEvent('cube-move', { detail: { move } });
        window.dispatchEvent(event);
    };

    // Trigger a move whenever the MoveIndex changes
    useEffect(() => {
        if (Moves.Moves.length > 0) {
            triggerMove(Moves.Moves[Moves.MoveIndex]);
        }
    }, [Moves.MoveIndex]);

    // Function to generate a scramble without altering the move list
    const scrambleCube = () => {
        const scrambleSequence: string[] = [];
        for (let i = 0; i < 20; i++) {
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            scrambleSequence.push(randomMove);
        }

        // Trigger each move sequentially with a slight delay for animation
        scrambleSequence.forEach((move, index) => {
            setTimeout(() => {
                triggerMove(move); // Trigger the move without modifying Moves state
            }, index * 500); // Delay of 500ms between moves
        });
    };

    return (
        <MoveContext.Provider value={{ Moves, updateMoveIndex, setMoves, scrambleCube }}>
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
