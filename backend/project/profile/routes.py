from flask import render_template
from flask import request
from bson.json_util import dumps,RELAXED_JSON_OPTIONS
from bson.objectid import ObjectId
import json
from json import loads
from bson import json_util
from project import mongo
from flask import jsonify
from functools import wraps
import re

from . import profile_blueprint

################
#### routes ####
################

### ALL FUTURE DATA VALIDATION
def profilevalidation(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            profile_data = request.get_json()
            get_email = profile_data['email']
        except:
            return {'code': 4,'error': 'Missing request body'}, 403

        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

        if not (re.search(regex,get_email) or get_email is None or re.search("^\s*$", get_email)):
            return {'code': 4,"error": "Invalid email id"}, 403
        return f(*args, **kwargs)
    return decorated

@profile_blueprint.route('/helloProfile/too', methods=['POST'])
def helloProfile():
    profiledata = request.get_json()
    print(profiledata)
    return profiledata

@profile_blueprint.route('/api/v1/createProfile', methods=['POST'])
@profilevalidation
def createProfile():
   # Get fields from request body, check for missing fields

    profile_data = request.get_json()
    get_email = profile_data['email']

    # Get collections
    profile = mongo.db.profile
    user = mongo.db.user
    profile_id = int(profile.find().skip(profile.count_documents({}) - 1)[0]['profile_id'])+1


    # check if email is already in database
    email_exists = user.count_documents({'email': get_email})

    if email_exists:
        get_user_id = user.find_one( { "email": get_email},{ 'user_id': 1, '_id': 0 })
        getUser_idval = get_user_id['user_id']

        create_profile = profile.insert_one({
        "profile_id": profile_id,
        "user_id": getUser_idval,
        "firstName": profile_data['firstName'],
        "lastName": profile_data['lastName'],
        "position": profile_data['position'],
        "aboutMe":  profile_data['aboutMe'],
        "school": profile_data['school'],
        "degree": profile_data['degree'],
        "major": profile_data['major'],
        "eduStartDate": profile_data['eduStartDate'],
        "eduEndDate": profile_data['eduEndDate'],
        "gpa": profile_data['gpa'],
        "title": profile_data['title'],
        "company": profile_data['company'],
        "location": profile_data['location'],
        "expStartDate": profile_data['expStartDate'],
        "expEndDate": profile_data['expEndDate']
        })

        print("asfasdfasdf ",create_profile)

        if create_profile:
            user = profile.find_one({"profile_id": profile_id})
            output = {
                "profile_id": user['profile_id'],
                "user_id": user['user_id'],
                "firstName": user['firstName'],
                "lastName": user['lastName'],
                "position": user['position'],
                "aboutMe":  user['aboutMe'],
                "school": user['school'],
                "degree": user['degree'],
                "major": user['major'],
                "eduStartDate": user['eduStartDate'],
                "eduEndDate": user['eduEndDate'],
                "gpa": user['gpa'],
                "title": user['title'],
                "company": user['company'],
                "location": user['location'],
                "expStartDate": user['expStartDate'],
                "expEndDate": user['expEndDate']

            }
        else:
            output = {'code': 2, "error": "Insert Failed"}
    else:
        output = {'code': 2, "error": "User account does not exist"}


    return output


@profile_blueprint.route('/api/v1/getProfiles', methods=['GET'])
def getProfiles():

    user_id = request.get_json()['user_id']
    # Get collections
    profile = mongo.db.profile
    output=[]
    try:
        profiles = loads(dumps(profile.find({ "user_id": user_id})))
        for profile in profiles:

            output.append({
                "profile_id": profile['profile_id'],
                "user_id": profile['user_id'],
                "firstName": profile['firstName'],
                "lastName": profile['lastName'],
                "position": profile['position'],
                "aboutMe":  profile['aboutMe'],
                "school": profile['school'],
                "degree": profile['degree'],
                "major": profile['major'],
                "eduStartDate": profile['eduStartDate'],
                "eduEndDate": profile['eduEndDate'],
                "gpa": profile['gpa'],
                "title": profile['title'],
                "company": profile['company'],
                "location": profile['location'],
                "expStartDate": profile['expStartDate'],
                "expEndDate": profile['expEndDate']

            })
        output = {"count": len(output), "results": output}
    except:
        output = {'code': 2, "error": "User not found"}
    return output
