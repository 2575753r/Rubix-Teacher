import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai'; // Import the info icon
const whiteCross = require('./white-cross.png');
const whiteCorners = require('./white-corners.png');
const layerTwo = require('./layer-two.png');
const yellowCross = require('./solve-yellow-cross.png');
const yellowEdges = require('./yellow-edges.png');
interface TicketProps {
    name: string;
    onClick?: () => void;
}

const Ticket: React.FC<TicketProps> = ({ name, onClick }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // State to track the current page

    const handleClick = () => {
        setIsSelected((prev) => !prev);
        if (onClick) {
            onClick();
        }
    };

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    const nextPage = () => {
        setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
    };

    const previousPage = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    };

    // Beginner's method explanation content
    const pages = [
        {
            title: "Step 1: Solve the White Cross",
            content: `
        The white face will be treated as the bottom face. Your goal is to create a white cross on the bottom face while ensuring the other colors of the edge pieces match the center pieces of the side faces.

        Steps:
        1. Locate the white edge pieces (pieces with white on one face).
        2. Align the non-white color of each edge piece with the matching center piece on the side faces.
        3. Rotate the side face 180° to move the white sticker to the bottom face.
        4. Repeat for all four edge pieces.

        When finished, the bottom face will have a white cross, and the side colors will align with their centers.
    `,
            image: whiteCross, // Replace with the actual path to your white cross image
        },


        {
            title: "Step 2: Solve the White Corners",
            content: `
        After completing the white cross, the next step is to position the white corner pieces to complete the white face. Each corner piece has three colors: white and two others.

        Steps:
        1. Locate a white corner piece in the top layer.
        2. Align the corner piece above its correct slot on the bottom face by matching the two non-white colors with their respective center pieces.
        3. Use this algorithm repeatedly to move the piece into place: R U R' U'.
        4. Repeat for all four corners.

        When finished, the entire white face will be completed, and the bottom layer will align with the centers of the side faces.
    `,
            image: whiteCorners,
        },
        {
            title: "Step 3: Solve the Middle Layer Edges",
            content: `
        After completing the white face, the next step is to position the edge pieces in the middle layer. Each edge piece has two colors and must be moved into the correct slot between the side centers.

        Steps:
        1. Locate an edge piece in the top layer that does not contain yellow.
        2. Align the edge's front color with the matching center piece on the side face.
        3. Determine if the edge needs to go left or right and use the appropriate algorithm:
           - For left: U' L' U L U F U' F'
           - For right: U R U' R' U' F' U F
        4. Repeat until all four edge pieces are correctly positioned.

        When finished, the middle layer will be solved, with all edges between side centers.
    `,
            image:
                layerTwo, // Replace with the actual path to your middle layer image

        },


        {
            title: "Step 4: Solve the Yellow Cross",
            content: `
        With the bottom two layers completed, the goal is to form a yellow cross on the top face. The yellow edge pieces need to be oriented correctly.

        Steps:
        1. Identify the current yellow pattern on the top face:
           - If there's no yellow edge: Perform the algorithm below.
           - If there’s an L-shape, position it at the back-left corner.
           - If there’s a line, align it horizontally.
        2. Use this algorithm: F R U R' U' F'
        3. Repeat the algorithm until a yellow cross appears.

        The yellow cross will form without affecting the bottom two layers.
    `,
            image:
                yellowCross, // Replace with the actual path to your yellow cross image

        },


        {
            title: "Step 5: Position the Yellow Edges",
            content: `
        The final step is to position the yellow edge pieces correctly to complete the cube. The goal is to move the edges into their correct positions without affecting the rest of the cube.

        Steps:
        1. Look for two adjacent yellow edges that are already correctly positioned. If found, hold the cube so that these edges are at the back and right.
        2. If no edges are correctly positioned, perform the algorithm below once and reassess.
        3. Use this algorithm to cycle the edges: F2 U L R' F2 L' R U F2.
        4. Repeat until all edges are in their correct positions.

        When completed, the yellow face will be solved, and the cube will be complete!
    `,
            image: yellowEdges
        },
        {
            title: "Step 6: Orient the Yellow Corners",
            content: "Orient the yellow corners using specific algorithms.",
            // image: "/images/orient-corners.png",
        },
        {
            title: "Step 7: Position the Yellow Edges",
            content: "Move the yellow edge pieces to their final positions.",
            // image: "/images/yellow-edges.png",
        },
    ];

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
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label="Info"
                >
                    <AiOutlineInfoCircle
                        size={20} // Adjust size as needed
                        color={isSelected ? 'white' : 'blue'}
                    />
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
                            maxWidth: '600px',
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
                        <h2>{pages[currentPage].title}</h2>
                        <p>{pages[currentPage].content}</p>
                        <img
                            src={pages[currentPage].image}
                            alt={pages[currentPage].title}
                            style={{
                                width: '150px', // Set the image width explicitly to make it smaller
                                height: 'auto', // Maintain the aspect ratio
                                borderRadius: '10px', // Add rounded corners
                                margin: '10px auto', // Add vertical spacing and center the image
                                display: 'block', // Ensure the image is centered within its container
                            }}
                        />

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '10px',
                            }}
                        >
                            <button
                                onClick={previousPage}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007BFF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    visibility: currentPage === 0 ? 'hidden' : 'visible',
                                }}
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextPage}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007BFF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    visibility: currentPage === pages.length - 1 ? 'hidden' : 'visible',
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ticket;
