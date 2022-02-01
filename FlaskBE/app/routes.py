import os, json
from flask import Flask, render_template
from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)

@app.route('/', endpoint='index')
@cross_origin()
@app.route('/index', methods=['GET'], endpoint='index')
@cross_origin()
def index():
    # response = make_response(render_template('index.html', title='home'))
    # response.headers.set("Access-Control-Allow-Origin", "*")
    # return response
    return render_template('index.html', title='home')

@app.route('/projects', endpoint='projects') #route for projects showcase including json project data loading
@cross_origin()
def projects():
    projects = os.path.join(app.static_folder, 'data', 'projects.json')

    with open(projects) as pData:
        data = json.load(pData)

    return render_template('projects.html', title='showcase', data=data)

@app.route('/contact', endpoint='contact')
def contact():
    return render_template('contact.html', title='contact')

