#pylint: disable = missing-function-docstring ,missing-final-newline, missing-module-docstring, missing-function-docstring, line-too-long, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order
from . import home_blueprint
################
#### routes ####
################

@home_blueprint.route('/')
def get():
    return "Test"
