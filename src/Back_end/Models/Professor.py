from User import InputUser
from DataBase.Du_Crud import DB_DataUsers
from Utils.Random import Randomizer

Cursor = DB_DataUsers()
class Teacher(InputUser): 

    def __init__(self, Usuario: str, Contraseña: str, Rol: str, Email: str):
        super().__init__(Usuario, Contraseña, Rol, Email)
        self.Codigo_Clases = []
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
            sql_cmd = f'''
                        CREATE TABLE IF NOT EXISTS 'Aula_{codigo}' (
                        'Id_E' INT AUTO_INCREMENT,
                        'Nombre_Estudiante' TEXT NOT NULL PRIMARY KEY,
                        'Mundo' INT NOT NULL,
                        'Progreso' INT NOT NULL,
                        'Nota_Final' INT NOT NULL
                        )
                    '''
            Cursor.Execute(sql_cmd)
            Teacher.__CrearTablaProgreso__(codigo)
            self.Codigo_Clases.append(codigo)
            return f"Aula {codigo} creada exitosamente"
        else:
            self.CrearAulaVirtual()