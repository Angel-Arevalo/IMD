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
    print(respuesta[0])
    return jsonify({"mensaje" : respuesta[0], "Rol" : respuesta[1]})