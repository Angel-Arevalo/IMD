import sqlite3 as sql
from flask import Flask, request, jsonify
from flask_cors import CORS

Base_Direction = r'C:\Users\Angel Arevalo\OneDrive\Documentos\GitHub\Null\Back_end\DataBase\DataUsers.db'


class InputUser:
    def __init__(self, Usuario, Contraseña, Rol):
        self.Usuario = Usuario
        self.Contraseña = Contraseña
        self.Rol = Rol
        self.Ceasar = 10

    def GuardarEnDataUsers(self):
        apuntador = sql.connect(Base_Direction)
        try:
            Insert = "INSERT INTO Usuarios (Nombre_Usuario, Contraseña, Rol) VALUES (?, ?, ?)"
            apuntador.execute(Insert, (self.Usuario, self.Contraseña, self.Rol))
            apuntador.commit()
        finally:
            apuntador.close()

    def Encriptar(self):

        encriptado = ''
        for letra in self.Contraseña:
            encriptado += chr(ord(letra) + self.Ceasar)

        return encriptado

    def Desencriptar(self):

        desencriptado = self.Encriptar()
        for letra in self.Contraseña:
            desencriptado += chr(ord(letra) - self.Ceasar)

        return desencriptado



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
