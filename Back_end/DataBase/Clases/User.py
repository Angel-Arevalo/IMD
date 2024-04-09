import sqlite3 as sql

Base_Direction = r'..\NULL\Back_end\DataBase\DataUsers.db'

def constructor(data): #función denominada así para lograr más encapsulamiento
    Nombre = data.get('Nombre')
    Contraseña = data.get('Contraseña')
    Email = data.get('Correo')
    Rol = data.get('Rol')
    User = InputUser(Nombre, Contraseña, Rol, Email) #Creación del objeto
    if (Email != "") :#reviso si es un log in o un registro
        return User.GuardarEnDataUsers()
    else: 
        return User.VerificarLogin()

class InputUser:
    def __init__(self, Usuario, Contraseña,Rol, Email):#constructor
        self.Usuario = str(Usuario)
        self.Contraseña = str(Contraseña)
        self.Rol = str(Rol)
        self.Email = str(Email)
        self.Ceasar = 10

        @property
        def Usuario(self):
            return self.Usuario
        
        @property
        def Contraseña(self):
            return self.Contraseña
        
        @Contraseña.setter
        def Contraseña(self, Contraseña):
            self.Contraseña = Contraseña

        @property
        def Rol(self):
            return self.Rol
        
        @property
        def Email(self):
            return self.Email


    def GuardarEnDataUsers(self):
        Registro = self.VerificarRegistro()
        if (Registro == "Usuario Correcto"):
            self.Encriptar() #llamado a la encriptación
            apuntador = sql.connect(Base_Direction)
            try:
                insert = 'INSERT INTO Usuarios (Nombre_Usuario, Contraseña, Rol, Email) VALUES (?, ?, ?, ?)'
                apuntador.execute(insert, (self.Usuario, self.Contraseña, self.Rol, self.Email))
                apuntador.commit()
            finally:
                apuntador.close()

        return Registro

    def VerificarLogin(self):
        # Aqui supongo que la contraseña no esta encriptada
        self.Encriptar()
        apuntador = sql.connect(Base_Direction)
        name = self.Usuario 
        password = self.Contraseña
        get_info = apuntador.execute(f"SELECT * FROM Usuarios WHERE Contraseña = '{password}' AND Nombre_Usuario = '{name}'")
        store_info = get_info.fetchall()
        if (store_info == []): 
            return "Usuario o Contraseña Incorrectos"
        else: 
            return "Usuario Registrado"

    def VerificarRegistro(self):
        #El mismo código que en VerificarLogin con algunas modificaciones
        apuntador = sql.connect(Base_Direction)
        name = self.Usuario
        get_info = apuntador.execute(f"SELECT * FROM Usuarios WHERE Nombre_Usuario = '{name}'")
        lista = get_info.fetchall()
        if (len(lista) == 0):
            return "Usuario Correcto"
        else:
            return "Usuario en uso"

    def Encriptar(self): 
        
        encriptado = ''
        for letra in self.Contraseña:
            encriptado += chr(ord(letra) + self.Ceasar)
            
        self.Contraseña = encriptado

    def Desencriptar(self): 
        
        desencriptado = self.Encriptar()
        for letra in self.Contraseña:
            desencriptado += chr(ord(letra) - self.Ceasar)
            
        self.Contraseña = desencriptado
