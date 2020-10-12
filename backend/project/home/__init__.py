"""
The recipes Blueprint handles the viewing of home for this application.
"""
from flask import Blueprint
home_blueprint = Blueprint('home', __name__, template_folder='templates')

from . import routes
