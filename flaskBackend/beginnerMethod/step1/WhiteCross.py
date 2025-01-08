# Get all corners to top level right orientation doesn't matter
from beginnerMethod.matrixTransformer import *

# psuedocode
# Step 1
# Check if corners at on the top
# if not find corners and align them to the top

# use the matrix
# in the correct order


# psuedocode
# Step 1
# Check if corners at on the top
# if not find corners and align them to the top

# use the matrix
# in the correct order
Movelist = []

# dummy matrix

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



def checkForCorners(matrices):

    print('checking for corners')
    faceFree = ['front', 'left', 'right', 'back']
    matrixDown = matrices['down']

    # check down face 'white face' for white edges in correct postion
    if matrixDown[0][1] != 'w':
        faceFree.remove('front')
    if matrixDown[1][0] != 'w':
        faceFree.remove('left')
    if matrixDown[1][2] != 'w':
        faceFree.remove('right')
    if matrixDown[2][1] != 'w':
        faceFree.remove('back')

    if faceFree == []:
        return None

    # return the list of faces that have aligned edges
    print(faceFree)
    return(faceFree)


# What should it output?


def ProcessLayerOne(matrices, faceUsed):
    # front[2][1]
    # left[2][1]
    # right [2][1]
    # back [2][1]

    # Append moves
    moves = []

    if matrices['front'][2][1]=='w':
        # front clockwise
        # down counter clockwise
        # left clockwise
        # down clockwise again to reverse affect

        matrices = rotate_front_clockwise(matrices)
        matrices = rotate_down_counterclockwise(matrices)
        matrices = rotate_left_clockwise(matrices)
        matrices = rotate_down_clockwise(matrices)

        if matrices['down'][0][1] == 'w':
            print('success aligning layer 1 right to white face')

        moves.append(["F", "D'", "L", "D"])


    if matrices['left'][2][1] == 'w':
        # left clockwise
        # down counter clockwise
        # back clockwise
        # down clockwise

        matrices = rotate_left_clockwise(matrices)
        matrices = rotate_down_counterclockwise(matrices)
        matrices = rotate_back_clockwise(matrices)
        matrices = rotate_down_clockwise(matrices)

        if matrices['down'][1][0] == 'w':
            print('success aligning layer 1 left to white face')


        moves.append(["L", "D'", "B", "D"])


    if matrices['right'][2][1] == 'w':
        # right clockwise
        # down counter clockwise
        # front clockwise
        # down clockwise

        matrices = rotate_right_clockwise(matrices)
        matrices = rotate_down_counterclockwise(matrices)
        matrices = rotate_front_clockwise(matrices)
        matrices = rotate_down_clockwise(matrices)

        if matrices['down'][1][2] == 'w':
            print('success aligning layer 1 right to white face')


        moves.append(["R", "D'", "F", "D"])

    if matrices['back'][2][1] == 'w':
        # back clockwise
        # down counter clockwise
        # right clockwise
        # down clockwise

        matrices = rotate_back_clockwise(matrices)
        matrices = rotate_down_counterclockwise(matrices)
        matrices = rotate_right_clockwise(matrices)
        matrices = rotate_down_clockwise(matrices)

        if matrices['down'][2][1] == 'w':
            print('success aligning layer 1 back to white face')


    print('After first layer alignment')
    printCube(matrices)
    print(moves)
    return matrices


# def processLayerTwo(matrices, faceFree, moves):
#
#     # options
#     # will need to use recursion here to check for any new layer 2 pieces
#     # then should check for layer one pieces again to be sure
#     # front - right
#     if matrices['front'][1][2] == ('w'):
#         # Need to align it with a free face
#
#         # if front free rotate down clockwise once
#         # then right counterclockwise
#         # then down counter clockwise
#
#         # if left free rotate down clockwise twice
#         # then right counterclockwise
#         # then down counter clockwise twice
#
#         # if back free rotate down counterclockwise once
#         # then right counterclockwise
#         # then down clockwise once
#
#         # if right free
#         # then right counterclockwise
#
#
#
#     # right - back
#     if matrices['right'][1][2] == ('w'):
#
#         # if front free rotate down clockwise twice
#         # then back counterclockwise
#         # then down clockwise twice
#
#         # if left free rotate down counterclockwise once
#         # then back counterclockwise
#         # then down clockwise once
#
#         # if right free rotate down clockwise once
#         # then right counterclockwise
#         # then down counterclockwise once
#
#         # if back free
#         # back counter clockwise once
#
#
#
#
#
#
#     # back - left
#     # left - front
#
#     # front - left
#     # left - back
#     # back - right
#     # right - front
#
#
#     return
#
# def processThirdLayer(matrices, moves):
#     returnghjd
#
# def processTopLayer(matrices):
#
#     return
def WhiteCross(matrices):
    result = checkForCorners(matrices)
    result = ProcessLayerOne(matrices, result)

WhiteCross(testMatrices)









# def checkLayerOne(matrices, faceUsed):
#
#     # find first corner in wrong place
#
#     # check systematically
#     # Front [2][1] white on front face
#     # Left [2][1] white on left face
#     # Back [2][1] white on back face
#     # Right[2][1] white on right face
#
#     def repositionCubeFirstLayer(matrices, face):
#         # if aligned worng then perform these moves to correct
#
#
#     # if theres a missalignment on the first layer we know that theres a free spot on that face
#     # corresponding to the down face
#     # Rotate front/left/right/back clockwise
#     # Down counter clockwise and then face its on clockwise
#     # Must remember to reverse actions afterwards to ensure cube state remains intact
#
#
#     if matrices['Front'][2][1] == 'white':
#         # white corner on front face 1st layer
#
#


    # used face used to find corners on the down 'white layer' that are open
    # rotate that its on clockwise once
    # if front clockwise it now align with the left
    # if left clockwise it now align with the back
    # if back clockwise it now align with the right
    # if right clockwise it now align with the front






            # Up :  [y, y, y]
            #       [y, y, y]
            #       [y, y, y]
#Left [b, b, b] Front [r, r, r] Right [g,g,g] Back [o, o, o]
#     [b ,b ,b]       [r, r, r]       [g,g,g]      [o, o, o]
#     [b, b, b]       [r, r, r]       [g,g,g]      [o, o, o]
#               down [w, w, w]
#               down [w, w, w]
#                    [w, w, w]


# Step 2
# Extract what face either F, L, R, B has a white corner on it already corresponding to the down face
# and restric movements on that face

# Step 3
# Check layer 1 for white corners
# if so rotate that face clockwise then down to align free space with that face

# Step 3
# Check 2nd layer. rotate down to align with free space then face clockwise
# Find free space on the down face
# Say aligning with the right there is a free space
# Say theres a corner on the R face to the left
# Move down clockwise then right clockwise
# if on the right face aligning to the right
# Move right clockwise 2 then down clockwise then up

# Step 4 layer 3
# Simple align with free face then face clockiwise then perform step 3

# Step 5 up face
# rotate to align with free space then face clockwise 2

# Test

# need to actively update matrix
# Dictionary of matrices

