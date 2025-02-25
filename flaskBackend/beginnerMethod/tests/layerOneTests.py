from beginnerMethod.redundant.revisedWhiteCross import *

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

moves = []
matrices, moves = makeWhiteCross(testMatrices, moves)
print(moves)
printCube(matrices)

if matrices['down'][0][1] == 'w' and matrices['down'][1][0] == 'w' and matrices['down'][1][2] == 'w' and matrices['down'][2][1] == 'w':
    print("Make white cross test passed")
else:
    print("make white cross test failed")

# todo the solution appears to produce 2 white-blue edges
# What is causing it to keep its total colours but
def count_colors(matrices):
    color_count = {}

    for face in matrices.values():
        for row in face:
            for color in row:
                if color != "-":  # Ignore placeholder values
                    color_count[color] = color_count.get(color, 0) + 1

    return color_count

color_totals = count_colors(testMatrices)
print(color_totals)

color_totals = count_colors(matrices)
print(color_totals)

testMatrices = {
    "up": [
        ["-", "g", "-"],
        ["-", "y", "-"],
        ["-", "-", "-"]
    ],
    "left": [
        ["-", "-", "-"],
        ["w", "b", "r"],
        ["-", "o", "-"]
    ],
    "front": [
        ["-", "-", "-"],
        ["w", "r", "-"],
        ["-", "-", "-"]
    ],
    "right": [
        ["-", "-", "-"],
        ["-", "g", "-"],
        ["-", "-", "-"]
    ],
    "back": [
        ["-", "w", "-"],
        ["-", "o", "b"],
        ["-", "-", "-"]
    ],
    "down": [
        ['-', '-', '-'],
        ['w', 'w', '-'],
        ['-', '-', '-']
    ]
}

moves = []
matrices, moves = makeWhiteCross(testMatrices, moves)
# print(moves)
printCube(matrices)

if matrices['down'][0][1] == 'w' and matrices['down'][1][0] == 'w' and matrices['down'][1][2] == 'w' and matrices['down'][2][1] == 'w':
    print("Make white cross test passed")
else:
    print("make white cross test failed")