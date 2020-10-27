import re
import bcrypt
from json import loads
from flask_jwt_extended import create_access_token, JWTManager
from functools import wraps
from bson.json_util import dumps
from datetime import datetime
from flask import request, jsonify
from project import mongo
from . import user_blueprint



@user_blueprint.route('/api/v1/createUser/', methods=['POST'])
def create_user():
    try:
        firstname = request.get_json()['firstName']
        lastname = request.get_json()['lastName']
        email = request.get_json()['email']
        password = bcrypt.hashpw(request.get_json()['password'].encode('utf-8'), bcrypt.gensalt())
        registration_type = request.get_json()['registration_type']
    except:
        return {'code': 4, 'error': 'Missing request body'}, 403

    if firstname == '' or lastname == '' or password == '' or email == '' or registrationType == '':
        return {'code': 4, 'error': "Field/s cannot be blank"}, 403

    users = mongo.db.user
    try:
        user_id = int(users.find().skip(users.count_documents({}) - 1)[0]['user_id']) + 1
        print("Id ", user_id)
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
            'password': password,
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password' : password,
            'date_joined' : date_joined,
            'registrationType' : registration_type,
            'contactDetails' : request.get_json()['contactDetails'],
        })
        if user:
            access_token = create_access_token(identity={'user_id': user_id,'date_joined': dateJoined})
            tokens = mongo.db.authtoken
            tokens.insert_one({"user_id": user_id, "key": access_token, 'created': datetime.utcnow()})
            output = {'token': access_token, 'user': {
            'user_id': user_id, 'firstname': firstname, 'email': email}}

    return output
