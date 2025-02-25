import React from "react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    imageSrc?: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, content, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <button style={styles.closeButton} onClick={onClose}>✖</button>
                <h2>{title}</h2>
                <p>{content}</p>
                {imageSrc && <img src={imageSrc} alt={title} style={styles.image} />}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
    },
    popup: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "40vw",
        maxWidth: "500px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        overflowY: "auto",
        textAlign: "center",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
    },
    image: {
        width: "80%",
        maxWidth: "250px",
        height: "auto",
        borderRadius: "5px",
        marginTop: "10px",
    },
};

export default Popup;

