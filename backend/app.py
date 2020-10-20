from flask_cors import CORS
from flask_restful import Api
from flask import Flask
from project import create_app

app = create_app()
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False

if __name__ == "__main__":
    app.run(debug=True)
