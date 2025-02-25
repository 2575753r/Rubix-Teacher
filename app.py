import threading
import time
from flask import Flask, request, jsonify

from beginnerMethod.matrixTransformer import printCube
from beginnerMethod.runBeginnerMethod import runBegginerMethod
from cubeInput import cubeInput
from matrixProcesser import processMatrices
from rubiksAlgorithms import processAlgorithm, processLayoutBeginner
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MAX_RETRIES = 3  # Number of times to restart if an infinite loop is detected
TIMEOUT_SECONDS = 8  # Max execution time before restarting

def run_solver_with_timeout(layout):
    """Runs runBegginerMethod with a timeout to prevent infinite loops."""
    result = []

    def target():
        """Function to execute in a separate thread."""
        nonlocal result
        result = runBegginerMethod(layout)

    for attempt in range(MAX_RETRIES):
        result = []
        thread = threading.Thread(target=target)
        thread.start()
        thread.join(timeout=TIMEOUT_SECONDS)  # Wait for the function with a timeout

        if thread.is_alive():
            print(f"⚠️ Warning: runBegginerMethod stuck, restarting... (Attempt {attempt + 1})")
            thread.join(0)  # Force terminate the thread (not always effective)
        else:
            return result  # If execution completed successfully, return result

    return None  # If all attempts fail, return None to indicate failure

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/algorithm', methods=['POST'])
def algorithm():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid data: No JSON found"}), 400

        cube_state = data.get('cube_state')
        solver = data.get('solver')

        if not cube_state or not solver:
            return jsonify({"error": "Invalid data: Missing 'cube_state' or 'solver'"}), 400

        layout = processMatrices(cube_state)

        print(layout)
        print(solver)
        printCube(layout)

        moves = run_solver_with_timeout(layout)

        if moves is None:
            return jsonify({"error": "Algorithm encountered an issue and had to be stopped. Please try a different cube configuration."}), 500

        return jsonify({"result": moves}), 200

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

@app.route('/cubeinput', methods=['POST'])
def cubeinput():
    print('Getting Cube Input..........................')

    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid data: No JSON found"}), 400

        cube = data.get('cube_state_input')

        if not cube:
            return jsonify({"error": "Invalid data: Missing cube layout"}), 400

        cubeLayout = cubeInput(cube)

        print(cubeLayout)

        return jsonify({"result": cubeLayout}), 200

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

