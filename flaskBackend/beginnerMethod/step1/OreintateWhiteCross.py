# logic for swapping opposites, lefts and rights to make a good white cross
from beginnerMethod.matrixTransformer import *
def oreintateWhiteCross(matrices, moves):
    print('ORIENTATING WHITE CROSS')
    # if front anf back needing to be switched
    # move each face clockwise twice to make the dandelion
    # rotate the up face to align the red corner with the red face then red face clockwise twice
    # Then perform Y and rotate up clockwise until edge matches

    # Rotate all side faces twice to put white on the top
    # Front face
    matrices = rotate_front_clockwise(matrices)
    matrices = rotate_front_clockwise(matrices)
    moves.append(["F", "F"])
    printCube(matrices)
    # Left face
    matrices = rotate_left_clockwise(matrices)
    matrices = rotate_left_clockwise(matrices)
    moves.append(["L", "L"])
    printCube(matrices)

    # Right face
    matrices = rotate_right_clockwise(matrices)
    matrices = rotate_right_clockwise(matrices)
    moves.append(["R", "R"])
    printCube(matrices)

    # Back face
    matrices = rotate_back_clockwise(matrices)
    matrices = rotate_back_clockwise(matrices)
    moves.append(["B", "B"])
    printCube(matrices)

    print('--------------------')
    printCube(matrices)
    print('--------------------')


    # Perform for all faces
    for i in range(4):

        matrices, moves = alignToCorrctPlace(matrices, moves)

        matrices = performYmovement(matrices)
        moves.append(["Y"])


    return matrices, moves

def alignToCorrctPlace(matrices, moves):

    # Rotate top until the edge matches the face, What if its not white though? Need to perform Y move as well
    while matrices['front'][0][1] != matrices['front'][1][1]:
        print('ROTATING around cube ')
        matrices = rotate_up_counterclockwise(matrices)
        matrices = performYmovement(matrices)
        moves.append(["Y", "U'"])

    # Position corner on face
    print('PLACING')
    matrices = rotate_front_clockwise(matrices)
    matrices = rotate_front_clockwise(matrices)
    moves.append(["F", "F"])
    printCube(matrices)
    print('PLACED')

    return(matrices, moves)


