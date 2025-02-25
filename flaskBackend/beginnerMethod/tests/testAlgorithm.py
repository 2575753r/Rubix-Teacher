# Take our test matrices
# Randomise it then see if each step is succesfull
from beginnerMethod.lastStep.OrientYellowCorners import DetermineLayout
from beginnerMethod.lastStep.OrientateYellowCross import RunOrientateYellowCross
from beginnerMethod.lastStep.PositionYellowCorners import PositionYellowCorners
from beginnerMethod.lastStep.yellowCross import RunYellowCross
from beginnerMethod.matrixTransformer import *
from beginnerMethod.runBeginnerMethod import runBegginerMethod, processMovesToList
from beginnerMethod.step1 import *
from beginnerMethod.step1.OreintateWhiteCross import oreintateWhiteCross
from beginnerMethod.step1.alignCorners import runCorners
from beginnerMethod.step1.makeWhiteCross import MakeWhiteCross
from beginnerMethod.step2.LayerTwo import runSecondLayer

testMatrices = {
    "up": [
        ["w", "o", "o"],
        ["b", "y", "o"],
        ["y", "r", "y"]
    ],
    "left": [
        ["r", "y", "r"],
        ["o", "b", "y"],
        ["g", "r", "w"]
    ],
    "front": [
        ["g", "g", "b"],
        ["o", "r", "g"],
        ["b", "r", "b"]
    ],
    "right": [
        ["r", "g", "w"],
        ["w", "g", "g"],
        ["o", "w", "g"]
    ],
    "back": [
        ["b", "w", "g"],
        ["y", "o", "b"],
        ["o", "w", "o"]
    ],
    "down": [
        ["r", "y", "y"],
        ["b", "w", "r"],
        ["y", "b", "w"]
    ]
}
def testAlgorithm(testMatrices):
    testMatrices = RandomizeInputMatrices(testMatrices)
    matrices = testMatrices.copy()
    moves = []
    moves.append('Start')
    # Layer 1
    matrices, moves = MakeWhiteCross(matrices, moves)
    # print('made white cross')

    matrices, moves = oreintateWhiteCross(matrices, moves)

    printCube(matrices)
    # print(moves)
    print(('runnining corners'))
    beforeCorners = matrices.copy()
    matrices, moves = runCorners(matrices, moves)

    printCube(matrices)
    print(moves)
    #
    #
    # # moves = processMovesToList(moves)
    # moves = processMovesToList(moves)
    # print(moves)
    # print('Before running corners Running Corners')
    # printCube(beforeCorners)
    # print('After running corners')
    # printCube(matrices)




    beforeSecond = matrices.copy()

    matrices, moves = runSecondLayer(matrices, moves)

    print('BEFORE RUNNING SECOND LAYER')
    printCube(beforeSecond)
    print('After Running Second Layer')
    printCube(matrices)

    #
    beforeYellowCross = matrices.copy()
    matrices, moves = RunYellowCross(matrices, moves)
    print('Before Yellow Cross')
    printCube(beforeYellowCross)
    print('After Running Yellow Cross')
    printCube(matrices)
    #
    matrices, moves = RunOrientateYellowCross(matrices, moves)
    print('After Running Orientate Yellow Cross')
    printCube(matrices)


    print('After Running Orientate Yellow Cross')
    matrices, moves = PositionYellowCorners(matrices, moves)
    print(moves)
    printCube(matrices)


    print('After Running Final Layer Cross')
    matrices, moves = DetermineLayout(matrices, moves)
    printCube(matrices)
    # Layer 3
    # matrices, moves = orientLastLayerCorners(matrices, moves)
    moves = processMovesToList(moves)
    print(moves)



    return


import random

def testForWhiteCorners(matrices):

    moves = []
    matrices, moves = runCorners(matrices, moves)
    count = 0
    for i in matrices['down']:
        for j in matrices['down'][i][j]:
            if matrices['down'][i][j] == 'w':
                count += 1

    if count == 9:
        print('WHITE CORNERS FAILED')
        return True

    print('WHITE CORNERS PASSED')
    return False

def RandomizeInputMatrices(matrices):
    moves = ['U', "U'", 'D', "D'", 'L', "L'", 'R', "R'", 'F', "F'", 'B']

    for _ in range(20):
        move = random.choice(moves)
        matrices = applyMove(matrices, move)

    return matrices

def applyMove(matrices, move):
    """Applies the given move to the matrices."""
    if move == 'U':
        return rotate_up_clockwise(matrices)
    elif move == "U'":
        return rotate_up_counterclockwise(matrices)
    elif move == 'D':
        return rotate_down_clockwise(matrices)
    elif move == "D'":
        return rotate_down_counterclockwise(matrices)
    elif move == 'L':
        return rotate_left_clockwise(matrices)
    elif move == "L'":
        return rotate_left_counterclockwise(matrices)
    elif move == 'R':
        return rotate_right_clockwise(matrices)
    elif move == "R'":
        return rotate_right_counterclockwise(matrices)
    elif move == 'F':
        return rotate_front_clockwise(matrices)
    elif move == "F'":
        return rotate_front_counterclockwise(matrices)
    elif move == 'B':
        return rotate_back_clockwise(matrices)
    elif move == "B'":
        return rotate_back_counterclockwise(matrices)
    return matrices  # Return unchanged if move is unrecognized

testAlgorithm(testMatrices)