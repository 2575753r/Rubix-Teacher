import React, {useEffect, useState} from 'react';
import Ticket from './atoms/Ticket';
import {RubiksCubeState, useRubiksCube} from '../animated/RubiksCubeContext';
import { sendRequest, sendRequestInput } from "../Api";
import {MoveContextState, useMoveContext} from "../hooks/MoveContext";


const AlgorithmList: React.FC = () => {
    const [showDetails, setShowDetails] = useState(true); // Toggle for showing/hiding content
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

        // Trigger blue flash effect
        setFlashBlue(true);
        setTimeout(() => setFlashBlue(false), 300); // Reset flash after 300ms
    };



    const beginnerSteps = [
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
        },
        {
            title: "Step 3: Solve the Middle Layer Edges",
            content: `
Once the first layer is complete, the next step is solving the second layer by placing the edge pieces in the correct positions. Unlike the first layer, this step requires specific algorithms to insert the pieces without disturbing the white face.

To do this, we need to employ our first set of algorithms. But this requires that we understand cube notation. It is simple and easy to understand, with each face being either rotated clockwise or counterclockwise. Move notation follows a simple syntax with the face to be rotated being represented first by it's first letter capitalised, such as 'F' for front, 'B' for back, and so on. Then, the presence of a following apostrophe is used to differentiate between a clockwise or counterclockwise motion. For example, "F" indicates rotating the front face clockwise, whilst "F'" indicates rotating it counterclockwise. This applies to all the different faces.

With this in mind, we can start solving the second layer. Firstly, we find an edge piece in the top layer that is not yellow. Then, we align it with the center of the matching side color. Depending on whether the edge needs to go left or right, we apply one of two algorithms to place it correctly.

If the edge piece needs to move right, we use the following sequence:
U R U' R' U' F' U F

If the edge piece needs to move left we have the following sequence:
U' L' U L U F U' F'

We repeat this process for all four edge pieces until the second layer is fully solved. Furthermore, these sequences can also be used to swap misaligned second layer edges in order to move them to the third layer, then position them back to the second layer in the correct orientation.

Beginners often make mistakes in this step, such as misalignment the edge piece before applying the algorithm or accidentally disturbing the first layer. However, with practice and understanding of piece movement, this step becomes easier.
    `,
        },
        {
            title: "Step 4: Creating the Yellow Cross",
            content: `
The first stage involves creating a yellow cross on the up face of the third layer. In order to achieve this, we need to consider the possible different layouts on the up face resulting from the processes of solving the previous layers. With the first and second layer already solved there are a set amount of layouts that are possible in terms of yellow edges on the third layer.

To place the yellow edges into a cross, the same algorithm is applied a number of times depending on the yellow pattern present on the up face 'yellow face'. Each appliance of the algorithm transforms one pattern to the next, but it is necessary to ensure that the algorithm is performed in the correct orientation.

Each figure indicates the exact orientation the cube must be in to apply the algorithm. For example the cube must be rotated in the case that the L shape does not align to the top right of the up face and in the case the line doesn't not stretch from the left to the right of the top face.

Algorithm:
F R U R' U' F'
    `,
        },
        {
            title: "Step 5: Positioning the Yellow Edges",
            content: `
Even with the yellow cross complete, the edge pieces may not match the colors configured to the side faces. Therefore, the yellow edges may need to be swapped whilst preserving the already solved state of the cube. In order to do this requires two algorithms, one to swap opposite yellow edges and the other to swap adjacent yellow edges until all edges match the colours of the side faces.

Algorithm:
U R U' L' U R' U' L

With the yellow cross edges correctly orientated, the next step is to position the yellow corner pieces.

This means placing each corner piece in its correct location — that is, the piece should sit between the correct three center colors, even if the yellow sticker is not yet facing upwards. Orientation doesn’t matter at this stage; what matters is that each corner contains the right combination of colors to match the adjacent faces.
    `,
        },
        {
            title: "Step 6: Positioning the Yellow Corners",
            content: `
With the yellow cross made and orientated and with the edges positioned correctly accordingly to the side face colours, we now need to orientate the yellow corners. This stage is about placing them in the correct corner but not requiring that the yellow face of that corner is aligned correctly to the up face. All that is necessary is that each corner contains the right combination of the three colours that corresponds to the adjacent faces.

The algorithm for this stage involves swapping incorrectly placed corners into the right places by swapping them.
First, we must look for a already correctly placed corner if one exists. Then, from then we apply the below algorithm until all the other corners are swaped and correctly placed.

Algorithm:
U R U' L' U R' U' L

If no corners are correctly placed initially to this stage then we can perform the algorithm at any position until a corner is correctly orientated before rotating the entire cube to the newly correctly positioned corner and solving normally.
    `,
        },
        {
            title: "Step 7: Orienting the Yellow Corners",
            content: `
The final stage of the third layer is by far the most complex and the place in which many solvers make mistakes. There are a total of seven different possible configurations with each requiring their own alogirithm in order to solve. However, even though there exists many different configurations at this stage the algorithm for each is very similar requiring small alterations.

Each separate figure requires a different algorithm. But each algorithm includes the same repeated sequence of:
R' D' R D

But the times this is employed and additional rotations of the up face varies with each configuration. By rotating the cube so that it represents one of the figure layouts we can solve each unique one with the following algorithms:

- T shape (Figure 2.11): (R' D' R D) x2 U' (R' D' R D) x4 U
- T shape (Figure 2.12): (R' D' R D) x4 U' (R' D' R D) x2 U
- Fish shape (Figure 2.13): (R' D' R D) x2 U (R' D' R D) x2 U2 (R' D' R D) x2 U
- Fish shape (Figure 2.14): (R' D' R D) x4 U (R' D' R D) x4 U2 (R' D' R D) x4 U
- Diamond shape (Figure 2.15): U (R' D' R D) x2 U2 (R' D' R D) x4 U
- Yellow Cross (Figure 2.16): (R' D' R D) x4 U (R' D' R D) x4 U (R' D' R D) x2 U (R' D' R D) x2 U
- Yellow Cross (Figure 2.17): (R' D' R D) x2 U (R' D' R D) x2 U (R' D' R D) x4 U (R' D' R D) x4 U

Always complete the full R' D' R D sequence — even if the yellow sticker appears correctly placed midway. Only rotate the top face (U) between each step.
    `},

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
                        // src={beginnerSteps[currentStep].image}
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
