from beginnerMethod.matrixTransformer import printCube, rotate_up_counterclockwise

testMatrices = {
    "up": [
        ['w', 'y', 'y'],
        ['y', 'y', 'y'],
        ['w', 'y', 'y']

    ],
    "left": [
        ['r', 'b', 'o'],
        ['g', 'b', 'b'],
        ['g', 'b', 'b']
    ],
    "front": [
        ['g', 'r', 'r'],
        ['o', 'r', 'r'],
        ['o', 'r', 'b']
    ],
    "right": [
        ['g', 'g', 'b'],
        ['g', 'g', 'b'],
        ['r', 'g', 'o']

    ],
    "back": [
        ['r', 'o', 'g'],
        ['r', 'o', 'o'],
        ['b', 'o', 'o']
    ],
    "down": [
        ['y', 'w', 'w'],
        ['w', 'w', 'w'],
        ['y', 'w', 'w']
    ]
}

matrices = rotate_up_counterclockwise(testMatrices)
printCube(matrices)