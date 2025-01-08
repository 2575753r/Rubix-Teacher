import subprocess

def processAlgorithm(cube_state, solver):


    print('-----------------------')
    print(solver)

    result = processLayoutBeginner(cube_state, solver)
    print(result)
    result = splitMultiples(result)
    result = translateYMoves(result)

    # todo make it so any ones indicating 2 moves are split into 2 single moves 'F2' => 'F', 'F'
    # todo think of solution for Y moves. It shouldnt produce Y's at all instead it should translate to just R, L F ect
    return result

def splitMultiples(moves):
    """
    Splits moves with digits into individual moves.
    Example: 'F2' -> ['F', 'F'], 'R3' -> ['R', 'R', 'R']
    """
    expanded_moves = []

    for move in moves:
        if len(move) > 1 and move[-1].isdigit():
            # Extract the count and the base move
            count = int(move[-1])
            base_move = move[:-1]

            # Add the base move `count` times
            expanded_moves.extend([base_move] * count)
        else:
            # Append move as is if it doesn't end with a digit
            expanded_moves.append(move)

    return expanded_moves
def translateYMoves(moves):
    # Define translation mappings for Y, Y', and Y2
    print("before translation -------------------")
    print(moves)
    print("after translation -------------------")
    Y_TRANSLATION = {
        "Y": {"F": "R", "R": "B", "B": "L", "L": "F", "U": "U", "D": "D"},
        "Y'": {"F": "L", "L": "B", "B": "R", "R": "F", "U": "U", "D": "D"},
        "Y2": {"F": "B", "B": "F", "R": "L", "L": "R", "U": "U", "D": "D"}
    }

    translated_moves = []  # Stores the final translated moves
    current_translation = None  # Tracks the current orientation mapping
    index = 0  # Start at the beginning of the moves list

    while index < len(moves):
        move = moves[index]

        if move in Y_TRANSLATION:
            # Update the current translation mapping
            current_translation = Y_TRANSLATION[move]
        elif current_translation:
            # Translate the move based on the current orientation
            face = move[0]  # Get the face (e.g., "F" from "F'")
            suffix = move[1:]  # Get the suffix (e.g., "'" or "2")
            translated_face = current_translation.get(face, face)  # Translate the face
            translated_moves.append(f"{translated_face}{suffix}")
        else:
            # Append the move as is if no translation is active
            translated_moves.append(move)

        index += 1

    print(translated_moves)

    return translated_moves


def processLayoutBeginner(cube_state, solver):
    try:
        # Run the subprocess command
        result = subprocess.run(
            ["rubik_solver", "-i", cube_state, "-s", solver],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )

        if result.returncode == 0:
            # Split output by lines
            lines = result.stdout.splitlines()

            # Extract solution

            for line in lines:
                if line.strip().startswith("Solution"):
                    # Remove solution from string
                    solution = line.strip().replace("Solution", "").strip()

                    # Split into individual moves
                    solution_list = solution.split(", ")

                    # Clean list
                    solution_list = [move.strip() for move in solution_list if move.strip()]

                    return solution_list

            print("Solution not found")
            return []

        else:
            print("Error occurred:", result.stderr.strip())
            return [f"Error: {result.stderr.strip()}"]

    except Exception as e:
        print("An error occurred:", e)
        return [str(e)]



