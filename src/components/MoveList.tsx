import React, { useEffect, useRef, useState } from 'react';
import { useMoveContext } from "../hooks/MoveContext";
import InfoButton from "./Information"; // ✅ Import your reusable InfoButton component

const MoveList = () => {
    const { Moves, updateMoveIndex } = useMoveContext();
    const [index, setIndex] = useState(0);
    const [isResetting, setIsResetting] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isPlayingRef = useRef(false);
    const movesPerPage = 10;

    useEffect(() => {
        setIsResetting(true);
        setIndex(0);
        setTimeout(() => setIsResetting(false), 100);
    }, [Moves.Moves]);

    useEffect(() => {
        if (!isResetting && Moves.Moves.length > 0) {
            updateMoveIndex(index);
        }
    }, [index, Moves.Moves, updateMoveIndex, isResetting]);

    const previous = () => {
        setIndex((prev) => Math.max(prev - 1, 0));
    };

    const next = () => {
        setIndex((prev) => Math.min(prev + 1, Moves.Moves.length - 1));
    };

    const togglePlay = () => {
        setIsPlaying((prev) => {
            const newPlayingState = !prev;
            isPlayingRef.current = newPlayingState;

            if (newPlayingState) {
                if (intervalRef.current) return newPlayingState;

                intervalRef.current = setInterval(() => {
                    setIndex((prev) => {
                        if (!isPlayingRef.current) {
                            clearInterval(intervalRef.current as NodeJS.Timeout);
                            intervalRef.current = null;
                            return prev;
                        }
                        if (prev < Moves.Moves.length - 1) {
                            return prev + 1;
                        } else {
                            clearInterval(intervalRef.current as NodeJS.Timeout);
                            intervalRef.current = null;
                            isPlayingRef.current = false;
                            setIsPlaying(false);
                            return prev;
                        }
                    });
                }, 1000);
            } else {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }

            return newPlayingState;
        });
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px", position: "relative" }}>
            {/* ℹ️ Info Button - Top Left */}
            <InfoButton contentKey="solveCube" style={styles.infoButton} />

            {/* ▶ Play/Pause Button - Top Right */}
            <button
                onClick={togglePlay}
                style={styles.playButton}
            >
                {isPlaying ? "❚❚" : "▶"}
            </button>

            <div style={styles.moveListContainer}>
                <div ref={scrollerRef} style={styles.scroller}>
                    {Moves.Moves.slice(index, index + movesPerPage).map((move, idx) => (
                        <div key={index + idx} style={{
                            ...styles.moveItem,
                            backgroundColor: idx === 0 ? "blue" : "lightgray",
                            color: idx === 0 ? "white" : "black"
                        }}>
                            {move}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button onClick={previous} disabled={index === 0} style={styles.navButton}>
                    Previous
                </button>
                <button onClick={next} disabled={index === Moves.Moves.length - 1} style={styles.navButton}>
                    Next
                </button>
            </div>
        </div>
    );
};

// ✅ Styling for MoveList
const styles: { [key: string]: React.CSSProperties } = {
    infoButton: {
        position: "absolute",
        top: "10px",
        left: "10px",
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
        zIndex: 1000, // ✅ Ensures it appears above everything
    },
    playButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "green",
        color: "white",
        fontSize: "20px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    moveListContainer: {
        position: "relative",
        height: "500px",
        overflow: "hidden",
        border: "1px solid #ccc",
        marginBottom: "20px",
    },
    scroller: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        height: "100%",
        overflowY: "scroll",
        position: "relative",
        zIndex: 1,
    },
    moveItem: {
        padding: "20px",
        borderRadius: "5px",
        textAlign: "center",
        transition: "background-color 0.3s",
    },
    navButton: {
        marginRight: "10px",
        padding: "10px 20px",
        cursor: "pointer",
    },
};

export default MoveList;
