# Swap front to left
# swap left to right
from beginnerMethod.matrixTransformer import *

def applyYellowEdgeSwapAlgorithm(matrices, moves):
    # Perform the algorithm to swap front-top and left-top edges
    matrices = rotate_right_clockwise(matrices)
    moves.append("R")

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    matrices = rotate_right_counterclockwise(matrices)
    moves.append("R'")

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    matrices = rotate_right_clockwise(matrices)
    moves.append("R")

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    matrices = rotate_right_counterclockwise(matrices)
    moves.append("R'")

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    return matrices, moves

def RunOrientateYellowCross(matrices, moves):

    # They can either be opposite their correct piece or next to it
    # Red needs to be opposite orange, with blue to its left and green to its right
    # For example

    # Align front [0, 1] red with correct piece
    # This Works
    matrices, moves = AlignRedToFront(matrices, moves)

    assert (matrices['front'][0][1] == 'r' and matrices['front'][1][1] == 'r')

    # rotate to look at left 'blue face' with orange ont the left
    matrices = performYmovement(matrices)
    moves.append('Y')
    matrices = performYmovement(matrices)
    moves.append('Y')
    matrices = performYmovement(matrices)
    moves.append('Y')

    print('FRONT IS Blue')
    printCube(matrices)
    print("----------------------------")
    # If left is in the right place i.e to the left of the piece on the front
    if matrices['front'][0][1] != 'b':

        assert matrices['front'][0][1] != 'b'
        # Look at left and back for blue
        if matrices['left'][0][1] == 'b':
            # Peform algorithm once
            matrices, moves = applyYellowEdgeSwapAlgorithm(matrices, moves)

        elif matrices['back'][0][1] == 'b':
            # Peform algorithm twice if its opposite the front
            # Need to move to face the orange face first, then

            # Moves to the cube clockwise
            # Front is red
            matrices = performYmovement(matrices)
            # Front is green
            matrices = performYmovement(matrices)
            # front is orange
            matrices = performYmovement(matrices)
            moves.append(['Y', 'Y', 'Y'])

            matrices = rotate_up_clockwise(matrices)
            moves.append('U')
            # Apply opposite switch
            matrices, moves = applyYellowEdgeSwapAlgorithm(matrices, moves)
            matrices = performYmovement(matrices)
            matrices = performYmovement(matrices)
            moves.append(['Y', 'Y'])
            matrices, moves = applyYellowEdgeSwapAlgorithm(matrices, moves)
            print(matrices['front'])

            # Move back to blue face

            # Front is red
            matrices = performYmovement(matrices)
            # Front is green
            matrices = performYmovement(matrices)
            # front is orange
            matrices = performYmovement(matrices)
            moves.append(['Y', 'Y', 'Y'])
            print(matrices['front'])
            assert matrices['front'][0][1] == 'b'







    # Finally check orange
    # Front is red
    matrices = performYmovement(matrices)
    # Front is green
    matrices = performYmovement(matrices)
    # front is orange
    matrices = performYmovement(matrices)
    moves.append(['Y', 'Y', 'Y'])

    if matrices['front'][0][1] != 'o':
        # Peform algorithm once
        matrices, moves = applyYellowEdgeSwapAlgorithm(matrices, moves)

    for i in range(4):
        assert matrices['front'][0][1] == matrices['front'][1][1]
        matrices = performYmovement(matrices)
    return matrices, moves

def AlignRedToFront(matrices, moves):

    # Put the red face to the front
    while matrices['front'][1][1] != 'r':
        matrices = performYmovement(matrices)
        moves.append('Y')

    # Rotate up until red edge on matching the red face
    while matrices['front'][0][1] != 'r':
        matrices = rotate_up_clockwise(matrices)
        moves.append('U')
    print('After Aligning Red to Front')
    printCube(matrices)
    print("----------------------------")
    return matrices, moves