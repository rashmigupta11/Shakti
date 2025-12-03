{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "61c96514",
   "metadata": {},
   "outputs": [],
   "source": [
    "from flask import Flask, Response\n",
    "import cv2\n",
    "\n",
    "app = Flask(__name__)\n",
    "\n",
    "def gen_frames():\n",
    "    cap = cv2.VideoCapture(0)  # System camera\n",
    "    while True:\n",
    "        success, frame = cap.read()\n",
    "        if not success:\n",
    "            break\n",
    "        else:\n",
    "            ret, buffer = cv2.imencode('.jpg', frame)\n",
    "            frame = buffer.tobytes()\n",
    "            yield (b'--frame\\r\\n'\n",
    "                   b'Content-Type: image/jpeg\\r\\n\\r\\n' + frame + b'\\r\\n')\n",
    "\n",
    "@app.route('/video_feed')\n",
    "def video_feed():\n",
    "    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')\n",
    "\n",
    "if __name__ == '__main__':\n",
    "    app.run(host='0.0.0.0', port=5000)\n"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.11.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
