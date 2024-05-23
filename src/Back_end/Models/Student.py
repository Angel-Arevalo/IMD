from DataBase.Du_Crud import DB_DataUsers
from pandas import read_sql_query

Cursor = DB_DataUsers()

class Student():

    def __init__(self, Usuario: str, Email: str):
        self.Username = Usuario


    def Unirse_Aula_Virtual(Usuario, codigo, mail):
        # Check if the classroom table exists
        if Cursor.FetchOId(f"SELECT name FROM sqlite_master WHERE type='table' AND name = 'Aula_{codigo}'") is not None:
            Cursor.ShowTable()
            return f"Se ha unido a la Aula_{codigo} exitosamente", "true"
        else:
            print(codigo)
            return f"El Aula_{codigo} no existe", "false"


    def __InicializarDatos__(nombre, codigo):
        for i in range(1, 5):
            num = Cursor.FetchOId(f'Mundo{i}_{codigo}', 'Id_E')
            sql_cmd = f'''
                        INSERT INTO 'Mundo{i}_{codigo}'
                        (Id_E, Nombre_Estudiante, '{i}.Nivel_1', '{i}.Nivel_2', '{i}.Nivel_3', '{i}.Nivel_4', '{i}.Nivel_5')
                        VALUES ({num}, '{nombre}', -1, -1, -1, -1, -1)
                    '''
            Cursor.Execute(sql_cmd)