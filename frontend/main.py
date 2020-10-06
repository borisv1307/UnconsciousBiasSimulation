from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/profile')
def viewProfile():
	return render_template("viewProfile.html")

@app.route('/createProfile')
def createProfile():
	return render_template("createProfile.html")

if __name__ == "__main__":
	app.run(debug=True)