from flask import Flask, request, jsonify
from flask_cors import CORS
from User import InputUser

app = Flask(__name__)
CORS(app, resources={r"/ruta_del_backend": {"origins": "*"}})

@app.route('/ruta_del_backend', methods=['POST'])
def recibir_dato():
    data = request.json
    Nombre = data.get('Nombre')
    Contraseña = data.get('Contraseña')
    Rol = data.get('Rol')
    User = InputUser(Nombre, Contraseña, Rol)#Aqui logro guardar el usuario en la base de datos
    User.GuardarEnDataUsers()
    print("Dato recibido:", Nombre + ' ' + Contraseña + ' ' + Rol)
    return jsonify({"mensaje": "Hello world"})

if __name__ == '__main__':
    app.run(debug=True)









