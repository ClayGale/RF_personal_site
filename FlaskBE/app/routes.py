import sys, os, json
from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin
from . import searchPrep

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)

pages ={1:{'name':'Home','route':'/index'},
        2:{'name':'Projects','route':'/projects'},
        3:{'name':'Education','route':'/education'},
        4:{'name':'About','route':'/about'}}

file = os.path.join(app.static_folder, 'data', 'projects.json')
projectIndex = searchPrep.searchIndex(file)
file = os.path.join(app.static_folder, 'data', 'education.json')
classesIndex = searchPrep.searchIndex(file)

@app.route('/')
@app.route('/index') # home screen 
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
    #sending descriptive html, the project list, and the category for easy handling by the front end
    output = {"htmlPack":render_template('projects.html'), "data":data, "type":"projects"}
    return jsonify(output)

@app.route('/education')  # route for education summary including json classlist data loading.
@cross_origin()
def education():
    classes = os.path.join(app.static_folder, 'data', 'education.json')

    with open(classes) as cData: #collecting data for template
        data = json.load(cData)
    #sending descriptive html, the class list, and the category for easy handling by the front end
    output = {"htmlPack":render_template('education.html'), "data":data, "type":"education"}
    return jsonify(output)

@app.route('/about') # route for general info
@cross_origin()
def about():

    output = {"htmlPack":render_template('about.html', title='about')}
    return jsonify(output)

@app.route('/nav') # route for the top nav bar
@cross_origin()
def nav():
    return jsonify(pages)

@app.route('/showcase/<sValue>') # retrieves the template matching sValue
@cross_origin()
def showcase(sValue): 
    print(sValue, file=sys.stderr)
    
    output = {"htmlPack":render_template('showcaseTemplates/' + sValue + '.html', title='showcase')}
    return jsonify(output)


    #showcase = os.path.join(app.static_folder, 'data', 'projects.json')
    #with open(projects) as pData: #open json for iteration
    #    data = json.load(pData)

    #for project in data:
    #    if project.ID == pId: #matching ID and setting output to matched project set
    #        output = project
    #        break
