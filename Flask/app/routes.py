import os, json
from flask import render_template, flash, redirect
from flask_cors import CORS, cross_origin
from Flask.app import app

@app.route('/')
@app.route('/index', methods=['GET'])
def index():
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