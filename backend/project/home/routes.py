from . import home_blueprint
from flask import render_template

################
#### routes ####
################

@home_blueprint.route('/')
def get():
    return "Test"
