import Cors as Cors
from flask import Flask
from Flask-Cors import CORS
#from config import Config

app = Flask(__name__)
CORS(app)

#app.config.from_object(Config)

from app import routes




