from flask_restful import Resource, Api, reqparse
from flask import jsonify, request, json
from flask import current_app as app

class Home(Resource):
    def get(self):
        return "Hello World"

    
