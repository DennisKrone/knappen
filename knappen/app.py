from crypt import methods
import json
from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "supersecret!%"

socketio = SocketIO(app)
needs = [
    {"id": 0, "name": "energy", "status": 0},
    {"id": 1, "name": "intimacy", "status": 0},
    {"id": 2, "name": "hunger", "status": 0},
    {"id": 3, "name": "anxiety", "status": 0},
]

lights = {"lights": [
    {"color": "red", "status": False},
    {"color": "green", "status": False},
    {"color": "blue", "status": False},
    {"color": "yellow", "status": False},
    {"color": "white", "status": False},
    ],
}

@app.route("/lights")
def get_ligth_status():
    return jsonify(lights)

@app.route("/lights", methods=["PUT"])
def set_light_status():
    json = request.get_json()
    for new in json:
        for light in lights["lights"]:
            if new["color"] == light["color"]:
                light["status"] = new["status"]
    emit("lights_updated", lights, namespace="/", broadcast=True)
    return jsonify(lights), 200

@app.route('/')
def main():
    return render_template("index.html", hunger_status=get_need(2)["status"], energy_status=get_need(0)["status"], intimacy_status=get_need(1)["status"], anxiety_status=get_need(3)["status"])

@app.route("/knappen", methods=["PUT"])
def push_knappen():
    status = json.loads(request.data)
    emit("knappen_updated", status, namespace="/", broadcast=True)
    return jsonify(status)


def get_need(id: int):
    return next((e for e in needs if e["id"] == id), None)

def need_is_valid(need):
    if not isinstance(need["status"], int) or need["status"] > 2:
        return False
    return True

@app.route("/needs/<int:id>", methods=["GET"])
def get_need_by_id(id: int):
    need = get_need(id)
    if need is None:
        return jsonify({"error": "Need does not exist"}), 404
    return jsonify(need)

@app.route("/needs")
def get_needs():
    return jsonify(needs)

@app.route("/needs/<int:id>", methods=["PUT"])
def update_need(id: int):
    need = get_need(id)
    if need is None:
        return jsonify({"error": "Need does not exist"}), 404
    
    updated_need = json.loads(request.data)
    if not need_is_valid(updated_need):
        return jsonify({"error": "Invalid need properties"}), 400
    
    need.update(updated_need)
    emit("need_updated", need, namespace="/", broadcast=True)
    return jsonify(need)

@socketio.on("connect")
def connect():
    emit("Connected", {"data": "Connected"})

@socketio.on("disconnect")
def disconnect():
    print("Client disconnected")

@socketio.event
def my_ping():
    emit("my_pong")

if __name__ == "__main__":
    socketio.run(app, use_reloader=True, log_output=True)
