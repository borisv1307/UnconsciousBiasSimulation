# pylint: disable = line-too-long, unused-variable, broad-except, trailing-whitespace, cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string
import re
from datetime import datetime
from json import loads
from functools import wraps
from bson.json_util import dumps
from flask import request
from project import mongo
from . import presence_blueprint

################
#### routes ####
################

# ALL FUTURE DATA VALIDATION
class TestSomething:

    @presence_blueprint.route('/api/v1/addPresence/', methods=['POST'])
    def add_presence_to_pool():
        date_joined = datetime.utcnow()
        profile_data = request.get_json()

        profile = mongo.db.profile
        user = mongo.db.user
        presence = mongo.db.presence

        user_id_exists = user.count_documents({'user_id': profile_data['user_id']})
        if user_id_exists:
            create_presence = presence.insert_one({
                "profile_id": profile_data['profile_id'],
                "user_id": profile_data['user_id'],
                "profileName": profile_data['profileName'],
                "profileImg": profile_data['profileImg'],
                "first_name": profile_data['first_name'],
                "last_name": profile_data['last_name'],
                "position": profile_data['position'],
                "aboutMe":  profile_data['aboutMe'],
                "education": profile_data['education'],
                "experience": profile_data['experience'],
                "status":"submitted",
                "addedOn": date_joined,
                "reviewedOn": "",
                "reviewedBy": ""
            })
            if create_presence:
                output = {
                    "profile_id": profile_data['profile_id'],
                    "user_id": profile_data['user_id'],
                    "profileName": profile_data['profileName'],
                    "profileImg": profile_data['profileImg'],
                    "first_name": profile_data['first_name'],
                    "last_name": profile_data['last_name'],
                    "position": profile_data['position'],
                    "aboutMe":  profile_data['aboutMe'],
                    "education": profile_data['education'],
                    "experience": profile_data['experience'],
                    "status":"submitted",
                    "addedOn": date_joined,
                    "reviewedOn": "",
                    "reviewedBy": ""
                    }
            else:
                    output = {'code': 2, "error": "Insert Failed"}
        else:
            output = {'code': 2, "error": "User account does not exist"}, 403

        return output
