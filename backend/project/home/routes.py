from . import home_blueprint

################
#### routes ####
################

@home_blueprint.route('/')
def get():
    return "Test"
