import subprocess

cube_state = "wowgybwyogygybyoggrowbrgywrborwggybrbwororbwborgowryby"
solver = "Beginner"  # or 'Kociemba'

try:
    result = subprocess.run(
        ["rubik_solver", "-i", cube_state, "-s", solver],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    if result.returncode == 0:
        print("Solution:", result.stdout.strip())
    else:
        print("Error:", result.stderr.strip())
except Exception as e:
    print("An error occurred:", e)
