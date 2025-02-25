# Should be straight forward
# Identify corners in incorrect postion
# identify corner to swap with
from beginnerMethod.matrixTransformer import *

def performrightAlignment(matrices, moves):

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")
    matrices = rotate_right_clockwise(matrices)
    moves.append("R")
    matrices = rotate_up_counterclockwise(matrices)
    moves.append("U'")
    matrices = rotate_right_counterclockwise(matrices)
    moves.append("R'")
    matrices = rotate_up_counterclockwise(matrices)
    moves.append("U'")
    matrices = rotate_front_counterclockwise(matrices)
    moves.append("F'")
    matrices = rotate_up_clockwise(matrices)
    moves.append("U")
    matrices = rotate_front_clockwise(matrices)
    moves.append("F")
    return matrices, moves


def performleftAlignment(matrices, moves):

    matrices = rotate_up_counterclockwise(matrices)
    moves.append("U'")

    matrices = rotate_left_counterclockwise(matrices)
    moves.append("L'")

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    matrices = rotate_left_clockwise(matrices)
    moves.append("L")

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    matrices = rotate_front_clockwise(matrices)
    moves.append("F")

    matrices = rotate_up_counterclockwise(matrices)
    moves.append("U'")

    matrices = rotate_front_counterclockwise(matrices)
    moves.append("F'")

    return matrices, moves


# Look at Up[2, 1]
# Look for and extract mislaigned pieces
# Extract it
def ExtractMisaligned(matrices, moves):
    print('EXTRACTING MISALIGNED')

    # Identify if the piece is misaligned on the left
    if matrices['front'][1][0] != matrices['front'][1][1] and matrices['front'][1][0] != 'y' and matrices['left'][1][2] != 'y':
        print('LEFT MISALIGNED')

        # find free top space
        for i in range(4):
            if matrices['front'][0][1] == 'y' or matrices['up'][2][1] == 'y':
                break

            # Continue to rotate top until found free space
            matrices = rotate_up_clockwise(matrices)
            moves.append('U')

        # Swap piece out to top
        matrices, moves = performleftAlignment(matrices, moves)
        printCube(matrices)

    # Identify if the piece is misaligned on the right
    if matrices['front'][1][2] != matrices['front'][1][1] and matrices['front'][1][2] != 'y' and matrices['right'][1][0] != 'y':
        # find free top space
        for i in range(4):
            if matrices['front'][0][1] == 'y' or matrices['up'][2][1] == 'y':
                print('EXTRACTING WHILE LOOP')
                break
            matrices = rotate_up_clockwise(matrices)
            moves.append('U')

        matrices, moves = performrightAlignment(matrices, moves)
        printCube(matrices)

    return matrices, moves
def runSecondLayer(matrices, moves):

    print('RUNNING SECOND LAYER')
    # Go around cube extracting all misaligned edges to free space
    # This works perfectly
    for i in range(8):
        matrices, moves = ExtractMisaligned(matrices, moves)
        matrices = performYmovement(matrices)
        moves.append('Y')

    # Align edges to correct space
    for i in range(8):
        print("FINDING SPACE FOR: ",matrices['up'][2][1], " :", matrices['front'][0][1])
        printCube(matrices)
        # Look left and right to see if it can be aligned
        # Max the loop to 4 rotations
        for i in range(4):

            if matrices['up'][2][1] == matrices['left'][1][1] and matrices['front'][0][1] == matrices['front'][1][1]:
                print('FOUND SPACE ON THE LEFT ', matrices['right'][1][1], " :", matrices['front'][1][1])
                printCube(matrices)
                matrices, moves = performleftAlignment(matrices, moves)
                print('After alignment')
                printCube(matrices)

                break

            elif matrices['up'][2][1] == matrices['right'][1][1] and matrices['front'][0][1] == matrices['front'][1][1]:

                print('FOUND SPACE ON THE RIGHT ',matrices['right'][1][1], " :", matrices['front'][1][1])
                printCube(matrices)
                matrices, moves = performrightAlignment(matrices, moves)
                print('After alignment')
                printCube(matrices)

                break

            matrices = rotate_up_clockwise(matrices)
            moves.append(["U"])
        matrices = performYmovement(matrices)
        moves.append(["Y"])

    return matrices, moves


