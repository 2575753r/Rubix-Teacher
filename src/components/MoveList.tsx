import React from 'react';

interface MoveListProps {
    shouldShowMoves: boolean; // Explicit type for the prop
}

const MoveList: React.FC<MoveListProps> = ({ shouldShowMoves }) => {
    const moves =
        [
            "D", "F'", "D'", // White-green edge
            "R", "U", "R'", // White-orange edge
            "L'", "D'", "L", // White-blue edge
            "F", "U'", "F'", // White-red edge
            "R'", "D'", "R", "D", // White-green-orange corner
            "F", "D'", "F'", // White-green-red corner
            "L", "D'", "L'", "D", // White-blue-orange corner
            "R'", "D", "R", // White-blue-red corner
            "U", "L'", "U'", "L", "U'", "F'", "U", "F", // Orange-green edge
            "U'", "R", "U", "R'", "U", "F", "U'", "F'", // Orange-blue edge
            "U'", "R", "U", "R'", "U", "F", "U'", "F'", // Red-blue edge
            "U", "L'", "U'", "L", "U'", "F'", "U", "F", // Red-green edge
            "F", "R", "U", "R'", "U'", "F'", // Yellow L-shape
            "F", "R", "U", "R'", "U'", "F'", // Yellow line
            "R", "U", "R'", "U", "R", "U2", "R'", // Align yellow edges
            "U", "R", "U'", "L'", "U", "R'", "U'", "L", // Position yellow corners
            "R'", "D'", "R", "D", // Orient yellow corner (repeat as needed)
            "R2", "U", "R", "U", "R'", "U'", "R'", "U'", "R'", "U", "R'" // Final layer edges
        ];



    return (
        <div className="scrollable-box">
            <h3>List of Moves</h3>
            {shouldShowMoves && (
                <ul>
                    {moves.map((move, index) => (
                        <li key={index}>{move}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MoveList;