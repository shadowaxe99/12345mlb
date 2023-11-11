```python
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model

# Load the models using the paths from shared dependencies
PITCH_TYPE_CLASSIFIER_MODEL_PATH = 'machine_learning/models/pitch_type_classifier.h5'
SWING_QUALITY_ANALYZER_MODEL_PATH = 'machine_learning/models/swing_quality_analyzer.h5'

pitch_type_classifier = load_model(PITCH_TYPE_CLASSIFIER_MODEL_PATH)
swing_quality_analyzer = load_model(SWING_QUALITY_ANALYZER_MODEL_PATH)

def evaluate_model(model, X_test, y_test, class_labels):
    """
    Evaluate the given model with the test data and print out the classification report and confusion matrix.
    """
    # Predict the classes
    y_pred = model.predict(X_test)
    y_pred_classes = np.argmax(y_pred, axis=1)
    y_true = np.argmax(y_test, axis=1)

    # Generate a classification report
    print('Classification Report:')
    print(classification_report(y_true, y_pred_classes, target_names=class_labels))

    # Generate a confusion matrix
    cm = confusion_matrix(y_true, y_pred_classes)
    print('Confusion Matrix:')
    print(cm)

    # Plot the confusion matrix
    plt.figure(figsize=(10, 8))
    plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
    plt.title('Confusion Matrix')
    plt.colorbar()
    tick_marks = np.arange(len(class_labels))
    plt.xticks(tick_marks, class_labels, rotation=45)
    plt.yticks(tick_marks, class_labels)

    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, cm[i, j],
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')
    plt.show()

# Placeholder for loading test data
# X_test, y_test, class_labels = load_test_data()

# Evaluate the pitch type classifier
# evaluate_model(pitch_type_classifier, X_test, y_test, class_labels)

# Evaluate the swing quality analyzer
# evaluate_model(swing_quality_analyzer, X_test, y_test, class_labels)
```