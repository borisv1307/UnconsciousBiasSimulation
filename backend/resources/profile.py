from flask_restful import Resource
from flask import jsonify, request, json
from flask import current_app as app


class CreateProfile(Resource):
    def post(self,username):
        return ('result')


class ViewProfile(Resource):
    def get(self):
        return("profile")
