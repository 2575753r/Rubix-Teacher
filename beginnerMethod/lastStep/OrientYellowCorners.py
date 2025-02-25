# Identify the pattern
# This will indicate which corners are misaligned

# Need to ensure that the front is always the red
# if two yellow places are incorrect and next to each other
# its the big T
# move the cube so that the non yellow top pieces are facing you i.e the front
# Big T can be either opposite yellow i.e the yellow are facing the
# opposite direction
# or
# both facing forward

# If three yellows are out of place then we have the fish
# move so the correct yellow piece is in the top left of the up face
# Two variants of this
# first we have it when the front top left is yellow
# and the other when the front top right is yellow

# if two opposite corners are not yellow on the top we have the diamond
# turn the cube so that up top left and bottom right are yellow whilst
# the otehr corners are not
# then perform algorithm

# if all corners of teh up face are not yellow we have the cross
# perform algorithm until solved

# Finally we need a function to test that the top is fully solved and end
from beginnerMethod.matrixTransformer import *



# There are 4 possible layouts of the cube in its final stage

# Functions
# Determine Layout in Effect
# T shape - This has two variations
# Fish - Two variations
# Diamond - One variation
# Cross - two variations

def DetermineLayout(matrices, moves):

    # T shape and Diamond both have 2 corners in the right place

    # Fish has 1 corner in the right place

    # Cross has 0 corners in the right place

    # rotate around cube and count the corners


    corners = 0

    for i in range(4):
        print(corners)
        print(matrices['up'])
        if matrices['up'][2][2] == "y":
            corners += 1
        matrices = performYmovement(matrices)

    if corners == 2:
        # Rotate cube a max of 4 until a layout is discovered
        for i in range(4):
            if matrices['up'][2][0] != 'y' and matrices['up'][0][2] != 'y':
                print('DIAMOND IDENTIFIED SOLVING')
                matrices, moves = ProcessDiamond(matrices, moves)
                break

            if matrices['up'][2][0] != 'y' and matrices['up'][2][2] != 'y':
                print('T SHAPE IDENTIFIED SOLVING')
                matrices, moves = ProcessT(matrices, moves)
                break
            matrices = performYmovement(matrices)
            moves.append('Y')

    if corners == 1:
        print('FISH IDENTIFIED')

        # Rotate until top left is yellow
        while matrices['up'][0][0] != 'y':
            matrices = performYmovement(matrices)
            moves.append('Y')
        matrices, moves = ProcessFish(matrices, moves)

    if corners == 0:
        print('CROSS IDENTIFIED')
        # Rotate so 2 yellows on the front
        while matrices['front'][0][0] != 'y' and matrices['front'][0][2] != 'y':
            matrices = performYmovement(matrices)
            moves.append('Y')
            print(matrices['front'])
        matrices, moves = Cross(matrices, moves)



    return matrices, moves


def ProcessT(matrices, moves):

    # Two cases for the T
    # Yellow facing front
    # Yellows facing opposite
    print('CHECKING T LAYOUT FOR')
    printCube(matrices)
    if matrices['front'][0][0] == 'y' and matrices['front'][0][2] == 'y':
        print("T WITH YELLOWS FACING FRONT")
        for i in range(4):
            matrices, moves = performAlgorithm(matrices, moves)
        matrices = rotate_up_counterclockwise(matrices)
        moves.append("U'")
        for i in range(2):
            matrices, moves = performAlgorithm(matrices, moves)
        matrices = rotate_up_clockwise(matrices)
        moves.append("U")

    else:
        print("T WITH OPPOSITE YELLOWS IDENTIFIED")
        for i in range(2):
            matrices, moves = performAlgorithm(matrices, moves)
        matrices = rotate_up_counterclockwise(matrices)
        moves.append("U'")
        for i in range(4):
            matrices, moves = performAlgorithm(matrices, moves)
        matrices = rotate_up_clockwise(matrices)
        moves.append("U")
    print('AFTER T PROCESSING')
    printCube(matrices)
    print(moves)
    print("-----------------------------------")

    return matrices, moves

def ProcessFish(matrices, moves):

    # Two case for the fish
    # Yellows turning clockwise
    # Yellows turning counterclockwise

    if matrices['front'][0][2] == 'y':
        print("FISH WITH YELLOWS ROTATING CLOCKWISE")
        for i in range(4):
            matrices, moves = performAlgorithm(matrices, moves)

        matrices = rotate_up_clockwise(matrices)
        moves.append("U")

        for i in range(4):
            matrices, moves = performAlgorithm(matrices, moves)

        matrices = rotate_up_clockwise(matrices)
        moves.append("U")
        matrices = rotate_up_clockwise(matrices)
        moves.append("U")

        for i in range(4):
            matrices, moves = performAlgorithm(matrices, moves)

        matrices = rotate_up_clockwise(matrices)
        moves.append("U")

    else:
        print("FISH WITH YELLOWS ROTATING COUNTERCLOCKWISE")

        for i in range(2):
            matrices, moves = performAlgorithm(matrices, moves)

        matrices = rotate_up_clockwise(matrices)
        moves.append("U")
        for i in range(2):
            matrices, moves = performAlgorithm(matrices, moves)

        matrices = rotate_up_clockwise(matrices)
        moves.append("U")
        matrices = rotate_up_clockwise(matrices)
        moves.append("U")

        for i in range(2):
            matrices, moves = performAlgorithm(matrices, moves)

        matrices = rotate_up_clockwise(matrices)
        moves.append("U")

    return matrices, moves

def ProcessDiamond(matrices, moves):

    print('DIAMOND IDENTIFIED')
    # Only one variation here

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    for i in range(2):
        matrices, moves = performAlgorithm(matrices, moves)

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")
    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    for i in range(4):
        matrices, moves = performAlgorithm(matrices, moves)

    matrices = rotate_up_clockwise(matrices)
    moves.append("U")

    return matrices, moves

def Cross(matrices, moves):
    """
        Final step: Orient last layer corners using R' D' R D.
        """
    print("🔶 Starting Yellow Corner Orientation...")

    # Check each of the four corners
    for _ in range(4):
        # If the corner is already correct (yellow on top), skip it
        while matrices['up'][2][2] != 'y':
            print("🟡 Misaligned corner found, applying R' D' R D...")
            matrices = rotate_right_counterclockwise(matrices)
            matrices = rotate_down_counterclockwise(matrices)
            matrices = rotate_right_clockwise(matrices)
            matrices = rotate_down_clockwise(matrices)
            moves.append(["R'", "D'", "R", "D"])

        # Rotate U to bring the next corner to FRU position
        matrices = rotate_up_clockwise(matrices)
        moves.append("U")

    print("✅ Yellow corners correctly oriented!")
    return matrices, moves



def performAlgorithm(matrices, moves):
    matrices = rotate_right_counterclockwise(matrices)
    matrices = rotate_down_counterclockwise(matrices)
    matrices = rotate_right_clockwise(matrices)
    matrices = rotate_down_clockwise(matrices)
    moves.append(["R'", "D'", "R", "D"])
    return matrices, moves