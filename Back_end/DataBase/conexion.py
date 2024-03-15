import mysql.connector

conexion = mysql.connector.connect(user = 'Ariel', password = 'G7i5oOmePha_4',
                                    host = 'localhost',
                                    database = 'usuarios',
                                    port = '3306')


miCursor = conexion.cursor()

miCursor.execute(""" 
    CREATE TABLE ESTUDIANTES (
        est_id INTEGER PRIMARY KEY,
        progreso INTEGER
    )
""")

conexion.commit()

conexion.close()