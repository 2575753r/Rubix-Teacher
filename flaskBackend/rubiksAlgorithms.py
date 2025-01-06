import subprocess

def processAlgorithm(data):

    cube_state = data['cube_state']
    solver = ['algorithm']
    print('-----------------------')
    print(solver)

    result = processLayoutBeginner(cube_state, solver)
    print(result)

    # todo make it so any ones indicating 2 moves are split into 2 single moves '2F' => 'F', 'F'
    return

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



