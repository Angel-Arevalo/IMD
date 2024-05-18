import sys
# append the path of the parent directory
sys.path.append("src\Back_end")

from flask import request, jsonify
from flask import Blueprint
from Models.User import constructor

login_bp = Blueprint("Login", __name__)

@login_bp.route(r"/Backend/Login_Usuario", methods = ['POST'])
def recibir_dato():
    respuesta = constructor(data = request.json)
    print(respuesta[0])
    return jsonify({"mensaje" : respuesta[0], "Rol" : respuesta[1]})