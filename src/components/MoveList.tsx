import React, {useEffect, useRef, useState} from 'react';

const MoveList = () => {

    // Temporary move list for testing
    const moves =
        [
            "D", "F'", "D'",
            "R", "U", "R'",
            "L'", "D'", "L",
            "F", "U'", "F'",
            "R'", "D'", "R", "D",
            "F", "D'", "F'",
            "L", "D'", "L'", "D",
            "R'", "D", "R",
            "U", "L'", "U'", "L", "U'", "F'", "U", "F",
            "U'", "R", "U", "R'", "U", "F", "U'", "F'",
            "U'", "R", "U", "R'", "U", "F", "U'", "F'",
            "U", "L'", "U'", "L", "U'", "F'", "U", "F",
            "F", "R", "U", "R'", "U'", "F'",
            "F", "R", "U", "R'", "U'", "F'",
            "R", "U", "R'", "U", "R", "U2", "R'",
            "U", "R", "U'", "L'", "U", "R'", "U'", "L",
            "R'", "D'", "R", "D",
            "R2", "U", "R", "U", "R'", "U'", "R'", "U'", "R'", "U", "R'"
        ];

    const [index, setIndex] = useState(0);
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    // Move scroller
    useEffect(() => {

        // Ensure move is within bounds
        if (index >= 0 && index < moves.length) {

            // Use current position as current scroller
            const scroller = scrollerRef.current;

            // Access all children and cast specific index as a
            const selectedTicket = scroller?.children[index] as HTMLElement;
            if (selectedTicket) {
                selectedTicket.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [index]);

    const previous = () => {
        setIndex((prev) => Math.max(prev - 1, 0));
    };

    const next = () => {
        setIndex((prev) => Math.min(prev + 1, moves.length - 1));
    };


    return (
        <div style={{ textAlign: "center", padding: "20px" }}>

            <div
                style={{
                    position: "relative",
                    height: "500px",

                    // Maybe see if we can get this to be hidden
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

                        // Alter this to adjust Y movement
                        transform: `translateY(-${index * 50}px)`,

                        // Alter this to adjust speed
                        transition: "transform 0.0005s ease",
                    }}
                >
                    {moves.map((move, idx) => (
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
                    disabled={index === moves.length - 1}
                    style={{
                        padding: "10px 20px",
                        cursor: index === moves.length - 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MoveList;