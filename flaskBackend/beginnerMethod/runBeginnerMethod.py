from beginnerMethod.lastStep.OrientYellowCorners import DetermineLayout
from beginnerMethod.lastStep.OrientateYellowCross import RunOrientateYellowCross
from beginnerMethod.lastStep.PositionYellowCorners import PositionYellowCorners
from beginnerMethod.lastStep.yellowCross import RunYellowCross
from beginnerMethod.matrixTransformer import printCube
from beginnerMethod.step1.alignCorners import runCorners
from beginnerMethod.step1.makeWhiteCross import MakeWhiteCross
from beginnerMethod.step1.OreintateWhiteCross import oreintateWhiteCross
from beginnerMethod.step2.LayerTwo import *

def runBegginerMethod(matrices):

    print('running beginner method')
    moves = []

    # Layer 1
    moves.append('Make the white cross')
    matrices, moves = MakeWhiteCross(matrices, moves)
    print('made white cross')

    moves.append('Orientate the white cross with the daisy')
    matrices, moves = oreintateWhiteCross(matrices, moves)


    print(('runnining corners'))
    moves.append('Place the white corners')
    matrices, moves = runCorners(matrices, moves)

    print('After Running Corners')
    printCube(matrices)
    moves.append('Align second layer edges')
    matrices, moves = runSecondLayer(matrices, moves)
    print('After Running Second Layer')
    printCube(matrices)

    moves.append('Make the Yellow Cross')
    matrices, moves = RunYellowCross(matrices, moves)
    print('After Running Yellow Cross')
    printCube(matrices)

    moves.append('Orientate the Yellow Cross')
    matrices, moves = RunOrientateYellowCross(matrices, moves)
    print('After Running Orientate Yellow Cross')
    printCube(matrices)

    moves.append('Position the Yellow Corners')
    print('After Running Orientate Yellow Cross')
    matrices, moves = PositionYellowCorners(matrices, moves)
    printCube(matrices)

    moves.append('Correct the Yellow Corners')
    print('After Running Final Layer Cross')
    matrices, moves = DetermineLayout(matrices, moves)
    printCube(matrices)
    # Layer 3

    moves = processMovesToList(moves)

    print('-------------------------------!!!!!!!!!!')
    print(moves)
    return moves


def processMovesToList(moves):
    """
    Flattens nested lists into a single list of moves.
    """
    flat_moves = []

    def flatten(move_list):
        for move in move_list:
            if isinstance(move, list):
                flatten(move)  # Recursively flatten nested lists
            else:
                flat_moves.append(move)  # Append individual moves

    flatten(moves)

    return flat_moves  # Return a fully flattened list



#
# testMatrices = {
#     "up": [
#         ["w", "o", "o"],
#         ["b", "y", "o"],
#         ["y", "r", "y"]
#     ],
#     "left": [
#         ["r", "y", "r"],
#         ["o", "b", "y"],
#         ["g", "r", "w"]
#     ],
#     "front": [
#         ["g", "g", "b"],
#         ["o", "r", "g"],
#         ["b", "r", "b"]
#     ],
#     "right": [
#         ["r", "g", "w"],
#         ["w", "g", "g"],
#         ["o", "w", "g"]
#     ],
#     "back": [
#         ["b", "w", "g"],
#         ["y", "o", "b"],
#         ["o", "w", "o"]
#     ],
#     "down": [
#         ["r", "y", "y"],
#         ["b", "w", "r"],
#         ["y", "b", "w"]
#     ]
# }
# Present edges
# w, b
# w, o
# w, g
# w, r
# Problem in make white cross
# somehow its creating a duplicate edge

# moves = runBegginerMethod(testMatrices)
