import sys
# append the path of the parent directory
sys.path.append("C:\\Users\\Usuario\\Documents\\GitHub\\Null\\src\\Back_end")

from flask import request, jsonify
from flask import Blueprint
from Models.User import constructor

registro_bp = Blueprint("Registro", __name__)

@registro_bp.route(r"/Backend/Registro_Usuario", methods = ['POST'])
def recibir_dato():
    respuesta = constructor(data = request.json)
    #las próximas condiciones retornan algo dependiento de la verificación en User (Registro)
    if (respuesta == "Usuario en uso"):
        return jsonify({"mensaje": "Usuario en uso"})
    if (respuesta == "Usuario Correcto"):
        return jsonify({"mensaje": "Usuario Correcto"})
    #Respuesta por defecto
    print(respuesta)
    return jsonify({"mensaje": "hubo un error"})