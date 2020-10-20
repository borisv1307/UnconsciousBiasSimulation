from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()

def create_app():

    # Flask Config
    app = Flask(__name__)
    initialize_extensions(app)
    register_blueprints(app)
    return app

def initialize_extensions(app):
    CORS(app)
    app.config['MONGO_URI'] = "mongodb+srv://UBSDBAdmin:Admin123@cluster0.yed1w.azure.mongodb.net/UBSDB?ssl=true&ssl_cert_reqs=CERT_NONE"
    mongo.init_app(app)




def register_blueprints(app):
    from project.home import home_blueprint
    from project.profile import profile_blueprint
    app.register_blueprint(home_blueprint)
    app.register_blueprint(profile_blueprint)
