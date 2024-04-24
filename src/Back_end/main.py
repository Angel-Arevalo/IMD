import sys

sys.path.append("..\Back_end")

from flask import Flask, request, jsonify
from flask_cors import CORS
from Models.User import constructor

app = Flask(__name__)
CORS(app, resources={r"/ruta_del_backend": {"origins": "*"}})

@app.route(r"/ruta_del_backend", methods=['POST'])
def recibir_dato():#main del back end
    respuesta = constructor(data = request.json)
    #las próximas condiciones retornan algo dependiento de la verificación en User (log in)
    if (respuesta == "Usuario o Contraseña Incorrectos"):
        return jsonify({"mensaje": "Usuario o Contraseña Incorrectos"})
    if (respuesta == "Usuario Registrado"):
        return jsonify({"mensaje": "Usuario recibido"})
    #las próximas condiciones retornan algo dependiento de la verificación en User (Registro)
    if (respuesta == "Usuario en uso"):
        return jsonify({"mensaje": "Usuario en uso"})
    if (respuesta == "Usuario Correcto"):
        return jsonify({"mensaje": "Usuario Correcto"})
    #Respuesta por defecto
    print(respuesta)
    return jsonify({"mensaje": "hubo un error"})

""" @app.route(r"/actualizar_nota", methods=['POST'])
def actualizar_nota():#main del back end
    info_nota = Nota(data = request.json)

    print(info_nota) """




if __name__ == '__main__':
    app.run(debug=True)









