"""
The recipes Blueprint handles the creation, modification, deletion,
and viewing of profile for this application.
"""
from flask import Blueprint
profile_blueprint = Blueprint('profile', __name__, template_folder='templates')

from . import routes
