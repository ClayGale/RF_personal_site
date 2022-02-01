#from os import path

#basedir = path.abspath(path.dirname(__file__))


class Config:
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'
    FLASK_APP = 'ClayGale.py'
    FLASK_ENV = 'development'
    DEBUG = True
    TESTING = True
#
# class DevConfig(Config):
#     FLASK_ENV = 'development'
#     DEBUG = True
#     TESTING = True
#
# class ProdConfig(Config):
#     FLASK_ENV = 'production'
#     DEBUG = False
#     TESTING = False
#
