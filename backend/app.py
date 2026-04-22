from flask import Flask, jsonify

app = Flask(__name__)

#Endpoint de health, confirma que la api se encuentra funcionando
@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "service": "backend"
        }), 200

@app.get("/api/info")
def info():
    return jsonify({
        "service": "backend",
        "feature": "03",
        "technology": "Flask",
        "port": 5000
    }), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)