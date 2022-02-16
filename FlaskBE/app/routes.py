import sys, os, json
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)


@app.route('/')
@app.route('/index', methods=['GET'])
@cross_origin()
def index():
    print('Hello world!', file=sys.stderr)
    output = {"htmlPack":render_template('index.html', title='home')}
    return jsonify(output)


@app.route('/projects')  # route for projects showcase including json project data loading
@cross_origin()
def projects():
    projects = os.path.join(app.static_folder, 'data', 'projects.json')

    with open(projects) as pData: #collecting data for template
        data = json.load(pData)

    output = {"htmlPack":render_template('projects.html', title='showcase', data=data)}
    return jsonify(output)


@app.route('/contact')
def contact():

    output = {"htmlPack":render_template('contact.html', title='contact')}
    return jsonify(output)


@app.route('/showcase' , methods=['POST'])
def showcase():
    input = request.get_json()
    pId = input.json('pId') #taking requested ID from POST arg
    print(pId, file=sys.stderr)

    projects = os.path.join(app.static_folder, 'data', 'projects.json')
    with open(projects) as pData: #open json for iteration
        data = json.load(pData)

    for project in data:
        if project.ID == pId: #matching ID and setting output to matched project set
            output = project
            break


    return jsonify(output)

print('Hello routes!', file=sys.stderr) #testing line
