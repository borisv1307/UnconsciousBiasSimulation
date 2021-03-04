"""
This file (test_aws.py) contains the functional tests.

Command to run tests:- pytest --setup-show tests/functional

"""
from bson.objectid import ObjectId
from project import mongo
from project import create_app
import pytest
import os
import sys
import datetime
import random
from json import loads
from bson.json_util import dumps
from faker import Faker
from flask import jsonify, request, json
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
PARENT_ROOT = os.path.abspath(os.path.join(SITE_ROOT, os.pardir))
GRANDPAPA_ROOT = os.path.abspath(os.path.join(PARENT_ROOT, os.pardir))
sys.path.insert(0, GRANDPAPA_ROOT)

SET_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDUzMzkxNjksIm5iZiI6MTYwNTMzOTE2OSwianRpIjoiNzAyMzczOGYtNjc2OS00NzdkLWFhN2ItYjAzOTcyMWQwZWJlIiwiZXhwIjoxNjA1MzQwMDY5LCJpZGVudGl0eSI6eyJpZCI6MywiZGF0ZV9qb2luZWQiOiJUaHUsIDI5IE9jdCAyMDIwIDA0OjA0OjI2IEdNVCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.6NR0py5qQ49bI6Lt1GIp_INnlXeCgasid9NndXJuslk"
login_data = {
        "email":"jamesthomas@gmail.com",
        "password": "Hello"
}
login_data_1 = {
        "email":"samanthasmith@gmail.com",
        "password": "Hello"
}

login_data_2 = {
        "email":"sherry18@gmail.com",
        "password": "Hello"
}

login_data_3 = {
        "email":"rebecca89@hicks.com",
        "password": "Hello"
}

login_data_4 = {
        "email":"carl53@sheppard.com",
        "password": "Hello"
}

@pytest.fixture
def test_client():
    flask_app = create_app('test')
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as testing_client:
        yield testing_client



class TestSomething:

    def test_for_aws_tags(self, test_client):
        
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/uploadImage/' page is requested (POST)
        THEN check that the response is valid
        """
        data_upload = {
            "user_id":1,
            "profileImg":"https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613053245/unconsciousbias/h7t5leznpbmmjizmjd1o.jpg"
        }

        post_response = test_client.post('/api/v1/login/', data=json.dumps(login_data_4),headers={'Content-Type': 'application/json'})
        get_token = json.loads(post_response.data)
        response = test_client.post(
            '/api/v1/uploadImage/', data=json.dumps(data_upload),headers={'Content-Type': 'application/json','Authorization':get_token['token']})
        assert response.status_code == 200