import sqlite3 as sql

Base_Direction = r'..\NULL\Back_end\DataBase\DataUsers.db'

def constructor(data): #función denominada así para lograr más encapsulamiento
    Nombre = data.get('Nombre')
    Contraseña = data.get('Contraseña')
    Email = data.get('Correo')
    Rol = data.get('Rol')
    User = InputUser(Nombre, Contraseña, Rol, Email)#Creación del objeto
    if (Email != "") :#reviso si es un log in o un registro
        return User.GuardarEnDataUsers()
    else: 
        return User.VerificarLogin()



class InputUser:
    def __init__(self, Usuario: str, Contraseña: str, Rol: str, Email: str):#constructor
        self.Usuario = str(Usuario)
        self.Contraseña = str(Contraseña)
        self.Rol = 1 if(str(Rol) == "Estudiante") else 2
        self.Email = str(Email)
        self.modulus = 2491
        self.publicExponent = 37 
        self.privateExponent = 937

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
        
        @property
        def Ceasar():
            return "Hola"
        
    def __TablaRoles__():
        apuntador = sql.connect(Base_Direction)
        sql_cmd = '''
                    CREATE TABLE IF NOT EXISTS 'Roles' (
                        'Id_Rol' INT PRIMARY KEY,
                        'Rol' TEXT NOT NULL UNIQUE,
                        CHECK(Rol IN("Estudiante", "Profesor")),
                        FOREIGN KEY(Id_Rol) REFERENCES Usuarios_Registrados(Rol)
                        )
                '''
        apuntador.execute(sql_cmd) 
        a = apuntador.execute('''SELECT Id_Rol=1 FROM Roles''')
        if (a.fetchone() == None):
            apuntador.execute('''INSERT INTO Roles (Id_Rol, Rol) VALUES (1, 'Estudiante')''')
            apuntador.execute('''INSERT INTO Roles (Id_Rol, Rol) VALUES (2, 'Profesor')''')
        apuntador.commit()
        apuntador.close()
        
    def __CrearTabla_UsuariosR__():
        apuntador = sql.connect(Base_Direction)
        sql_cmd = '''
                    CREATE TABLE IF NOT EXISTS 'Usuarios_Registrados' (
                        'Id' INT AUTO_INCREMENT,
                        'Nombre_Usuario' TEXT PRIMARY KEY NOT NULL,
                        'Contraseña' TEXT NOT NULL,
                        'Rol' INT NOT NULL,
                        'Email' TEXT NOT NULL,
                        CHECK(Rol IN(1,2))
                        )
                '''
        apuntador.execute(sql_cmd)
        apuntador.commit()
        apuntador.close()

    
    __CrearTabla_UsuariosR__()
    __TablaRoles__()

    def GuardarEnDataUsers(self):
        Registro = self.VerificarRegistro()
        if (Registro == "Usuario Correcto"):
            self.RSA_Encrypt() #llamado a la encriptación
            apuntador = sql.connect(Base_Direction)
            try:
                b = apuntador.execute("SELECT MAX(Id) FROM Usuarios_Registrados")
                b = b.fetchone()[0]
                num = int(b) + 1 if (b is not None) else 1
                insert = 'INSERT INTO Usuarios_Registrados (Id, Nombre_Usuario, Contraseña, Rol, Email) VALUES (?, ?, ?, ?, ?)'
                apuntador.execute(insert, (num, self.Usuario, self.Contraseña, self.Rol, self.Email))
                apuntador.commit()
            finally:
                apuntador.close()
        return Registro

    def VerificarLogin(self):
        # Aqui supongo que la contraseña no esta encriptada
        self.RSA_Encrypt()
        apuntador = sql.connect(Base_Direction)
        name = self.Usuario 
        password = self.Contraseña
        get_info = apuntador.execute(f"SELECT * FROM Usuarios_Registrados WHERE Contraseña = '{password}' AND Nombre_Usuario = '{name}'")
        store_info = get_info.fetchall()
        if (store_info == []): 
            return "Usuario o Contraseña Incorrectos"
        else: 
            return "Usuario Registrado"

    def VerificarRegistro(self):
        #El mismo código que en VerificarLogin con algunas modificaciones
        apuntador = sql.connect(Base_Direction)
        name = self.Usuario
        get_info = apuntador.execute(f"SELECT * FROM Usuarios_Registrados WHERE Nombre_Usuario = '{name}'")
        lista = get_info.fetchall()
        if (len(lista) == 0):
            return "Usuario Correcto"
        else:
            return "Usuario en uso"

    def RSA_Encrypt(self): 

        listOfNum=[]
        for letter in self.Contraseña: 
            letter = int.from_bytes(letter.encode(), 'big')
            listOfNum.append(letter)

        final_Password = ''
        for Nums in listOfNum: 
            final_Num = (Nums**self.publicExponent) % self.modulus
            final_Password = final_Password+str(hex(final_Num))+' '
        return final_Password

