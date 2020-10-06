from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_pymongo import PyMongo
from flask_jwt_extended import create_access_token, JWTManager
from functools import wraps
from pymongo import ReturnDocument

from datetime import datetime
from bson.json_util import dumps
from json import loads

import requests
import ast
import re

app = Flask(__name__)


app.config['MONGO_URI'] = 'mongodb+srv://admintest:admintest@marcoapicluster.ys7ce.mongodb.net/SE691?retryWrites=true&w=majority'

app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False

mongo = PyMongo(app)


@app.route("/")
def hello():
    return jsonify('hello')


@app.route('/register/', methods=['POST'])
def register():
    
    # Get fields from request body, check for missing fields
    try:
        username = request.form.get('username')
        password = request.form.get('password')
    except:
        return {"error": "Missing fields in request body"}
    
    # Get collections 
    users = mongo.db.user_profile
 

    if 'profile_img' in request.files:
        profile_img = request.files['profile_img']
        mongo.save_file(profile_img.filename,profile_img)
        user = users.insert_one({
            'username': username,
            'password': password,
            'profile_img_name': profile_img.filename           
        })

    url = '/profile/' + username  
    print('url:-',url)
    return redirect(url)
   

@app.route('/file/<filename>', methods=['GET'])
def getfile(filename):
    return mongo.send_file(filename)

@app.route('/profile/<username>', methods=['GET'])
def profile(username):
    # Get collections 
    users = mongo.db.user_profile
    user = users.find_one_or_404({'username' : username})
    return f'''
            <h1>{username}</h1>
            <img src="{url_for('getfile', filename = user['profile_img_name'])}">
    '''

if __name__ == '__main__':
    app.run(debug=True)