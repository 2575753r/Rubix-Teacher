# Take a string of the cube from the 2d input
# Convert it into each of the 27 individual cubes

# cube in position x = -1, y = -1, z = -1 to x = 1, y = 1 and z = 1

# Cube layout of array

# const defaultCubeState = [
#             // Right, Left, Top, Down, Front, Back
#             ['G', 'R', 'Y', 'W', 'R', 'O'],

# starts at x = -1, y = -1 and z =-1 : bottom left back


# Take the matrcies and build the list of lists accordingly

# It builds the cube from left to right X indicates a move to the next column, Y  indicates a move upards and z indicates a move towards

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

# In our matrices the first cube bottom-left-back has its faces made like so:
# back = back[2, 2]
# left = left[2, 0]
# down = down[2, 0]
# null for other faces [top, front, right]

# All cubes made in X = -1 have no right face
# All cubes Y = -1 have no up face
# All cubes Z = -1 have no front face

def cubeInput(inputMatrices):
    # Mapping full color names to their short forms
    color_map = {
        "yellow": "Y",
        "white": "W",
        "blue": "B",
        "green": "G",
        "red": "R",
        "orange": "O",
    }

    # Convert the matrices to use short form colors
    normalizedMatrices = {
        face: [[color_map.get(color, color) for color in row] for row in inputMatrices[face]]
        for face in inputMatrices
    }

    cubeLayout = []

    # Cube x = -1, y = -1, z =-1 -> 2
    cubeLayout.append(['null', normalizedMatrices['left'][2][0], 'null', normalizedMatrices['down'][2][0], 'null', normalizedMatrices['back'][2][2]])
    cubeLayout.append(['null', normalizedMatrices['left'][2][1], 'null', normalizedMatrices['down'][1][0], 'null', 'null'])
    cubeLayout.append(['null', normalizedMatrices['left'][2][2], 'null', normalizedMatrices['down'][0][0], normalizedMatrices['front'][2][0], 'null'])

    # Cube x = -1, y = 0, z = -1 -> 2
    cubeLayout.append(['null', normalizedMatrices['left'][1][0], 'null', 'null', 'null', normalizedMatrices['back'][1][2]])
    cubeLayout.append(['null', normalizedMatrices['left'][1][1], 'null', 'null', 'null', 'null'])
    cubeLayout.append(['null', normalizedMatrices['left'][1][2], 'null', 'null', normalizedMatrices['front'][1][0], 'null'])

    # Cube x = -1, y = 1, z = -1 -> 1
    cubeLayout.append(['null', normalizedMatrices['left'][0][0], normalizedMatrices['up'][0][0], 'null', 'null', normalizedMatrices['back'][0][2]])
    cubeLayout.append(['null', normalizedMatrices['left'][0][1], normalizedMatrices['up'][1][0], 'null', 'null', 'null'])
    cubeLayout.append(['null', normalizedMatrices['left'][0][2], normalizedMatrices['up'][2][0], 'null', normalizedMatrices['front'][0][0], 'null'])

    # Cube x = 0, y = -1, z = -1 -> 1
    cubeLayout.append(['null', 'null', 'null', normalizedMatrices['down'][2][1], 'null', normalizedMatrices['back'][2][1]])
    cubeLayout.append(['null', 'null', 'null', normalizedMatrices['down'][1][1], 'null', 'null'])
    cubeLayout.append(['null', 'null', 'null', normalizedMatrices['down'][0][1], normalizedMatrices['front'][2][1], 'null'])

    # Cube x = 0, y = 0, z = -1 -> 1
    cubeLayout.append(['null', 'null', 'null', 'null', 'null', normalizedMatrices['back'][1][1]])
    cubeLayout.append(['null', 'null', 'null', 'null', 'null', 'null'])
    cubeLayout.append(['null', 'null', 'null', 'null', normalizedMatrices['front'][1][1], 'null'])

    # Cube x = 0, y = 1, z = -1 -> 1
    cubeLayout.append(['null', 'null', normalizedMatrices['up'][0][1], 'null', 'null', normalizedMatrices['back'][0][1]])
    cubeLayout.append(['null', 'null', normalizedMatrices['up'][1][1], 'null', 'null', 'null'])
    cubeLayout.append(['null', 'null', normalizedMatrices['up'][2][1], 'null', normalizedMatrices['front'][0][1], 'null'])

    # Cube x = 1, y = -1, z = -1 -> 1
    cubeLayout.append([normalizedMatrices['right'][2][2], 'null', 'null', normalizedMatrices['down'][2][2], 'null', normalizedMatrices['back'][2][0]])
    cubeLayout.append([normalizedMatrices['right'][2][1], 'null', 'null', normalizedMatrices['down'][1][2], 'null', 'null'])
    cubeLayout.append([normalizedMatrices['right'][2][0], 'null', 'null', normalizedMatrices['down'][0][2], normalizedMatrices['front'][2][2], 'null'])

    # Cube x = 1, y = 0, z = -1 -> 1
    cubeLayout.append([normalizedMatrices['right'][1][2], 'null', 'null', 'null', 'null', normalizedMatrices['back'][1][0]])
    cubeLayout.append([normalizedMatrices['right'][1][1], 'null', 'null', 'null', 'null', 'null'])
    cubeLayout.append([normalizedMatrices['right'][1][0], 'null', 'null', 'null', normalizedMatrices['front'][1][2], 'null'])

    # Cube x = 1, y = 1, z = -1 -> 1
    cubeLayout.append([normalizedMatrices['right'][0][2], 'null', normalizedMatrices['up'][0][2], 'null', 'null', normalizedMatrices['back'][0][0]])
    cubeLayout.append([normalizedMatrices['right'][0][1], 'null', normalizedMatrices['up'][1][2], 'null', 'null', 'null'])
    cubeLayout.append([normalizedMatrices['right'][0][0], 'null', normalizedMatrices['up'][2][2], 'null', normalizedMatrices['front'][0][2], 'null'])

    return cubeLayout
