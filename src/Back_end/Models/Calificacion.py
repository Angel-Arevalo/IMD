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

    def C_EntregarNotas(resultado, tipo):
        match tipo:
            case 1:
                pass
            case 2:
                pass
            case 3:
                pass
            case 4:
                pass
        pass

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
            identificador = 1
        elif (estudiante == "Aula" and mundo != "Todos"): #Aqui hay un posible riesgo a que de error si el mundo no existe
            sql_cmd = f'''
                        SELECT M1.*
                        FROM 'Mundo{mundo}_{codigo}' AS M1
                    '''
            resultado = Cursor.FetchA(sql_cmd)
            identificador = 2
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
            identificador = 3
        else: #Aqui hay un posible riesgo a que de error
            sql_cmd = f'''
                        SELECT M1.*
                        FROM 'Mundo{mundo}_{codigo}' AS M1 
                        WHERE M1.Nombre_Estudiante = '{estudiante}'
                    '''
            resultado = Cursor.FetchA(sql_cmd)
            identificador = 4
        return resultado

a = Calificacion.NotasEstudiante("maw-710")

def toList (lista, i = 0):
    l = len(lista)
    if i < l and type(lista[i]) == tuple:
        lista[i] = list(lista[i])
        return toList(lista ,i+1)
    return lista

def cleanList (lista, i = 0, j = 0):
    li = len(lista)
    lj = len(lista[0])
    if i < li and j < lj:
        if type(lista[i][j]) != str and lista[i][j] > 0:
            lista[i].pop(j)
        return cleanList(lista, 0, j+1)
    if j == lj:
        return cleanList(lista, i+1, j+1)
    return lista

def separeList1(lista: list, i, newL: list = [], j = 0):
    if j != 0 and type(lista[i][j]) == str:
        return newL
    newL.append(lista[i][j])
    return separeList1(lista, i, newL, j+1)

def newList(lista):
    newL = []
    for i in range(len(lista)):
        j = len(lista[i])
        newL.append([])
        newL[i] = separeList1(lista, i)
        k = len(newL[i])
        k = k // j
        for m in range(k-1):
            pass





a = toList(a)
a = cleanList(a)
print(separeList1(a, 0))
