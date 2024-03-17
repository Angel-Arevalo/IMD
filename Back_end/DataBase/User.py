import sqlite3 as sql

Base_Direction = r'C:\Users\Angel Arevalo\OneDrive\Documentos\GitHub\Null\Back_end\DataBase\DataUsers.db'

class InputUser:
    def __init__(self, Usuario, Contraseña,Rol):
        self.Usuario = Usuario
        self.Contraseña = Contraseña
        self.Rol = Rol
    
    def GuardarEnDataUsers(self):
        apuntador = sql.connect(Base_Direction)
        try:
            Insert = "INSERT INTO Usuarios (Nombre_Usuario, Contraseña, Rol) VALUES (?, ?, ?)"
            apuntador.execute(Insert, (self.Usuario, self.Contraseña, self.Rol))
            apuntador.commit()
        finally:
            apuntador.close()