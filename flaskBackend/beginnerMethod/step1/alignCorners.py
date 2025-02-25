
from beginnerMethod.matrixTransformer import *

# If

# solve from third
# if on first move to third#
# If on up move to third - left/right once then up once then reverse
# Finally if on down misaligned left/right, rotate to third solve

def runCorners(matrices, moves):
    movePatterns = []
    # Process face
    # look front 0,1 1,0 1,2 2,1
    # move to third align and perform

    # Loop around the cube performing Y moves until you Have done 4 rotations without finding a white on the front and up
    # Look at down face extract mislaigned piece and solve it


    fullRotation = 0
    # todo fix this
    # So no matter how many rotations it always leaves whites on the third layer
    while fullRotation != 8:
        print(fullRotation)
        # Look at third
        if matrices['front'][0][0] == 'w':

            matrices, moves = AlignFromThird(matrices, moves, 'left')
            fullRotation = 0

        if matrices['front'][0][2] == 'w':

            matrices, moves = AlignFromThird(matrices, moves, 'right')
            fullRotation = 0

        # Look at first
        if matrices['front'][2][0] == 'w':
            print('FOUND WHITE ON FIRST LEFT')
            matrices, moves = AlignFromFirstToThird(matrices, moves, 'left', movePatterns)
            fullRotation = 0

        if matrices['front'][2][2] == 'w':
            matrices, moves = AlignFromFirstToThird(matrices, moves, 'right', movePatterns)
            print('FOUND WHITE ON FIRST LEFT')
            fullRotation = 0

        #Look at Up
        # todo issue with this part fix required
        elif matrices['up'][2][0] == 'w':
            print('FOUND WHITE UP LEFT')
            matrices, moves = AlignFromUpToThird(matrices, moves, 'left', movePatterns)
            fullRotation = 0

        elif matrices['up'][2][2] == 'w':
            print('FOUND WHITE ON UP RIGHT')
            printCube(matrices)
            matrices, moves = AlignFromUpToThird(matrices, moves, 'right', movePatterns)
            printCube(matrices)
            fullRotation = 0

        # # Check and process down
        elif matrices['down'][0][0] == 'w' and matrices['front'][2][0] != matrices['front'][1][1]:
            print('FOUND MISALIGNED WHITE ON DOWN LEFT')
            matrices, moves = AlignFromDownToThird(matrices, moves, 'left', movePatterns)
            fullRotation = 0

        elif matrices['down'][0][2] == 'w' and matrices['front'][2][2] != matrices['front'][1][1]:
            printCube(matrices)
            print('FOUND MISALIGNED WHITE ON DOWN RIGHT')
            matrices, moves = AlignFromDownToThird(matrices, moves, 'right', movePatterns)
            fullRotation = 0

        matrices = performYmovement(matrices)

        moves.append(['Y'])
        fullRotation += 1

    return matrices, moves


# Look at down layer to see if a piece is unaligned
def AlignFromDownToThird(matrices, moves, place, movePattern):

    # Look at down[0,0] and down[0, 2]
    if place == 'left':
        matrices = rotate_left_counterclockwise(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_left_clockwise(matrices)

        moves.append(["L'", "U", "U", "L"])

    elif place == 'right':
        matrices = rotate_right_clockwise(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_right_counterclockwise(matrices)

        moves.append(["R", "U", "U", "R'"])


    # todo is this fine, yes
    return matrices, moves
# Would need to extract it using a piece free place on the down face
# Or an misaligned piece on the down face
# For Up [2, 0] / Up[2, 2] just move to up 2,0
# Rotate bottom until
def AlignFromUpToThird(matrices, moves, place, movePattern):

    if place == 'right':
        assert matrices['up'][2][2] == 'w'

        matrices = rotate_up_clockwise(matrices)
        moves.append('U')
        assert matrices['up'][2][0] == 'w'
        # todo is this right?, yes

    # Just move from up to third
    # If there's a white on the top then there must be a free corner on the down
    # Rotate to free corner
    for i in range(4):
        if matrices['down'][0][0] != 'w':
            break
        matrices = performYmovement(matrices)
        matrices = rotate_up_counterclockwise(matrices)
        moves.append(['Y', "U'"])

    # Extract to third
    matrices = rotate_left_counterclockwise(matrices)
    matrices = rotate_up_clockwise(matrices)

    matrices = rotate_left_clockwise(matrices)
    # assert matrices['front'][0][2] == 'w'
    print('EXTRACTING UP ')
    moves.append(["L'", "U", "L"])

    return matrices, moves

def AlignFromFirstToThird(matrices, moves, place, movePatterns):

    if place == 'left': # front [2,0]

        # Extract
        matrices = rotate_front_clockwise(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_front_counterclockwise(matrices)
        matrices = rotate_up_counterclockwise(matrices)

        moves.append(["F", "U", "F'", "U'"])


        assert matrices['front'][0][0] == 'w'


        # Print results
        print("Test passed! The corner is correctly aligned from left third to down [0,0].")
        print("Moves performed:", moves)

        printCube(matrices)
        matrices, moves = AlignFromThird(matrices, moves, 'left')

        # todo is this right? yes

    elif place == 'right':  # front [2, 2]

        # Extract
        matrices = rotate_front_counterclockwise(matrices)
        matrices = rotate_up_counterclockwise(matrices)
        matrices = rotate_front_clockwise(matrices)
        matrices = rotate_up_clockwise(matrices)

        moves.append(["F'", "U'", "F", "U"])
        assert matrices['front'][0][2] == 'w'

        matrices, moves = AlignFromThird(matrices, moves, 'right')
        # todo is this right? yes


    return matrices, moves
def AlignFromThird(matrices, moves, place):

    if place == 'left': # front [0,0]

        # Rotate around cube until left 0,2 matches left 1,1 then place
        while matrices['left'][0][2] != matrices['left'][1][1] and matrices['up'][2][0] != matrices['front'][1][1]:
            print("ALIGN FROM THIRD LEFT LOOPING")
            matrices = performYmovement(matrices)
            matrices = rotate_up_counterclockwise(matrices)
            moves.append(['Y', "U'"])

        # Place Corner
        matrices = rotate_up_counterclockwise(matrices)
        matrices = rotate_left_counterclockwise(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_left_clockwise(matrices)

        # Test align from third left
        # After this move matrices
        # Left [2, 2] should equal [1, 1]
        # And front [2, 0] should equal
        # front [1, 1]
        # and down [0, 0] should be white

        assert matrices['left'][2][2] == matrices['left'][1][1], "Left corner not aligned"
        assert matrices['front'][2][0] == matrices['front'][1][1], "Front corner not aligned"
        assert matrices['down'][0][0] == 'w', "White piece is not at the correct down position"

        # Print results
        print("Test passed! The corner is correctly aligned from left third to down [0,0].")
        print("Moves performed:", moves)

        moves.append(["U'", "L'", "U", "L"])

    elif place == 'right':  # front [0, 2]

        assert matrices['front'][0][2] == 'w'
        # Rotate around cube until right 0,0 matches right 1,1 then place
        while matrices['right'][0][0] != matrices['right'][1][1] and matrices['up'][2][2] != matrices['front'][1][1]:
            print("ALIGN FROM THIRD RIGHT LOOPING")
            matrices = performYmovement(matrices)
            matrices = rotate_up_counterclockwise(matrices)
            print('move')
            printCube(matrices)
            moves.append(['Y', "U'"])
            # todo is this right? yes

        # Place Corner
        printCube(matrices)
        matrices = rotate_up_clockwise(matrices)
        matrices = rotate_right_clockwise(matrices)
        matrices = rotate_up_counterclockwise(matrices)
        matrices = rotate_right_counterclockwise(matrices)

        assert matrices['right'][2][0] == matrices['right'][1][1], "Left corner not aligned"
        assert matrices['front'][2][2] == matrices['front'][1][1], "Front corner not aligned"
        assert matrices['down'][0][2] == 'w', "White piece is not at the correct down position"

        # Print results
        print("Test passed! The corner is correctly aligned from left third to down [0,0].")
        print("Moves performed:", moves)



        moves.append(["U", "R", "U'", "R'"])

    return matrices, moves

