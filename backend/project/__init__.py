#pylint: disable = missing-function-docstring ,missing-module-docstring, missing-final-newline, missing-module-docstring, missing-function-docstring, line-too-long, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order
from project.home import home_blueprint
from project.profile import profile_blueprint
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()


def create_app(env_name):

    # Flask Config
    app = Flask(__name__)
    initialize_extensions(app,env_name)
    register_blueprints(app)
    return app

def initialize_extensions(app,env_name):
    CORS(app)
    if env_name =='dev':
        app.config['MONGO_URI'] = "mongodb+srv://UBSDBAdmin:Admin123@cluster0.yed1w.azure.mongodb.net/UBSDB?ssl=true&ssl_cert_reqs=CERT_NONE"
    else:
        app.config['MONGO_URI'] = "mongodb+srv://UBSDBAdmin:Admin123@cluster0.yed1w.azure.mongodb.net/UBSDBTEST?ssl=true&ssl_cert_reqs=CERT_NONE"
    mongo.init_app(app)


def register_blueprints(app):
    app.register_blueprint(home_blueprint)
    app.register_blueprint(profile_blueprint)
