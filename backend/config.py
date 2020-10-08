
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

def create_app():

  # Flask Config
  app = Flask(__name__)
  CORS(app)

  app.config['MONGO_URI'] = 'mongodb+srv://AIBADGE:AIBADGE789@aicluster.d91jv.azure.mongodb.net/test_college?retryWrites=true&w=majority'

  app.mongo = PyMongo(app)

  return app
