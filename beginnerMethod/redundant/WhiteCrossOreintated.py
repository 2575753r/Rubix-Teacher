from beginnerMethod.matrixTransformer import *



def align_white_edges_on_down_face(matrices):
    moves = []  # To track moves made

    # Mapping of down face positions to adjacent faces
    edge_positions = {
        'front': (0, 1),  # down[0][1]
        'left': (1, 0),   # down[1][0]
        'right': (1, 2),  # down[1][2]
        'back': (2, 1)    # down[2][1]
    }

    # Check for misaligned edges
    misaligned_edges = []
    for face, (row, col) in edge_positions.items():
        adjacent_color = matrices[face][1][1]
        if matrices[face][2][1] != adjacent_color:  # Check alignment with the center
            misaligned_edges.append((face, row, col, adjacent_color))

    # Process misaligned edges
    while len(misaligned_edges) > 0:
        # Pop one misaligned edge to fix
        face, row, col, target_color = misaligned_edges.pop(0)

        # Find another misaligned edge to swap with
        for swap_face, swap_row, swap_col, swap_target in misaligned_edges:
            if swap_target == target_color:  # Look for matching color
                # Rotate the `down` face to bring the edges into position
                while matrices[face][2][1] != target_color:
                    matrices = rotate_down_clockwise(matrices)
                    moves.append("D")

                # Use adjacent face rotations to swap the edges
                if face == 'front':
                    matrices = rotate_front_clockwise(matrices)
                    moves.append("F")
                elif face == 'left':
                    matrices = rotate_left_clockwise(matrices)
                    moves.append("L")
                elif face == 'right':
                    matrices = rotate_right_clockwise(matrices)
                    moves.append("R")
                elif face == 'back':
                    matrices = rotate_back_clockwise(matrices)
                    moves.append("B")

                break  # Exit the loop after swapping

    print("Moves to align white edges:", moves)
    return matrices
