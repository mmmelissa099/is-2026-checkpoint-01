from flask import Flask, jsonify
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Funcion para conectarse a la Base de Datos
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("POSTGRES_HOST"),
        port=os.getenv("POSTGRES_PORT"),
        dbname=os.getenv("POSTGRES_DB"),
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD")
    )


#Endpoint de health, confirma que la api se encuentra funcionando
@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "service": "backend"
        }), 200

@app.get("/api/team")
def team():
    conn = None
    cur = None

    try:
        #Creo la conexion
        conn = get_db_connection()
        #Creo el cursor para hacer consultas
        cur = conn.cursor(cursor_factory=RealDictCursor)

        #Ejecuto la consulta a la BD
        cur.execute("""
            SELECT nombre, apellido, legajo, feature, servicio, estado
            FROM members
            ORDER BY legajo;
        """)

        members = cur.fetchall()

        return jsonify(members), 200
    
    #Se ejecuta en caso de fallos
    except Exception as e:
        return jsonify({
            "error": "No se pudo obtener la informacion del equipo :(",
            "details": str(e)
        }), 500
    
    #Se ejecuta siempre, si sale bien o mal no importa
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


#Endpoint de info, devuelve metadatos del servidor
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