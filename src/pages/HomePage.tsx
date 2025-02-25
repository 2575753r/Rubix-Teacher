import React, { useState, useEffect } from 'react';
import RubiksCube from '../animated/Cube';
import { RubiksCubeProvider } from '../animated/RubiksCubeContext';

import ScrambleButton from "../components/atoms/scrambler";
import CubeEnter from "../components/CubeEnter";
import InfoPopup from "../components/Information"; // ✅ Import InfoPopup
import InfoPopupProvider from '../hooks/InfoPopupContext';
import RubiksCube2D from "../animated/2dCube";
import {MoveProvider} from "../hooks/MoveContext";
import MoveList from "../components/MoveList";
import AlgorithmList from "../components/AlgorithmList";

const logo = require('./logo.png');

const HomePage = () => {
    const [isCubeEnterOpen, setIsCubeEnterOpen] = useState(false);

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [pressCount, setPressCount] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isTimerRunning) {
            interval = setInterval(() => setTimer((prev) => prev + 10), 10);
        } else if (!isTimerRunning && timer !== 0) {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerRunning]);

    useEffect(() => {
        const handleSpacebarPress = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                setPressCount((prev) => (prev + 1) % 3);
                if (pressCount === 0) {
                    setTimer(0);
                    setIsTimerRunning(true);
                } else if (pressCount === 1) {
                    setIsTimerRunning(false);
                } else if (pressCount === 2) {
                    setTimer(0);
                    setIsTimerRunning(false);
                }
            }
        };

        window.addEventListener('keydown', handleSpacebarPress);
        return () => {
            window.removeEventListener('keydown', handleSpacebarPress);
        };
    }, [pressCount]);

    return (
        <InfoPopupProvider>
        <RubiksCubeProvider>
            <MoveProvider>

                <div style={styles.container}>
                    <div style={styles.bottomText}>
                        <p>Controls: Use lower case to make a clockwise move and caps for counterclockwise </p>
                        <p>Example: <strong>r</strong> (Clockwise) | <strong>R</strong> (Counterclockwise)</p>
                        <p>Y performs an entire cube clockwise rotation</p>
                    </div>

                    <img src={logo} alt="Logo" style={styles.logo}/>

                    <div style={styles.content}>
                        <div style={styles.leftPanel}>

                            <MoveList/>
                        </div>
                        <div style={styles.center}>
                            <RubiksCube/>

                        </div>

                        <div style={styles.rightPanel}>

                            <AlgorithmList/>
                        </div>
                    </div>

                    <div style={styles.timerContainer}>
                        <button style={styles.timerButton}>Timer</button>
                        <div style={styles.timerDisplay}>
                            {Math.floor(timer / 60000)}:{Math.floor((timer % 60000) / 1000).toString().padStart(2, '0')}.
                            {(timer % 1000).toString().padStart(3, '0')}
                        </div>
                    </div>

                    <div style={styles.bottomContainer}>

                        <div style={styles.buttonsContainer}>

                            <ScrambleButton/>
                            <div><InfoPopup contentKey={""}></InfoPopup></div>
                        </div>

                        <button
                            style={styles.longButton}
                            onClick={() => setIsCubeEnterOpen(true)}

                        >

                            Enter your cube here!
                        </button>

                        <div style={styles.cube2DContainer}>

                            <RubiksCube2D/>

                        </div>

                    </div>

                    {/* ✅ Info Buttons Positioned Absolutely Over Components */}

                    {/* Render CubeEnter if open */}
                    {isCubeEnterOpen && (
                        <CubeEnter onClose={() => setIsCubeEnterOpen(false)}/>
                    )}
                </div>
            </MoveProvider>
        </RubiksCubeProvider>
        </InfoPopupProvider>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'lightblue',
        position: 'relative',
    },
    logo: {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: 'auto',
        zIndex: 10,
    },
    content: {
        flex: 1,
        display: 'flex',
        padding: '0 20px',
        position: 'relative',
        backgroundColor: 'lightblue',
    },
    leftPanel: {
        flex: '0 0 250px',
        maxHeight: '500px',
        borderRadius: '5px',
        padding: '10px',
        boxSizing: 'border-box',
        marginRight: '20px',
        backgroundColor: 'lightblue',
    },
    center: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'lightblue',
    },
    cubeText: {
        marginTop: '10px',  // Space between the cube and the text
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        border: '2px solid black',
        width: 'fit-content',
    },

    rightPanel: {
        flex: '0 0 250px',
        maxHeight: '400px',
        borderRadius: '20px',
        padding: '10px',
        overflowY: 'auto',
        boxSizing: 'border-box',
        marginLeft: '20px',
        backgroundColor: 'lightblue',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        gap: '5px',
    },
    buttonsContainer: {
        marginBottom: '0px',
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: '2px solid black',
        transition: 'background-color 0.2s, color 0.2s',
    },
    cube2DContainer: {
        width: '200px',
        height: '150px',
    },
    longButton: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: '2px solid black',
        width: '200px',
        textAlign: 'center',
    },
    bottomText: {
        position: 'absolute',
        bottom: '5px',  // Adjusted to be closer to the bottom edge
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '14px',  // Smaller text for compact display
        fontWeight: 'normal',
        color: '#222',  // Slightly darker text for better contrast
        textAlign: 'center',
        backgroundColor: '#f9f9f9',  // Softer background color
        padding: '5px 10px',  // Slightly reduced padding
        borderRadius: '6px',
        border: '1px solid #ccc',  // Lighter, thinner border
        lineHeight: '16px',  // Compact but readable
        zIndex: 1000,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Soft shadow for a modern look
    },



    timerContainer: {
        position: 'absolute',
        bottom: '10px',
        left: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
    },
    timerButton: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: '2px solid black',
        backgroundColor: 'white',
        color: 'black',
    },
    timerDisplay: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        border: '2px solid black',
    },
    infoButtons: {
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 2000, // ✅ Ensures Info Buttons are on Top
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
};

export default HomePage;
