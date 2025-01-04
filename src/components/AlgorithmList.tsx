import React, {useEffect, useState} from 'react';
import Ticket from './atoms/Ticket';
import {RubiksCubeState, useRubiksCube} from '../animated/RubiksCubeContext';
import sendRequest from '../Api';
import {MoveContextState, useMoveContext} from "../hooks/MoveContext";

const AlgorithmList = () => {

    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();
    const {Moves, setMoves}= useMoveContext()
    const [beginner, setShowBeginner] = useState(false);

    async function beginnerFunction() {
        setMoves({Moves : []})
        const result = await sendRequest(rubiksCubeMatrix, 'Beginner');
        setMoves({ Moves: result });

    }

    async function CFOPFunction() {
        setMoves({Moves : []})
        const result = await(sendRequest(rubiksCubeMatrix, "CFOP"));
        setMoves({ Moves: result });
    }
    async function KociembaFunction() {
        setMoves({Moves : []})
        const result = await(sendRequest(rubiksCubeMatrix, "Kociemba"));
        setMoves({ Moves: result });

    }

    return (

        // Temporary
        <div className="scrollable-box">
            <h3>Choice of Algorithms</h3>
            <Ticket
                name="Beginner Method"
                onClick={() => beginnerFunction()}
            />
            <Ticket
                name="CFOP Method (Fridrich Method) Medium"
                onClick={() => CFOPFunction()}

            />
            <Ticket
                name="Kociemba Method Advanced"
                onClick={()=> KociembaFunction}

            />
        </div>
    );
};

export default AlgorithmList;
