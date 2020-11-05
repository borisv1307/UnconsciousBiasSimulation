# pylint: disable = line-too-long,cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string
import re
from json import loads
from functools import wraps
from bson.json_util import dumps
from flask import request, jsonify
from project import mongo
from . import profile_blueprint

################
#### routes ####
################

# ALL FUTURE DATA VALIDATION


def profile_validation(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        try:
            profile_data = request.get_json()
            get_email = profile_data['email']
        except:
            return {'code': 4, 'error': 'Missing request body'}, 403

        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

        if get_email is None:
            return {"code": 4, "error": "Invalid email id"}, 403

        if not re.search(regex, get_email):
            return jsonify({'code': 4, "error": "Invalid email id"}), 403

        return func(*args, **kwargs)
    return decorated


@profile_blueprint.route('/api/v1/createProfile/', methods=['POST'])
@profile_validation
def create_user_profile():
   # Get fields from request body, check for missing fields

    profile_data = request.get_json()
    get_email = profile_data['email']

    # Get collections
    profile = mongo.db.profile
    user = mongo.db.user
    try:
        profile_id = int(profile.find().skip(
            profile.count_documents({}) - 1)[0]['profile_id'])+1
    except:
        profile_id = 1

    # check if email is already in database
    email_exists = user.count_documents({'email': get_email})
    if email_exists:
        get_user_id = user.find_one({"email": get_email}, {
                                    'user_id': 1, '_id': 0})
        user_id = get_user_id['user_id']
        create_profile = profile.insert_one({
            "profile_id": profile_id,
            "user_id": user_id,
            "profileName": profile_data['profileName'],
            "profileImg": profile_data['profileImg'],
            "first_name": profile_data['first_name'],
            "last_name": profile_data['last_name'],
            "position": profile_data['position'],
            "aboutMe":  profile_data['aboutMe'],
            "education": profile_data['education'],
            "experience": profile_data['experience']
        })

        if create_profile:
            output = {
                "profile_id": profile_id,
                "user_id": user_id,
                "profileName": profile_data['profileName'],
                "profileImg": profile_data['profileImg'],
                "first_name": profile_data['first_name'],
                "last_name": profile_data['last_name'],
                "position": profile_data['position'],
                "aboutMe":  profile_data['aboutMe'],
                "education": profile_data['education'],
                "experience": profile_data['experience']
            }
        else:
            output = {'code': 2, "error": "Insert Failed"}
    else:
        output = {'code': 2, "error": "User account does not exist"}, 403

    return output


@profile_blueprint.route('/api/v1/getProfiles/', methods=['GET'])
def get_user_profiles():
    user_id = 1
    userdb = mongo.db.user
    profile = mongo.db.profile
    output = []
    try:
        user = loads(dumps(userdb.find({"user_id": user_id})))
        profiles = loads(dumps(profile.find({"user_id": user_id})))
        for profile in profiles:
            output.append({
                "profile_id": profile['profile_id'],
                "profileName": profile['profileName'],
                "user_id": profile['user_id'],
                "state": user[0]['contact_details']['state'],
                "zip": user[0]['contact_details']['zip'],
                "city": user[0]['contact_details']['city'],
                "email": user[0]['email'],
                "profileImg": profile['profileImg'],
                "first_name": profile['first_name'],
                "last_name": profile['last_name'],
                "position": profile['position'],
                "aboutMe":  profile['aboutMe'],
                "education": profile['education'],
                "experience": profile['experience']
            })
        if len(output) == 0:
            output = {'code': 2, "error": "User not found"}
        else:
            output = {"count": len(output), "results": output}
    except:
        output = {'code': 2, "error": "Error fetching details from DB"}
    return output
