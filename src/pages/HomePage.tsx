import React, { useState, useEffect } from 'react';
import RubiksCube from '../animated/Cube';
import { RubiksCubeProvider } from '../animated/RubiksCubeContext';
import RubiksCube2D from '../animated/2dCube';
import AlgorithmList from "../components/AlgorithmList";
import MoveList from "../components/MoveList";
import { MoveProvider } from "../hooks/MoveContext";
import ScrambleButton from "../components/atoms/scrambler";
import CubeEnter from "../components/CubeEnter"; // Import the CubeEnter component

const logo = require('./logo.png'); // Use require to load the logo

const HomePage = () => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [isCubeEnterOpen, setIsCubeEnterOpen] = useState(false); // State to handle CubeEnter visibility

    // Timer State
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [pressCount, setPressCount] = useState(0); // Track number of spacebar presses

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 10);
            }, 10);
        } else if (!isTimerRunning && timer !== 0) {
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerRunning]);

    // Handle spacebar press to start/stop/reset timer
    useEffect(() => {
        const handleSpacebarPress = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                setPressCount((prev) => (prev + 1) % 3);

                if (pressCount === 0) {
                    // Reset and start timer
                    setTimer(0);
                    setIsTimerRunning(true);
                } else if (pressCount === 1) {
                    // Stop timer
                    setIsTimerRunning(false);
                } else if (pressCount === 2) {
                    // Reset timer
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

    // Button click handler
    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
        setTimeout(() => setSelectedButton(null), 200);
    };

    return (
        <RubiksCubeProvider>
            <MoveProvider>
                <div style={styles.container}>

                    <img src={logo} alt="Logo" style={styles.logo} />

                    <div style={styles.content}>
                        <div style={styles.leftPanel}>
                            <MoveList />
                        </div>
                        <div style={styles.center}>
                            <RubiksCube />
                        </div>
                        <div style={styles.rightPanel}>
                            <AlgorithmList />
                            <p>Controls: f, u, d, l, r, b controls each face rotating clockwise</p>
                            <p>F, U, D, L, R, B controls each face counterclockwise</p>
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
                            <button style={styles.button}>Info</button>

                        </div>
                        <button
                            style={styles.longButton}
                            onClick={() => setIsCubeEnterOpen(true)} // Open the CubeEnter popup
                        >
                            Enter your cube here!
                        </button>
                        <div style={styles.cube2DContainer}>
                            <RubiksCube2D/>
                        </div>

                    </div>

                    {/* Render the CubeEnter component if open */}
                    {isCubeEnterOpen && (
                        <CubeEnter onClose={() => setIsCubeEnterOpen(false)}/> // Pass onClose to close the popup
                    )}
                </div>
            </MoveProvider>
        </RubiksCubeProvider>
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
};

export default HomePage;
