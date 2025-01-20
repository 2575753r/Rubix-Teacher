from flask import Flask, request, jsonify

from matrixProcesser import processMatrices
from rubiksAlgorithms import processAlgorithm, processLayoutBeginner
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/algorithm', methods=['POST'])
def algorithm():

    try:

        data = request.get_json()

        if not data:
            return jsonify("Invalid data: No JSON found"), 400

        cube_state = data.get('cube_state')
        solver = data.get('solver')

        if not cube_state or not solver:
            return jsonify("Invalid data: Missing 'cube_state' or 'solver'"), 400

        layout = processMatrices(cube_state)

        print(layout)
        print(solver)
        result = processAlgorithm(layout, solver)




        return jsonify({"result": result}), 200

    except:
        return jsonify('Invalid data'), 400

if __name__ == '__main__':
    app.run()
