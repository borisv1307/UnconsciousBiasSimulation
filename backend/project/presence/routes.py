# pylint: disable = line-too-long, inconsistent-return-statements, unused-variable, broad-except, trailing-whitespace, cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string
from datetime import datetime
from flask import request
from project import mongo
from pymongo.collection import ReturnDocument
from . import presence_blueprint

################
#### routes ####
################

# ALL FUTURE DATA VALIDATION


@presence_blueprint.route('/api/v1/addPresence/', methods=['POST'])
def add_presence_to_pool():
    date_joined = datetime.utcnow()
    profile_data = request.get_json()
    presence = mongo.db.presence
    user_presence_count = presence.count_documents({ "$and": [{ "user_id": profile_data['user_id']},{ "profile_id": profile_data['profile_id']}]})
    if user_presence_count == 0:
        output = insert_data(profile_data)
        if output != "ERROR":
            result = {
                "profile_id": profile_data['profile_id'],
                "state": profile_data['state'],
                "zip": profile_data['zip'],
                "city": profile_data['city'],
                "email": profile_data['email'],
                "position": profile_data['position'],
                "aboutMe":  profile_data['aboutMe'],
                "education": profile_data['education'],
                "experience": profile_data['experience'],
                "user_id": profile_data['user_id'],
                "profileName": profile_data['profileName'],
                "profileImg": profile_data['profileImg'],
                "first_name": profile_data['first_name'],
                "last_name": profile_data['last_name'],
                "added_on": date_joined,
                "reviewed_by": output['reviewed_by']
            }
        else:
            result = {'code': 4, "error": "User account does not exist"}, 403
    else:
        result = {'code':4, "error":"User presence already exists"}, 403

    return result


def insert_data(profile_information):
    date_joined = datetime.utcnow()
    presence = mongo.db.presence
    create_presence = presence.insert_one({
        "profile_id": profile_information['profile_id'],
        "state": profile_information['state'],
        "zip": profile_information['zip'],
        "city": profile_information['city'],
        "email": profile_information['email'],
        "user_id": profile_information['user_id'],
        "profileName": profile_information['profileName'],
        "profileImg": profile_information['profileImg'],
        "first_name": profile_information['first_name'],
        "last_name": profile_information['last_name'],
        "position": profile_information['position'],
        "aboutMe":  profile_information['aboutMe'],
        "education": profile_information['education'],
        "experience": profile_information['experience'],
        "added_on": date_joined,
        "reviewed_by": []
    })
    if create_presence:
        return profile_information
    return "ERROR"


@presence_blueprint.route('/api/v1/getAllPresence/<user_id>/', methods=['GET'])
def get_all_presence_for_reviewer(user_id):
    if request.method == 'GET':
        presences = mongo.db.presence
        reviewer_id = user_id
        output = []
        try:
            for presence in presences.find({"reviewed_by" :{"$not": {'$elemMatch': {"reviewer_id" : reviewer_id}}}}):
                output.append({
                    'user_id': int(presence['user_id']),
                    'profile_id': presence['profile_id'],
                    'profile_name': presence['profileName'],
                    'profile_image': presence['profileImg'],
                    'state': presence['state'],
                    'zip': presence['zip'],
                    'city': presence['city'],
                    'email': presence['email'],
                    'first_name': presence['first_name'],
                    'last_name': presence['last_name'],
                    'about_me': presence['aboutMe'],
                    'position': presence['position'],
                    'education': presence['education'],
                    'experience': presence['experience'],
                    'reviewed_by': presence['reviewed_by']
                })
            if len(output) > 0:
                return {'count': len(output), 'results': output}
            return {'code': 4, 'error': "User presence not found"}
        except Exception as error:
            print("Exception ",error)
            return {'code': 4, 'error': "No presence found"}, 403

@presence_blueprint.route('/api/v1/savePresenceReview/', methods=['PATCH'])
def update_presence_with_review():
    date_joined = datetime.utcnow()
    reviewer= request.get_json()
    presence_profile_id = int(reviewer['profile_id'])
    presence_user_id = int(reviewer['user_id'])
    feedback = reviewer['feedback']
    query = { "$and": [{ "user_id": presence_user_id},{ "profile_id": presence_profile_id}]}

    try:
        if mongo.db.presence.count_documents(query) == 1:
            profile_data= mongo.db.presence.find_one_and_update(query,{"$push": {'reviewed_by': feedback}},return_document=ReturnDocument.AFTER)
            result = {
                "profile_id": profile_data['profile_id'],
                "state": profile_data['state'],
                "zip": profile_data['zip'],
                "city": profile_data['city'],
                "email": profile_data['email'],
                "position": profile_data['position'],
                "aboutMe":  profile_data['aboutMe'],
                "education": profile_data['education'],
                "experience": profile_data['experience'],
                "user_id": profile_data['user_id'],
                "profileName": profile_data['profileName'],
                "profileImg": profile_data['profileImg'],
                "first_name": profile_data['first_name'],
                "last_name": profile_data['last_name'],
                "added_on": date_joined,
                "reviewed_by": profile_data['reviewed_by']
            }
        else:
            result = {'code':4, 'error': "User presence not found"}, 200
    except Exception as error:
        print("Exception",error)
        result = {'code':4, 'error': "No presence found"}, 403
    return result
