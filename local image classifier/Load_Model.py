import tensorflow as tf
import numpy as np
from PIL import Image
from skimage import transform
import requests


# Give the model h5 file names of the models to be tested
MODEL_DIR = "./models/Hair_Model_V2.h5"

# Give the filepath of  the image that you want to test
IMAGE_DIR = "./5_SH_O.jpg"
labels = ["Short Hair", "Long Hair"]


# This function either takes in an image or url
# file is a string that could be the name of the image if found locally or a url link referencing the image alone if uploaded on the cloud
# the second parameter type should be specified for either "img" if it is a locally sourced image
# or "url"  if uploaded to cloudinary
def load(file, type):

	if type == "url":
		np_image = Image.open(requests.get(file, stream=True).raw)
	elif type == "image":
		np_image = Image.open(file)
	np_image = np.array(np_image).astype('float32')/255
	np_image = transform.resize(np_image, (224, 224))
	np_image = np.expand_dims(np_image, axis=0)
	return np_image

model = tf.keras.models.load_model(MODEL_DIR)


image = load(IMAGE_DIR, "image")

result = model.predict(image)

prediction = result[0]

output = []

if prediction[0] > prediction[1]:
	output.append(labels[0])
else:
	output.append(labels[1])


print("{} {}".format(IMAGE_DIR, output))