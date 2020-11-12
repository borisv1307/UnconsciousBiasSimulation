# pylint: disable = line-too-long, broad-except, trailing-whitespace, cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string
import re
from json import loads
from functools import wraps
from bson.json_util import dumps
from flask import request
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


        if get_email is None or re.search("^\s*$", get_email):
            return {"code": 4, "error": "Input fields cannot be blank or null"}, 403

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


@profile_blueprint.route('/api/v1/getProfiles/<user_id>/', methods=['GET'])
def get_user_profiles(user_id):
    # Get user_id
    int_user_id = int(user_id)
    # Get collections
    userdb = mongo.db.user
    profile = mongo.db.profile
    output = []
    try:
        user = loads(dumps(userdb.find({"user_id": int_user_id})))
        profiles = loads(dumps(profile.find({"user_id": int_user_id})))
        # Check if user and profile exists if not display error message accordingly
        if user:
            if profiles:
                get_contact = user[0]['contact_details']
                for getprofile in profiles:
                    # Check if contact_details is an array or object
                    try:
                        validate_user = user[0]['contact_details']['state']
                        value = True
                    except Exception as exception_msg:
                        print("Unhandled Error inside the check condition:- %s" % exception_msg)
                        value = False
                    if value:
                        output.append({
                        "profile_id": getprofile['profile_id'],
                        "profileName": getprofile['profileName'],
                        "user_id": getprofile['user_id'],
                        "state": user[0]['contact_details']['state'],
                        "zip": user[0]['contact_details']['zip'],
                        "city": user[0]['contact_details']['city'],
                        "email": user[0]['email'],
                        "profileImg": getprofile['profileImg'],
                        "first_name": getprofile['first_name'],
                        "last_name": getprofile['last_name'],
                        "position": getprofile['position'],
                        "aboutMe":  getprofile['aboutMe'],
                        "education": getprofile['education'],
                        "experience": getprofile['experience']
                        })
                    else:
                        output.append({
                        "profile_id": getprofile['profile_id'],
                        "profileName": getprofile['profileName'],
                        "user_id": getprofile['user_id'],
                        "state": get_contact[0]['state'],
                        "zip": get_contact[0]['zip'],
                        "city": get_contact[0]['city'],
                        "email": user[0]['email'],
                        "profileImg": getprofile['profileImg'],
                        "first_name": getprofile['first_name'],
                        "last_name": getprofile['last_name'],
                        "position": getprofile['position'],
                        "aboutMe":  getprofile['aboutMe'],
                        "education": getprofile['education'],
                        "experience": getprofile['experience']
                        }) 
            else:
                output = {"error": "Profiles not found"}   
        else:
            output = {"error": "User not found"}
        if len(output) == 0:
            output = {"error": "User not found"}
        else:
            output = {"count": len(output), "results": output}
    except Exception as exception_msg:
        print("Unhandled Error is:- %s" % exception_msg)
        output = {'code': 2, "error": "Error fetching details from DB"}
    return output
