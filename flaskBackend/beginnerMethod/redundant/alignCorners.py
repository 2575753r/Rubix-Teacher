from beginnerMethod.matrixTransformer import *

# Determines which corners are missing
def determineMissingCorners(matrices):
    facesOutOfPosition = []

    # Check white-red-blue
    if not (matrices['down'][0][0] == 'w' and matrices['front'][2][0] == 'r' and matrices['left'][2][2] == 'b'):
        facesOutOfPosition.append(['w', 'r', 'b'])

    # Check white-red-green
    if not (matrices['down'][0][2] == 'w' and matrices['front'][2][2] == 'r' and matrices['right'][2][0] == 'g'):
        facesOutOfPosition.append(['w', 'r', 'g'])

    # Check white-blue-orange
    if not (matrices['down'][2][0] == 'w' and matrices['left'][2][0] == 'b' and matrices['back'][2][2] == 'o'):
        facesOutOfPosition.append(['w', 'b', 'o'])

    # Check white-orange-green
    if not (matrices['down'][2][2] == 'w' and matrices['back'][2][0] == 'o' and matrices['right'][2][2] == 'g'):
        facesOutOfPosition.append(['w', 'o', 'g'])

    return facesOutOfPosition


# Handles solving white corners across all faces
def solveWhiteCorners(matrices, moves):
    # Get all missing corners
    corners_out_of_position = determineMissingCorners(matrices)

    for corner in corners_out_of_position:
        matrices, moves = findWhiteCorner(matrices, moves, corner)

    return matrices, moves


# Finds the specific white corner and processes it
def findWhiteCorner(matrices, moves, corner):
    # Look on the down face first
    matrices, moves = lookAtDownFace(matrices, moves, corner)

    # If not found on the down face, look at layer one of each face
    for _ in range(4):  # Rotate through each face
        matrices, moves = lookAtLayerOneOfFace(matrices, moves, corner)
        matrices = performYmovement(matrices)  # Rotate the cube

    # If still not found, it must be on the up face
    matrices, moves = lookAtUpFace(matrices, moves, corner)

    return matrices, moves


def lookAtDownFace(matrices, moves, corner):
    # Check all four corners of the down face
    if matrices['down'][0][0] == 'w':
        if (matrices['front'][2][0] in corner and matrices['left'][2][2] in corner):
            # Move to layer 2 (top)
            matrices = rotate_front_counterclockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_front_clockwise(matrices)
            matrices, moves = solveLayerTwo(matrices, moves)

    elif matrices['down'][0][2] == 'w':
        if (matrices['front'][2][2] in corner and matrices['right'][2][0] in corner):
            matrices = rotate_front_clockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_front_counterclockwise(matrices)
            matrices, moves = solveLayerTwo(matrices, moves)

    elif matrices['down'][2][0] == 'w':
        if (matrices['left'][2][0] in corner and matrices['back'][2][2] in corner):
            matrices = rotate_left_clockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_left_counterclockwise(matrices)
            matrices, moves = solveLayerTwo(matrices, moves)

    elif matrices['down'][2][2] == 'w':
        if (matrices['back'][2][0] in corner and matrices['right'][2][2] in corner):
            matrices = rotate_back_clockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_back_counterclockwise(matrices)
            matrices, moves = solveLayerTwo(matrices, moves)

    return matrices, moves


def lookAtLayerOneOfFace(matrices, moves, corner):
    # Check corners in layer one of the front face
    if matrices['front'][2][0] == 'w':
        if (matrices['down'][0][0] in corner and matrices['left'][2][2] in corner):
            matrices = rotate_front_clockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices, moves = solveLayerTwo(matrices, moves)

    elif matrices['front'][2][2] == 'w':
        if (matrices['down'][0][2] in corner and matrices['right'][2][0] in corner):
            matrices = rotate_front_counterclockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices, moves = solveLayerTwo(matrices, moves)

    return matrices, moves


def lookAtUpFace(matrices, moves, corner):
    # Check all four corners of the up face
    if matrices['up'][0][0] == 'w':
        if matrices['front'][0][0] in corner and matrices['left'][0][2] in corner:
            # Align and solve
            matrices = rotate_left_clockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_left_counterclockwise(matrices)

    elif matrices['up'][0][2] == 'w':
        if matrices['front'][0][2] in corner and matrices['right'][0][0] in corner:
            matrices = rotate_right_counterclockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_right_clockwise(matrices)

    elif matrices['up'][2][0] == 'w':
        if matrices['back'][0][2] in corner and matrices['left'][0][0] in corner:
            matrices = rotate_left_counterclockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_left_clockwise(matrices)

    elif matrices['up'][2][2] == 'w':
        if matrices['back'][0][0] in corner and matrices['right'][0][2] in corner:
            matrices = rotate_right_clockwise(matrices)
            matrices = rotate_up_clockwise(matrices)
            matrices = rotate_right_counterclockwise(matrices)

    return matrices, moves


def solveLayerTwo(matrices, moves):
    # Solve white corners in the second layer
    for _ in range(4):
        if matrices['front'][0][0] == 'w':
            matrices = rotate_left_counterclockwise(matrices)
            matrices = rotate_up_counterclockwise(matrices)
            matrices = rotate_left_clockwise(matrices)
        matrices = performYmovement(matrices)

    return matrices, moves
