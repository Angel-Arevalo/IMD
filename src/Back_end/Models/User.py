import sys
# append the path of the parent directory
sys.path.append("src\Back_end")

from DataBase import Du_Crud
from Utils.Encrypter import Encrypter
from email.message import EmailMessage
from ssl import create_default_context
from smtplib import SMTP_SSL
from verify_email import verify_email
from Utils.Random import Randomizer

Cursor = Du_Crud.DB_DataUsers()
rand = Randomizer()
#EL E-MAIL DEBE SER UNICO

def constructor(data): #función denominada así para lograr más encapsulamiento
    Nombre = data.get('Nombre')
    Contraseña = data.get('Contraseña')
    Email = data.get('Correo')
    Rol = data.get('Rol')
    User = InputUser(Nombre, Contraseña, Rol, Email)#Creación del objeto
    if (Email != "") :#reviso si es un log in o un registro
        #registro
        code = User.ConfirmarCorreoRegistro()
        return User.GuardarEnDataUsers(), Cursor.getRol(Nombre), Cursor.getAula(Nombre), code
    else: 
        #log-in
        check = Cursor.getCheckMail(Nombre)
        code = "0"
        User.Email = Cursor.getMail(Nombre)
        if str(check) == "-1":
            code = User.ConfirmarCorreoRegistro()
        #verifico que haya confirmado su email, si no lo hace, no puede ingresar a la página
        return User.VerificarLogin(), Cursor.getRol(Nombre), Cursor.getAula(Nombre), code, check

def construnctorObject(data, x = 1):
    #con el 1 es un mail normal, con el 2 es cambio de contraseña
    Nombre = data.get('Nombre')
    Contraseña = "" if x == 1 else data.get("Contraseña")
    try:
        Email = Cursor.getMail(Nombre)
    except:
        return "El usuario no existe"

    Rol = ""
    User = InputUser(Nombre, Contraseña, Rol, Email)#Creación del objeto
    return User

class InputUser:
    def __init__(self, Usuario: str, Contraseña: str, Rol: str, Email: str):#constructor
        self.Usuario = str(Usuario)
        self.Contraseña = str(Contraseña)
        self.Rol = 1 if(str(Rol) == "Estudiante") else 2
        self.Email = str(Email)
        self.modulus = 3233
        self.publicExponent = 65537
        self.privateExponent = 2753  
        self.x = '-1'

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
        
        Cursor.InicializarTablas()
        
    def ChecKEmail(self):
        boolean = verify_email(self.Contraseña)
        if boolean == True:
            return 'Email Existente'
        else:
            return 'Error User'

    def GuardarEnDataUsers(self):
        Registro = self.VerificarRegistro()
        x = -1 if self.Rol == 1 else 0
        chekMail = -1
        self.x = x
        if (Registro == "Usuario Correcto"):
            en = Encrypter(self.Contraseña) #llamado a la encriptación
            try:
                num = Cursor.FetchOId('Usuarios_Registrados', 'Id')
                insert = f'''
                        INSERT INTO Usuarios_Registrados 
                        (Id, Nombre_Usuario, Contraseña, Aula, Rol, Email, CheckMail) VALUES 
                        ('{num}', '{self.Usuario}', '{en.RSA_Encrypt()}','{x}' ,'{self.Rol}', '{self.Email}', '{chekMail}')
                        '''
                Cursor.Execute(insert)
            finally:
                return Registro ##Se puede mejorar
        return Registro

    def VerificarLogin(self):
        # Aqui supongo que la contraseña no esta encriptada
        en = Encrypter(self.Contraseña)
        name = self.Usuario 
        password = en.RSA_Encrypt()

        store_info = Cursor.FetchA(f"SELECT * FROM Usuarios_Registrados WHERE Contraseña = '{password}' AND Nombre_Usuario = '{name}'")
        if (store_info == []): 
            return "Usuario o Contraseña Incorrectos"
        else: 
            return "Usuario recibido"

    def VerificarRegistro(self):
        #El mismo código que en VerificarLogin con algunas modificaciones
        name = self.Usuario
        lista = Cursor.FetchA(f"SELECT * FROM Usuarios_Registrados WHERE Nombre_Usuario = '{name}' or Email = '{self.Email}'")
        if (len(lista) == 0):
            return "Usuario Correcto"
        else:
            return "Usuario o Correo en uso" 

    def SendMail(titulo, context, destinators = []):
        mail_sender = 'interactivemathematicaldemons@gmail.com'
        password = 'jvjn shlv nzdf qpiy'
        em = EmailMessage()

        em['From'] = mail_sender
        em['To'] = destinators
        em['Subject'] = titulo
        em.set_content(context)

        contextMail = create_default_context()

        with SMTP_SSL('smtp.gmail.com', 465, context = contextMail) as smtp: 
            smtp.login(mail_sender, password)
            smtp.sendmail(mail_sender,destinators, em.as_string())

    def RecuperarContraseña(self):
        if self.VerificarRegistro() == "Usuario o Correo en uso":
            name = self.Usuario
            mail_receiver = self.Email

            code = rand.Generar_Codigo()
            titulo = f'Recuperación de la contraseña de la cuenta de {name}'
            contexto = f'El código de recuperación de la cuenta de {name} es {code}'

            InputUser.SendMail(titulo,contexto,mail_receiver)

            return code
        return "El usuario no existe"
    
    def ConfirmarCorreoRegistro(self):
        name = self.Usuario
        mail = self.Email

        code = rand.Generar_Codigo()
        titulo = f'Confirmación de la cuenta de {name}'
        contexto = f'Bienveni@ a IMD {name}, para poder continuar con la experiencias de IMD debe ingresar el siguiente código {code}.'
        
        InputUser.SendMail(titulo, contexto, mail)

        return code
    
    def UpdatePassWord(self):
        en = Encrypter(self.Contraseña)
        #es mejor crear un objeto y usar sus métodos
        sql_query = f"UPDATE Usuarios_Registrados SET Contraseña = '{en.RSA_Encrypt()}' WHERE Nombre_Usuario = '{self.Usuario}'"
        
        Cursor.Execute(sql_query)

    def UpdateCheckMail(self):
        x = 0
        sql_query = f'''UPDATE Usuarios_Registrados
                    SET CheckMail = '{x}'
                    WHERE Nombre_Usuario = '{self.Usuario}'
                    '''
        
        Cursor.Execute(sql_query)