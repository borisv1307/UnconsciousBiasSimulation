"""
This file (test_profile.py) contains the functional tests which
test create profile and view profile.

Command to run tests:- pytest --setup-show tests/functional

"""
import pytest
import os
import sys
import datetime
import random
from faker import Faker
from flask import jsonify, request, json
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
PARENT_ROOT=os.path.abspath(os.path.join(SITE_ROOT, os.pardir))
GRANDPAPA_ROOT=os.path.abspath(os.path.join(PARENT_ROOT, os.pardir))
sys.path.insert(0,GRANDPAPA_ROOT)
from project import create_app
from project import mongo
from bson.objectid import ObjectId





@pytest.fixture
def test_client():
    flask_app = create_app('test')
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as testing_client:
        yield testing_client


class TestSomething:

    def test_for_create_user(self, test_client):
        fake = Faker()
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """
        start_date = datetime.date(1980, 1, 1)
        end_date = datetime.date(2020, 2, 1)

        time_between_dates = end_date - start_date
        days_between_dates = time_between_dates.days
        random_number_of_days = random.randrange(days_between_dates)
        random_date = start_date + datetime.timedelta(days=random_number_of_days)


        data = {
        "first_name":fake.first_name(),
        "last_name":fake.last_name(),
        "email":fake.email(),
        "password": "Hello",
        "registration_type": "jobSeeker",
        "gender": "Male",
        "date_of_birth": random_date,
        "contact_details": {
            "address": "test Street",
            "address2": "test Street 2",
            "city": "Philadelphia",
            "state":"PA",
            "zip":"19104",
            "contact_number":"12345678"
        }
        }
        response = test_client.post('/api/v1/createUser/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 200
        assert response.data != 'null'


    def test_for_missing_user_details(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """

        data = {
        "first_name":"testFName",
        "last_name":"testLName",
        "registrationType": "jobSeeker",
        "gender": "Male",
        "date_of_birth": "1992-10-01",
        "contact_details": {
            "address": "test Street",
            "address2": "test Street 2",
            "city": "Philadelphia",
            "state":"PA",
            "zip":"19104",
            "contactNumber":"12345678"
        }
        }
        response = test_client.post('/api/v1/createUser/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":4,"error":"Missing request body"}\n'


    def test_for_invalid_user_details(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """

        data = {
        "first_name":"",
        "last_name":"",
        "email":"test@test.com",
        "password": "Hello",
        "registration_type": "",
        "gender": "Male",
        "date_of_birth": "1992-10-01",
        "contact_details": {
            "address": "test Street",
            "address2": "test Street 2",
            "city": "Philadelphia",
            "state":"PA",
            "zip":"19104",
            "contactNumber":"12345678"
        }
        }
        response = test_client.post('/api/v1/createUser/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":4,"error":"Field/s cannot be blank"}\n'


    def test_for_existing_email(self, test_client):
        fake = Faker()
        users = mongo.db.user
        user_id = 1
        getemail = users.find_one( { "user_id": int(user_id) },{ 'email': 1, '_id': 0 })

        data = {
        "first_name":fake.first_name(),
        "last_name":fake.last_name(),
        "email":getemail['email'],
        "password": "Hello",
        "registration_type": "jobSeeker",
        "gender": "Male",
        "date_of_birth": "1992-10-01",
        "contact_details": {
            "address": "test Street",
            "address2": "test Street 2",
            "city": "Philadelphia",
            "state":"PA",
            "zip":"19104",
            "contactNumber":"12345678"
        }
        }
        response = test_client.post('/api/v1/createUser/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":4,"error":"Email is already in use"}\n'



    def test_for_user_login(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """

        data = {
        "email":"jasonmax@gmail.com",
        "password": "Hello3"
        }
        response = test_client.post('/api/v1/login/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 200
        assert response.data != 'null'

    def test_for_user_login_incorrect_password(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """

        data = {
        "email":"jasonmax@gmail.com",
        "password": "Hello234"
        }
        response = test_client.post('/api/v1/login/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":4,"error":"Invalid password"}\n'


    def test_for_login_with_missing_details(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """

        data = {
        "email":"justin97@yahoo.com"
        }

        response = test_client.post('/api/v1/login/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        print('res*********',response)
        assert response.data == b'{"code":4,"error":"Missing request body"}\n'


    def test_for_login_with_invalid_details(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """
        data = {
        "email":"",
        "password": ""
        }

        response = test_client.post('/api/v1/login/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":4,"error":"Field/s cannot be blank"}\n'


    def test_for_login_with_unknown_details(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """
        fake = Faker()
        data = {
        "email":fake.email(),
        "password": "Hello"
        }

        response = test_client.post('/api/v1/login/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":4,"error":"User not found"}\n'

    def test_get_all_users(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """


        response = test_client.get('/api/v1/users/',headers={'Content-Type': 'application/json'})
        assert response.status_code == 200
        assert response.data != 'null'



    def test_get_one_user(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """


        response = test_client.get('/api/v1/users/1/',headers={'Content-Type': 'application/json'})
        assert response.status_code == 200
        assert response.data != 'null'

    def test_get_one_user_non_numerical_user_id(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """


        response = test_client.get('/api/v1/users/one/',headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":5,"error":"id must be numerical"}\n'

    def test_delete_one_user(self, test_client):
        fake = Faker()
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """


        data = {
        "first_name":fake.first_name(),
        "last_name":fake.last_name(),
        "email":fake.email(),
        "password": "Hello",
        "registration_type": "jobSeeker",
        "gender": "Male",
        "date_of_birth": "1992-10-01",
        "contact_details": {
            "address": "test Street",
            "address2": "test Street 2",
            "city": "Philadelphia",
            "state":"PA",
            "zip":"19104",
            "contact_number":"12345678"
        }
        }
        test_client.post('/api/v1/createUser/', data=json.dumps(data),headers={'Content-Type': 'application/json'})
        users = mongo.db.user
        user_id = int(users.find().skip(users.count_documents({}) - 1)[0]['user_id'])
        convert_to_str= str(user_id)
        url = '/api/v1/users/'+convert_to_str+'/'

        response = test_client.delete(url,headers={'Content-Type': 'application/json'})
        assert response.status_code == 200
        assert response.data != 'null'

    def test_delete_user_record_which_is_not_in_db(self, test_client):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """

        convert_to_str= str(10000)
        url = '/api/v1/users/'+convert_to_str+'/'

        response = test_client.delete(url,headers={'Content-Type': 'application/json'})
        assert response.status_code == 403
        assert response.data == b'{"code":5,"error":"User does not exist"}\n'

    def test_for_update_user(self, test_client):
        
        """
        GIVEN a Flask application configured for testing
        WHEN the '/api/v1/createUser/' page is requested (POST)
        THEN check that the response is valid
        """
        fake = Faker()
        start_date = datetime.date(1980, 1, 1)
        end_date = datetime.date(2020, 2, 1)

        time_between_dates = end_date - start_date
        days_between_dates = time_between_dates.days
        random_number_of_days = random.randrange(days_between_dates)
        random_date = start_date + datetime.timedelta(days=random_number_of_days)

        data = {
        "first_name":fake.first_name(),
        "last_name":fake.last_name(),
        "email":"update@gmail.com",
        "password": "Hello",
        "registration_type": "jobSeeker",
        "gender": "Male",
        "date_of_birth": random_date,
        "contact_details": {
            "address": "test Street",
            "address2": "test Street 2",
            "city": "Philadelphia",
            "state":"PA",
            "zip":"19104",
            "contact_number":"12345678"
        }
        }
        users = mongo.db.user
        user_id = int(users.find().skip(users.count_documents({}) - 1)[0]['user_id'])
        convert_to_str= str(user_id)
        url = '/api/v1/users/'+convert_to_str+'/'

        response = test_client.patch(url, data=json.dumps(data),headers={'Content-Type': 'application/json'})

        assert response.status_code == 200
        assert response.data != 'null'
