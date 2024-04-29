""" import sys
# append the path of the parent directory
sys.path.append("C:\\Users\\Usuario\\Documents\\GitHub\\Null\\src\\Back_end") """

from flask import request, jsonify
from flask import Blueprint

login_bp = Blueprint("Calificaciones", __name__)

@login_bp.route(r"/Backend/Calificaciones", methods = ['POST'])
def recibir_dato():
    pass