import os
import cv2
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten

# Load ORL dataset
def load_orl_dataset(data_dir):
    images, labels = [], []
    for person in range(1, 41):  # 40 subjects
        for img_num in range(1, 11):  # 10 images per subject
            img_path = os.path.join(data_dir, f's{person}/{img_num}.pgm')
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            img = cv2.resize(img, (32, 32))  # Resize for uniformity
            images.append(img.flatten())    # Flatten image
            labels.append(person - 1)       # 0-based labels
    return np.array(images), np.array(labels)

# Dataset path
dataset_path = "C:\Users\kosur\OneDrive\Desktop\4-2 PROJECTNEW\ORL"
images, labels = load_orl_dataset(dataset_path)

# Normalize images
images = images / 255.0

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(images, labels, test_size=0.2, random_state=42)

# One-hot encode labels
y_train = tf.keras.utils.to_categorical(y_train, num_classes=40)
y_test = tf.keras.utils.to_categorical(y_test, num_classes=40)

# Build the neural network
model = Sequential([
    Flatten(input_shape=(1024,)),  # 32x32 = 1024 pixels
    Dense(128, activation='relu'),
    Dense(64, activation='relu'),
    Dense(40, activation='softmax')  # 40 classes
])

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.1)

# Evaluate the model
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f"Test accuracy: {test_acc}")
