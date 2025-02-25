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
        ["/", "/", "/"],
        ["/", "/", "/"],
        ["/", "/", "/"]
    ],
    "left": [
        ["/", "/", "/"],
        ["/", "/", "w"],
        ["/", "w", "/"]
    ],
    "front": [
        ["/", "/", "/"],
        ["/", "/", "/"],
        ["/", "w", "/"]
    ],
    "right": [
        ["/", "/", "/"],
        ["/", "/", "w"],
        ["/", "/", "/"]
    ],
    "back": [
        ["/", "/", "/"],
        ["/", "/", "/"],
        ["/", "/", "/"]
    ],
    "down": [
        ["/", "/", "/"],
        ["/", "w", "/"],
        ["/", "/", "/"]
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

# todo remove from free corners once a piece is placed
def AlignFaceWithFreeSpot(matrices, face, free_space, moves):
    faces = ['front', 'left', 'right', 'back']

    # if face == faceFree: no moves needed on down face
    # todo  make this so that if it equals any value in free_spaces
    if face in free_space:

        # Remove the free space from the free_spaces
        free_space.remove(face)
        return matrices, moves, free_space

    # Calculate how many moves are needed to align the free spot
    start_index = faces.index(face)
    target_index = faces.index(free_space[0])

    # Calculate circular distance
    distance = ((target_index - start_index) % len(faces)) + 1

    # Rotate down face to align with free spot
    for i in range(distance):
        matrices = rotate_down_clockwise(matrices)
        moves.append(['D'])

    # if there is a misalignment
    # rotate down face the distance from those faces in the list
    # then 2nd/3rd and up layer functions perform logic
    # perform face free again and reassign
    print('Position of white corner: ', face)
    print('Free space removed: ', free_space[0])
    free_space.remove(free_space[0])
    print('Remaining free spaces: ',free_space)
    print('Faces aligned with free space requiring: ',distance,' down clockwise moves')


    return matrices, moves, free_space, distance
def ProcessLayerOne(matrices, moves):
    # Append moves


    if matrices['front'][2][1]=='w':

        matrices = rotate_front_clockwise(matrices)
        matrices = rotate_down_counterclockwise(matrices)
        matrices = rotate_left_clockwise(matrices)
        matrices = rotate_down_clockwise(matrices)

        if matrices['down'][0][1] == 'w':
            print('success aligning layer 1 right to white face')

        moves.append(["F", "D'", "L", "D"])



    if matrices['left'][2][1] == 'w':

        matrices = rotate_left_clockwise(matrices)
        matrices = rotate_down_counterclockwise(matrices)
        matrices = rotate_back_clockwise(matrices)
        matrices = rotate_down_clockwise(matrices)

        if matrices['down'][1][0] == 'w':
            print('success aligning layer 1 left to white face')


        moves.append(["L", "D'", "B", "D"])


    if matrices['right'][2][1] == 'w':

        matrices = rotate_right_clockwise(matrices)
        matrices = rotate_down_counterclockwise(matrices)
        matrices = rotate_front_clockwise(matrices)
        matrices = rotate_down_clockwise(matrices)

        if matrices['down'][1][2] == 'w':
            print('success aligning layer 1 right to white face')


        moves.append(["R", "D'", "F", "D"])

    if matrices['back'][2][1] == 'w':

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

def LayerTwo(matrices, moves):
    free_spaces = checkForCorners(matrices)

    if matrices['front'][1][2] == 'w':
        face = 'front'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_front_clockwise(matrices)
        moves.append(['F'])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['left'][1][2] == 'w':
        face = 'left'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_left_clockwise(matrices)
        moves.append(['L'])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['right'][1][2] == 'w':
        face = 'right'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_right_clockwise(matrices)
        moves.append(['R'])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['back'][1][2] == 'w':
        face = 'back'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_back_clockwise(matrices)
        moves.append(['B'])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['front'][0][1] == 'w':
        face = 'front'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_front_counterclockwise(matrices)
        moves.append(["F'"])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['left'][0][1] == 'w':
        face = 'left'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_left_counterclockwise(matrices)
        moves.append(["L'"])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['right'][0][1] == 'w':
        face = 'right'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_right_counterclockwise(matrices)
        moves.append(["R'"])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['back'][0][1] == 'w':
        face = 'back'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_back_counterclockwise(matrices)
        moves.append(["B'"])
        matrices, moves = ProcessLayerOne(matrices, moves)  # Pass moves
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    return matrices, moves, free_spaces


def LayerThree(matrices, moves):
    free_spaces = checkForCorners(matrices)

    if matrices['front'][1][2] == 'w':
        face = 'front'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_front_clockwise(matrices)
        moves.append(['F'])
        matrices = rotate_front_clockwise(matrices)  # Second clockwise rotation
        moves.append(['F'])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['left'][1][2] == 'w':
        face = 'left'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_left_clockwise(matrices)
        moves.append(['L'])
        matrices = rotate_left_clockwise(matrices)  # Second clockwise rotation
        moves.append(['L'])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['right'][1][2] == 'w':
        face = 'right'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_right_clockwise(matrices)
        moves.append(['R'])
        matrices = rotate_right_clockwise(matrices)  # Second clockwise rotation
        moves.append(['R'])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['back'][1][2] == 'w':
        face = 'back'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_back_clockwise(matrices)
        moves.append(['B'])
        matrices = rotate_back_clockwise(matrices)  # Second clockwise rotation
        moves.append(['B'])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['front'][0][1] == 'w':
        face = 'front'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_front_counterclockwise(matrices)
        moves.append(["F'"])
        matrices = rotate_front_counterclockwise(matrices)  # Second counterclockwise rotation
        moves.append(["F'"])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['left'][0][1] == 'w':
        face = 'left'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_left_counterclockwise(matrices)
        moves.append(["L'"])
        matrices = rotate_left_counterclockwise(matrices)  # Second counterclockwise rotation
        moves.append(["L'"])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['right'][0][1] == 'w':
        face = 'right'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_right_counterclockwise(matrices)
        moves.append(["R'"])
        matrices = rotate_right_counterclockwise(matrices)  # Second counterclockwise rotation
        moves.append(["R'"])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    if matrices['back'][0][1] == 'w':
        face = 'back'
        matrices, moves, free_spaces, distance = AlignFaceWithFreeSpot(matrices, face, free_spaces, moves)
        matrices = rotate_back_counterclockwise(matrices)
        moves.append(["B'"])
        matrices = rotate_back_counterclockwise(matrices)  # Second counterclockwise rotation
        moves.append(["B'"])
        matrices, moves = ProcessLayerOne(matrices, moves)
        for i in range(distance):
            matrices = rotate_down_counterclockwise(matrices)
            moves.append(["D'"])

    return matrices, moves, free_spaces


def UpLayer(matrices, moves):
    free_spaces = checkForCorners(matrices)
    def AlignUpLayerFreeSpace(matrices, moves, face, free_space):
        faces = ['front', 'left', 'right', 'back']

        if face in free_space:

            return matrices, moves
        # Calculate how many moves are needed to align the free spot
        start_index = faces.index(face)
        target_index = faces.index(free_space[0])

        # Calculate circular distance
        distance = ((target_index - start_index) % len(faces)) + 1

        # Rotate down face to align with free spot
        for i in range(distance):
            matrices = rotate_down_clockwise(matrices)
            moves.append(['D'])

        return matrices, moves, face


    return

# end of aligning white cross
# then next we oreintate the white cross


moves = []
matrices, moves = ProcessLayerOne(testMatrices, moves)

matrices, moves, free_spaces = LayerTwo(matrices, moves)

print('Final moves: ', moves)
print('Free spaces remaining: ', free_spaces)
printCube(matrices)


# Checks all first layer and aligns them with free spot
# 2nd layer make it to first layer then run first layer again and align
# 3rd layer make it first layer then align
# Up layer make it align with free then rotate to Down layer








