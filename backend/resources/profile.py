from flask_restful import Resource

from flask import jsonify, request, json

from flask import current_app as app


class CreateProfile(Resource):

    def post(self, email):
        profile_data = request.get_json()
        users = app.mongo.db.User
        user = users.find_one_or_404({'email': email})
        profile_data["user"] = user
        if user:
            app.mongo.db.Profile.insert_one(profile_data)
        response = json.dumps(profile_data, default=str)
        return response


class ViewProfile(Resource):
    def get(self):
        return "profile"
