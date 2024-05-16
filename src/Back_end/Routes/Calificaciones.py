import sys
# append the path of the parent directory
sys.path.append("C:\\Users\\Usuario\\Documents\\GitHub\\Null\\src\\Back_end")

from flask import request, jsonify
from flask import Blueprint
from Models.Calificacion import constructor

calificacion_bp = Blueprint("Calificaciones", __name__)

@calificacion_bp.route(r"/Backend/Calificaciones/Actualizar", methods = ['POST'])
def recibir_dato():
    respuesta = constructor(data = request.json)
    try:
        respuesta.ActualizarNotas()
    except:
        return jsonify({"mensaje" : "Error al Actualizar"})
    return jsonify({"mensaje" : "Notas Actualizadas"})