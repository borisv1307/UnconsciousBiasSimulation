#pylint: disable = line-too-long,cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string
from datetime import datetime
import bcrypt
from flask_jwt_extended import create_access_token
from flask import request
from project import mongo
from pymongo import ReturnDocument
from . import user_blueprint



@user_blueprint.route('/api/v1/createUser/', methods=['POST'])
def create_user():
    try:
        firstname = request.get_json()['firstname']
        lastname = request.get_json()['lastname']
        email = request.get_json()['email']
        hashed_password = bcrypt.hashpw(request.get_json()['password'].encode('utf-8'), bcrypt.gensalt())
        registration_type = request.get_json()['registration_type']
    except:
        return {'code': 4, 'error': 'Missing request body'}, 403

    if firstname == '' or lastname == '' or request.get_json()['password'] == '' or email == '' or registration_type == '':
        return {'code': 4, 'error': "Field/s cannot be blank"}, 403

    users = mongo.db.user
    try:
        user_id = int(users.find().skip(users.count_documents({}) - 1)[0]['user_id']) + 1
    except:
        user_id = 1

    date_joined = datetime.utcnow()

    # check if username or email is already in database
    email_exists = users.count_documents({'email': email})

    output = {}
    if email_exists:
        output = {'code': 4, 'error': "Email is already in use"}, 403
    else:
        user = users.insert_one({
            'user_id': user_id,
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password' : hashed_password,
            'date_joined' : date_joined,
            'registration_type' : registration_type,
            'contact_details' : request.get_json()['contact_details'],
        })
        if user:
            access_token = create_access_token(identity={'user_id': user_id, 'date_joined': date_joined})
            tokens = mongo.db.authtoken
            tokens.insert_one({"user_id": user_id, "key": access_token, 'created': datetime.utcnow()})
            output = {'token': access_token, 'user': {'user_id': user_id, 'firstname': firstname, 'email': email}}

    return output

@user_blueprint.route('/api/v1/login/', methods=['POST'])
def user_login():
    try:
        email = request.get_json()['email']
        password = request.get_json()['password']
    except:
        return {'code': 4, 'error': 'Missing request body'}, 403

    if request.get_json()['password'] == '' or email == '':
        return {'code': 4, 'error': "Field/s cannot be blank"}, 403

    users = mongo.db.user
    user = users.find_one({"email" : email})
    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            access_token = create_access_token(identity={'id': user['user_id'], 'date_joined': user['date_joined']})
            print(access_token)
            tokens = mongo.db.authtoken_token

            tokens.find_one_and_update({"user_id": user['user_id']}, {"$set": {"key": access_token, 'created': datetime.utcnow()}}, upsert=True)
            user = users.find_one_and_update({"user_id": user['user_id']}, {"$set": {'last_login': datetime.utcnow()}}, return_document=ReturnDocument.AFTER)

            output = {"user_id" : user['user_id'], "email" : user['email'], "token": access_token}
            return output

    return {'code': 4, 'error':"User not found"}, 403
