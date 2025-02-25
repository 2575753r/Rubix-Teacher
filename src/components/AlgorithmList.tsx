import React, {useEffect, useState} from 'react';
import Ticket from './atoms/Ticket';
import {RubiksCubeState, useRubiksCube} from '../animated/RubiksCubeContext';
import { sendRequest, sendRequestInput } from "../Api";
import {MoveContextState, useMoveContext} from "../hooks/MoveContext";


const AlgorithmList: React.FC = () => {
    const [showDetails, setShowDetails] = useState(false); // Toggle for showing/hiding content
    const [flashBlue, setFlashBlue] = useState(false); // State to track the flash effect
    const [currentStep, setCurrentStep] = useState(0); // Tracks the current step displayed
    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();
    const {Moves, setMoves}= useMoveContext()
    const [beginner, setShowBeginner] = useState(false);

    async function beginnerFunction() {
        setMoves({ Moves: [], MoveIndex: 0 });  // ✅ Clear old list before fetching new moves

        const result = await sendRequest(rubiksCubeMatrix, "Beginner");

        if (result) {
            setMoves({ Moves: ["Start", ...result], MoveIndex: 0 });  // ✅ Set new list
        }
    }


    const toggleDetails = () => {
        setShowDetails((prev) => !prev);

        // Trigger blue flash effect
        setFlashBlue(true);
        setTimeout(() => setFlashBlue(false), 300); // Reset flash after 300ms
    };



    const beginnerSteps = [
        {
            title: "Stage 1 - Make a White Cross",
            content: `
                During this step, we aim to make a white cross shape on the down face like so. Don't worry about how you
                accomplish this as we aim to orient it properly in the next couple steps.
            `,
            image: require('../components/atoms/stage1Images/whitecross.png'),
        },
        {
            title: "Stage 1.1 - Make the Daisy",
            content: `
                Next we need to make the daisy. This involves moving the white edges that we placed on the bottom 'white'
                face to the top 'yellow'. To do this simply rotate each face clockwise twice to look like this.
                
            `,
            image: require('../components/atoms/stage1Images/daisy.png'),

        },
        {
            title: "Stage 1.2 - Make White Cross",
            content: `
                We need to move the white edges back to their correct places on the down 'white' face. To do this we
                we turn our daisy in order to align the white edge's colour with the center. Then we perform 2 clockwise
                moves to our face. Be sure to move around the cube doing this for each face until we have a good white cross
                It should look something like this.
                
            `,
            image: require('../components/atoms/stage1Images/whitecrossorientated.png'),

        },
        {
            title: "Stage 1.3 - Complete the White Face",
            content: `
                Now that we have a good looking white cross we need to add the corners to it. We can do this by moving 
                the misaligned corner to the 3rd layer 'layer closest to the top. Then position on side opposite the
                face you wish to place it. Rotate that face clockwise or counterclockwise and move the uo face to place
                the corner correctly before moving it back to the down 'white' face.
                
            `,
            image: require('../components/atoms/stage1Images/WhiteCornersAligned.png'),

        },
        {
            title: "Progressing to the Second Layer",
            content: `
                Now we've completed out first layer of the cube we can progress to the second. To do this we must 
                strictly use our first algorithms! The aim is to move an edge from the 3rd layer and correctly position
                it into the appropriate position on the second layer ->
                
            `,


        },
        {
            title: "2.1 - Swapping Incorrect Edges Out From Second Layer",
            content: `
                First, we need to remove all edges that belong to the second layer 'don't have a yellow' and move them
                to the top layer. For this we need to employ an algorithm that removes them from the right or the left
                and to the top. However, we must keep in mind that we must swap it with a piece that doesn't belong to
                the second layer. So a piece an edge with a yellow.
                
                Our first case presents an edge belonging to the second layer but in the incorrect place on the right.
                U R U' R' U' F' U F
                Like below:
                To do this correctly we perform the algorithm:
                U' L'U L U F U' F'
                Like below:
                
                
            `,
            image: require('../components/atoms/stage1Images/SwapingRight.png'),


        },
        {
            title: "2.2 - Moving Second Layer Edges into Position",
            content: `
                Now that all the second layer edges are on the third layer we can use the same algorithm we used to 
                extract the pieces to place them. Move a edge to match the colour of the face and then put it in place
                using either the left or right algorithm depending on where it needs to go.
                U R U' R' U' F' U F
                Like below:
                To do this correctly we perform the algorithm:
                U' L'U L U F U' F'
                Like below:
                
                
                
            `,

            image: require('../components/atoms/stage1Images/SwapingRight.png'),


        },
        {
            title: "End of 2nd Layer",
            content: `
                Now that we have a solved second layer we can progress to the final 3rd layer. This layer requires the 
                most use of algorithms and is the most tricky!
                
                
            `,


        },
        {
            title: "3rd layer",
            content: `
                To solve the third layer we must progress through multiple stage. Making the yellow cross, Orientating the 
                yellow cross, positioning the corners and finally solving the corners
                
                
            `,


        },
        {
            title: "Making the yellow cross step 1",
            content: `
                Step 1: Identifying the Yellow Cross Case

                At this stage, you may see one of the following patterns on the top face (yellow):
                
                    A dot (no edges are yellow)
                    An L-shape (two adjacent yellow edges)
                    A straight line (two opposite yellow edges)
                    The yellow cross (all four edge pieces yellow - already solved!)
                
                If you already have the yellow cross, you can move to the next step of solving the last layer. Otherwise, follow the algorithm below.
                
                
            `,


        },
        {
            title: "Solving the Yellow Cross",
            content: `
                Step 2: Using the Algorithm to Form the Yellow Cross

                Use the following algorithm to move from one state to the next until you reach the yellow cross:

                Algorithm: F R U R' U' F'
                f you have a dot:
                Perform the algorithm three times.
                
                If you have an L-shape:
                Hold the L-shape in the top-left corner and perform the algorithm twice.
                
                If you have a straight line:
                Hold the cube so the line is horizontal, then perform the algorithm once.
                
                
            `,


        },
        {
            title: "Positioning the yellow edges",
            content: `
                Now that we have successfully formed the yellow cross, the next step is to correctly position the yellow edge pieces so that they align with the center pieces of the sides.
Step 1: Identifying the Current Edge Positions

Look at the four edges of the yellow cross and check if they match the colors of the center pieces on their respective sides. There are three possible cases:

    All four edges are correctly positioned – You can move on to solving the yellow corners.
    Two adjacent edges are correctly positioned – Hold the cube with one correct edge facing you and another on the right, then perform the algorithm below.
    Two opposite edges are correctly positioned – Perform the algorithm once, then check if you now have the adjacent case (case 2), and perform the algorithm again if needed.
                
                
            `,


        },
        {
            title: "Positioning the yellow edges",
            content: `
                Step 2: Swapping the Yellow Edges

If the yellow edge pieces are in the wrong positions, use this algorithm to cycle three of them while keeping one fixed:

Algorithm to swap yellow edges:
R U R' U R U2 R' U

    R = Right face clockwise
    U = Upper face clockwise
    R' = Right face counterclockwise
    U2 = Upper face 180 degrees
                
            `,


        },
        {
            title: "Positioning the yellow edges",
            content: `
               Step 3: Applying the Algorithm

    If two adjacent edges are correct, hold the cube so that one correct edge is at the front and one is on the right, then apply the algorithm once.
    If two opposite edges are correct, apply the algorithm once, then check again. If needed, apply the algorithm a second time.
            `,


        },
        {
            title: "Placing the Yellow Corners",
            content: `
                Look at the four yellow corners and check if any of them are already in the correct position (even if they are not yet oriented properly). A correctly placed corner will have the correct three colors, even if it is rotated incorrectly.

There are three possible cases:

    All four corners are already correctly placed – You can move on to orienting them.
    One corner is correctly placed, but the others are not – Hold the cube with the correct corner in the front-right-top position and apply the algorithm below.
    None of the corners are correctly placed – Apply the algorithm once, then check again. You should now have the case where one corner is correct.   
            `,


        },
        {
            title: "Placing the Yellow Corners",
            content: `
                Step 2: Swapping the Yellow Corners

If the yellow corners are not in their correct locations, use this algorithm to swap three of them while keeping one fixed:

Algorithm to swap yellow corners:
U R U' L' U R' U' L
                
            `,


        },
        {
            title: "Placing the yellow corners",
            content: `
               Step 3: Applying the Algorithm

    If one corner is already in the correct position, hold the cube so that this corner is in the front-right-top position and apply the algorithm once.
    Check if the other corners are now correctly placed. If not, repeat the algorithm until all corners are in their correct positions.
    Once all four corners are in their correct locations (but possibly rotated incorrectly), you can move on to the final step: orienting the yellow corners!
            `,


        },
        {
            title: "Orientate the Yellow Corners",
            content: `
                Recognizing the Different Shapes When Orienting the Yellow Corners

When solving the final step of the Rubik's Cube—orienting the yellow corners—you will often notice different yellow shapes forming on the top face. These patterns help identify how much work remains and which algorithm to use. Here are the most common shapes you will see:`,


        },
        {
            title: "Orientate the Yellow Corners - The T shape",
            content: `
                What it Looks Like:

    The top face has a "T" made of yellow stickers.
    Three yellow corner stickers are on the side of the cube, while one yellow sticker is already correctly oriented on the top.

 Next Step:

    Rotate the cube so that the yellow sticker on top is in the front-left-top position.
    Use the R' D' R D algorithm on one of the incorrectly oriented corners until its yellow sticker moves to the top.
    Repeat for the remaining corners until the yellow face is complete.
            `,


        },
        {
            title: "Orientate the Yellow Corners - The Fish",
            content: `
                What it Looks Like:

    The top face has three yellow stickers forming a "fish" shape, with one corner already fully solved.
    The "head" of the fish (the solved yellow corner) points toward a specific direction.

Next Step:

    Hold the cube so that the fish’s head (the fully solved yellow corner) is in the front-left-top position.
    Use the R U R' U R U2 R' algorithm once (or its mirrored version) to fully solve the yellow face.`,


        },
        {
            title: "Orientate the Yellow Corners - The Cross",
            content: `
                What it Looks Like:

    A yellow cross is already formed (from the previous step).
    The four yellow edge pieces are correct, but the corners are not fully oriented.

Next Step:

    Apply the R' D' R D algorithm on each incorrect corner until all yellow stickers face up.`,


        },
        {
            title: "Orientate the Yellow Corners - The Diamond",
            content: `
                What it Looks Like:

    The yellow stickers form a diamond or diagonal line pattern.
    Two yellow corners are correctly oriented, but the other two are not.

 Next Step:

    Rotate the top layer so that one of the incorrectly oriented corners is in the front-right-top position.
    Perform the R' D' R D algorithm until that corner is solved.
    Move to the next incorrectly oriented corner and repeat the process.`,


        },

    ];



    const nextStep = () => {
        setCurrentStep((prev) => (prev < beginnerSteps.length - 1 ? prev + 1 : prev));
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
                    backgroundColor: flashBlue ? '#007BFF' : 'white', // Flash effect
                    color: flashBlue ? 'white' : 'black',
                    transition: 'background-color 0.3s ease-in-out', // Smooth transition effect
                }}
            >
                <span>Solve Cube</span>
            </div>

            {/* Pop-Up */}
            {showDetails && (
                <div style={styles.popup}>
                    <h2>{beginnerSteps[currentStep].title}</h2>
                    <p>{beginnerSteps[currentStep].content}</p>
                    <img
                        src={beginnerSteps[currentStep].image}
                        alt={beginnerSteps[currentStep].title}
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
                            onClick={() => nextStep()}
                            style={{
                                ...styles.button,
                                visibility: currentStep === beginnerSteps.length - 1 ? 'hidden' : 'visible',
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
        position: 'fixed', // ✅ Ensure it is independent of parent divs
        top: '38%',
        right: '10px', // ✅ Stick to the left side
        transform: 'translateY(-50%)', // ✅ Only center it vertically
        width: '20vw', // ✅ Make it take up 40% of screen width (adjustable)
        maxWidth: '500px', // ✅ Set a reasonable maximum width
        maxHeight: '45vh', // ✅ Prevent it from getting too large
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflowY: 'auto', // ✅ Allow scrolling if content is too long
        zIndex: 3000, // ✅ Ensure it is above other elements
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
