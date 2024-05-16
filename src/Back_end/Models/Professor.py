from User import InputUser
from DataBase.Du_Crud import DB_DataUsers
from Utils.Random import Randomizer
from Utils.SqlFormatting import CalificacionFormat

Cursor = DB_DataUsers()
class Teacher(InputUser): 

    def __init__(self, Usuario: str, Contraseña: str, Rol: str, Email: str):
        super().__init__(Usuario, Contraseña, Rol, Email)
        self.GuardarEnDataUsers()

    def __CrearTablaProgreso__(codigo: str):
        for i in range(1, 5):
            sql_cmd = f'''
                            CREATE TABLE IF NOT EXISTS 'Mundo{i}_{codigo}' (
                            'Id_E' INT AUTO_INCREMENT,
                            'Nombre_Estudiante' TEXT NOT NULL PRIMARY KEY,
                            '{i}.Nivel_1' INT NOT NULL,
                            '{i}.Nivel_2' INT NOT NULL,
                            '{i}.Nivel_3' INT NOT NULL,
                            '{i}.Nivel_4' INT NOT NULL,
                            '{i}.Nivel_5' INT NOT NULL,
                            FOREIGN KEY(Nombre_Estudiante) REFERENCES 'Aula_{codigo}'(Nombre_Estudiante)
                            )
                        '''
            Cursor.Execute(sql_cmd)

    def CrearAulaVirtual(self):
        Code = Randomizer()
        codigo = Code.Generar_Codigo()
        b = Cursor.FetchA(f"PRAGMA table_info('Aula_{codigo}')")
        if (not bool(b)):
            id_U = Cursor.FetchOId(f"SELECT Id FROM Usuarios_Registrados WHERE Nombre_Usuario = '{self.Usuario}'")
            id_A = Cursor.FetchOId('Aulas', 'Id_Aula')
            id_I = Cursor.FetchOId('User_Aulas', 'Id_User_Aulas')
            sql_cmd = f'''
                        CREATE TABLE IF NOT EXISTS 'Aula_{codigo}' (
                        'Id_E' INT AUTO_INCREMENT,
                        'Nombre_Estudiante' TEXT NOT NULL PRIMARY KEY,
                        'Correo' TEXT NOT NULL UNIQUE,
                        'Mundo' INT NOT NULL,
                        'Progreso' INT NOT NULL,
                        'Nota_Final' INT NOT NULL
                        )
                    '''
            sql_cmd0 = f'''
                        INSERT INTO Aulas 
                        (Id_Aula, Aula) VALUES 
                        ('{id_A}', 'Aula_{codigo}')
                    '''
            sql_cmd1 = f'''
                        INSERT INTO User_Aulas 
                        (Id_User_Aulas, Id_User, Id_Aula) VALUES 
                        ('{id_I}', '{id_U}', '{id_A}')
                    '''
            Cursor.Execute(sql_cmd)
            Cursor.Execute(sql_cmd0)
            Cursor.Execute(sql_cmd1)
            Teacher.__CrearTablaProgreso__(codigo)
            return f"Aula {codigo} creada exitosamente"
        else:
            self.CrearAulaVirtual()

        ## A esta funcion se la llama asi: Calificacion.NotasEstudiante('code') #Necesita almenos el codigo
    def NotasEstudiante(codigo, estudiante = "Aula", mundo= "Todos"): #Devuelve una lista de tuplas [(Estudiante_1), (Estudiante_2),...,(Estudiante_n)]
        if (estudiante == "Aula" and mundo == "Todos"):
            sql_cmd = f'''
                        SELECT M1.*, M2.*, M3.*, M4.*
                        FROM 'Mundo1_{codigo}' AS M1
                        INNER JOIN 'Mundo2_{codigo}' AS M2 ON M1.Nombre_Estudiante = M2.Nombre_Estudiante
                        INNER JOIN 'Mundo3_{codigo}' AS M3 ON M2.Nombre_Estudiante = M3.Nombre_Estudiante
                        INNER JOIN 'Mundo4_{codigo}' AS M4 ON M3.Nombre_Estudiante = M4.Nombre_Estudiante
                    '''
            resultado = Cursor.FetchA(sql_cmd)
        elif (estudiante == "Aula" and mundo != "Todos"): #Aqui hay un posible riesgo a que de error si el mundo no existe
            sql_cmd = f'''
                        SELECT M1.*
                        FROM 'Mundo{mundo}_{codigo}' AS M1
                    '''
            resultado = Cursor.FetchA(sql_cmd)
        elif (estudiante != "Aula" and mundo == "Todos"): #Aqui hay un posible riesgo a que de error si se escribe mal el nombre del estudiante o no existe
            sql_cmd = f'''
                        SELECT M1.*, M2.*, M3.*, M4.*
                        FROM 'Mundo1_{codigo}' AS M1
                        INNER JOIN 'Mundo2_{codigo}' AS M2 ON M1.Nombre_Estudiante = M2.Nombre_Estudiante
                        INNER JOIN 'Mundo3_{codigo}' AS M3 ON M2.Nombre_Estudiante = M3.Nombre_Estudiante
                        INNER JOIN 'Mundo4_{codigo}' AS M4 ON M3.Nombre_Estudiante = M4.Nombre_Estudiante
                        WHERE M1.Nombre_Estudiante = '{estudiante}'
                    '''
            resultado = Cursor.FetchA(sql_cmd)
        else: #Aqui hay un posible riesgo a que de error
            sql_cmd = f'''
                        SELECT M1.*
                        FROM 'Mundo{mundo}_{codigo}' AS M1 
                        WHERE M1.Nombre_Estudiante = '{estudiante}'
                    '''
            resultado = Cursor.FetchA(sql_cmd)
        resultado = CalificacionFormat.SepareList(resultado)
        return resultado
    
    def EstAula(codigo):
        Aula = []
        sql_cmd = f'''
                    SELECT * FROM 'Aula_{codigo}' ORDER BY Nombre_Estudiante ASC
                '''
        result = Cursor.FetchA(sql_cmd)
        result = CalificacionFormat.SepareList(result)
        for i in range(len(result)):
            Aula.append(result[i][0])
        return Aula