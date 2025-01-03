import subprocess

def processAlgorithm(data):

    cube_state = data['cube_state']
    solver = ['algorithm']

    result = processLayoutBeginner(cube_state, solver)
    print(result)
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

                    # Extract the solution moves
                    solution = line.strip().replace("Solution", "").strip()
                    print("Extracted Solution:", solution)
                    return solution

            print("Solution not found")
            return None

        else:
            print("Error occurred:", result.stderr.strip())
            return f"Error: {result.stderr.strip()}"

    except Exception as e:
        print("An error occurred:", e)
        return str(e)


