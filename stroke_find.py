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

			# loop over the face parts individually
			for (name, (i, j)) in face_utils.FACIAL_LANDMARKS_IDXS.items():

				# clone the original image so we can draw on it, then
				# display the name of the face part on the image
				clone = image.copy()
				cv2.putText(clone, name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
					0.7, (0, 0, 255), 2)

				# loop over the subset of facial landmarks, drawing the
				# specific face part
				for (x, y) in shape[i:j]:
					cv2.circle(clone, (x, y), 1, (0, 0, 255), -1)

				if(name == 'mouth'):

					##Mouth
					(m1x,m1y) = shape[48]
					(m2x,m2y) = shape[54]
					m_vec = (m1x-m2x, m1y-m2y)
					m_mag = np.linalg.norm(m_vec)

					##Eyes
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

					# if(angle > baseline):
					# 	print("STROKED?")

					print("Angle: " + str(angle))
					cv2.line(clone, (int(e1x),int(e1y)), (int(e2x), int(e2y)), (0,255,0))
					cv2.line(clone, (int(m1x),int(m1y)), (int(m2x), int(m2y)), (0,255,0))

				# extract the ROI of the face region as a separate image
				(x, y, w, h) = cv2.boundingRect(np.array([shape[i:j]]))

				# display image
				# cv2.imshow("Image", clone)
				# cv2.waitKey(0)

		# visualize all facial landmarks with a transparent overlay
		# output = face_utils.visualize_facial_landmarks(image, shape)
		# cv2.imshow("Image", output)
		# cv2.waitKey(0)

	def uploadAngle(self):
		pass

	#Get the baseline angles from server
	def getPreviousAs(self):
		pass

	def getCondition(self):
		##angle = getAngle
		##baseline = average of healthy measures?
		##return (angle + delta > baseline)
		#i.e. if the current angle is greater than the average by a certain amount
		# Return true for stroke, false for not. Imo ~0.1 at least should work

	if('__name__' == '__main__'):
		pass

p1 = StrokeFinder('shape_predictor_68_face_landmarks.dat')
p1.getAngle('images/happy-person.jpg')
