# pylint: disable = line-too-long, unused-variable, broad-except, trailing-whitespace, cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string
from datetime import datetime
from flask import request
from project import mongo
from . import presence_blueprint

################
#### routes ####
################

# ALL FUTURE DATA VALIDATION

@presence_blueprint.route('/api/v1/addPresence/', methods=['POST'])
def add_presence_to_pool():
    date_joined = datetime.utcnow()
    profile_data = request.get_json()
    output = insert_data(profile_data)

    if output:
        result = {
            "profile_id": profile_data['profile_id'],
            "position": profile_data['position'],
            "aboutMe":  profile_data['aboutMe'],
            "education": profile_data['education'],
            "experience": profile_data['experience'],
            "user_id": profile_data['user_id'],
            "profileName": profile_data['profileName'],
            "profileImg": profile_data['profileImg'],
            "first_name": profile_data['first_name'],
            "last_name": profile_data['last_name'],
            "status":"submitted",
            "addedOn": date_joined,
            "reviewedOn": "",
            "reviewedBy": ""
            }
    else:
        result = {'code': 2, "error": "User account does not exist"}, 403
    return output

def insert_data(profile_information):
    date_joined = datetime.utcnow()
    presence = mongo.db.presence
    create_presence = presence.insert_one({
        "profile_id": profile_information['profile_id'],
        "user_id": profile_information['user_id'],
        "profileName": profile_information['profileName'],
        "profileImg": profile_information['profileImg'],
        "first_name": profile_information['first_name'],
        "last_name": profile_information['last_name'],
        "position": profile_information['position'],
        "aboutMe":  profile_information['aboutMe'],
        "education": profile_information['education'],
        "experience": profile_information['experience'],
        "status":"submitted",
        "addedOn": date_joined,
        "reviewedOn": "",
        "reviewedBy": ""
    })
    if create_presence:
        return profile_information
