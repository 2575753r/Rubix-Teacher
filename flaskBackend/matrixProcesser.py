def processMatrices(matrices):
    print('processing matrices')
    face_order = ['up', 'left', 'front', 'right', 'back', 'down']
    cubeLayout = ''.join(extractColours(matrices[face]) for face in face_order)


    return cubeLayout

def extractColours(matrix):

    faceLayout = ''
    for row in matrix:
        for colour in row:
            if colour == 'yellow':
                faceLayout = faceLayout + 'y'
            if colour == 'blue':
                faceLayout = faceLayout + 'b'
            if colour == 'red':
                faceLayout = faceLayout + 'r'
            if colour == 'green':
                faceLayout = faceLayout + 'g'
            if colour == 'orange':
                faceLayout = faceLayout + 'o'
            if colour == 'white':
                faceLayout = faceLayout + 'w'

    return faceLayout