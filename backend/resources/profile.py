from flask_restful import Resource, Api, reqparse
from flask import jsonify, request, json
from flask import current_app as app

parser = reqparse.RequestParser()

class CreateProfile(Resource):
    def get(self):
        return "CreateProfile"
    def post(self):
        parser.add_argument('firstName', type=str)
        parser.add_argument('lastName', type=str)
        parser.add_argument('position', type=str)
        parser.add_argument('aboutMe', type=str)
        parser.add_argument('school', type=str)
        parser.add_argument('degree', type=str)
        parser.add_argument('major', type=str)
        parser.add_argument('eduStartDate', type=str)
        parser.add_argument('eduEndDate', type=str)
        parser.add_argument('gpa', type=str)
        parser.add_argument('title', type=str)
        parser.add_argument('company', type=str)
        parser.add_argument('location', type=str)
        parser.add_argument('expStartDate', type=str)
        parser.add_argument('expEndDate', type=str)

        args = parser.parse_args()

        return args


class ViewProfile(Resource):
    def get(self):
        return("profile")
