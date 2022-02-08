import sys, os, json
from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)


@app.route('/')
@app.route('/index', methods=['GET'])
@cross_origin()
def index():
    print('Hello world!', file=sys.stderr)

    return jsonify(render_template('index.html', title='home'))


@app.route('/projects')  # route for projects showcase including json project data loading
@cross_origin()
def projects():
    projects = os.path.join(app.static_folder, 'data', 'projects.json')

    with open(projects) as pData:
        data = json.load(pData)

    return jsonify(render_template('projects.html', title='showcase', data=data))


@app.route('/contact')
def contact():
    return jsonify(render_template('contact.html', title='contact'))


print('Hello routes!', file=sys.stderr) #testing line
