import React, { useState } from 'react';

interface TicketProps {
    name: string;
    onClick?: () => void;
}

const Ticket: React.FC<TicketProps> = ({ name, onClick }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => {
        setIsSelected((prev) => !prev);
        if (onClick) {
            onClick();
        }
    };

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    return (
        <div>

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
                        e.stopPropagation();
                        togglePopup();
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

                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ticket;
