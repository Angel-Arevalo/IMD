from flask import Flask, request, jsonify
from flask_cors import CORS
from User import constructor

app = Flask(__name__)
CORS(app, resources={r"/ruta_del_backend": {"origins": "*"}})

@app.route('/ruta_del_backend', methods=['POST'])
def recibir_dato():
    respuesta = constructor(data = request.json)
    if (respuesta == "Usuario o Contraseña Incorrectos"):
        return jsonify({"mensaje": "Usuario o Contraseña Incorrectos"})
    else:
        return jsonify({"mensaje": "Usuario recibido"})

if __name__ == '__main__':
    app.run(debug=True)









