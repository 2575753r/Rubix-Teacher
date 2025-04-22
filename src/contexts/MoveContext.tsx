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
    scrambleCube: () => void;
} | null>(null);

// List of possible moves
const possibleMoves = ['F', 'R', 'L', 'D', 'U', 'B', "F", "B", "D", "L", "R"];

// Mapping of how moves change with cube rotation
const faceMapping: Record<number, Record<string, string>> = {
    0: {F: "F", B: "B", L: "L", R: "R", U: "U", D: "D"},
    90: {F: "R", B: "L", L: "F", R: "B", U: "U", D: "D"},
    180: {F: "B", B: "F", L: "R", R: "L", U: "U", D: "D"},
    270: {F: "L", B: "R", L: "B", R: "F", U: "U", D: "D"},
};

// Function to reverse a move
const reverseMove = (move: string): string => {
    if (move.includes("2")) return move; // Double moves stay the same
    if (move.includes("'")) return move.replace("'", ""); // "R'" → "R"
    return move + "'"; // "R" → "R'"
};

export const MoveProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [Moves, setMoves] = useState<MoveContextState>({Moves: [], MoveIndex: 0});
    const [cubeRotation, setCubeRotation] = useState(0);
    const [prevMoveIndex, setPrevMoveIndex] = useState(0);

    // Function to update MoveIndex
    const updateMoveIndex = (newIndex: number) => {
        setPrevMoveIndex(Moves.MoveIndex); // Store the previous index before updating
        setMoves((prevState) => ({
            ...prevState,
            MoveIndex: newIndex,
        }));
    };

    // Globally indicate a move change
    const triggerMove = (move: string) => {
        if (!possibleMoves.includes(move.replace("'", "").replace("2", ""))) return;
        const event = new CustomEvent('cube-move', {detail: {move}});
        window.dispatchEvent(event);
    };

    // Adjust move based on cube rotation
    const adjustMove = (move: string): string => {
        const baseMove = move.replace("'", "").replace("2", "");
        const modifier = move.includes("'") ? "'" : move.includes("2") ? "2" : "";
        return faceMapping[cubeRotation][baseMove] + modifier;
    };

    // Effect to trigger moves based on MoveIndex change
    useEffect(() => {
        if (Moves.Moves.length > 0) {
            if (Moves.MoveIndex > prevMoveIndex) {
                // Moving forward: execute the move at the new index
                const moveToExecute = Moves.Moves[Moves.MoveIndex];

                if (moveToExecute === 'Y') {
                    setCubeRotation((prev) => (prev + 90) % 360);
                    // const event = new CustomEvent('cube-move-Y', );
                    // window.dispatchEvent(event);
                } else {
                    triggerMove(adjustMove(moveToExecute));
                }
            } else if (Moves.MoveIndex < prevMoveIndex) {
                // Moving backward: reverse the move at the previous index
                const moveToReverse = Moves.Moves[prevMoveIndex];

                if (moveToReverse === 'Y') {
                    setCubeRotation((prev) => (prev - 90 + 360) % 360);
                    // const event = new CustomEvent('cube-move-Y-reverse', );
                    // window.dispatchEvent(event);
                } else {
                    triggerMove(adjustMove(reverseMove(moveToReverse)));
                }
            }

            setPrevMoveIndex(Moves.MoveIndex); // Update previous index after executing move
        }
    }, [Moves.MoveIndex]);

    // Function to generate a scramble sequence
    const scrambleCube = () => {
        const scrambleSequence: string[] = [];
        for (let i = 0; i < 20; i++) {
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            scrambleSequence.push(randomMove);
        }

        scrambleSequence.forEach((move, index) => {
            setTimeout(() => {
                triggerMove(adjustMove(move));
            }, index * 500);
        });
    };

    return (
        <MoveContext.Provider value={{Moves, updateMoveIndex, setMoves, scrambleCube}}>
            {children}
        </MoveContext.Provider>
    );
};

export const useMoveContext = () => {
    const context = useContext(MoveContext);
    if (!context) {
        throw new Error('useMoveContext must be used within a MoveProvider');
    }
    return context;
};
