import sys
# append the path of the parent directory
sys.path.append("C:\\Users\\Usuario\\Documents\\GitHub\\Null\\src\\Back_end")

from DataBase import Du_Crud

Cursor = Du_Crud.DB_DataUsers()

def constructor(data):
    Estudiante = data.get("Nombre")
    Mundo = data.get("Mundo")
    Codigo = data.get("Aula")
    Nivel = data.get("Nivel")
    Nota = data.get("Nota")
    Nota = Calificacion(Estudiante, Mundo, Codigo, Nivel, Nota) #Creación del objeto
    return Nota

class Calificacion:
    def __init__(self, Estudiante, Mundo, Codigo, Nivel, Nota): 
        self.Estudiante = Estudiante
        self.Mundo = Mundo
        self.Codigo = Codigo
        self.Nivel = Nivel
        self.Nota = Nota

    def ActualizarNotas(self):
        sql_cmd = f'''
                    UPDATE 'Mundo{self.Mundo}_{self.Codigo}'
                    SET
                    '{self.Mundo}.Nivel_{self.Nivel}' = {self.Nota}
                    WHERE
                    Nombre_Estudiante = '{self.Estudiante}'
                '''
        Cursor.Execute(sql_cmd)