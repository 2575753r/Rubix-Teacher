from beginnerMethod.matrixTransformer import *

def processUp(matrices, moves):
    whiteEdgeFound = False
    processUpMoves = []
    # Should look through the up face for a white edge
    for i in range(4):

        # If there is a white edge
        if matrices["up"][2][1] == 'w':
            whiteEdgeFound = True
            # Rotate down to find a free spot for the white edge
            while (matrices['down'][0][1] == 'w'):

                matrices = rotate_down_clockwise(matrices)
                processUpMoves.append(['D'])

            # Then move edge to down face
            matrices = rotate_front_clockwise(matrices)
            matrices = rotate_front_clockwise(matrices)
            processUpMoves.append(['F'])
            processUpMoves.append(['F'])

        # If no edge found in up [2, 1]
        else:
            print('no')

        # Move entire cube clockwise and process again until we've made a full 360 rotation
        matrices = performYmovement(matrices)


        processUpMoves.append(['Y'])

    if whiteEdgeFound:
        moves.append(processUpMoves)
    print('Moves after up aligned')
    print(moves)
    return matrices, moves

def makeWhiteCross(matrices, moves):

    # Proces all white edges on the up face
    matrices, moves = processUp(matrices, moves)

    # Rotate around cube twice to ensure no edges left
    for i in range(8):
        print('whileCrossIncomplete started')

        # Look at face for white edges
        whiteEdgeFound = checkFaceForEdges(matrices)

        # If there is a white edge on that face align it to [2, 1] then process to down
        if (whiteEdgeFound):
            matrices, moves = alignToDown(matrices, moves)

        # Around the cube and process all the faces
        print('Moving to next face')
        matrices = performYmovement(matrices)

        moves.append(['Y'])

    # Process up again to be safe
    matrices, moves = processUp(matrices, moves)

    # Return red to front
    while(matrices['front'][1][1] != 'r'):
        matrices = performYmovement(matrices)
        moves.append(['Y'])

    return matrices, moves

# Check if the white cross has been made already
def checkDownAlignment(matrices):

    printCube(matrices)

    # If all positions have white ('w'), return False (white cross is complete)
    if (
        matrices['down'][2][1] == 'w' and
        matrices['down'][0][1] == 'w' and
        matrices['down'][1][0] == 'w' and
        matrices['down'][1][2] == 'w'
    ):

        return False
    else:

        return True


# Look at a face and determine if there are edges needing to be processed
def checkFaceForEdges(matrices):

    # print("checking face for edges")
    if matrices['front'][2][1] == 'w':
        return True
    elif matrices['front'][0][1] == 'w':
        return True
    elif matrices['front'][1][0] == 'w':
        return True
    elif matrices['front'][1][2] == 'w':
        return True

    print('No edges found')
    return False

# Moves a piece on the front to front[2, 1]
def alignToDown(matrices, moves):
    print('Performing alignToDown function')

    # Whilst the face has edges to process continue
    edgesRemaining = checkFaceForEdges(matrices)
    while edgesRemaining:

        print("Edges remaining")
        if matrices['front'][2][1] == 'w':
            print("Aligning white edge at front[2][1]")
            matrices, moves = moveToDown(matrices, moves)

        elif matrices['front'][1][0] == 'w':
            print("Aligning white edge at front[1][0]")
            matrices = rotate_front_counterclockwise(matrices)
            moves.append(["F'"])
            matrices, moves = moveToDown(matrices, moves)

        elif matrices['front'][0][1] == 'w':
            print("Aligning white edge at front[0][1]")
            matrices = rotate_front_clockwise(matrices)
            matrices = rotate_front_clockwise(matrices)
            moves.append(["F", "F"])
            matrices, moves = moveToDown(matrices, moves)

        elif matrices['front'][1][2] == 'w':
            print("Aligning white edge at front[1][2]")
            matrices = rotate_front_clockwise(matrices)
            moves.append(["F"])
            matrices, moves = moveToDown(matrices, moves)

        else:
            print("No white edges left on the front face")
            break

        # Update `edgesRemaining` to check if more white edges remain on the front face
        edgesRemaining = checkFaceForEdges(matrices)

    return matrices, moves


# Moves a piece from front[2, 1] to down[0, 1]
def moveToDown(matrices, moves):

    print('performing moveToDown function')

    # Need to check if down is taken, If so rotate down to free space for white
    while matrices['down'][0][1] == 'w':
        matrices = rotate_down_clockwise(matrices)
        moves.append(["D"])

    # Then move white to down space
    matrices = rotate_front_clockwise(matrices)
    matrices = rotate_down_counterclockwise(matrices)
    matrices = rotate_left_clockwise(matrices)
    matrices = rotate_down_clockwise(matrices)
    moves.append(["F", "D'", "L", "D"])

    return matrices, moves
