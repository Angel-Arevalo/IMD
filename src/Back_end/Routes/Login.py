import sys
# append the path of the parent directory
sys.path.append("C:\\Users\\Usuario\\Documents\\GitHub\\Null\\src\\Back_end")

from flask import request, jsonify
from flask import Blueprint
from Models.User import constructor

login_bp = Blueprint("Login", __name__)

@login_bp.route(r"/Backend/Login_Usuario", methods = ['POST'])
def recibir_dato():
    respuesta = constructor(data = request.json)
    #las próximas condiciones retornan algo dependiento de la verificación en User (log in)
    if (respuesta == "Usuario o Contraseña Incorrectos"):
        return jsonify({"mensaje": "Usuario o Contraseña Incorrectos"})
    if (respuesta == "Usuario Registrado"):
        return jsonify({"mensaje": "Usuario recibido"})
    #Respuesta por defecto
    print(respuesta)
    return jsonify({"mensaje": "hubo un error"})