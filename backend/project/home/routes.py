from flask import render_template

from . import home_blueprint


################
#### routes ####
################

@home_blueprint.route('/')
def get():
    return "Hello World"

@home_blueprint.route('/hello', methods=['POST'])
def getHello():
    return "Hello "
