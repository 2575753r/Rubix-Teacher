# Test OrientateWhiteCross
from beginnerMethod.step1.OreintateWhiteCross import oreintateWhiteCross
from beginnerMethod.redundant.revisedWhiteCross import *

testMatrices = {
    "up": [
        ["y", "y", "y"],
        ["y", "y", "y"],
        ["y", "y", "y"]
    ],
    "left": [
        ["b", "b", "b"],
        ["b", "b", "b"],
        ["b", "o", "b"]
    ],
    "front": [
        ["r", "r", "r"],
        ["r", "r", "r"],
        ["r", "b", "r"]
    ],
    "right": [
        ["g", "g", "g"],
        ["g", "g", "g"],
        ["g", "r", "g"]
    ],
    "back": [
        ["o", "o", "o"],
        ["o", "o", "o"],
        ["o", "g", "o"]
    ],
    "down": [
        ["w", "w", "w"],
        ["w", "w", "w"],
        ["w", "w", "w"]
    ]
}


moves = []
matrices, moves = makeWhiteCross(testMatrices, moves)
print(moves)
printCube(matrices)

matrices, moves = oreintateWhiteCross(matrices, moves)
if matrices['down'][0][1] == 'w' and matrices['down'][1][0] == 'w' and matrices['down'][1][2] == 'w' and matrices['down'][2][1] == 'w':
    print("Whites in correct place")
else:
    print("orientate white cross test failed 1")

if matrices['front'][2][1] == 'r' and matrices['left'][2][1] == 'b' and matrices['back'][2][1] == 'o' and \
        matrices['right'][2][1] == 'g':
    print("Oreintate white cross test passed")
else:
    print("orientate white cross test failed 2")

printCube(matrices)

