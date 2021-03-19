import Algorithmia
import tensorflow as tf
import numpy as np
import requests
from PIL import Image
from skimage import transform

client = Algorithmia.client()

# this is the code we used to load and utilize the uploaded models for hair and background labeling
# you can use this code as reference when loading new models as well as adding new labels


# make sure that you have uploaded the model files to Algorithmia's data source on your account
hair_model_path = client.file("data://PATH_TO_MODEL").getFile().name
background_model_path = client.file("data://PATH_TO_MODEL").getFile().name
hair_model = tf.keras.models.load_model(hair_model_path)
background_model = tf.keras.models.load_model(background_model_path)

def load(url):
	np_image = Image.open(requests.get(url, stream=True).raw)
	np_image = np.array(np_image).astype('float32')/255
	np_image = transform.resize(np_image, (224, 224))
	np_image = np.expand_dims(np_image, axis=0)
	return np_image
	
def apply(image_url):
	print("HELLO")
	image = load(image_url)
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