#pylint: disable = missing-function-docstring ,import-outside-toplevel, trailing-whitespace ,missing-module-docstring, missing-final-newline, missing-module-docstring, missing-function-docstring, line-too-long, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, wrong-import-order
from flask import Flask,jsonify,request
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from functools import wraps
import smtplib

mongo = PyMongo()

def create_app(env_name):

    # Flask Config
    app = Flask(__name__)
    initialize_extensions(app,env_name)
    register_blueprints(app)
    return app

def initialize_extensions(app,env_name):
    CORS(app)
    JWTManager(app)
    app.config['JWT_SECRET_KEY'] = 'secret'
    if env_name =='dev':
        app.config['MONGO_URI'] = "mongodb+srv://UBSDBAdmin:Admin123@cluster0.yed1w.azure.mongodb.net/UBSDB?ssl=true&ssl_cert_reqs=CERT_NONE"
    else:
        app.config['MONGO_URI'] = "mongodb+srv://UBSDBAdmin:Admin123@cluster0.yed1w.azure.mongodb.net/UBSDBTEST?ssl=true&ssl_cert_reqs=CERT_NONE"
    mongo.init_app(app)

### TOKEN REQUIRED DECORATOR
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            header_token = request.headers['Authorization']
        except:
            return jsonify({'message': 'Token is missing!'}), 403

        tokens = mongo.db.authtoken
        if not tokens.find_one({'key': header_token}):
            return jsonify({'message': 'Token is Invalid!'}), 403
        return f(*args, **kwargs)
    return decorated

# Login email and password for account sending emails
sender = "Noreply.ubsapp@gmail.com"
password = "Ubsdb@drexel"

# Mail domain and port for account sending alerts
host = "smtp.gmail.com"
port = 587

# Message template for alert
MESSAGE = """From: {sender}
To: {receivers}
Subject: Verfiy your email to finish signing up for UBS

Dear {User},

Welcome! Thanks for signing up, to activate your account please use this One Time Password (OTP):- {OTP}

Cheers!!,
UBS Support Team
"""

# Email function
def send_email(set_first_name,set_receiver,set_otp):
    try:
        smtpObj = smtplib.SMTP(host, port)  # Set up SMTP object
        smtpObj.starttls()
        smtpObj.login(sender, password)
        smtpObj.sendmail(sender,set_receiver,
                             MESSAGE.format(sender=sender,
                                            receivers=set_receiver,
                                            OTP=set_otp,
                                            User=set_first_name
                                            )
                             )
        return {'status':'Successfully sent email'}          
    except smtplib.SMTPException as e:
        return {'status':'error sending email','error_msg':str(e)}
        
        

def register_blueprints(app):
    from project.home import home_blueprint
    from project.profile import profile_blueprint
    from project.user import user_blueprint
    from project.presence import presence_blueprint
    app.register_blueprint(home_blueprint)
    app.register_blueprint(profile_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(presence_blueprint)
