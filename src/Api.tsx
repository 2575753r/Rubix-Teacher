import axios from "axios";
import {RubiksCubeState} from "./animated/RubiksCubeContext";

const sendRequest = async (rubiksCubeMatrix:RubiksCubeState, solver: string)=>{
    try {
        const response = await axios.post("http://127.0.0.1:5000/algorithm", {
            cube_state: rubiksCubeMatrix,
            solver: solver,
        });

        console.log("Success:", response.data.result);
        return response.data.result;
    } catch (error) {

        // @ts-ignore
        if (error.response) {
            // @ts-ignore
            console.error("Error:", error.response.data.error);
        } else {
            // @ts-ignore
            console.error("Network error:", error.message);
        }
    }
};

export default sendRequest;
