import mysql.connector


class ConexionDB:

    def conexionDataBase():

        try:
            conexion = mysql.connector.connect(
                                user = 'Ariel', 
                                password = 'G7i5oOmePha_4',
                                host = 'localhost',
                                database = 'usuarios',
                                port = '3306',
                                )
            
            print("Conexion Exitosa")

            return conexion

        except mysql.connector.Error as error:
            print("Error al conectarse a la base de datos {}".format(error))

            print("Conexion Fallida")

            return conexion
    
    conexionDataBase()

    pass



''''
miCursor.execute(""" 
    CREATE TABLE `pelao` (
        `s_id` int NOT NULL AUTO_INCREMENT,
        `user` varchar(18) NOT NULL,
        `password` varchar(20) NOT NULL,
        `progress` int NOT NULL,
        PRIMARY KEY (`s_id`),
        UNIQUE KEY `s_id_UNIQUE` (`s_id`),
        UNIQUE KEY `user_UNIQUE` (`user`)
)
""")
'''
