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
    cube = copy.deepcopy(cube)
    cube['down'] = rotate_face_clockwise(cube['down'])
    cube['front'][2], cube['right'][2], cube['back'][2], cube['left'][2] = (
        cube['left'][2],
        cube['front'][2],
        cube['right'][2],
        cube['back'][2],
    )

    return cube


def rotate_left_clockwise(cube):
    """
    Rotates the 'left' face clockwise and updates the adjacent faces appropriately.
    """
    # Create a deep copy of the cube to prevent unintended modifications
    cube = copy.deepcopy(cube)

    # Rotate the left face itself
    cube['left'] = rotate_face_clockwise(cube['left'])

    # Extract the relevant columns
    up_col = [row[0] for row in cube['up']]           # Up column 1
    front_col = [row[0] for row in cube['front']]     # Front column 1
    down_col = [row[0] for row in cube['down']]       # Down column 1
    back_col = [row[2] for row in cube['back']][::-1] # Back column 3 (reversed)

    # Apply the transformations
    for i in range(3):
        cube['front'][i][0] = up_col[i]               # Up column → Front column
        cube['down'][i][0] = front_col[i]             # Front column → Down column
        cube['back'][2 - i][2] = down_col[i]          # Down column (reversed) → Back column
        cube['up'][i][0] = back_col[i]                # Back column (reversed) → Up column

    return cube


def rotate_left_counterclockwise(cube):
    """
    Rotates the 'left' face counterclockwise and updates the adjacent faces appropriately.
    """
    import copy
    cube = copy.deepcopy(cube)

    # Rotate the left face itself counterclockwise
    cube['left'] = rotate_face_counterclockwise(cube['left'])

    # Extract the relevant columns
    up_col = [row[0] for row in cube['up']]           # Up column 1
    front_col = [row[0] for row in cube['front']]     # Front column 1
    down_col = [row[0] for row in cube['down']]       # Down column 1
    back_col = [row[2] for row in cube['back']]       # Back column 3

    # Apply the transformations
    for i in range(3):
        cube['up'][i][0] = front_col[i]               # Front column → Up column
        cube['front'][i][0] = down_col[i]             # Down column → Front column
        cube['down'][2 - i][0] = back_col[i]          # Back column → Down column (reversed)
        cube['back'][i][2] = up_col[2 - i]            # Up column → Back column (reversed)

    return cube



# Rotate the 'right' face clockwise
def rotate_right_counterclockwise(cube):
    import copy
    cube = copy.deepcopy(cube)

    # Rotate the right face counterclockwise
    cube['right'] = rotate_face_counterclockwise(cube['right'])

    # Extract the necessary columns
    up_col = [row[2] for row in cube['up']]                # Up column 2
    front_col = [row[2] for row in cube['front']]          # Front column 2
    down_col = [row[2] for row in cube['down']][::-1]      # Down column 2 (reversed)
    back_col = [row[0] for row in cube['back']][::-1]      # Back column 1 (reversed)

    # Use temporary variables for the new values
    new_front_col = up_col
    new_down_col = front_col                         # Down gets reversed Front
    new_back_col = down_col[::-1]                          # Back gets reversed Down
    new_up_col = back_col                         # Up gets Back directly

    # Apply the new values
    for i in range(3):
        cube['front'][i][2] = new_front_col[i]             # Update Front
        cube['down'][i][2] = new_down_col[i]               # Update Down
        cube['back'][2 - i][0] = new_back_col[i]           # Update Back
        cube['up'][i][2] = new_up_col[i]                   # Update Up

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
    """
    Rotates the 'front' face clockwise and updates the adjacent rows/columns appropriately.
    """
    import copy
    cube = copy.deepcopy(cube)

    # Rotate the front face clockwise
    cube['front'] = rotate_face_clockwise(cube['front'])

    # Extract the rows and columns for transformation
    up_row = cube['up'][2][:]                     # Up row 2
    right_col = [row[0] for row in cube['right']] # Right column 1
    down_row = cube['down'][0][:]                 # Down row 1
    left_col = [row[2] for row in cube['left']]   # Left column 2

    # Perform the transformations
    for i in range(3):
        cube['right'][i][0] = up_row[i]           # Up row → Right column
        cube['down'][0][i] = right_col[2 - i]     # Right column (reversed) → Down row
        cube['left'][i][2] = down_row[i]          # Down row → Left column
        cube['up'][2][i] = left_col[2 - i]        # Left column (reversed) → Up row

    return cube


# Rotate the 'front' face counterclockwise
def rotate_front_counterclockwise(cube):
    """
    Rotates the 'front' face counterclockwise and updates the adjacent rows/columns appropriately.
    """
    import copy
    cube = copy.deepcopy(cube)

    # Rotate the front face counterclockwise
    cube['front'] = rotate_face_counterclockwise(cube['front'])

    # Extract the rows and columns for transformation
    up_row = cube['up'][2][:]                     # Up row 2
    left_col = [row[2] for row in cube['left']]   # Left column 2
    down_row = cube['down'][0][:]                 # Down row 1
    right_col = [row[0] for row in cube['right']] # Right column 1

    # Apply the transformations
    for i in range(3):
        cube['left'][i][2] = up_row[2 - i]         # Up row (reversed) → Left column
        cube['down'][0][i] = left_col[i]           # Left column → Down row
        cube['right'][i][0] = down_row[2 - i]      # Down row (reversed) → Right column
        cube['up'][2][i] = right_col[i]            # Right column → Up row

    return cube


# Rotate the 'back' face clockwise
def rotate_back_clockwise(cube):
    """
    Rotates the 'back' face clockwise and updates the adjacent rows/columns appropriately.
    """
    import copy
    cube = copy.deepcopy(cube)

    # Rotate the back face clockwise
    cube['back'] = rotate_face_clockwise(cube['back'])

    # Extract the rows and columns for transformation
    up_row = cube['up'][0][::-1]                # Up row 1 (reversed)
    left_col = [row[0] for row in cube['left']] # Left column 1
    down_row = cube['down'][2][::-1]            # Down row 2 (reversed)
    right_col = [row[2] for row in cube['right']]  # Right column 2

    # Apply the transformations
    for i in range(3):
        cube['left'][i][0] = up_row[i]           # Up row (reversed) → Left column
        cube['down'][2][i] = left_col[i]         # Left column → Down row
        cube['right'][i][2] = down_row[i]        # Down row (reversed) → Right column
        cube['up'][0][i] = right_col[i]          # Right column → Up row

    return cube







def rotate_back_counterclockwise(cube):
    """
    Rotates the 'back' face counterclockwise and updates the adjacent rows/columns appropriately.
    """
    import copy
    cube = copy.deepcopy(cube)

    # Rotate the back face counterclockwise
    cube['back'] = rotate_face_counterclockwise(cube['back'])

    # Extract the rows and columns for transformation
    up_row = cube['up'][0][:]                     # Up row 1
    right_col = [row[2] for row in cube['right']] # Right column 3
    down_row = cube['down'][2][:]                 # Down row 2
    left_col = [row[0] for row in cube['left']]   # Left column 1

    # Perform the transformations in order to avoid overwriting
    for i in range(3):
        cube['up'][0][i] = left_col[2 - i]        # Left column (reversed) → Up row
        cube['left'][i][0] = down_row[i]          # Down row → Left column
        cube['down'][2][i] = right_col[2 - i]     # Right column (reversed) → Down row
        cube['right'][i][2] = up_row[i]           # Up row → Right column

    return cube

def performYmovement(cube):
    cube = copy.deepcopy(cube)

    # Store original face configurations temporarily
    original_front = cube['front']
    original_left = cube['left']
    original_right = cube['right']
    original_back = cube['back']

    # Perform the Y movement: reassign faces clockwise
    cube['front'] = original_right
    cube['right'] = original_back
    cube['back'] = original_left
    cube['left'] = original_front

    # Rotate the up and down faces clockwise
    cube['up'] = rotate_face_clockwise(cube['up'])
    cube['down'] = rotate_face_counterclockwise(cube['down'])

    return cube




# Print the cube for debugging
def printCube(cube):
    for face, matrix in cube.items():
        print(face.upper())
        for row in matrix:
            print(row)
        print()
