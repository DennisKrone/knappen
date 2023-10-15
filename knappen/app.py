from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "supersecret!%"

socketio = SocketIO(app)

lights = {"lights": [
    {"color": "red", "status": False},
    {"color": "green", "status": False},
    {"color": "blue", "status": False},
    {"color": "yellow", "status": False},
    {"color": "white", "status": False},
    ],
}

@app.route('/')
def main():
    return render_template("index.html")

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
    emit("lights_updated", {"data": lights}, namespace="/", broadcast=True)
    return jsonify(lights), 200

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
    socketio.run(app)
