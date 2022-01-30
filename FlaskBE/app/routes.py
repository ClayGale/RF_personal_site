import os, json
from flask import render_template, flash, redirect, make_response
from FlaskBE.app import app

@app.route('/')
@app.route('/index', methods=['GET'])
def index():
    # response = make_response(render_template('index.html', title='home'))
    # response.headers.set("Access-Control-Allow-Origin", "*")
    # return response
    return render_template('index.html', title='home')

@app.route('/projects') #route for projects showcase including json project data loading
def projects():
    projects = os.path.join(app.static_folder, 'data', 'projects.json')

    with open(projects) as pData:
        data = json.load(pData)

    return render_template('projects.html', title='showcase', data=data)

@app.route('/contact')
def contact():
    return render_template('contact.html', title='contact')