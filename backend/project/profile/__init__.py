"""
The recipes Blueprint handles the creation, modification, deletion,
and viewing of profile for this application.
"""
from flask import Blueprint
from . import routes
profile_blueprint = Blueprint('profile', __name__, template_folder='templates')
