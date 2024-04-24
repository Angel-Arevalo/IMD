import json, sqlite3 as sql

with open(r'src\Back_end\Utils\config.json') as jj:
    DB_Direction = json.load(jj)

class DB_DataUsers:
    def __init__(self):
        self.DB_Direction = DB_Direction['Base_Direction']
    
    def Execute(self, sql_cmd): # Solo para ejecutar una sentencia, no sirve para almacenar el resultado y luego trabajar sobre el
        C = sql.connect(self.DB_Direction)
        C.execute(sql_cmd)
        C.commit()
        C.close()
    
    def FetchOId(self, query_tabla, *IdF): # Puede recibir una sentencia o el nombre de una tabla con el nombre de su columna de identificacion
        Cursor = sql.connect(self.DB_Direction)
        if (len(IdF) != 0):
            result = Cursor.execute(f"SELECT MAX('{IdF[0]}') FROM '{query_tabla}'")
            result = result.fetchone()[0]
            i = int(result)+1 if (result is not None) else 1
            Cursor.commit()
            Cursor.close()
            return i
        result = Cursor.execute(query_tabla)
        result = result.fetchone()[0]
        Cursor.commit()
        Cursor.close()
        return result
    
    def FetchA(self, sql_cmd):
        Cursor = sql.connect(self.DB_Direction)
        result = Cursor.execute(sql_cmd)
        result = result.fetchall()
        Cursor.commit()
        Cursor.close()
        return result
    
    def InicializarTablas(self):
        self.TablaRoles()
        self.CrearTabla_UsuariosR()

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

t1 = DB_DataUsers()
oid = t1.Execute('''SELECT Id_Rol=1 FROM Roles''')
