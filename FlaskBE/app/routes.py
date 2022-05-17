import sys, os, json
from flask import Flask, render_template, jsonify, send_file
from flask_cors import CORS, cross_origin
from . import searchPrep

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)

#creating the static values to be used by the front end here
pages ={1:{'name':'Home','route':'/index'},
        2:{'name':'Projects','route':'/projects'},
        3:{'name':'Education','route':'/education'},
        4:{'name':'About','route':'/about'}}

file = os.path.join(app.static_folder, 'data', 'projects.json')
projectEntries = searchPrep.searchSet(file)
file = os.path.join(app.static_folder, 'data', 'education.json')
classesEntries = searchPrep.searchSet(file)
# since the search dictionary and the skills list are created in the searchSet def
# they are separated out for their own purposes in the following couple of lines
projectSet = projectEntries[0]
classesSet = classesEntries[0]

resumeSet = searchPrep.resumePrep(projectEntries[1],classesEntries[1])

del projectEntries
del classesEntries

@app.route('/api/')
@app.route('/api/index') # home screen 
@cross_origin()
def index():
    output = {"htmlPack":render_template('index.html', title='home'),
             "resumeSet":resumeSet, "resumeBody":render_template('resume.html'), "type":"resume"}
    return jsonify(output)


@app.route('/api/projects')  # route for projects showcase including json project data loading
@cross_origin()
def projects():
    projects = os.path.join(app.static_folder, 'data', 'projects.json')

    with open(projects) as pData: #collecting data for template
        data = json.load(pData)
    #sending descriptive html, the project list, and the category for easy handling by the front end
    output = {"htmlPack":render_template('projects.html'), 
              "data":data, "searchSet":projectSet, "type":"projects"}
    return jsonify(output)

@app.route('/api/education')  # route for education summary including json classlist data loading.
@cross_origin()
def education():
    classes = os.path.join(app.static_folder, 'data', 'education.json')

    with open(classes) as cData: #collecting data for template
        data = json.load(cData)
    #sending descriptive html, the class list, and the category for easy handling by the front end
    output = {"htmlPack":render_template('education.html'), 
              "data":data, "searchSet":classesSet, "type":"education"}
    return jsonify(output)

@app.route('/api/about') # route for general info
@cross_origin()
def about():

    output = {"htmlPack":render_template('about.html', title='about'), "type":"about"}
    return jsonify(output)

@app.route('/api/nav') # route for the top nav bar
@cross_origin()
def nav():
    return jsonify(pages)

@app.route('/api/showcase/<sValue>') # retrieves the template matching sValue
@cross_origin()
def showcase(sValue): 
    print(sValue, file=sys.stderr)
    
    output = {"htmlPack":render_template('showcaseTemplates/' + sValue + '.html', title='showcase'), "type":"showcase"}
    return jsonify(output)

@app.route('/api/images/<img>')
@cross_origin()
def image(img):
    image = os.path.join(app.static_folder, 'images/' + img)

    return send_file(image, mimetype='image/png')

@app.route('/api/files/<filename>') # file downloads
@cross_origin()
def download(filename):
    file = os.path.join(app.static_folder, "files/" + filename)

    return send_file(file, as_attachment=True)

@app.errorhandler(404)
@cross_origin()
def page_not_found(e):

    output = {"htmlPack":render_template('404.html', title='about')}
    return jsonify(output)