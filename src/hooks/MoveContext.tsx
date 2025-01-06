import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';

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

    // todo reverse backwards movements
    // todo ensure first move is the first index
    useEffect(() =>{
        triggerMove(Moves.Moves[Moves.MoveIndex])
    }, [Moves.MoveIndex])

    // Globally indicate a move change
    const triggerMove = (move: string) => {
        const event = new CustomEvent('cube-move', { detail: { move } });
        window.dispatchEvent(event);
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
