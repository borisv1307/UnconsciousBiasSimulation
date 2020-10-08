
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

def create_app():

  # Flask Config
  app = Flask(__name__)
  CORS(app)

  app.config['MONGO_URI'] = 'mongodb+srv://admintest:admintest@marcoapicluster.ys7ce.mongodb.net/SE691?retryWrites=true&w=majority'

  app.mongo = PyMongo(app)

  print('connection successful')
  return app
