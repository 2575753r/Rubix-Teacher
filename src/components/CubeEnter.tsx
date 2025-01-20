import React, { useState } from 'react';
import { useRubiksCube } from '../animated/RubiksCubeContext';

interface CubeEnterProps {
    onClose: () => void;
}

const CubeEnter: React.FC<CubeEnterProps> = ({ onClose }) => {
    const { setRubiksCube } = useRubiksCube();
    const [cubeString, setCubeString] = useState('');

    const handleApply = () => {
        if (cubeString.length !== 54) {
            alert('Input must be exactly 54 characters.');
            return;
        }

        const updatedCube = {
            up: Array.from({ length: 3 }, (_, rowIndex) =>
                cubeString.slice(rowIndex * 3, rowIndex * 3 + 3).split('')
            ),
            left: Array.from({ length: 3 }, (_, rowIndex) =>
                cubeString.slice(9 + rowIndex * 3, 9 + rowIndex * 3 + 3).split('')
            ),
            front: Array.from({ length: 3 }, (_, rowIndex) =>
                cubeString.slice(18 + rowIndex * 3, 18 + rowIndex * 3 + 3).split('')
            ),
            right: Array.from({ length: 3 }, (_, rowIndex) =>
                cubeString.slice(27 + rowIndex * 3, 27 + rowIndex * 3 + 3).split('')
            ),
            back: Array.from({ length: 3 }, (_, rowIndex) =>
                cubeString.slice(36 + rowIndex * 3, 36 + rowIndex * 3 + 3).split('')
            ),
            down: Array.from({ length: 3 }, (_, rowIndex) =>
                cubeString.slice(45 + rowIndex * 3, 45 + rowIndex * 3 + 3).split('')
            ),
        };

        setRubiksCube(updatedCube);
        onClose(); // Close the popup after applying
    };


    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2>Enter Cube Configuration</h2>
                <textarea
                    style={styles.textarea}
                    value={cubeString}
                    onChange={(e) => setCubeString(e.target.value)}
                    placeholder="Enter 54 characters representing the cube..."
                />
                <div style={styles.buttons}>
                    <button style={styles.button} onClick={handleApply}>
                        Apply
                    </button>
                    <button style={styles.button} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popup: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    textarea: {
        width: '100%',
        height: '100px',
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: '2px solid black',
        backgroundColor: 'white',
        color: 'black',
    },
};

export default CubeEnter;
