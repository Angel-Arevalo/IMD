from DataBase.Du_Crud import DB_DataUsers

Cursor = DB_DataUsers()

class Student():

    def __init__(self, Usuario: str, Email: str):
        self.Username = Usuario


    def Unirse_Aula_Virtual(Usuario, codigo, mail):
        # Check if the classroom table exists
        if Cursor.FetchOId(f"SELECT name FROM sqlite_master WHERE type='table' AND name = 'Aula_{codigo}'") is not None:
            b0 = Cursor.FetchOId(f"SELECT name FROM sqlite_master WHERE type='table' AND name = 'Aula_{codigo}'")
            num = Cursor.FetchOId(b0, "Id_E")
            id_U = Cursor.FetchOId(f"SELECT Id FROM Usuarios_Registrados WHERE Nombre_Usuario = '{Usuario}'")
            id_A = Cursor.FetchOId(f"SELECT Id_Aula FROM Aulas WHERE Aula = 'Aula_{codigo}'")
            id_I = Cursor.FetchOId('User_Aulas', 'Id_User_Aulas')
            sql_cmd = f'''INSERT INTO 'Aula_{codigo}' 
                        (Id_E, Nombre_Estudiante, Correo, Mundo, Progreso, Nota_Final)
                        VALUES ({num}, '{Usuario}', '{mail}', 0, 0, 0)
                    '''
            sql_cmd1 = f'''
                        INSERT INTO User_Aulas 
                        (Id_User_Aulas, Id_User, Id_Aula) VALUES 
                        ('{id_I}', '{id_U}', '{id_A}')
                    '''
            Cursor.Execute(sql_cmd)
            Cursor.Execute(sql_cmd1)
            Student.__InicializarDatos__(Usuario, codigo)
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