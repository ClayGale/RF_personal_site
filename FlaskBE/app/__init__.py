from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config.from_pyfile('config.py')

#from app import routes
from app import routes
CORS(app)



