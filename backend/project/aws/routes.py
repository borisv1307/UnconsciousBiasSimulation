# pylint: disable = line-too-long, inconsistent-return-statements, unused-variable, broad-except, trailing-whitespace, cyclic-import,bare-except, missing-module-docstring, missing-function-docstring, too-many-lines, no-name-in-module, import-error, multiple-imports, pointless-string-statement, too-many-locals, wrong-import-order, anomalous-backslash-in-string,R0912,R0915,W0311

################
#### routes ####
################
import tensorflow as tf
import numpy as np
import os
import requests
import Algorithmia
from flask import request
from project import mongo, token_required, get_aws_tags
from PIL import Image
from skimage import transform
from . import aws_blueprint


API_KEY = "sim44RTACPPs2FqnDNPdUflr/em1"
client = Algorithmia.client(API_KEY)
algo = client.algo('ms4975/image_classifier/1.0.0')


def load(url):
	np_image = Image.open(requests.get(url, stream=True).raw)
	np_image = np.array(np_image).astype('float32')/255
	np_image = transform.resize(np_image, (224, 224))
	np_image = np.expand_dims(np_image, axis=0)
	return np_image

def predict(image_url):
	image = load(image_url)
	current_dir = os.getcwd()
	hair_model = tf.keras.models.load_model(current_dir+"/project/aws/Hair_Model_V2.h5")
	background_model = tf.keras.models.load_model(current_dir+"/project/aws/Background_Location_Model_V2.h5")
	hair_prediction = hair_model.predict(image)[0]
	location_prediction = background_model.predict(image)[0]
	output = {}

	if hair_prediction[0] > hair_prediction[1]:
		output['Long_Hair'] = {
			'Value': False
			}
		output['Short_Hair'] = {
			'Value': True
			}
	else:
		output['Short_Hair'] = {
			'Value': False
			}
		output['Long_Hair'] = {
			'Value': True
			}

	if location_prediction[0] > location_prediction[1]:
		output['Indoor'] = {
			'Value': True
			}
		output['Outdoor'] = {
			'Value': False
			}
	else:
		output['Outdoor'] = {
			'Value': True
			}
		output['Indoor'] = {
			'Value': False
			}
	return output

def new_predict(image_url):
	return algo.pipe(image_url).result

@aws_blueprint.route('/api/v1/uploadImage/',  methods=['POST'])
@token_required
def get_aws_tags_for_image():
	# Get fields from request body, check for missing fields
	get_image_data = request.get_json()
	# Check for nulls and whitespaces
	try:
		get_int_user_id = int(get_image_data['user_id'])
	except TypeError:
		return {'error': 'User id must be numeric'}, 403
	try:
		get_image_url = get_image_data['profileImg']
	except TypeError:
		return {'error': 'Please provide image URL'}, 403

	# Get collections
	profile = mongo.db.profile
	aws_tags = mongo.db.aws_tags
	user = mongo.db.user
	try:
		get_profile_id = int(profile.find().skip(profile.count_documents({}) - 1)[0]['profile_id'])+1
	except ValueError:
		get_profile_id = 1

	user_id_exists = user.count_documents({'user_id': get_int_user_id})
	profile_id_exists = aws_tags.count_documents({'profile_id':get_profile_id })
	get_int_profile_id = int(profile_id_exists)
	if user_id_exists:
		get_tags = get_aws_tags(get_image_url)
		url = get_image_url.split(".")
		if url[3] == "jpg":
			get_prediction = new_predict(get_image_url) # changed to new_predict
		else:
			get_prediction['Long_Hair'] = { 'Value': False }
			get_prediction['Short_Hair'] = { 'Value': False }
			get_prediction['Indoor'] = { 'Value': False }
			get_prediction['Outdoor'] = { 'Value': False }
		if get_tags['Code'] == 2:
			output = {'Code':2 , 'error':'Invalid Image, Please try another image'}
		elif get_int_profile_id == 0:
			output = {'Code': 1, 'success':get_tags}
			aws_tags.insert_one({
				'profile_id': get_profile_id,
				'user_id': get_int_user_id,
				'AgeRange':get_tags['AgeRange'],
				'Smile':get_tags['Smile'],
				'Eyeglasses':get_tags['Eyeglasses'],
				'Sunglasses':get_tags['Sunglasses'],
				'Gender':get_tags['Gender'],
				'Beard':get_tags['Beard'],
				'Mustache':get_tags['Mustache'],
				'EyesOpen': get_tags['EyesOpen'],
				'MouthOpen': get_tags['MouthOpen'],
				'Emotions': get_tags['Emotions'],
				'ShortHair': get_prediction['Short_Hair'],
				'LongHair': get_prediction['Long_Hair'],
				'Indoor': get_prediction['Indoor'],
				'Outdoor': get_prediction['Outdoor']
			})
		else:
			output = {'Code':3 , 'error':'entry for this profile_id already exists. profile_id:-'+ str(get_profile_id)}
	else:
		output = {'Code':4 , 'error':'user_id does not exists'}
	return output
