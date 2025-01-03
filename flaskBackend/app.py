from flask import Flask, request, jsonify

from rubiksAlgorithms import processAlgorithm, processLayoutBeginner

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/algorithm', methods=['POST'])
def algorithm():

    try:

        data = request.get_json()

        cube_state = data.get('cube_state')
        solver = data.get('solver')
        print(cube_state)
        print(solver)

        result = processLayoutBeginner(cube_state, solver)

        return jsonify(result), 200

    except:
        return jsonify('Invalid data'), 400

if __name__ == '__main__':
    app.run()
