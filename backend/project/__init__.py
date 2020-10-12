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
    # Since the application instance is now created, pass it to each Flask
    # extension instance to bind it to the Flask application instance (app)
    CORS(app)
    app.config['MONGO_URI'] = "mongodb+srv://dbUser:dbUser@cluster0.boaw5.mongodb.net/UBSDB?ssl=true&ssl_cert_reqs=CERT_NONE"
    mongo.init_app(app)



# client = pymongo.MongoClient()
# db = client.test


def register_blueprints(app):
    # Since the application instance is now created, register each Blueprint
    # with the Flask application instance (app)
    from project.home import home_blueprint
    from project.profile import profile_blueprint

    app.register_blueprint(home_blueprint)
    app.register_blueprint(profile_blueprint)
