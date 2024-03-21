import sqlite3 as sql

Base_Direction = r'..\NULL\Back_end\DataBase\DataUsers.db'

class InputUser:
    def __init__(self, Usuario, Contraseña,Rol, Email):
        self.Usuario = str(Usuario)
        self.Contraseña = str(Contraseña)
        self.Rol = str(Rol)
        self.Email = str(Email)
        self.Ceasar = 10
    
    def GuardarEnDataUsers(self):
        self.Encriptar()#llamado a la encriptación
        apuntador = sql.connect(Base_Direction)
        try:
            insert = 'INSERT INTO Usuarios (Nombre_Usuario, Contraseña, Rol, Email) VALUES (?, ?, ?, ?)'
            apuntador.execute(insert, (self.Usuario, self.Contraseña, self.Rol, self.Email))
            apuntador.commit()
        finally:
            apuntador.close()


    def Encriptar(self): 
        
        encriptado = ''
        for letra in self.Contraseña:
            encriptado += chr(ord(letra) + self.Ceasar)
            
        self.Contraseña = encriptado

    def Desencriptar(self): 
        
        desencriptado = self.Encriptar()
        for letra in self.Contraseña:
            encriptado += chr(ord(letra) - self.Ceasar)
            
        self.Contraseña = desencriptado
        


    

            
