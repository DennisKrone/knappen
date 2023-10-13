from flask import Flask, jsonify, request

app = Flask(__name__)

lights = [
    {"color": "red", "status": False},
    {"color": "green", "status": False},
    {"color": "blue", "status": False},
    {"color": "yellow", "status": False},
    {"color": "white", "status": False}
]

@app.route('/')
def hello_world():
    return "Hello world"

@app.route("/lights")
def get_ligth_status():
    return jsonify(lights)

@app.route("/lights", methods=["PUT"])
def set_light_status():
    json = request.get_json()
    for new in json:
        for current in lights:
            if new["color"] == current["color"]:
                current["status"] = new["status"]
   
    return jsonify(lights), 200
