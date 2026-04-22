from flask import Flask, jsonify

app = Flask(__name__)

#Endpoint de health, confirma que la api se encuentra funcionando
@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "service": "backend"
        }), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)