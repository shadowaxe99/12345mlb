```python
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

# Load the pre-trained models
pitch_type_classifier = load_model('models/pitch_type_classifier.h5')
swing_quality_analyzer = load_model('models/swing_quality_analyzer.h5')

class VideoProcessor:
    def __init__(self):
        self.cap = None

    def process_video(self, video_path):
        # Open the video file
        self.cap = cv2.VideoCapture(video_path)
        if not self.cap.isOpened():
            raise ValueError("Error opening video file")

        # Read the video frame by frame
        frames = []
        while self.cap.isOpened():
            ret, frame = self.cap.read()
            if not ret:
                break
            frames.append(frame)

        # Close the video file
        self.cap.release()

        # Analyze the video frames
        analysis_results = {
            'pitch_types': self.analyze_pitch_types(frames),
            'swing_qualities': self.analyze_swing_qualities(frames)
        }

        return analysis_results

    def analyze_pitch_types(self, frames):
        # Preprocess frames and predict pitch types
        pitch_types = []
        for frame in frames:
            preprocessed_frame = self.preprocess_frame(frame)
            prediction = pitch_type_classifier.predict(np.expand_dims(preprocessed_frame, axis=0))
            pitch_types.append(np.argmax(prediction))
        return pitch_types

    def analyze_swing_qualities(self, frames):
        # Preprocess frames and predict swing qualities
        swing_qualities = []
        for frame in frames:
            preprocessed_frame = self.preprocess_frame(frame)
            prediction = swing_quality_analyzer.predict(np.expand_dims(preprocessed_frame, axis=0))
            swing_qualities.append(np.argmax(prediction))
        return swing_qualities

    def preprocess_frame(self, frame):
        # Convert frame to grayscale
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # Resize frame to match model input
        resized_frame = cv2.resize(gray_frame, (224, 224))
        # Normalize pixel values
        normalized_frame = resized_frame / 255.0
        return normalized_frame

# Example usage:
# video_processor = VideoProcessor()
# results = video_processor.process_video('path_to_video.mp4')
# print(results)
```