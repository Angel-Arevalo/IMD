import json, sqlite3 as sql

with open(r'src\Back_end\Utils\config.json') as jj:
    DB_Direction = json.load(jj)
dir = print(DB_Direction['Base_Direction'])

class DB_DataUsers:
    def __init__(self):
        self.DB_Direction = DB_Direction['Base_Direction']

    def Conection(self):
        Cursor = sql.connect(self.DB_Direction)
        return Cursor
    
    def Execute(self, sql_cmd):
        C = self.Conection()
        result = C.execute(sql_cmd)
        C.commit()
        C.close()
        return result
    
    def FetchOId(self, query_tabla, *IdF):
        if (len(IdF) != 0):
            result = self.Execute(f"SELECT MAX('{IdF[0]}') FROM '{query_tabla}'")
            result = result.fetchone()[0]
            i = int(result)+1 if (result is not None) else 1
            return i
        result = self.Execute(query_tabla)
        result = result.fetchone()[0]
        return result
    
    def FetchA(self, sql_cmd):
        result = self.Execute(sql_cmd)
        return result.fetchall()
    
    def InicializarTablas():
        
        pass

    def TablaRoles(self):
        sql_cmd = '''
                    CREATE TABLE IF NOT EXISTS 'Roles' (
                        'Id_Rol' INT PRIMARY KEY,
                        'Rol' TEXT NOT NULL UNIQUE,
                        CHECK(Rol IN("Estudiante", "Profesor")),
                        FOREIGN KEY(Id_Rol) REFERENCES Usuarios_Registrados(Rol)
                        )
                '''
        self.Execute(sql_cmd)
        if (self.FetchOId('''SELECT Id_Rol=1 FROM Roles''') == None):
            self.Execute('''INSERT INTO Roles (Id_Rol, Rol) VALUES (1, 'Estudiante')''')
            self.Execute('''INSERT INTO Roles (Id_Rol, Rol) VALUES (2, 'Profesor')''')
        
    def CrearTabla_UsuariosR(self):
        sql_cmd = '''
                    CREATE TABLE IF NOT EXISTS 'Usuarios_Registrados' (
                        'Id' INT AUTO_INCREMENT,
                        'Nombre_Usuario' TEXT PRIMARY KEY NOT NULL,
                        'Contraseña' TEXT NOT NULL,
                        'Rol' INT NOT NULL,
                        'Email' TEXT NOT NULL,
                        CHECK(Rol IN(1,2))
                        )
                '''
        self.Execute(sql_cmd)
