import sys
# append the path of the parent directory
sys.path.append("src\Back_end")

from flask import request, jsonify
from flask import Blueprint
from DataBase.Du_Crud import DB_DataUsers
from Models.Professor import Teacher
Admin = DB_DataUsers()

informacion_bp = Blueprint("informacion", __name__)

@informacion_bp.route(r"/Backend/InfoBasica/Aulas", methods = ['POST']) # Recibe el nombre del usuario
def recibir_dato_A():
    respuesta = request.json
    n_usuario = respuesta.get("Usuario")
    try:
        Aulas = Admin.Aulas(n_usuario)
    except:
        return jsonify({"mensaje" : "Error Peticion", "Aulas" : []})
    return jsonify({"mensaje" : "Peticion Procesada", "Aulas" : Aulas})

@informacion_bp.route(r"/Backend/InfoAula", methods = ['POST'])
def recibir_dato_IA(): #Each endpoint function must be unique
    respuesta = request.json
    code = respuesta.get("Codigo") # El formato del codigo debe ser "xyz-123"
    try:
        Salon = Teacher.EstAula(code) # Contiene nombre, correo, mundo en el que se encuentra, progreso total, nota final
    except:
        return jsonify({"mensaje" : "Error Peticion", "InfSalon" : []})
    return jsonify({"mensaje" : "Peticion Procesada", "InfSalon" : Salon}) 