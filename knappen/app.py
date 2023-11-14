import json
from flask import Flask, jsonify, request, render_template
from flask_sock import Sock

app = Flask(__name__)
app.config["SECRET_KEY"] = "supersecret!%"
app.config['SOCK_SERVER_OPTIONS'] = {'ping_interval': 25}

sock = Sock(app)

needs = [
    {"id": 0, "name": "energy", "status": 0},
    {"id": 1, "name": "intimacy", "status": 0},
    {"id": 2, "name": "hunger", "status": 0},
    {"id": 3, "name": "anxiety", "status": 0},
]

knappen = False

lights = {"lights": [
    {"color": "red", "status": False},
    {"color": "green", "status": False},
    {"color": "blue", "status": False},
    {"color": "yellow", "status": False},
    {"color": "white", "status": False},
    ],
}

client_list = []

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
    # emit("lights_updated", lights, namespace="/", broadcast=True)
    return jsonify(lights), 200

@app.route('/')
def main():
    return render_template("index.html", hunger_status=get_need(2)["status"], energy_status=get_need(0)["status"], intimacy_status=get_need(1)["status"], anxiety_status=get_need(3)["status"], knappen_status=knappen)

@app.route("/knappen", methods=["PUT"])
def push_knappen():
    #TODO: verify request data
    status = json.loads(request.data)
    knappen = status

    broadcast_ws("knappen_update", knappen)

    return jsonify(status)

@app.route("/knappen", methods=["GET"])
def knappen_status():
    return jsonify(knappen)


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
    broadcast_ws("need_update", need)

    return jsonify(need)

@sock.route("/")
def needs_socket(ws):
    client_list.append(ws)
    while True:
        data = ws.receive()
        if data == 'stop':
            break
    client_list.remove(ws)

@sock.route("/echo")
def echo(sock):
    while True:
        data = sock.receive()
        sock.send(data)

@app.route("/echo")
def echo_page():
    return render_template("echo.html")

def broadcast_ws(event_type: str, data):
    clients = client_list.copy()
    for client in clients:
        try:
            client.send(json.dumps({"type": event_type, "data": data}))
        except:
            client_list.remove(client)

if __name__ == "__main__":
    sock.init_app(app)
    app.run()
