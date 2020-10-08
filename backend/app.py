
from flask_cors import CORS
from flask_restful import Api
from flask import Flask
from resources.home import Home
from resources.user import UserRegistration, UserLogin
from resources.profile import CreateProfile, ViewProfile
from config import create_app


app = create_app()
api = Api(app)
api.add_resource(Home, '/')
api.add_resource(UserRegistration, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(CreateProfile, '/createProfile/username')
api.add_resource(ViewProfile, '/viewProfile')

if __name__ == "__main__":
    app.run(debug=True)
