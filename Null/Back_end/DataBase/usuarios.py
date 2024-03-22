from typing import Any
from conexion import *

class Users:

    def __init__(self, name: str, last_name: str, date_birth: str, rol: str, e_mail: str, user: str, password: str, progress: int):

        self.name = name
        self.last_name = last_name
        self.date_birth = date_birth
        self.rol = rol
        self.e_mail = e_mail
        self.user = user
        self.password = password
        self.progress = progress

Ariel_info = ("Ariel Giovanni", "Cardenas Santisteban", "2005-05-14", "Student", "arcardenass@unal.edu.co", "ArielC", "root1234", 0)
Ariel = Users("Ariel Giovanni", "Cardenas Santisteban", "2005-05-14", "Student", "arcardenass@unal.edu.co", "ArielC", "root1234", 0)
