import sys
from Models.Calificacion import Calificacion
# append the path of the parent directory
sys.path.append("src\Back_end")

from flask import request, jsonify
from flask import Blueprint
from Models.User import constructor

login_bp = Blueprint("Login", __name__)

@login_bp.route(r"/Backend/Login_Usuario", methods = ['POST'])
def recibir_dato():
    data = request.json
    respuesta = constructor(data)

    if respuesta[0] != "Usuario o Contraseña Incorrectos" and respuesta[1] != "Profesor":
        lista = askForNotes(data.get('Nombre'), respuesta[2])
        return jsonify({"mensaje" : respuesta[0], "Rol" : respuesta[1], 
                        "Aula": respuesta[2], "Notas": lista})

    return jsonify({"mensaje" : respuesta[0], "Rol" : respuesta[1], "Aula": respuesta[2]})

def askForNotes(nombre, aula):
    if aula != '-1':

        toReturn = ""

        for j in range(1, 3):
            notas = Calificacion.NotasEstudiante(aula, nombre, j)
            
            resultado = "" if j == 1 else ","

            for i in range(len(notas[0])):
                resultado += f"{notas[0][i]}," if i != len(notas[0]) - 1 else f"{notas[0][i]}"
            
            toReturn += resultado
        return toReturn
