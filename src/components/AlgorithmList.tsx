import React, { useState } from 'react';
import { RubiksCubeState, useRubiksCube } from '../animated/RubiksCubeContext';
import { sendRequest } from "../Api";
import { MoveContextState, useMoveContext } from "../hooks/MoveContext";

const AlgorithmList: React.FC = () => {
    const [showDetails, setShowDetails] = useState(true);
    const [flashBlue, setFlashBlue] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const { rubiksCubeMatrix } = useRubiksCube();
    const { setMoves } = useMoveContext();

    async function beginnerFunction() {
        setMoves({ Moves: [], MoveIndex: 0 });
        const result = await sendRequest(rubiksCubeMatrix, "Beginner");
        if (result) {
            setMoves({ Moves: ["Start", ...result], MoveIndex: 0 });
        }
    }

    const pages = [
        {
            title: "Welcome",
            content: [
                "Welcome to the Beginner's Guide to Solving the Rubik's Cube!",
                "In this interactive tutorial, you'll learn how to solve the cube using the Layer-by-Layer (LBL) method, a popular and beginner-friendly approach.",
                "We’ll guide you through each stage with simple instructions and visual support.",
                "Here's the sequence you’ll follow:",
                "1. Make the daisy",
                "2. Solve the white cross",
                "3. Insert white corners",
                "4. Solve the middle layer",
                "5. Create the yellow cross",
                "6. Position the yellow edges and corners",
                "7. Orient yellow corners to finish",
                "Let’s begin!"
            ]
        },
        {
            title: "First Layer: Make the Daisy",
            content: [
                "The first step is to form a daisy on the top face of the cube (usually the yellow face).",
                "This pattern consists of four white edge pieces surrounding the yellow center tile, resembling a flower.",
                "Steps:",
                "1. Locate white edge pieces anywhere on the cube. These pieces have a white tile and another colored tile.",
                "2. Use turns to bring each white edge next to the yellow center on the top face.",
                "3. Avoid moving corner pieces or disrupting white edges you've already placed.",
                "4. If a piece is flipped or misplaced, reposition it and try again.",
                "The goal is a complete daisy: yellow center with white edges around it."
            ]
        },
        {
            title: "First Layer: Solve the White Cross",
            content: [
                "Now that the daisy is complete, you’ll convert it into a white cross on the bottom face (white side).",
                "Each white edge from the daisy must be moved to the bottom, aligning its non-white color with the correct center tile on the side.",
                "Steps:",
                "1. Rotate the top layer until the non-white side of a white edge matches the center tile directly beneath it.",
                "2. Once aligned, rotate that face 180 degrees (a double turn) to move the white edge to the bottom.",
                "3. Repeat this process for all four edges around the daisy.",
                "After completing this step, you should see a white cross on the bottom with side colors aligned with their centers."
            ]
        },
        {
            title: "First Layer: Insert White Corners",
            content: [
                "With the white cross in place, the next goal is to solve the rest of the white face by inserting the white corners.",
                "Each corner piece has three colors and must be positioned between the three corresponding center tiles.",
                "Steps:",
                "1. Find a white corner in the top layer—it will include white and two other colors.",
                "2. Rotate the top face so the corner is above its target position in the bottom layer.",
                "3. Apply the algorithm R U R' U' until the corner moves into place.",
                "4. Repeat for each of the four white corners.",
                "The white face should now be complete and the colors along the bottom row of all adjacent faces should match their centers."
            ]
        },
        {
            title: "Second Layer: Insert Middle Edges",
            content: [
                "The second layer of the cube contains four edge pieces (without yellow) that sit between the corners you've already solved.",
                "This step moves these edge pieces into their correct positions using algorithms.",
                "Steps:",
                "1. Locate an edge piece in the top layer that does not contain yellow.",
                "2. Match the front-facing color of the edge with the center tile of that face.",
                "3. Observe whether the edge needs to be inserted to the left or the right:",
                "   - If to the right: use the algorithm U R U' R' U' F' U F",
                "   - If to the left: use the algorithm U' L' U L U F U' F'",
                "4. Execute the appropriate algorithm to move the edge into place.",
                "Repeat until all middle-layer edges are correctly inserted."
            ]
        },
        {
            title: "Third Layer: Make the Yellow Cross",
            content: [
                "Now begin solving the final layer—the yellow face on top. The first task here is to create a yellow cross by flipping yellow edge tiles to face upward.",
                "This step is about orientation only, not positioning the pieces.",
                "Steps:",
                "1. Examine the top face. You’ll see one of the following:",
                "   - A single yellow center (dot)",
                "   - An L-shaped pattern (two yellow edges forming a corner)",
                "   - A line (two yellow edges in a straight row)",
                "2. Hold the cube so the pattern is in the correct orientation:",
                "   - For the L-shape, place it in the top-left corner of the face",
                "   - For the line, position it horizontally",
                "3. Use the algorithm: F R U R' U' F'",
                "4. Repeat the algorithm until you have a full yellow cross (four yellow edge tiles facing up)."
            ],

        },
        {
            title: "Third Layer: Position Yellow Edges",
            content: [
                "Although the yellow cross is now on the top face, the yellow edges may still be in the wrong positions.",
                "The goal here is to rotate the edge pieces around so they match the color of the center tiles on the adjacent sides.",
                "Steps:",
                "1. Look at each yellow edge and check whether its side color matches the center tile it touches.",
                "2. If one or two edges are already correct, hold the cube so the incorrect ones are at the back and left.",
                "3. Apply the algorithm: U R U' L' U R' U' L",
                "4. Repeat the algorithm until all four yellow edge pieces are in the correct positions.",
                "At the end of this step, the yellow edges will still face upward but now correctly match the side center colors."
            ],
            image: "// Image: Yellow cross shown with aligned and misaligned edge positions."
        },
        {
            title: "Third Layer: Position Yellow Corners",
            content: [
                "Now that the edges are in place, the next task is to position the yellow corner pieces—getting them to the correct location, regardless of orientation.",
                "A correctly placed corner has the right three colors to match the three adjacent center tiles.",
                "Steps:",
                "1. Inspect each corner on the top layer to find one that is already in the correct location (even if twisted).",
                "2. Hold the cube so this correct corner is at the front-right of the top layer.",
                "3. Apply the algorithm: U R U' L' U R' U' L",
                "4. After applying, check if more corners are now in the correct locations.",
                "5. Repeat as needed until all four corners are positioned correctly."
            ]
        },
        {
            title: "Third Layer: Orient Yellow Corners",
            content: [
                "The final step is to rotate the yellow corners so the yellow stickers are facing upward, completing the yellow face.",
                "Steps:",
                "1. Hold the cube so an incorrectly oriented corner is at the front-right of the top layer.",
                "2. Use the algorithm: R' D' R D repeatedly until the corner is oriented correctly (yellow on top).",
                "3. Turn only the top face (U) to bring the next unsolved corner into the front-right position.",
                "4. Repeat for all four corners without turning the whole cube.",
                "Once all corners are oriented, the cube should be fully solved."
            ]
        },
]

    const toggleDetails = () => {
        setFlashBlue(true);
        setTimeout(() => setFlashBlue(false), 300);
    };

    const nextStep = () => {
        setCurrentStep((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
    };

    const previousStep = () => {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    };

    return (
        <div style={styles.container}>
            <div
                onClick={() => {
                    beginnerFunction();
                    toggleDetails();
                }}
                style={{
                    ...styles.ticket,
                    backgroundColor: flashBlue ? '#007BFF' : 'white',
                    color: flashBlue ? 'white' : 'black',
                    transition: 'background-color 0.3s ease-in-out',
                }}
            >
                <span>Solve Cube</span>
            </div>

            {showDetails && (
                <div style={styles.popup}>
                    <h2>{pages[currentStep].title}</h2>
                    {pages[currentStep].content.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                    <img
                        alt={pages[currentStep].title}
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            height: 'auto',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    />
                    <div style={styles.navigation}>
                        <button
                            onClick={previousStep}
                            style={{
                                ...styles.button,
                                visibility: currentStep === 0 ? 'hidden' : 'visible',
                            }}
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextStep}
                            style={{
                                ...styles.button,
                                visibility: currentStep === pages.length - 1 ? 'hidden' : 'visible',
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '10px',
        margin: '5px 0',
    },
    ticket: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    popup: {
        position: 'fixed',
        top: '38%',
        right: '10px',
        transform: 'translateY(-50%)',
        width: '20vw',
        maxWidth: '500px',
        maxHeight: '45vh',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflowY: 'auto',
        zIndex: 3000,
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default AlgorithmList;
