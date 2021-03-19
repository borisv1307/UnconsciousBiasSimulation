# pylint: disable = line-too-long, inconsistent-return-statements, unused-variable, broad-except, trailing-whitespace, cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, too-many-locals, wrong-import-order, anomalous-backslash-in-string,R0912,R0915,W0311

################
#### routes ####
################
from . import home_blueprint
@home_blueprint.route('/')
def get():
    return "Test"
