from flask_restful import Resource
from flask import jsonify, request, json
from flask import current_app as app

class UserRegistration(Resource):
    def post(self):
        return ('result')


class UserLogin(Resource):
    def get(self):
        print(app.mongo)
        return ('result')
