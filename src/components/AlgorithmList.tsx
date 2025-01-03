import React, {useEffect, useState} from 'react';
import Ticket from './atoms/Ticket';
import {RubiksCubeState, useRubiksCube} from '../animated/RubiksCubeContext';

const AlgorithmList = () => {

    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();
    const [beginner, setShowBeginner] = useState(false);

    // add http send here to send off the current matrix layout
    // backend ill turn it into a string then process it
    // moves hook that will update and produce the moves in the move list

    // function ready for http request
    useEffect(()=> {

        if(beginner){
            let matrixState = useRubiksCube;
            // http request here

        }
    },[beginner]);



    return (

        // Temporary
        <div className="scrollable-box">
            <h3>Choice of Algorithms</h3>
            <Ticket
                name="Beginner Method"
                onClick={() => setShowBeginner(true)}
            />
            <Ticket
                name="CFOP Method (Fridrich Method) Medium"

            />
            <Ticket
                name="ZZ Method Advanced"

            />
        </div>
    );
};

export default AlgorithmList;
