from User import InputUser
import sqlite3 as sql

Base_Direction = r'..\NULL\Back_end\DataBase\DataUsers.db'

class Student(InputUser):

    def __init__(self, Usuario: str, Contraseña: str, Rol: str, Email: str):
        super().__init__(Usuario, Contraseña, Rol, Email)
        self.Codigo_Clases = [] #No se podria hacer algo similar con el rol, para que no haga falta enviarlo en el constructor.
        self.GuardarEnDataUsers()

    def Unirse_Aula_Virtual(self, codigo):
        apuntador = sql.connect(Base_Direction)
        b = apuntador.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name = 'Aula_{codigo}'")
        b = b.fetchone()
        get_info = apuntador.execute(f"SELECT * FROM 'Aula_{codigo}' WHERE Nombre_Estudiante = '{self.Usuario}'")
        lista = get_info.fetchall()
        get_info = "Usuario Correcto" if (len(lista) == 0) else "Usuario en eso"
        if (b != None and get_info == "Usuario Correcto"):
            a = apuntador.execute(f"SELECT MAX(Id_E) FROM 'Aula_{codigo}'")
            a = a.fetchone()[0]
            num = int(a)+1 if (a is not None) else 1
            sql_cmd = f'''INSERT INTO 'Aula_{codigo}' 
                        (Id_E, Nombre_Estudiante, Mundo, Progreso, Nota_Final)
                        VALUES ({num}, '{self.Usuario}', 0, 0, 0)
                    '''
            apuntador.execute(sql_cmd)
            apuntador.commit()
            apuntador.close()
            Student.__InicializarDatos__(self.Usuario, codigo)
            return f"Se ha unido a la Aula_{codigo} exitosamente"
        apuntador.close()
        return "La Aula no existe o el usuario es incorrecto"

    def __InicializarDatos__(nombre, codigo):
        apuntador = sql.connect(Base_Direction)
        for i in range(1, 5):
            a = apuntador.execute(f"SELECT MAX(Id_E) FROM 'Mundo{i}_{codigo}'")
            a = a.fetchone()[0]
            num = int(a)+1 if (a is not None) else 1
            sql_cmd = f'''
                        INSERT INTO 'Mundo{i}_{codigo}'
                        (Id_E, Nombre_Estudiante, '{i}.Nivel_1', '{i}.Nivel_2', '{i}.Nivel_3', '{i}.Nivel_4', '{i}.Nivel_5')
                        VALUES ({num}, '{nombre}', 0, 0, 0, 0, 0)
                    '''
            apuntador.execute(sql_cmd)
        apuntador.commit()
        apuntador.close()

    def ActualizarNotas(Notas_dict: dict):
        apuntador = sql.connect(Base_Direction)
        i, codigo, nivel, nota, nombre = Notas_dict["Mundo"], Notas_dict["Codigo"], Notas_dict["Nivel"], Notas_dict["Nota"], Notas_dict["Nombre"]
        sql_cmd = f'''
                    UPDATE 'Mundo{i}_{codigo}'
                    SET
                    '{i}.Nivel_{nivel}' = {nota}
                    WHERE
                    Nombre_Estudiante = '{nombre}'
                '''
        apuntador.execute(sql_cmd)
        apuntador.commit()
        apuntador.close()






