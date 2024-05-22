import sys
# append the path of the parent directory
sys.path.append("src\Back_end")

from DataBase import Du_Crud
from email.message import EmailMessage
from ssl import create_default_context
from smtplib import SMTP_SSL
from verify_email import verify_email

Cursor = Du_Crud.DB_DataUsers()

#EL E-MAIL DEBE SER UNICO

def constructor(data): #función denominada así para lograr más encapsulamiento
    Nombre = data.get('Nombre')
    Contraseña = data.get('Contraseña')
    Email = data.get('Correo')
    Rol = data.get('Rol')
    User = InputUser(Nombre, Contraseña, Rol, Email)#Creación del objeto
    if (Email != "") :#reviso si es un log in o un registro
        return User.GuardarEnDataUsers(), Cursor.getRol(Nombre), Cursor.getAula(Nombre)
    else: 
        return User.VerificarLogin(), Cursor.getRol(Nombre), Cursor.getAula(Nombre)

class InputUser:
    def __init__(self, Usuario: str, Contraseña: str, Rol: str, Email: str):#constructor
        self.Usuario = str(Usuario)
        self.Contraseña = str(Contraseña)
        self.Rol = 1 if(str(Rol) == "Estudiante") else 2
        self.Email = str(Email)
        self.modulus = 2491
        self.publicExponent = 37 
        self.privateExponent = 1293

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
        print(x)
        if (Registro == "Usuario Correcto"):
            self.RSA_Encrypt() #llamado a la encriptación
            try:
                num = Cursor.FetchOId('Usuarios_Registrados', 'Id')
                insert = f'''
                        INSERT INTO Usuarios_Registrados 
                        (Id, Nombre_Usuario, Contraseña, Aula, Rol, Email) VALUES 
                        ('{num}', '{self.Usuario}', '{self.Contraseña}','{x}' ,'{self.Rol}', '{self.Email}')
                        '''
                Cursor.Execute(insert)
            finally:
                return Registro ##Se puede mejorar
        return Registro

    def VerificarLogin(self):
        # Aqui supongo que la contraseña no esta encriptada
        self.RSA_Encrypt()
        name = self.Usuario 
        password = self.Contraseña
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
    
    def RSA_Decrypt(self):
        name = self.Usuario
        encrypted_nums = Cursor.Execute(f"SELECT Contraseña FROM Usuarios_Registrados WHERE Nombre_Usuario = '{name}'")

        decrypted_message = ''
        for encrypted_num_str in encrypted_nums:
            encrypted_num = int(encrypted_num_str, 16)
            decrypted_num = (encrypted_num ** self.privateExponent) % self.modulus
            decrypted_message += chr(decrypted_num)

        return decrypted_message

    def RecuperarContraseña(self):

        name = self.Usuario

        mail_sender = 'interactivemathematicaldemons@gmail.com'
        password = 'jvjn shlv nzdf qpiy'
        mail_receiver = Cursor.Execute(f"SELECT Email FROM Usuarios_Registrados WHERE Nombre_Usuario = '{name}'")

        subject = 'RECUPERACION DE LA CONTRASEÑA'
        body = f'''
        Tu contraseña de Interactive Mathematical demonstration es: {self.RSA_Decrypt}
        '''

        em = EmailMessage()
        em['From'] = mail_sender
        em['To'] = mail_receiver
        em['Subject'] = subject
        em.set_content(body)

        context = create_default_context()

        with SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp: 
            smtp.login(mail_sender, password)
            smtp.sendmail(mail_sender, mail_receiver, em.as_string())