import React from 'react';
import Ticket from './atoms/Ticket';

interface AlgorithmListProps {
    onBeginnerMethodSelected: () => void; // Callback for toggling moves
}

const AlgorithmList: React.FC<AlgorithmListProps> = ({ onBeginnerMethodSelected }) => {
    return (
        <div className="scrollable-box">
            <h3>Choice of Algorithms</h3>
            <Ticket
                name="Beginner Method"
                onClick={onBeginnerMethodSelected} // Pass the callback
            />
            <Ticket
                name="CFOP Method (Fridrich Method) Medium"
                onClick={onBeginnerMethodSelected} // Pass the callback
            />
            <Ticket
                name="ZZ Method Advanced"
                onClick={onBeginnerMethodSelected} // Pass the callback
            />
        </div>
    );
};

export default AlgorithmList;
