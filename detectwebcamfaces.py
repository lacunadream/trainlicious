# Symlink problems with opencv
import sys
sys.path.append('/usr/local/lib/python2.7/site-packages')

import cv2
# import psycopg2
# import os


# postgres://oxbqavxj:dx6CgdjYT_IVp2YvxXzLJM_uX7yMOY9x@horton.elephantsql.com:5432/oxbqavxj
# try:
# conn = psycopg2.connect("dbname='oxbqavxj' user='oxbqavxj' host='horton.elephantsql.com' password='dx6CgdjYT_IVp2YvxXzLJM_uX7yMOY9x'")
# print "I established a connection to the database"
# except:
#     raise Exception("I am unable to connect to the database")

# cur = conn.cursor()
# cur.execute("CREATE TABLE webcam (id serial PRIMARY KEY, index integer, value float);")


face_casc_path = 'data/haarcascade_frontalface_default.xml'
# profile_casc_path = '/Users/Martin/opencv-2.4.11/data/haarcascades/haarcascade_profile.xml'
# full_casc_path = '/Users/Martin/opencv-2.4.11/data/haarcascades/haarcascade_fullbody.xml'
upper_casc_path = 'data/haarcascade_upperbody.xml'
# lower_casc_path = '/Users/Martin/opencv-2.4.11/data/haarcascades/haarcascade_lowerbody.xml'

face_casc = cv2.CascadeClassifier(face_casc_path)
# profile_casc = cv2.CascadeClassifier(profile_casc_path)
# full_casc = cv2.CascadeClassifier(full_casc_path)
upper_casc = cv2.CascadeClassifier(upper_casc_path)
# lower_casc = cv2.CascadeClassifier(lower_casc_path)

video_capture = cv2.VideoCapture(0)


crowdedness = 2
momentum = 0.99
index = 0


while True:
    ret, frame = video_capture.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_casc.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5, minSize=(50, 50))
    # profiles = profile_casc.detectMultiScale(gray, scaleFactor=2.0, minNeighbors=1, minSize=(0, 0))
    # fulls = full_casc.detectMultiScale(gray, scaleFactor=2.0, minNeighbors=1, minSize=(0, 0))
    uppers = upper_casc.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5, minSize=(50, 50))
    # lowers = lower_casc.detectMultiScale(gray, scaleFactor=2.0, minNeighbors=1, minSize=(0, 0))


    detections = 0
    if len(faces) > 0:
        detections += 2*faces.shape[0]
    if len(uppers) > 0:
        detections += 2*uppers.shape[0]
    crowdedness = momentum*crowdedness + (1-momentum)*detections
    print 'Crowdedness: %.1f' % crowdedness


    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 5)
    # for (x, y, w, h) in profiles:
    #     cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 5)
    # for (x, y, w, h) in fulls:
    #     cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 5)
    for (x, y, w, h) in uppers:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 255), 5)
    # for (x, y, w, h) in lowers:
    #     cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 255), 5)


    # cv2.putText(frame, 'Crowdedness: %.1f' % crowdedness, (30, 80), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 0, 0), 5)
    # cv2.rectangle(frame, (5, 5), (900, 95), (255, 0, 0), 5)

    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    # cur.execute("INSERT INTO webcam (index, value) VALUES (%s, %s)", (index, crowdedness))
    # conn.commit()
    # index += 1



cur.close()
conn.close()


video_capture.release()
cv2.destroyAllWindows()