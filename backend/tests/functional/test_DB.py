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


@pytest.fixture
def test_client():
    flask_app = create_app()
    flask_app.config['TESTING'] = True

    with flask_app.test_client() as testing_client:
        yield testing_client

class TestDB:
    

    def test_dbstatus(self, test_client):
        """
        Test MongoDB connection
        """
        # Get collections
        users = mongo.db.profiles2
        id = int(users.find().skip(users.count_documents({}) - 1)[0]['id'])
        assert id>1

    def test_profileCollection(self, test_client):
        """
        Test Profile Collection
        """
        # Get collections
        users = mongo.db.profiles2
        mydoc = users.find().count()  
        assert mydoc>0
