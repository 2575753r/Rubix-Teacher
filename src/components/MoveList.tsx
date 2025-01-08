import React, { useEffect, useRef, useState } from 'react';
import { useMoveContext } from "../hooks/MoveContext";

const MoveList = () => {
    const { Moves, updateMoveIndex } = useMoveContext();
    const [index, setIndex] = useState(0);
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    // Ensure the scroller focuses on the correct item
    useEffect(() => {
        if (Moves.Moves && index >= 0 && index < Moves.Moves.length) {
            const scroller = scrollerRef.current;
            const selectedTicket = scroller?.children[index] as HTMLElement;

            // Scroll the selected ticket into view
            if (selectedTicket) {
                selectedTicket.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            // Trigger the move if it's not the placeholder
            if (Moves.Moves[index] !== "Start") {
                updateMoveIndex(index); // Synchronize with context
            }
        }
    }, [index, Moves.Moves, updateMoveIndex]);

    const previous = () => {
        setIndex((prev) => Math.max(prev - 1, 0));
    };

    const next = () => {
        setIndex((prev) => Math.min(prev + 1, Moves.Moves.length - 1));
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <div
                style={{
                    position: "relative",
                    height: "500px",
                    overflow: "scroll",
                    border: "1px solid #ccc",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        transform: `translateY(-${index * 50}px)`,
                        transition: "transform 0.5s ease",
                    }}
                >
                    {Moves.Moves.map((move, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: "20px",
                                backgroundColor: idx === index ? "blue" : "lightgray",
                                color: idx === index ? "white" : "black",
                                borderRadius: "5px",
                                textAlign: "center",
                                transition: "background-color 0.3s",
                            }}
                        >
                            {move}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={previous}
                    disabled={index === 0}
                    style={{
                        marginRight: "10px",
                        padding: "10px 20px",
                        cursor: index === 0 ? "not-allowed" : "pointer",
                    }}
                >
                    Previous
                </button>
                <button
                    onClick={next}
                    disabled={index === Moves.Moves.length - 1}
                    style={{
                        padding: "10px 20px",
                        cursor: index === Moves.Moves.length - 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MoveList;
