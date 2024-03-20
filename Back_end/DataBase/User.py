import sqlite3 as sql

Base_Direction = r'C:\Users\Angel Arevalo\OneDrive\Documentos\GitHub\Null\Back_end\DataBase\DataUsers.db'

class InputUser:
    def __init__(self, Usuario, Contraseña,Rol, Email):#Uso str en cada declaración para no tener problemas con la base de datos
        self.Usuario = str(Usuario)
        self.Contraseña = str(Contraseña)
        self.Rol = str(Rol)
        self.Email = str(Email)
    
    def GuardarEnDataUsers(self):
        apuntador = sql.connect(Base_Direction)
        try:
            insert = 'INSERT INTO Usuarios (Nombre_Usuario, Contraseña, Rol, Email) VALUES (?, ?, ?, ?)'
            apuntador.execute(insert, (self.Usuario, self.Contraseña, self.Rol, self.Email))
            apuntador.commit()
        finally:
            apuntador.close()