
from flask_cors import CORS
from flask_restful import Api
from flask import Flask
from resources.home import Home
from resources.profile import CreateProfile
from config import create_app


app = create_app()
api = Api(app)
api.add_resource(Home, '/')
api.add_resource(CreateProfile, '/createProfile/<email>')


if __name__ == "__main__":
    app.run(debug=True)
