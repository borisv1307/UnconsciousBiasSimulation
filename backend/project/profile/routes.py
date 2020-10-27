#pylint: disable = line-too-long,cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string
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
            return {"code":4, "error":"Invalid email id"}, 403

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
        profile_id = int(profile.find().skip(profile.count_documents({}) - 1)[0]['profile_id'])+1
    except:
        profile_id = 1

    # check if email is already in database
    email_exists = user.count_documents({'email': get_email})
    if email_exists:
        get_user_id = user.find_one({"email": get_email}, {'user_id': 1, '_id': 0})
        user_id = get_user_id['user_id']
        create_profile = profile.insert_one({
            "profile_id": profile_id,
            "user_id": user_id,
            "profileName": profile_data['profileName'],
            "profileImg": profile_data['profileImg'],
            "firstName": profile_data['firstName'],
            "lastName": profile_data['lastName'],
            "position": profile_data['position'],
            "aboutMe":  profile_data['aboutMe'],
            "education": profile_data['education'],
            "experience": profile_data['experience']
        })

        if create_profile:
            user = profile.find_one({"profile_id": profile_id})
            output = {
                "profile_id": user['profile_id'],
                "user_id": user['user_id'],
                "profileName": user['profileName'],
                "profileImg": user['profileImg'],
                "firstName": user['firstName'],
                "lastName": user['lastName'],
                "position": user['position'],
                "aboutMe":  user['aboutMe'],
                "education": user['education'],
                "experience": user['experience']
            }
        else:
            output = {'code': 2, "error": "Insert Failed"}
    else:
        output = {'code': 2, "error": "User account does not exist"}

    return output


@profile_blueprint.route('/api/v1/getProfiles/', methods=['GET'])
def get_user_profiles():
    user_id = 1
    profile = mongo.db.profile
    output = []
    try:
        profiles = loads(dumps(profile.find({"user_id": user_id})))
        for profile in profiles:

            output.append({
                "profile_id": profile['profile_id'],
                "profileName" : profile['profileName'],
                "user_id": profile['user_id'],
                "profileImg": profile['profileImg'],
                "firstName": profile['firstName'],
                "lastName": profile['lastName'],
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
