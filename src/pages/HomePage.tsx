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
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        display: 'flex',
        flexDirection: 'column' as const, // Header on top, content below
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '20px',
    },
    content: {
        flex: 1, // Fills remaining space below the header
        display: 'flex', // Horizontal layout for content
        padding: '0 20px', // Adds horizontal padding to the entire content area
        position: 'relative' as const, // Allows positioning of the bottom-right corner element
    },
    center: {
        flex: 1, // Fills the remaining horizontal space
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Stretch to full height of content
        overflow: 'hidden', // Prevent content overflow
        position: 'relative' as const,
    }
};

export default HomePage;
