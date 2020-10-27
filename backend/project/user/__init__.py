"""
The recipes Blueprint handles the creation, modification, deletion,
and viewing of USER for this application.
"""
#pylint: disable = line-too-long,cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order, anomalous-backslash-in-string

from flask import Blueprint

user_blueprint = Blueprint('user', __name__, template_folder='templates')

from . import routes
