import sys

sys.path.append("..\Back_end")

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from Models.User import constructor
from Routes.Registro import registro_bp
from Routes.Login import login_bp


app = Flask(__name__)
app.register_blueprint(registro_bp)
app.register_blueprint(login_bp)

CORS(app, resources={r"/Backend/*" : {"origins" : "*"}})

if __name__ == '__main__':
    app.run(debug=True)
