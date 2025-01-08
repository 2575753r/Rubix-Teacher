import copy

# Rotate a matrix clockwise
def rotate_face_clockwise(matrix):
    return [list(row) for row in zip(*matrix[::-1])]

# Rotate a matrix counterclockwise
def rotate_face_counterclockwise(matrix):
    return [list(row) for row in zip(*matrix)][::-1]

# Rotate the 'up' face clockwise
def rotate_up_counterclockwise(cube):
    cube = copy.deepcopy(cube)
    cube['up'] = rotate_face_counterclockwise(cube['up'])
    cube['front'][0], cube['right'][0], cube['back'][0], cube['left'][0] = (
        cube['left'][0],
        cube['front'][0],
        cube['right'][0],
        cube['back'][0],
    )

    return cube

# Rotate the 'up' face counterclockwise
def rotate_up_clockwise(cube):
    cube = copy.deepcopy(cube)
    cube['up'] = rotate_face_clockwise(cube['up'])
    cube['front'][0], cube['right'][0], cube['back'][0], cube['left'][0] = (
        cube['right'][0],
        cube['back'][0],
        cube['left'][0],
        cube['front'][0],
    )
    return cube

# Rotate the 'down' face clockwise
def rotate_down_counterclockwise(cube):
    cube = copy.deepcopy(cube)
    printCube(cube)
    cube['down'] = rotate_face_counterclockwise(cube['down'])
    cube['front'][2], cube['right'][2], cube['back'][2], cube['left'][2] = (
        cube['right'][2],
        cube['back'][2],
        cube['left'][2],
        cube['front'][2],
    )

    return cube

# Rotate the 'down' face counterclockwise
def rotate_down_clockwise(cube):
    printCube(cube)
    cube = copy.deepcopy(cube)
    cube['down'] = rotate_face_clockwise(cube['down'])
    cube['front'][2], cube['right'][2], cube['back'][2], cube['left'][2] = (
        cube['left'][2],
        cube['front'][2],
        cube['right'][2],
        cube['back'][2],
    )

    return cube

# Rotate the 'left' face clockwise
def rotate_left_clockwise(cube):
    cube = copy.deepcopy(cube)
    cube['left'] = rotate_face_clockwise(cube['left'])
    up_col = [row[0] for row in cube['up']]
    front_col = [row[0] for row in cube['front']]
    down_col = [row[0] for row in cube['down']][::-1]
    back_col = [row[2] for row in cube['back']][::-1]

    for i in range(3):
        cube['front'][i][0] = up_col[i]
        cube['down'][i][0] = front_col[i]
        cube['back'][2 - i][2] = down_col[i]
        cube['up'][i][0] = back_col[i]
    return cube

# Rotate the 'left' face counterclockwise
def rotate_left_counterclockwise(cube):
    cube = copy.deepcopy(cube)
    cube['left'] = rotate_face_counterclockwise(cube['left'])
    up_col = [row[0] for row in cube['up']]
    front_col = [row[0] for row in cube['front']]
    down_col = [row[0] for row in cube['down']][::-1]
    back_col = [row[2] for row in cube['back']][::-1]

    for i in range(3):
        cube['up'][i][0] = front_col[i]
        cube['front'][i][0] = down_col[i]
        cube['down'][i][0] = back_col[2 - i]
        cube['back'][2 - i][2] = up_col[i]
    return cube

# Rotate the 'right' face clockwise
def rotate_right_counterclockwise(cube):
    cube = copy.deepcopy(cube)
    cube['right'] = rotate_face_counterclockwise(cube['right'])
    up_col = [row[2] for row in cube['up']]
    front_col = [row[2] for row in cube['front']]
    down_col = [row[2] for row in cube['down']][::-1]
    back_col = [row[0] for row in cube['back']][::-1]

    for i in range(3):
        cube['front'][i][2] = up_col[i]
        cube['down'][i][2] = front_col[i]
        cube['back'][2 - i][0] = down_col[i]
        cube['up'][i][2] = back_col[i]
    printCube(cube)
    return cube

# Rotate the 'right' face counterclockwise
def rotate_right_clockwise(cube):
    """
    Rotates the 'right' face clockwise and updates the adjacent faces appropriately.
    """
    # Create a deep copy of the cube to prevent unintended modifications
    cube = copy.deepcopy(cube)

    # Rotate the right face itself
    cube['right'] = rotate_face_clockwise(cube['right'])

    # Extract the relevant rows/columns
    up_col = [row[2] for row in cube['up']]         # Up column 2
    front_col = [row[2] for row in cube['front']]   # Front column 2
    down_col = [row[2] for row in cube['down']]     # Down column 2
    back_col = [row[0] for row in cube['back']][::-1]  # Back column 1 (reversed)

    # Perform the clockwise updates for the adjacent faces
    for i in range(3):
        cube['up'][i][2] = front_col[i]              # Front column 2 → Up column 2
        cube['front'][i][2] = down_col[i]            # Down column 2 → Front column 2
        cube['down'][i][2] = back_col[i]             # Back column 1 (reversed) → Down column 2
        cube['back'][2 - i][0] = up_col[i]           # Up column 2 (reversed) → Back column 1

    return cube

# Rotate the 'front' face clockwise
def rotate_front_clockwise(cube):
    cube = copy.deepcopy(cube)
    cube['front'] = rotate_face_clockwise(cube['front'])
    up_row = cube['up'][2]
    left_col = [row[2] for row in cube['left']][::-1]
    down_row = cube['down'][0][::-1]
    right_col = [row[0] for row in cube['right']]

    cube['up'][2] = left_col
    for i in range(3):
        cube['left'][i][2] = down_row[i]
        cube['down'][0][i] = right_col[i]
        cube['right'][i][0] = up_row[i]
    return cube

# Rotate the 'front' face counterclockwise
def rotate_front_counterclockwise(cube):
    cube = copy.deepcopy(cube)
    cube['front'] = rotate_face_counterclockwise(cube['front'])
    up_row = cube['up'][2]
    left_col = [row[2] for row in cube['left']][::-1]
    down_row = cube['down'][0][::-1]
    right_col = [row[0] for row in cube['right']]

    cube['up'][2] = right_col
    for i in range(3):
        cube['left'][i][2] = up_row[i]
        cube['down'][0][i] = left_col[i]
        cube['right'][i][0] = down_row[i]
    return cube

# Rotate the 'back' face clockwise
def rotate_back_clockwise(cube):
    cube = copy.deepcopy(cube)
    cube['back'] = rotate_face_clockwise(cube['back'])
    up_row = cube['up'][0][::-1]
    left_col = [row[0] for row in cube['left']]
    down_row = cube['down'][2]
    right_col = [row[2] for row in cube['right']][::-1]

    cube['up'][0] = left_col
    for i in range(3):
        cube['left'][i][0] = down_row[i]
        cube['down'][2][i] = right_col[i]
        cube['right'][i][2] = up_row[i]
    return cube

# Rotate the 'back' face counterclockwise
def rotate_back_counterclockwise(cube):
    cube = copy.deepcopy(cube)
    cube['back'] = rotate_face_counterclockwise(cube['back'])
    up_row = cube['up'][0][::-1]
    left_col = [row[0] for row in cube['left']]
    down_row = cube['down'][2]
    right_col = [row[2] for row in cube['right']][::-1]

    cube['up'][0] = right_col
    for i in range(3):
        cube['left'][i][0] = up_row[i]
        cube['down'][2][i] = left_col[i]
        cube['right'][i][2] = down_row[i]
    return cube

# Print the cube for debugging
def printCube(cube):
    for face, matrix in cube.items():
        print(face.upper())
        for row in matrix:
            print(row)
        print()
