from flask import request
from flask import Flask
from stroke_find import StrokeFinder
app = Flask(__name__)

# @app.route('/')
# def hello_world():
# 	p1 = StrokeFinder('shape_predictor_68_face_landmarks.dat')
# 	return p1.getAngle('stroke_images/stroke3.jpg')

# need to install requests 
@app.route('/', methods=['POST', 'GET'])
def strokeapp():
    if request.method == 'POST':
        return 'pic'
    else:
        return 'get'
