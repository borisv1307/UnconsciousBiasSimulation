"""
The recipes Blueprint handles the creation, modification, deletion,
and viewing of USER for this application.
"""
from flask import Blueprint

user_blueprint = Blueprint('user', __name__, template_folder='templates')

from . import routes
