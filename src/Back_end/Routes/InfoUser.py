import sys
# append the path of the parent directory
sys.path.append("C:\\Users\\Usuario\\Documents\\GitHub\\Null\\src\\Back_end")

from flask import request, jsonify
from flask import Blueprint
from Models.Calificacion import constructor

informacion_bp = Blueprint("informacion", __name__)

@informacion_bp.route(r"/Backend/InfoBasica", methods = ['POST'])
def recibir_dato():
    respuesta = request.json
    n_usuario = respuesta.get("Usuario")
    try:
        respuesta.ActualizarNotas()
    except:
        return jsonify({"mensaje" : "Error al Actualizar"})
    return jsonify({"mensaje" : "Notas Actualizadas"})

#Rol, Numero de Aula