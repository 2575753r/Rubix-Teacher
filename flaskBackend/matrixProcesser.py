def processMatrices(matrices):
    print('processing matrices')

    # Define correct face order
    face_order = ['up', 'left', 'front', 'right', 'back', 'down']

    # Process matrices to match expected format
    processed_matrices = {face: convertToShortForm(matrices[face]) for face in face_order}

    return processed_matrices


def convertToShortForm(matrix):
    color_map = {
        'yellow': 'y', 'blue': 'b', 'red': 'r',
        'green': 'g', 'orange': 'o', 'white': 'w'
    }

    # Convert each face from full color names to short characters
    return [[color_map[colour] for colour in row] for row in matrix]


# Example test matrices with correct format
testMatrices = {
    "up": [["white", "white", "yellow"], ["white", "yellow", "green"], ["yellow", "red", "yellow"]],
    "left": [["green", "orange", "orange"], ["green", "blue", "yellow"], ["blue", "blue", "white"]],
    "front": [["blue", "yellow", "blue"], ["blue", "red", "red"], ["red", "orange", "orange"]],
    "right": [["red", "red", "red"], ["white", "green", "yellow"], ["blue", "blue", "yellow"]],
    "back": [["green", "blue", "orange"], ["green", "orange", "white"], ["orange", "orange", "white"]],
    "down": [["green", "green", "white"], ["red", "white", "orange"], ["red", "yellow", "green"]]
}

# Convert test matrices to match the correct format
processedMatrices = processMatrices(testMatrices)
print(processedMatrices)
