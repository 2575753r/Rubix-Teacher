import React from 'react';
import Ticket from './atoms/Ticket';

interface AlgorithmListProps {
    onBeginnerMethodSelected: () => void;
}

const AlgorithmList: React.FC<AlgorithmListProps> = ({ onBeginnerMethodSelected }) => {
    return (

        // Temporary
        <div className="scrollable-box">
            <h3>Choice of Algorithms</h3>
            <Ticket
                name="Beginner Method"
                onClick={onBeginnerMethodSelected}
            />
            <Ticket
                name="CFOP Method (Fridrich Method) Medium"
                onClick={onBeginnerMethodSelected}
            />
            <Ticket
                name="ZZ Method Advanced"
                onClick={onBeginnerMethodSelected}
            />
        </div>
    );
};

export default AlgorithmList;
