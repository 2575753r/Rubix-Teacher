import React, { useState } from 'react';

interface TicketProps {
    name: string;
    onClick?: () => void; // Optional function to handle click
}

const Ticket: React.FC<TicketProps> = ({ name, onClick }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => {
        setIsSelected((prev) => !prev);
        if (onClick) {
            onClick(); // Trigger the callback if provided
        }
    };

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    return (
        <div>
            {/* Main Ticket */}
            <div
                onClick={handleClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px',
                    margin: '5px 0',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: isSelected ? 'blue' : 'white',
                    color: isSelected ? 'white' : 'black',
                    cursor: 'pointer',
                }}
            >
                <span>{name}</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the ticket's main click
                        togglePopup(); // Show the popup
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: isSelected ? 'white' : 'blue',
                        cursor: 'pointer',
                    }}
                >
                    Info
                </button>
            </div>

            {/* Popup */}
            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            position: 'relative',
                            maxWidth: '500px',
                            textAlign: 'left',
                            lineHeight: '1.5',
                        }}
                    >
                        <button
                            onClick={togglePopup}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                fontSize: '18px',
                                cursor: 'pointer',
                            }}
                        >
                            &times;
                        </button>
                        <h2>Beginner's Method</h2>
                        <ol>
                            <li>Form the white cross by aligning white edge pieces with the white center.</li>
                            <li>
                                Place the white corners in their correct positions using <code>R' D' R D</code> until they
                                match.
                            </li>
                            <li>Complete the middle layer edges using the algorithms:</li>
                            <ul>
                                <li>
                                    For moving an edge left: <code>U' L' U L U F U' F'</code>
                                </li>
                                <li>
                                    For moving an edge right: <code>U R U' R' U' F' U F</code>
                                </li>
                            </ul>
                            <li>Form the yellow cross on the top face using <code>F R U R' U' F'</code>.</li>
                            <li>Position the yellow edges correctly using <code>R U R' U R U2 R'</code>.</li>
                            <li>
                                Position and orient the yellow corners using <code>U R U' L' U R' U' L</code> or similar
                                algorithms.
                            </li>
                            <li>Finish solving the cube by aligning the last layer edges and corners.</li>
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ticket;
