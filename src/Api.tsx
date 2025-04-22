import axios from "axios";
import {RubiksCubeState} from "./contexts/CubeContext";

// Function to show alert for invalid cube configuration
const showInvalidCubeAlert = () => {
    alert("Invalid cube configuration detected. Please try a different configuration.");
};

// Exporting both functions
// const API_BASE_URL = "https://rubix-teacher-5.onrender.com";
const API_BASE_URL = "http://127.0.0.1:5000"
export const sendRequest = async (rubiksCubeMatrix: RubiksCubeState, solver: string) => {

    // Handle API cases
    try {
        // Try to use backend algorithm solver function
        const response = await axios.post(`${API_BASE_URL}/algorithm`, {
            cube_state: rubiksCubeMatrix,
            solver: solver,
        });

        // If config not accepted through alert
        if (!response.data.result) {
            showInvalidCubeAlert();
            return null;
        }

        console.log("Success:", response.data.result);
        return response.data.result;
    } catch (error) {
        // @ts-ignore
        // Handle other error cases
        console.error("Network error:", error.message);
        showInvalidCubeAlert();
        return null;
    }
};

export const sendRequestInput = async (rubiksCubeMatrix: RubiksCubeState) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cubeinput`, {
            cube_state_input: rubiksCubeMatrix,
        });

        if (!response.data.result || !Array.isArray(response.data.result) || response.data.result.length !== 27) {
            showInvalidCubeAlert();
            return null;
        }

        console.log("Success:", response.data.result);
        return response.data.result;
    } catch (error) {
        // @ts-ignore
        console.error("Network error:", error.message);
        showInvalidCubeAlert();
        return null;
    }
};
