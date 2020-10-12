from flask import render_template
from flask import request
from bson.json_util import dumps,RELAXED_JSON_OPTIONS
from bson.objectid import ObjectId
import json
from project import mongo
from flask import jsonify

from . import profile_blueprint

################
#### routes ####
################

@profile_blueprint.route('/helloProfile/too', methods=['POST'])
def helloProfile():
    profiledata = request.get_json()
    print(profiledata)
    return profiledata

@profile_blueprint.route('/createProfile', methods=['POST'])
def createProfile():
   # Get fields from request body, check for missing fields
    try:
        profile_data = request.get_json()  
    except:
        return {"error": "Missing request body"}
    # Get collections
    users = mongo.db.profiles2
    id = int(users.find().skip(users.count_documents({}) - 1)[0]['id'])+1

    # if user:
    user = users.insert_one({
        "id": id,
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
    if user:
        user = users.find_one({"id": id})
        output = {
        "id": user['id'], 
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
    # # bs = dumps(user,json_options=RELAXED_JSON_OPTIONS)
    return output


@profile_blueprint.route('/getProfile', methods=['GET'])
def getProfile():
   
    userID = request.get_json()['id']
     # Get collections
    users = mongo.db.profiles2
    try:
        user = users.find_one({"id": userID})
        output = {
        "id": user['id'], 
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
    except:
        output = {'code': 2, "error": "User not found"}
    return output 
   
