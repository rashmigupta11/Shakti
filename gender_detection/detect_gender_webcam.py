import cv2
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import cvlib as cv

# Load the gender detection model
model = load_model('gender_detection.keras')

# Open system camera and mobile camera
cap1 = cv2.VideoCapture(0)  # System camera
cap2 = cv2.VideoCapture("http://192.43.159:4747/video")  # Mobile camera



classes = ['man', 'woman']

while True:
    # Read frames from both cameras
    ret1, frame1 = cap1.read()
    ret2, frame2 = cap2.read()

    if ret1:
        # Perform gender detection on system camera feed
        face, confidence = cv.detect_face(frame1)
        for idx, f in enumerate(face):
            (startX, startY) = f[0], f[1]
            (endX, endY) = f[2], f[3]

            cv2.rectangle(frame1, (startX, startY), (endX, endY), (0, 255, 0), 2)

            face_crop = np.copy(frame1[startY:endY, startX:endX])

            if face_crop.shape[0] < 10 or face_crop.shape[1] < 10:
                continue

            face_crop = cv2.resize(face_crop, (96, 96))
            face_crop = face_crop.astype("float") / 255.0
            face_crop = img_to_array(face_crop)
            face_crop = np.expand_dims(face_crop, axis=0)

            conf = model.predict(face_crop)[0]
            idx = np.argmax(conf)
            label = classes[idx]
            label = "{}: {:.2f}%".format(label, conf[idx] * 100)

            Y = startY - 10 if startY - 10 > 10 else startY + 10
            cv2.putText(frame1, label, (startX, Y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        # Show system camera feed with gender detection
        cv2.imshow('System Camera', frame1)

    if ret2:
        # Show mobile camera feed
        cv2.imshow('Mobile Camera', frame2)

    # Exit on pressing "q"
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap1.release()
cap2.release()
cv2.destroyAllWindows()                           
