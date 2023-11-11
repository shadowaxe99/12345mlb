```python
import os
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Flatten, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from data_preprocessing import preprocess_data
from video_processing import extract_features_from_video

# Constants from shared dependencies
PITCH_TYPE_CLASSIFIER_MODEL_PATH = 'machine_learning/models/pitch_type_classifier.h5'
SWING_QUALITY_ANALYZER_MODEL_PATH = 'machine_learning/models/swing_quality_analyzer.h5'

# Load and preprocess the dataset
dataframe = pd.read_csv('path_to_dataset.csv')
features, labels = preprocess_data(dataframe)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Define the pitch type classifier model architecture
pitch_type_classifier = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(X_train.shape[1:])),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(len(np.unique(y_train)), activation='softmax')
])

# Compile the model
pitch_type_classifier.compile(optimizer=Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Define callbacks
checkpoint = ModelCheckpoint(PITCH_TYPE_CLASSIFIER_MODEL_PATH, monitor='val_accuracy', verbose=1, save_best_only=True, mode='max')
early_stopping = EarlyStopping(monitor='val_loss', patience=10, verbose=1)

# Train the pitch type classifier model
pitch_type_classifier.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=50, batch_size=32, callbacks=[checkpoint, early_stopping])

# Evaluate the model
y_pred = pitch_type_classifier.predict(X_test)
print(classification_report(y_test, np.argmax(y_pred, axis=1)))
print(confusion_matrix(y_test, np.argmax(y_pred, axis=1)))

# Define the swing quality analyzer model architecture
swing_quality_analyzer = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(X_train.shape[1:])),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# Compile the model
swing_quality_analyzer.compile(optimizer=Adam(), loss='binary_crossentropy', metrics=['accuracy'])

# Train the swing quality analyzer model
swing_quality_analyzer.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=50, batch_size=32, callbacks=[checkpoint, early_stopping])

# Save the swing quality analyzer model
swing_quality_analyzer.save(SWING_QUALITY_ANALYZER_MODEL_PATH)

# Evaluate the model
y_pred = swing_quality_analyzer.predict(X_test)
print(classification_report(y_test, (y_pred > 0.5).astype('int32')))
print(confusion_matrix(y_test, (y_pred > 0.5).astype('int32')))
```