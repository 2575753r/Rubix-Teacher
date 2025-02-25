from beginnerMethod.matrixTransformer import *


# Functions
# Align to down: Moves White from front [0, 1] to free [0, 1] on the down
# Rotate down until [0, 1] is not a 'w'
# Front clockwise
# Down clockwise
# Right counterclockwise
def AlignThirdToDown(matrices, moves):
    print('AlignThirdToDown')
    printCube(matrices)
    # Find free down space
    while matrices['down'][0][1] == 'w':
        matrices = rotate_down_clockwise(matrices)
        moves.append('D')

    # Align to down
    matrices = rotate_front_clockwise(matrices)
    matrices = rotate_down_clockwise(matrices)
    matrices = rotate_right_counterclockwise(matrices)
    moves.append(['F', 'D', "R'"])
    print('Result')
    printCube(matrices)

    return matrices, moves

# AlignFromUpToDown
# Look at up [2, 1]
# Move down until free space
# rotate front clockwise twice

def AlignUpToDown(matrices, moves):
    print('AlignUpToDown')
    printCube(matrices)

    # Find free down space
    while matrices['down'][0][1] == 'w':
        matrices = rotate_down_clockwise(matrices)
        moves.append('D')

    matrices = rotate_front_clockwise(matrices)
    matrices = rotate_front_clockwise(matrices)

    moves.append(['F', 'F'])
    print('Result')
    printCube(matrices)
    return matrices, moves

# Align from front second layer to up
# if on left [1, 0]
# rotate left counterclockwise
# rotate up counterclockwise
# rotate left clockwise
# if on right [1, 2]
# rotate right clockwise
# rotate up clockwise
# rotate right counterclockwise

def AlignFromSecondToUp(matrices, moves, place):
    print('AlignSecondToUP')
    printCube(matrices)

    if place == 'left':
        matrices = rotate_left_counterclockwise(matrices)
        matrices = rotate_up_counterclockwise(matrices)
        matrices = rotate_left_clockwise(matrices)
        moves.append(["L'", "U'", "L"])

    elif place == 'right':
        matrices = rotate_right_clockwise(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_right_counterclockwise(matrices)
        moves.append(["R", "U", "R'"])
    print('Result')
    printCube(matrices)
    matrices, moves = AlignUpToDown(matrices, moves)

    return matrices, moves


# Align from front [2, 1] to front [0, 1]
# rotate front clockwise twice
# perform Align to down from front
def AlignFirstToThird(matrices, moves):
    print('AlignFirstToThird')
    printCube(matrices)
    matrices = rotate_front_clockwise(matrices)
    matrices = rotate_front_clockwise(matrices)

    moves.append(["F", "F"])
    matrices, moves = AlignThirdToDown(matrices, moves)
    print('Result')
    printCube(matrices)
    return matrices, moves


# Runner
# Take count of whites on the bottom
# Rotate around the cube until all aligned
# Look at Up
# Then third
# Then second
# Then first
# Next face
def MakeWhiteCross(matrices, moves):
    downWhiteEdgeCount = CountWhiteEdges(matrices)
    while downWhiteEdgeCount != 4:
        downWhiteEdgeCount = CountWhiteEdges(matrices)
        print(downWhiteEdgeCount)
        if matrices['front'][0][1] == 'w':
            matrices, moves = AlignThirdToDown(matrices, moves)

        if matrices['front'][1][0] == 'w':
            matrices, moves = AlignFromSecondToUp(matrices, moves, 'left')

        if matrices['front'][1][2] == 'w':
            matrices, moves = AlignFromSecondToUp(matrices, moves, 'right')

        if matrices['front'][2][1] == 'w':
            matrices, moves = AlignFirstToThird(matrices, moves)

        if matrices['up'][2][1] == 'w':
            matrices, moves = AlignUpToDown(matrices, moves)


        # Look around cube
        matrices = performYmovement(matrices)
        moves.append('Y')


    return matrices, moves






def CountWhiteEdges(matrices):
    downWhiteEdgeCount = 0
    # determine white edges in place
    if matrices['down'][0][1] == 'w':
        downWhiteEdgeCount += 1
    if matrices['down'][1][0] == 'w':
        downWhiteEdgeCount += 1
    if matrices['down'][1][2] == 'w':
        downWhiteEdgeCount += 1
    if matrices['down'][2][1] == 'w':
        downWhiteEdgeCount += 1
    return downWhiteEdgeCount