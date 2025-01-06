import React, { useState } from 'react';
import RubiksCube from '../animated/Cube';
import { RubiksCubeProvider } from '../animated/RubiksCubeContext';
import RubiksCube2D from '../animated/2dCube';
import AlgorithmList from "../components/AlgorithmList";
import MoveList from "../components/MoveList";
import {MoveProvider} from "../hooks/MoveContext";


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




    return (
        <RubiksCubeProvider>

            <MoveProvider>


            <div style={styles.container}>


                <div style={styles.content}>


                    <div style={styles.leftPanel}>
                        <MoveList/>
                    </div>


                    <div style={styles.center}>
                        <RubiksCube/>
                    </div>


                    <div style={styles.rightPanel}>
                        <AlgorithmList/>
                        <button style={{padding: 20}}> Scramble</button>
                        <button style={{padding: 20}}> Info</button>
                        <p> Contorls: f, u, d, l, r, b controls each face rotating clockwise</p>
                        <p> F, U, D, L, R, B controls each face counterclockwise</p>
                    </div>
                </div>

            </div>


            <div style={styles.bottomRight}>
                <RubiksCube2D/>
            </div>

            </MoveProvider>

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
        backgroundColor: 'lightblue',
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '20px',
        backgroundColor: 'lightblue',
    },
    content: {
        flex: 1,
        display: 'flex',
        padding: '0 20px',
        position: 'relative' as const,
        backgroundColor: 'lightblue',
    },
    leftPanel: {
        flex: '0 0 250px',
        maxHeight: '400px',
        borderRadius: '5px',
        padding: '10px',

        // overflowY: 'auto' as 'auto',

        boxSizing: 'border-box' as 'border-box',
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
        position: 'relative' as const,
        backgroundColor: 'lightblue',
    },
    rightPanel: {
        flex: '0 0 250px',
        maxHeight: '400px',
        borderRadius: '20px',
        padding: '10px',
        overflowY: 'auto' as 'auto',
        boxSizing: 'border-box' as 'border-box',
        marginLeft: '20px',
        backgroundColor: 'lightblue',


    },
    bottomRight: {
        position: 'absolute' as const,
        bottom: '10px',
        right: '10px',
        width: '200px',
        height: '200px',

        padding: '10px',
        backgroundColor: 'lightblue',

    },
};

export default HomePage;
