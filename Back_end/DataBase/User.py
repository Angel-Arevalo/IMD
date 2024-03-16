import sqlite3 as sql

class InputUser:
    def __init__(self, Usuario, Contraseña,Rol):
        self.Usuario = Usuario
        self.Contraseña = Contraseña
        self.Rol = Rol
    
    def GuardarEnDataUsers(self):
        apuntador = sql.connect('DataUsers.db')
        c = apuntador.cursor()
        Insert = "INSERT INTO Usuarios (Nombre_Usuario, Contraseña, Rol) VALUES (?, ?, ?)"
        c.execute(Insert, (self.Usuario, self.Contraseña, self.Rol))
        apuntador.commit()
        apuntador.close()