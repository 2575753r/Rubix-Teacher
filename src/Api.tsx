import axios from "axios";
import { RubiksCubeState } from "./animated/RubiksCubeContext";

// ✅ Function to show alert for invalid cube configuration
const showInvalidCubeAlert = () => {
    alert("Invalid cube configuration detected. Please try a different configuration.");
};

// ✅ Exporting both functions
export const sendRequest = async (rubiksCubeMatrix: RubiksCubeState, solver: string) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/algorithm", {
            cube_state: rubiksCubeMatrix,
            solver: solver,
        });

        if (!response.data.result) {
            showInvalidCubeAlert();
            return null;
        }

        console.log("Success:", response.data.result);
        return response.data.result;
    } catch (error) {
        // @ts-ignore
        console.error("Network error:", error.message);
        showInvalidCubeAlert(); // Alert user on network failure or invalid response
        return null;
    }
};

// ✅ Ensure sendRequestInput is exported properly
export const sendRequestInput = async (rubiksCubeMatrix: RubiksCubeState) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/cubeinput", {
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
        showInvalidCubeAlert(); // Alert user on network failure or invalid response
        return null;
    }
};
