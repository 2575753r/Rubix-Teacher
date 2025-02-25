import React from "react";
import { useInfoPopup } from "../hooks/InfoPopupContext"; // ✅ Use the global popup
import { CSSProperties } from "react";

interface InfoButtonProps {
    contentKey: string;
    style?: CSSProperties; // ✅ Allow passing custom styles
}

const InfoButton: React.FC<InfoButtonProps> = ({ contentKey, style }) => {
    const { showPopup } = useInfoPopup(); // ✅ Get the function to trigger popup

    return (
        <button onClick={() => showPopup(contentKey)} style={{ ...styles.button, ...style }}>
            ℹ️
        </button>
    );
};

const styles: { [key: string]: CSSProperties } = {
    button: {
        position: "absolute",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#007BFF",
        color: "white",
        fontSize: "20px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5000, // ✅ Ensures it appears over everything
    }
};

export default InfoButton;

