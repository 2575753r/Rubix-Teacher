# straightforward
# need to identify pattern and keep using the same algorithm until solved
from beginnerMethod.matrixTransformer import *
# todo write logic to create a yellow cross
# First determine shape
# must have front[0, 1] and right [0, 1] be yellow
# Solve from dot
# Solve from L
# Solve from line

def RunYellowCross(matrices, moves):
    matrices, moves = DetermineAlgorithm(matrices, moves)
    return matrices, moves

# Function to determine shape

def DetermineAlgorithm(matrices, moves):

    # Check if the yellow cross is already complete
    if matrices['up'][0][1] == 'y' and matrices['up'][1][0] == 'y' and matrices['up'][1][2] == 'y' and matrices['up'][
        2][1] == 'y':
        print('Yellow Cross Already Solved')
        return matrices, moves

    # Rotate cube until you identify either the L or the horizontal line
    for i in range(4):

        shape = DetermineShape(matrices)
        print('Checking for L')
        if shape == 'L':
            # Perform solution from L
            # F R U R' U' F' y2 F R U R' U' F'
            matrices, moves = PerformAlgorithm(matrices, moves)
            matrices = performYmovement(matrices)
            matrices = performYmovement(matrices)
            moves.append(["Y", "Y"])
            matrices, moves = PerformAlgorithm(matrices, moves)
            break

        elif shape == 'line':
            # Perform solution from line
            # F R U R' U' F'
            matrices, moves = PerformAlgorithm(matrices, moves)
            break

        elif shape == 'dot':
            # Must rotate so front[0, 1] and right[0, 1] are equal to yellow
            for i in range(4):
                if matrices['front'][0][1] == 'y' and matrices['right'][0][1] == 'y':
                    break
                matrices = performYmovement(matrices)
                moves.append('Y')
            matrices, moves = PerformAlgorithm(matrices, moves)
            for i in range(4):
                if matrices['front'][0][1] == 'y' and matrices['right'][0][1] == 'y':
                    break
                matrices = performYmovement(matrices)
                moves.append('Y')
            print("L made")
            matrices, moves = PerformAlgorithm(matrices, moves)
            print("Line made")
            matrices, moves = PerformAlgorithm(matrices, moves)
            print("Finished")
            break

        # Rotate around the cube to look for a shape
        matrices = performYmovement(matrices)
        moves.append('Y')

    return matrices, moves

def PerformAlgorithm(matrices, moves):
    # F R U R' U' F'
    print('Performing Yellow Cross Algorithm')
    printCube(matrices)
    matrices = rotate_front_clockwise(matrices)
    matrices = rotate_right_clockwise(matrices)
    matrices = rotate_up_clockwise(matrices)
    matrices = rotate_right_counterclockwise(matrices)
    matrices = rotate_up_counterclockwise(matrices)
    matrices = rotate_front_counterclockwise(matrices)
    moves.append(['F', 'R', 'U', "R'", "U'", "F'"])
    printCube(matrices)
    return matrices, moves
def DetermineShape(matrices):

    shape = ""
    if matrices['up'][1][0] != 'y' and matrices['up'][0][1] != 'y' and matrices['up'][1][2] != 'y':
        print('Dot identified')
        shape = "dot"
        return shape
    if matrices['up'][1][0] == 'y' and matrices['up'][1][1] == 'y' and matrices['up'][1][2] == 'y':
        print('line identified')
        shape = "line"
        return shape
    if matrices['up'][0][1] == 'y' and matrices['up'][1][0] == 'y' and matrices['up'][2][1] != 'y' and matrices['up'][1][2] != 'y':
        print('L identified')
        shape = "L"
        return shape

    return shape