from User import InputUser
from DataBase.Du_Crud import DB_DataUsers

Cursor = DB_DataUsers()

class Student(InputUser):

    def __init__(self, Usuario: str, Contraseña: str, Rol: str, Email: str):
        super().__init__(Usuario, Contraseña, Rol, Email)
        self.Codigo_Clases = [] #No se podria hacer algo similar con el rol, para que no haga falta enviarlo en el constructor.
        self.GuardarEnDataUsers()

    def Unirse_Aula_Virtual(self, codigo):
        b0 = Cursor.FetchOId(f"SELECT name FROM sqlite_master WHERE type='table' AND name = 'Aula_{codigo}'")
        get_info = Cursor.FetchA(f"SELECT * FROM 'Aula_{codigo}' WHERE Nombre_Estudiante = '{self.Usuario}'")
        b1 = "Usuario Correcto" if (len(get_info) == 0) else "Usuario en uso"
        if (b0 != None and b1 == "Usuario Correcto"):
            num = Cursor.FetchOId(f'Aula_{codigo}', 'Id_E')
            sql_cmd = f'''INSERT INTO 'Aula_{codigo}' 
                        (Id_E, Nombre_Estudiante, Mundo, Progreso, Nota_Final)
                        VALUES ({num}, '{self.Usuario}', 0, 0, 0)
                    '''
            Cursor.Execute(sql_cmd)
            Student.__InicializarDatos__(self.Usuario, codigo)
            return f"Se ha unido a la Aula_{codigo} exitosamente"
        return "La Aula no existe o el usuario es incorrecto"

    def __InicializarDatos__(nombre, codigo):
        for i in range(1, 5):
            num = Cursor.FetchOId(f'Mundo{i}_{codigo}', 'Id_E')
            sql_cmd = f'''
                        INSERT INTO 'Mundo{i}_{codigo}'
                        (Id_E, Nombre_Estudiante, '{i}.Nivel_1', '{i}.Nivel_2', '{i}.Nivel_3', '{i}.Nivel_4', '{i}.Nivel_5')
                        VALUES ({num}, '{nombre}', -1, -1, -1, -1, -1)
                    '''
            Cursor.Execute(sql_cmd)

    def ActualizarNotas(Notas_dict: dict): #Esto no deberia estar aqui
        i, codigo, nivel, nota, nombre = Notas_dict["Mundo"], Notas_dict["Codigo"], Notas_dict["Nivel"], Notas_dict["Nota"], Notas_dict["Nombre"]
        sql_cmd = f'''
                    UPDATE 'Mundo{i}_{codigo}'
                    SET
                    '{i}.Nivel_{nivel}' = {nota}
                    WHERE
                    Nombre_Estudiante = '{nombre}'
                '''
        Cursor.Execute(sql_cmd)