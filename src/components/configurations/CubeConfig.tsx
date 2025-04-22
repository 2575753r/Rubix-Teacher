// CubeFace and types
export type CubeFace = 'front' | 'back' | 'left' | 'right' | 'up' | 'down';

export type FaceSlice = {
    face: CubeFace;
    type: 'row' | 'col';
    index: number;
    reverse?: boolean;
};

export const rotationConfigs: Record<string, FaceSlice[]> = {
    // Definitions of each exchange of rows and columns of the matrices representing the cube
    // Up clockwise
    u: [
        // Each row or columns is exchanged from right to left
        { face: 'front', type: 'row', index: 0 }, { face: 'right', type: 'row', index: 0 },
        { face: 'back', type: 'row', index: 0 }, { face: 'left', type: 'row', index: 0 },
    ],
    // Up counterclockwise
    U:[
        { face: 'left', type: 'row', index: 0 }, { face: 'back', type: 'row', index: 0 },
        { face: 'right', type: 'row', index: 0 }, { face: 'front', type: 'row', index: 0 },
    ],
    // Down clockwise
    d: [
        { face: 'left', type: 'row', index: 2 }, { face: 'back', type: 'row', index: 2 },
        { face: 'right', type: 'row', index: 2 }, { face: 'front', type: 'row', index: 2 },
    ],
    // Down counterclockwise
    D: [
        { face: 'front', type: 'row', index: 2 }, { face: 'right', type: 'row', index: 2 },
        { face: 'back', type: 'row', index: 2 }, { face: 'left', type: 'row', index: 2 },
    ],
    // Front counterclockwise
    F: [
        { face: 'up', type: 'row', index: 2  }, { face: 'right', type: 'col', index: 0 },
        { face: 'down', type: 'row', index: 0,  reverse: true }, { face: 'left', type: 'col', index: 2, reverse: true  },
    ],
    // Front clockwise
    f: [
        { face: 'left', type: 'col', index: 2  }, { face: 'down', type: 'row', index: 0},
        { face: 'right', type: 'col', index: 0, reverse: true}, { face: 'up', type: 'row', index: 2,  reverse: true},
    ],
    // Back counterclockwise
    B: [
        { face: 'up', type: 'row', index: 0 }, { face: 'left', type: 'col', index: 0 , reverse: true},
        { face: 'down', type: 'row', index: 2 , reverse: true}, { face: 'right', type: 'col', index: 2},
    ],
    // Back clockwise
    b: [
        { face: 'right', type: 'col', index: 2}, { face: 'down', type: 'row', index: 2, reverse: true },
        { face: 'left', type: 'col', index: 0, reverse: true }, { face: 'up', type: 'row', index: 0},
    ],
    // Left clockwise
    l: [

        { face: 'back', type: 'col', index: 2, reverse: true }, { face: 'down', type: 'col', index: 0 },
        { face: 'front', type: 'col', index: 0 },  { face: 'up', type: 'col', index: 0 }
    ],
    // Left counterclockwise
    L: [
        { face: 'up', type: 'col', index: 0 },{ face: 'front', type: 'col', index: 0 },
        { face: 'down', type: 'col', index: 0 },{ face: 'back', type: 'col', index: 2, reverse: true }
    ],
    // Right counterclockwise
    R: [
        { face: 'up', type: 'col', index: 2}, { face: 'back', type: 'col', index: 0, reverse: true },
        { face: 'down', type: 'col', index: 2}, { face: 'front', type: 'col', index: 2 },
    ],
    // Right clockwise
    r: [
        { face: 'front', type: 'col', index: 2 }, { face: 'down', type: 'col', index: 2},
        { face: 'back', type: 'col', index: 0, reverse: true}, { face: 'up', type: 'col', index: 2},
    ],
};
