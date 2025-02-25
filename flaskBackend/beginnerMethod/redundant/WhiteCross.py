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

    print('checking for free corners on down face')
    faceFree = ['front', 'left', 'right', 'back']
    matrixDown = matrices['down']

    # check down face 'white face' for white edges in correct postion
    if matrixDown[0][1] == 'w':
        faceFree.remove('front')
    if matrixDown[1][0] == 'w':
        faceFree.remove('left')
    if matrixDown[1][2] == 'w':
        faceFree.remove('right')
    if matrixDown[2][1] == 'w':
        faceFree.remove('back')

    if faceFree == []:
        return None

    # return the list of faces that have aligned edges
    print(faceFree)
    return(faceFree)

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

        moves.append(["B'", "D'", "L'", "D"])

    print('After first layer alignment')
    printCube(matrices)
    print(moves)
    return matrices, moves


def processLayerTwo(matrices, moves):
    # Check for free spaces on the bottom face
    free_faces = checkForCorners(matrices)

    # if the left face has a white piece, then the down must be moved the amount of faces away from the
    # face with the free spot +1 and then the face counterclockwise and then reverese the effects

    def calculateDistance(face, free_face):

        start_index = faces.index(face)
        target_index = faces.index(free_face)

        # Calculate circular distance
        distance = (target_index - start_index) % len(faces)

        return distance + 1

    def rotateDownClockwise(matrices, distance, moves):
        print('rotating this many times: ', distance)
        for i in range (distance):
            matrices = rotate_down_clockwise(matrices)
            moves.append(['D'])

        return matrices, moves

    def rotateDownCounterClockwise(matrices, distance, moves):
        print('rotating this many times: ', distance)
        for i in range (distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

        return matrices, moves

    # Iterate through each face (Front, Left, Right, Back) to check for corners
    faces = ['left', 'front', 'right', 'back']

    for face in faces:
        print('Processing face: ', face)

        # First we look for corners aligning to the right of that face that are misaligned
        if matrices[face][1][2] == 'w':

            print('Identified misaligned corner on the right side of: ',face)
            if 'left' in free_faces:

                print('left face free')
                # Calculate distance
                distance = calculateDistance(face, 'left')

                # Rotate down distance clockwise
                matrices, moves = rotateDownClockwise(matrices, distance, moves)

                # Align piece
                matrices = rotate_front_counterclockwise(matrices)
                moves.append(["F''"])

                # Rotate down distance counterclockwise
                print('Rotating down counter clockwise')
                free_faces.remove('left')
                matrices, moves = rotateDownCounterClockwise(matrices, distance, moves)
                break

            if 'front' in free_faces:

                print('front face free')
                # Calculate distance
                distance = calculateDistance(face, 'front')

                # Rotate down distance clockwise
                matrices, moves = rotateDownClockwise(matrices, distance, moves)

                # Align piece
                matrices = rotate_right_counterclockwise(matrices)
                moves.append(["R'"])
                free_faces.remove('front')
                # Rotate down distance counterclockwise
                matrices, moves = rotateDownCounterClockwise(matrices, distance, moves)
                break

            if 'right' in free_faces:
                print('right face free')
                # Calculate distance
                distance = calculateDistance(face, 'right')

                # Rotate down distance clockwise
                matrices, moves = rotateDownClockwise(matrices, distance, moves)

                # Align piece
                matrices = rotate_back_counterclockwise(matrices)
                moves.append(["B'"])
                free_faces.remove('left')
                # Rotate down distance counterclockwise
                matrices, moves = rotateDownCounterClockwise(matrices, distance, moves)
                break

            if 'Back' in free_faces:
                print('back face free')
                # Calculate distance
                distance = calculateDistance(face, 'Back')

                # Rotate down distance clockwise
                matrices, moves = rotateDownClockwise(matrices, distance, moves)

                # Align piece
                matrices = rotate_left_counterclockwise(matrices)
                moves.append(["L'"])

                # Rotate down distance counterclockwise
                matrices, moves = rotateDownCounterClockwise(matrices, distance, moves)
                break

        # todo problem fix:




        # if matrices[face][1][0] == 'w':  #
        #
        #     if 'left' in free_faces:
        #         matrices = rotate_down_counterclockwise(matrices)
        #         matrices = rotate_left_counterclockwise(matrices)
        #         moves.append(["D'", "L'"])
        #     elif 'back' in free_faces:
        #         matrices = rotate_down_counterclockwise(matrices)
        #         matrices = rotate_back_counterclockwise(matrices)
        #         moves.append(["D'", "B'"])
        #     elif 'right' in free_faces:
        #         matrices = rotate_down_counterclockwise(matrices)
        #         matrices = rotate_right_counterclockwise(matrices)
        #         moves.append(["D'", "R'"])
        #     elif 'front' in free_faces:
        #         matrices = rotate_down_counterclockwise(matrices)
        #         matrices = rotate_front_counterclockwise(matrices)
        #         moves.append(["D'", "F'"])

    # After processing all faces, return the updated cube and moves
    print('After processing layer two:')
    printCube(matrices)
    print('Moves:', moves)
    return matrices, moves


def processLayerThree(matrices, moves):
    faces = ['front', 'left', 'right', 'back']

    for face in faces:
        if matrices[face][0][1] == 'w':  # Check if white edge is in the third layer

            # Align the edge with its center color
            while matrices['up'][1][1] != matrices[face][1][1]:  # Align centers
                matrices = rotate_up_clockwise(matrices)
                moves.append("U")

            # Move the white edge to the down face
            if face == 'front':
                matrices = rotate_front_clockwise(matrices)
                moves.append("F")
            elif face == 'left':
                matrices = rotate_left_clockwise(matrices)
                moves.append("L")
            elif face == 'right':
                matrices = rotate_right_clockwise(matrices)
                moves.append("R")
            elif face == 'back':
                matrices = rotate_back_clockwise(matrices)
                moves.append("B")

    print("Moves for third layer:", moves)
    return matrices, moves


def WhiteCross(matrices):
    result = checkForCorners(matrices)

    result, moves = ProcessLayerOne(matrices, result)
    result, moves = processLayerTwo(result, moves)
    # result, moves = processLayerThree(result, moves)
    print(result)
    print(moves)

WhiteCross(testMatrices)











