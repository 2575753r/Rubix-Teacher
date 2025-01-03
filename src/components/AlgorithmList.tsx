import React, {useEffect, useState} from 'react';
import Ticket from './atoms/Ticket';
import {RubiksCubeState, useRubiksCube} from '../animated/RubiksCubeContext';
import sendRequest from '../Api';

const AlgorithmList = () => {

    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();
    const [beginner, setShowBeginner] = useState(false);

    // add http send here to send off the current matrix layout
    // backend ill turn it into a string then process it
    // moves hook that will update and produce the moves in the move list

    // function ready for http request

    function beginnerFunction() {
        sendRequest(rubiksCubeMatrix, 'Beginner')
    }
    function CFOPFunction() {
        sendRequest(rubiksCubeMatrix, "CFOP")
    }
    function KociembaFunction() {
        sendRequest(rubiksCubeMatrix, "Kociemba")
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
