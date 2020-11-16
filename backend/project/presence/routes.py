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

    if output != "ERROR":
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
            "status": "submitted",
            "addedOn": date_joined,
            "reviewedOn": "",
            "reviewedBy": ""
        }
    else:
        result = {'code': 2, "error": "User account does not exist"}, 403
    return result


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
        "status": "submitted",
        "addedOn": date_joined,
        "reviewedOn": "",
        "reviewedBy": ""
    })
    if create_presence:
        return profile_information
    return "ERROR"


@presence_blueprint.route('/api/v1/getPresence/<user_id>/', methods=['GET'])
def get_user_presence(user_id):

    # Convert id to integer
    try:
        user_id = int(user_id)
    except:
        return {'code': 5, 'error': "id must be numerical"}, 403

    # Get request
    presence = mongo.db.presence
    get_user_presence = presence.find_one({'user_id': user_id})
    if get_user_presence:
        output = {
            'user_id': int(get_user_presence['user_id']),
            'profile_id': get_user_presence['profile_id'],
            'profile_name': get_user_presence['profileName'],
            'profile_image': get_user_presence['profileImg'],
            'first_name': get_user_presence['first_name'],
            'last_name': get_user_presence['last_name'],
            'about_me': get_user_presence['aboutMe'],
            'position': get_user_presence['position'],
            'education': get_user_presence['education'],
            'experience': get_user_presence['experience'],
            'status': get_user_presence['status'],
            'reviewed_on': get_user_presence['reviewedOn'],
            'reviewed_by': get_user_presence['reviewedBy']
        }
    else:
        output = {'code': 5, "error": "Presence not found"}, 403
        return output


@presence_blueprint.route('/api/v1/getAllPresence/', methods=['GET'])
def get_all_presence():
    if request.method == 'GET':
        all_presence = mongo.db.presence

        output = []
        try:
            for presence in all_presence.find():

                output.append({
                    'user_id': int(presence['user_id']),
                    'profile_id': presence['profile_id'],
                    'profile_name': presence['profileName'],
                    'profile_image': presence['profileImg'],
                    'first_name': presence['first_name'],
                    'last_name': presence['last_name'],
                    'about_me': presence['aboutMe'],
                    'position': presence['position'],
                    'education': presence['education'],
                    'experience': presence['experience'],
                    'status': presence['status'],
                    'reviewed_on': presence['reviewedOn'],
                    'reviewed_by': presence['reviewedBy']
                })

            return {'count': len(output), 'results': output}
        except:
            return {'code': 4, 'error': "No presence found"}, 403
