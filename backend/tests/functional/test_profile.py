"""
This file (test_profile.py) contains the functional tests which
test create profile and view profile.

"""
import pytest
import os
import sys
from flask import jsonify, request, json
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
PARENT_ROOT=os.path.abspath(os.path.join(SITE_ROOT, os.pardir))
GRANDPAPA_ROOT=os.path.abspath(os.path.join(PARENT_ROOT, os.pardir))
sys.path.insert(0,GRANDPAPA_ROOT)
from project import create_app
from project import mongo
from bson.objectid import ObjectId 
from random import randint

@pytest.fixture
def test_client():
    flask_app = create_app()
    flask_app.config['TESTING'] = True

    with flask_app.test_client() as testing_client:
        yield testing_client

class TestSomething:
    def test_createProfile(self,test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/createProfile' page is requested (GET)
        THEN check that the response is valid
        """
            # Get collections
        users = mongo.db.profiles2
        id = int(users.find().skip(users.count_documents({}) - 1)[0]['id'])+1
        data = {
        "id":id,
        "firstName": "Jijo",
        "lastName": "George",
        "position": "Developer",
        "aboutMe": "Hello World Test",
        "school": "Drexel",
        "degree": "MA",
        "major": "SE",
        "eduStartDate": "0001-01",
        "eduEndDate": "0001-01",
        "gpa": "3",
        "title": "Developer",
        "company": "ABC",
        "location": "PH",
        "expStartDate": "0001-01",
        "expEndDate": "0001-01",
        }
        response = test_client.post('/createProfile', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 200
        assert response != 'null'

    def test_getProfile(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/getProfile' page is requested (GET)
        THEN check that the response is valid
        """
                    # Get collections
        users = mongo.db.profiles2
        id = int(users.find().skip(users.count_documents({}) - 1)[0]['id'])
        
        data = {
        "id":randint(1,id)

        }
      
        response = test_client.get('/getProfile',data=json.dumps(data),headers={'Content-Type': 'application/json'})
        
        assert response.status_code == 200
        assert response != 'null'
