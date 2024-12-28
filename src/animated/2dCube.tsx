import React, {useEffect} from 'react';
import { useRubiksCube } from './RubiksCubeContext';

const RubiksCube2D: React.FC = () => {
    const { rubiksCubeMatrix } = useRubiksCube();


    const renderFace = (face: string[][]) => {
        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 15px)', // Smaller squares
                    gridTemplateRows: 'repeat(3, 15px)',
                }}
            >
                {face.flat().map((color, index) => (
                    <div
                        key={index}
                        style={{
                            width: '15px',
                            height: '15px',
                            backgroundColor: color,
                            border: '1px solid #000',
                        }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div
            style={{
                position: 'absolute', // Fixed in the bottom-right corner
                bottom: '10px',
                right: '10px',
                display: 'flex',
                flexDirection: 'row', // Horizontal layout for faces
                gap: '10px', // Spacing between faces
                backgroundColor: 'white', // White background for better visibility
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                overflow: 'auto', // Handle overflow just in case
                width: 'fit-content', // Automatically adjust to fit content
            }}
        >
            <div>
                <h5 style={{ textAlign: 'center', fontSize: '10px' }}>Top</h5>
                {renderFace(rubiksCubeMatrix.top)}
            </div>
            <div>
                <h5 style={{ textAlign: 'center', fontSize: '10px' }}>Front</h5>
                {renderFace(rubiksCubeMatrix.front)}
            </div>
            <div>
                <h5 style={{ textAlign: 'center', fontSize: '10px' }}>Back</h5>
                {renderFace(rubiksCubeMatrix.back)}
            </div>
            <div>
                <h5 style={{ textAlign: 'center', fontSize: '10px' }}>Left</h5>
                {renderFace(rubiksCubeMatrix.left)}
            </div>
            <div>
                <h5 style={{ textAlign: 'center', fontSize: '10px' }}>Right</h5>
                {renderFace(rubiksCubeMatrix.right)}
            </div>
            <div>
                <h5 style={{ textAlign: 'center', fontSize: '10px' }}>Bottom</h5>
                {renderFace(rubiksCubeMatrix.bottom)}
            </div>
        </div>
    );
};

export default RubiksCube2D;

