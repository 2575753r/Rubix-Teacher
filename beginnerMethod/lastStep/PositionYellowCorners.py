# If theres a solved corner in the right side of a face
# rotate with Y and perform algorithm until solved
# If no yellow corner is in the right place
# we need to perform this alogrithm and then perform final stage
from beginnerMethod.matrixTransformer import *
# Rotate cube to correct corner
# if none in correct place perform algortihm from any place
# then check for correct piece and perform from there

# Where there's a correct corner rotate cube with Y to it and perform
# algorithm to correct all other corners


def SwapYellowCorners(matrices, moves):
    print("Before Swap: ", matrices['front'][0][2], matrices['right'][0][0], matrices['up'][2][2])

    moves.append('U')
    matrices = rotate_up_clockwise(matrices)

    moves.append('R')
    matrices = rotate_right_clockwise(matrices)

    moves.append("U'")
    matrices = rotate_up_counterclockwise(matrices)

    moves.append("L'")
    matrices = rotate_left_counterclockwise(matrices)

    moves.append('U')
    matrices = rotate_up_clockwise(matrices)

    moves.append("R'")
    matrices = rotate_right_counterclockwise(matrices)

    moves.append("U'")
    matrices = rotate_up_counterclockwise(matrices)

    moves.append('L')
    matrices = rotate_left_clockwise(matrices)

    print("After Swap: ", matrices['front'][0][2], matrices['right'][0][0], matrices['up'][2][2])

    return matrices, moves


def PositionYellowCorners(matrices, moves):

    # Look for a corner in the right place
    # i.e it should contain a 'y', a front[1, 1] and a right[1,1]
    # then swap the other corners until they all meet this condition as well

    # Rotate around cube to see if you have a correct corner piece if there is one
    # todo if we have a case where there are no correct corners it nees to perform the algorithm then try and find a correct corner again



    # todo somehow its performing an addition y move when searching for start position

    matrices, moves, foundCorner = lookForCorner(matrices, moves)

    if not foundCorner:
        matrices, moves = SwapYellowCorners(matrices, moves)
        matrices, moves, foundCorner = lookForCorner(matrices, moves)


    # todo after this we should have one correct corner
    # Then we need to run the algorithm like normal

    # Peform algorithm until all corners in correct place
    complete = CheckIfComplete(matrices, moves)

    while complete == False:
        print('Not Complete')
        # Perform Algorithm
        matrices, moves = SwapYellowCorners(matrices, moves)
        complete = CheckIfComplete(matrices, moves)

    print('Complete')
    for i in range(4):
        IsCornerInRightPlace(matrices)

    return matrices, moves

def CheckIfComplete(matrices, moves):

    # Copy matrices
    copy = matrices.copy()
    for i in range(4):

        if IsCornerInRightPlace(copy) == False:


            return False

        copy = performYmovement(copy)

    return True
def lookForCorner(matrices, moves):

    print('RUNNING LOOK FOR CORNER')
    foundCorner = False

    for i in range(4):
        check = IsCornerInRightPlace(matrices)
        if(check):
            print('FOUND CORRECT CORNER')
            print(matrices['front'][0][2])
            print(matrices['right'][0][0])
            print(matrices['up'][2][2])
            foundCorner = True
            break
        else:
            print('CORNER NOT FOUND ROTATING')
            matrices = performYmovement(matrices)
            moves.append('Y')

    return matrices, moves, foundCorner
def IsCornerInRightPlace(matrices):
    # Get the expected colors for this corner
    expected_colors = {matrices['front'][1][1], matrices['right'][1][1], matrices['up'][1][1]}

    # Get the actual colors in the corner
    actual_colors = {matrices['front'][0][2], matrices['right'][0][0], matrices['up'][2][2]}

    print('CHECKING CORNER: ', actual_colors)
    print('SHOULD BE: ', expected_colors)
    printCube(matrices)
    print('---------------------')

    if actual_colors == expected_colors:
        print('CORRECT CORNER POSITION')
        print("--------------------")
        return True
    else:
        print('INCORRECT CORNER POSITION')
        return False


