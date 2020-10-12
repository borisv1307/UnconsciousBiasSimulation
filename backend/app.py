from flask_cors import CORS
from flask_restful import Api
from flask import Flask
# from project.home.home import Home
# from project.resources.user import UserRegistration, UserLogin
# from project.resources.profile import CreateProfile, ViewProfile
from project import create_app

app = create_app()
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False
# api = Api(app)
# api.add_resource(Home, '/')
# api.add_resource(UserRegistration, '/register')
# api.add_resource(UserLogin, '/login')
# api.add_resource(CreateProfile, '/createProfile/<email>')
# api.add_resource(ViewProfile, '/viewProfile')

if __name__ == "__main__":
    app.run(debug=True)
