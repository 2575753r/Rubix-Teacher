import React, {useEffect, useState} from 'react';
import Ticket from './atoms/Ticket';
import {RubiksCubeState, useRubiksCube} from '../animated/RubiksCubeContext';

const AlgorithmList = () => {

    const { rubiksCubeMatrix, setRubiksCube } = useRubiksCube();
    const [beginner, setShowBeginner] = useState(false);

    useEffect(()=> {

        if(beginner){



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
