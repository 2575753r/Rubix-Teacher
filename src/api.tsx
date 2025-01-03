import axios from "axios";

const sendRequest = async () => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/algorithm", {
            cube_state: "wowgybwyogygybyoggrowbrgywrborwggybrbwororbwborgowryby",
            solver: "Beginner",
        });

        console.log("Success:", response.data.result);
    } catch (error) {
        // @ts-ignore
        if (error.response) {

            // Server error
            // @ts-ignore
            console.error("Error:", error.response.data.error);
        } else {

            // Network or other
            // @ts-ignore
            console.error("Network error:", error.message);
        }
    }
};
export default sendRequest;
