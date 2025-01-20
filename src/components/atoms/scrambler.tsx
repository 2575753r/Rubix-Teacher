import React from 'react';

import {useMoveContext} from "../../hooks/MoveContext";

const ScrambleButton: React.FC = () => {
    const { scrambleCube } = useMoveContext();

    const handleClick = () => {
        scrambleCube(); // Trigger scramble effect
    };

    const styles = {
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: '2px solid black',
            transition: 'background-color 0.2s, color 0.2s',
            backgroundColor: 'white',
            color: 'black',
        } as React.CSSProperties,
    };

    return (
        <button style={styles.button} onClick={handleClick}>
            Scramble
        </button>
    );
};

export default ScrambleButton;
