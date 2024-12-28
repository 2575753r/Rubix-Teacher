import React, { useState } from 'react';
import RubiksCube from '../animated/Cube';

const HomePage = () => {


    return (

            <div style={styles.container}>
                <h1 style={styles.header}>Rubik's Teacher!</h1>
                <div style={styles.content}>


                    <div style={styles.center}>
                        <RubiksCube />
                    </div>

                </div>
            </div>

    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column' as const,
        fontFamily: 'Arial, sans-serif',
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
    center: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        position: 'relative' as const,
    }
};

export default HomePage;
