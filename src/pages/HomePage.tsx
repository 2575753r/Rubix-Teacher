import React, { useState } from 'react';
import RubiksCube from '../animated/Cube';
import { RubiksCubeProvider } from '../animated/RubiksCubeContext';
import RubiksCube2D from '../animated/2dCube';

const HomePage = () => {
    const [showMoves, setShowMoves] = useState(false);

    // Define the state for the Rubik's Cube
    const [rubiksCube, setRubiksCube] = useState({
        front: Array(3).fill(Array(3).fill('white')),
        back: Array(3).fill(Array(3).fill('yellow')),
        left: Array(3).fill(Array(3).fill('green')),
        right: Array(3).fill(Array(3).fill('blue')),
        top: Array(3).fill(Array(3).fill('red')),
        bottom: Array(3).fill(Array(3).fill('orange')),
    });

    const handleMatrixUpdate = (updatedCube: typeof rubiksCube) => {
        setRubiksCube(updatedCube);
    };


    const [rubiksCube, setRubiksCube] = useState({
        front: Array(3).fill(Array(3).fill('white')),
        back: Array(3).fill(Array(3).fill('yellow')),
        left: Array(3).fill(Array(3).fill('green')),
        right: Array(3).fill(Array(3).fill('blue')),
        top: Array(3).fill(Array(3).fill('red')),
        bottom: Array(3).fill(Array(3).fill('orange')),
    });


    const handleMatrixUpdate = (updatedCube: typeof rubiksCube) => {
        setRubiksCube(updatedCube);
    };

    const handleBeginnerMethodSelected = () => {
        setShowMoves(true);
    };

    return (
        <RubiksCubeProvider>


            <div style={styles.container}>
                <h1 style={styles.header}>Rubik's Teacher!</h1>
                <div style={styles.content}>


                    <div style={styles.leftPanel}>
                        <MoveList/>
                    </div>


                    <div style={styles.center}>
                        <RubiksCube />
                    </div>


                    <div style={styles.rightPanel}>
                        <AlgorithmList onBeginnerMethodSelected={handleBeginnerMethodSelected} />
                    </div>
                </div>

            </div>


                <div style={styles.bottomRight}>
                    <RubiksCube2D />
                </div>
            </div>
        </RubiksCubeProvider>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column' as const,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '20px',
    },
    content: {
        flex: 1,
        display: 'flex',
        padding: '0 20px',
        position: 'relative' as const,
    },
    leftPanel: {
        flex: '0 0 250px',
        maxHeight: '400px',
        borderRadius: '5px',
        padding: '10px',

        // overflowY: 'auto' as 'auto',

        boxSizing: 'border-box' as 'border-box',
        marginRight: '20px',
        backgroundColor: 'white',
    },
    center: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        position: 'relative' as const,
        backgroundColor: 'white',
    },
    rightPanel: {
        flex: '0 0 250px',
        maxHeight: '400px',
        borderRadius: '5px',
        padding: '10px',
        overflowY: 'auto' as 'auto',
        boxSizing: 'border-box' as 'border-box',
        marginLeft: '20px',
        backgroundColor: 'white',
    },
    bottomRight: {
        position: 'absolute' as const,
        bottom: '10px',
        right: '10px',
        width: '200px',
        height: '200px',

        padding: '10px',
        backgroundColor: 'white',

    },
};

export default HomePage;
