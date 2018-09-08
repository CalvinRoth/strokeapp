# USAGE
# python detect_face_parts.py --shape-predictor shape_predictor_68_face_landmarks.dat --image images/example_01.jpg

# import the necessary packages
from imutils import face_utils
import numpy as np
import argparse
import imutils
import dlib
import cv2



class StrokeFinder:


	def __init__(self, shape_predictor):
		self.predictor = shape_predictor

		# initialize dlib's face detector (HOG-based) and then create
		# the facial landmark predictor
		self.detector = dlib.get_frontal_face_detector()
		self.predictor = dlib.shape_predictor(self.predictor)

		### TODO:  self.baseline or something that is the previously established
		## angle

	## Get the angle between the eyes and mouth
	def getAngle(self, image):
		# load the input image, resize it, and convert it to grayscale
		image = cv2.imread(image)
		image = imutils.resize(image, width=500)
		gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
		# detect faces in the grayscale image
		rects = self.detector(gray, 1)


		# loop over the face detections
		for (i, rect) in enumerate(rects):
			# determine the facial landmarks for the face region, then
			# convert the landmark (x, y)-coordinates to a NumPy array
			shape = self.predictor(gray, rect)
			shape = face_utils.shape_to_np(shape)


			## Getting Mouth data
			(m1x,m1y) = shape[48]
			(m2x,m2y) = shape[54]
			## The mouth line as a vector and its magnitude
			m_vec = (m1x-m2x, m1y-m2y)
			m_mag = np.linalg.norm(m_vec)

			##Getting Eyes data
			##The counters seem like a dumb waste of time but they exist
			##to more easily allow any changes
			x_mid, y_mid = 0,0
			counter = 0
			for (x,y) in shape[36:40]:
				counter += 1
				x_mid += x
				y_mid += y

			(e1x, e1y) = (x_mid/counter, y_mid/counter)

			x_mid, y_mid = 0,0
			counter = 0
			for (x,y) in shape[43:48]:
				counter += 1
				x_mid += x
				y_mid += y
			(e2x, e2y) = (x_mid/counter, y_mid/counter)
			e_vec = (e1x-e2x, e1y-e2y)
			e_mag = np.linalg.norm(e_vec)

			dot = (m_vec[0]*e_vec[0]) + (m_vec[1] * e_vec[1])
			angle = np.arccos(dot/(e_mag * m_mag))

		self.getCondition(angle)


	def getCondition(self, angle):
		if(angle > 0.055):
			print('''You may be currently having a stroke, please proceed to QStroke
			app for further testing''')
		else:
			##Login?
			print("For debug: You pass")


print("Start:")
p1 = StrokeFinder('shape_predictor_68_face_landmarks.dat')
p1.getAngle('stroke_images/stroke4.jpg')
