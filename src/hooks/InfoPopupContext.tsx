import React, { createContext, useState, useContext } from "react";
import ReactDOM from "react-dom";

interface InfoPopupContextType {
    showPopup: (contentKey: string) => void;
    hidePopup: () => void;
}

const InfoPopupContext = createContext<InfoPopupContextType | undefined>(undefined);

export const useInfoPopup = () => {
    const context = useContext(InfoPopupContext);
    if (!context) {
        throw new Error("useInfoPopup must be used within an InfoPopupProvider");
    }
    return context;
};

const contentMap: Record<string, { title: string; text: string; image?: string }> = {
    "solveCube": {
        title: "Understanding Move Context",
        text: "Move contexts regarding any algorithm follows a simple universal definition. Each letter corresponds to " +
            "a move made onto the cube. They work as follows: " +
            "All moves with an apostrophe indicate counterclockwise motions, whilst all moves without indicate clockwise" +
            "motions like so" +
            "F - Front Clockwise, F' - Front Counterclockwise" +
            "L - Left Clockwise, L' - Left Counterclockwise" +
            "R - Right Clockwise, R' - Right Counterclockwise" +
            "U - Up Clockwise, U' - Up Counterclockwise" +
            "D - Down Clockwise, D' - Down Counterclockwise" +
            "B - Back Clockwise, B' - Back Counterclockwise" +
            "Finally we have the Y move, this indicates rotating the entire cube clockwise so that the front face becomes the left face and the right face becomes the front and so on",
    },
    "cubeEnter": {
        title: "How to Enter Your Cube",
        text: "To enter your cube type a character indicating the colours of each block on each face. Rotate to look at that face" +
            "then type either y for yellow, o for orange, b for blue, r for red, g for green and w for white." +
            "Start with the faces in the order up - yellow, left - blue, front - red, right - green, back - orange, " +
            "down - white." +
            "Look at those cubes and enter a single character for the colour starting from the top left and ending with the" +
            "bottom right. For example a face could be yobwbbroy with 9 for each colour then the final layout could be something like: " +
            "yobwbbroyyobwbbroyyobwbbroyyobwbbroyyobwbbroyyobwbbroy"
    },
    "default": {
        title: "Page Tutorial",
        text: "Welcome to Rubick's, Teacher. A simple app to help you understand and solve your rubicks cube! Its recommended that " +
            "you first investigate the information tabs to get a good feel of the tools you'll need to use in order to get going!" +
            " They are around the page like so.",
        image: require('../components/atoms/stage1Images/HomePageTutorial.png'),
    }
};

export const InfoPopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentKey, setContentKey] = useState<string>("default");

    const showPopup = (key: string) => {
        setContentKey(contentMap[key] ? key : "default");
        setIsOpen(true);
    };

    const hidePopup = () => {
        setIsOpen(false);
    };

    return (
        <InfoPopupContext.Provider value={{ showPopup, hidePopup }}>
            {children}

            {isOpen &&
                ReactDOM.createPortal(
                    <div style={styles.overlay}>
                        <div style={styles.popup}>
                            <button onClick={hidePopup} style={styles.closeButton}>X</button>
                            <h2>{contentMap[contentKey].title}</h2>
                            <p>{contentMap[contentKey].text}</p>
                            {contentMap[contentKey].image && (
                                <img
                                    src={contentMap[contentKey].image}
                                    alt="Tutorial"
                                    style={{
                                        width: "100%",
                                        maxWidth: "500px",  // ✅ Restrict max width
                                        height: "auto",      // ✅ Maintain aspect ratio
                                        borderRadius: "10px",
                                        marginTop: "10px",
                                        objectFit: "contain" // ✅ Prevent cropping
                                    }}
                                />
                            )}
                        </div>
                    </div>,
                    document.body // ✅ Popup is outside any component's structure
                )}
        </InfoPopupContext.Provider>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5000,
    },
    popup: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "80%",
        maxWidth: "600px",
        maxHeight: "75vh",   // ✅ Prevent it from becoming too large
        overflowY: "auto",   // ✅ Enable scrolling
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
};

export default InfoPopupProvider;
