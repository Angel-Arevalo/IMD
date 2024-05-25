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

    if respuesta[0] != "Usuario o Contraseña Incorrectos":
        lista = askForNotes(data.get('Nombre'), respuesta[2])
        return jsonify({"mensaje" : respuesta[0], "Rol" : respuesta[1], 
                        "Aula": respuesta[2], "Notas": lista})

    return jsonify({"mensaje" : respuesta[0], "Rol" : respuesta[1], "Aula": respuesta[2]})

def askForNotes(nombre, aula):
    print(nombre + " " + aula)
    
    toReturn = []

    for j in range(1, 3):
        notas = Calificacion.NotasEstudiante(aula, nombre, j)
        
        resultado = []

        for i in range(len(notas[0])):
            resultado.append(notas[0][i])
        
        toReturn.append(resultado)

    return toReturn
