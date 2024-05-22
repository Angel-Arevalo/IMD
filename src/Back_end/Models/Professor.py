import sys
# append the path of the parent directory
sys.path.append("src\Back_end")

from Models.User import InputUser
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

    def CrearAulaVirtual(Name):
        Code = Randomizer()
        codigo = Code.Generar_Codigo()
        b = Cursor.FetchA(f"PRAGMA table_info('Aula_{codigo}')")
        if (not bool(b)):
            id_U = Cursor.FetchOId(f"SELECT Id FROM Usuarios_Registrados WHERE Nombre_Usuario = '{Name}'")
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
            Teacher.CrearAulaVirtual()
            
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

""" def ConvertArgs(args):
    b = []
    for i in range(len(args[0])):
        b.append(args[0][i])
    return b

def ConvertGrades(array, *args):
    args = ConvertArgs(args)
    Response = {}
    for i in range(len(array)):
        a = array[i][0][0]
        Response[a] = {}
        for j in range(len(args)):
            r = []
            for k in array[i][j]:
                if (type(k) != str):
                    r.append(k)
            Response[a][args[j]] = r
    return Response

def ConvertClassRoomDetail(arrays, *args):
    pass

def ConvertJsonFormat(order, array, *args): #Notas o Detalle Aula
    return ConvertGrades(array, args) if (order == "Notas") else ConvertClassRoomDetail(array, args) """