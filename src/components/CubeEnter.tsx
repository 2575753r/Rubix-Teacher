import React, { useState } from 'react';
import { useRubiksCube } from '../animated/RubiksCubeContext';
import InfoButton from "./Information"; // Import the InfoButton component

interface CubeEnterProps {
    onClose: () => void;
}

const CubeEnter: React.FC<CubeEnterProps> = ({ onClose }) => {
    const { setRubiksCube, setRubiksCube3DOnly } = useRubiksCube();
    const [cubeString, setCubeString] = useState('');

    const handleApply = () => {
        if (cubeString.length !== 54) {
            alert(`Input must be exactly 54 characters. It is currently ${cubeString.length} characters.\n\nCurrent input:\n${cubeString}`);
            return;
        }

        console.log("Updating cube...");

        // Define a mapping of single-character codes to full color names
        const colorMap: { [key: string]: string } = {
            'y': 'yellow',
            'r': 'red',
            'g': 'green',
            'b': 'blue',
            'o': 'orange',
            'w': 'white'
        };

        // Function to convert shorthand colors to full names
        const convertFace = (startIndex: number) =>
            Array.from({ length: 3 }, (_, rowIndex) =>
                cubeString
                    .slice(startIndex + rowIndex * 3, startIndex + rowIndex * 3 + 3)
                    .split('')
                    .map(char => colorMap[char] || char)
            );

        // Construct the updated cube with full color names
        const updatedCube = {
            up: convertFace(0),
            left: convertFace(9),
            front: convertFace(18),
            right: convertFace(27),
            back: convertFace(36),
            down: convertFace(45),
        };

        console.log("New Cube State:", updatedCube);

        setRubiksCube(updatedCube);
        setRubiksCube3DOnly();
        onClose();
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                {/* ℹ️ Info Button - Appears in Top Right */}
                <div style={styles.infoButtonWrapper}>
                    <InfoButton contentKey="cubeEnter" />
                </div>

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
        position: 'relative',  // ✅ Ensures Info Button stays inside the popup
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    infoButtonWrapper: {
        position: 'absolute',
        top: '10px',  // ✅ Positioned in top-right corner
        right: '10px',
        zIndex: 1001, // ✅ Stays above everything
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
