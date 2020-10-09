import pytest
import requests
from flask import jsonify, request, json
import flask_pymongo
import time
from flask import current_app as app
from unittest import mock

url = 'http://localhost:5000'
data = {
    "firstName": "John",
    "lastName": "Doe",
    "position": "Developer",
    "aboutMe": "Hello World",
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


def test_API_home_is_reachable():
    r = requests.get(url+'/')
    assert r.status_code == 200


def test_API_createProfile_does_NOT_recieve_NULL():

    r = requests.post(url+'/createProfile/<email>', data=json.dumps(data),
                      headers={'Content-Type': 'application/json'})
    assert r.request.body != 'null'


def test_API_createProfile_keeps_data_integrity():
    r = requests.post(url+'/createProfile/<email>', data=json.dumps(data),
                      headers={'Content-Type': 'application/json'})

    actualInput = json.dumps(data)
    assert r.request.body == actualInput
