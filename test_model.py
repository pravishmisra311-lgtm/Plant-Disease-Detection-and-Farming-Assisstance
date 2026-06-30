"""
AgroVision AI -- Model Test Script
====================================
Tests the trained .h5 model on 3 random images per class and prints
predicted vs actual label + confidence.
"""

import os
import sys
import json
import random
import numpy as np

# Force UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import tensorflow as tf
from tensorflow.keras.preprocessing import image as keras_image

# ---- Configuration ----------------------------------------------------------

DATASET_ROOT       = r"C:\Users\pravi\Downloads\PlantVillage"
DATA_DIR           = r"C:\Users\pravi\Downloads\PlantVillage\PlantVillage"
MODEL_H5_PATH      = r"C:\Users\pravi\Project\plant_disease_model.h5"
LABELS_OUT         = r"C:\Users\pravi\Project\src\data\classLabels.json"
IMAGE_SIZE         = 224
SAMPLES_PER_CLASS  = 3

# ---- Load class labels ------------------------------------------------------

with open(LABELS_OUT, "r", encoding="utf-8") as f:
    label_data = json.load(f)

CLASS_NAMES = label_data["classNames"]
NUM_CLASSES = label_data["numClasses"]

print()
print("=" * 70)
print("  AgroVision AI -- Model Prediction Test")
print("=" * 70)
print(f"  Model   : {MODEL_H5_PATH}")
print(f"  Classes : {NUM_CLASSES}")
print(f"  Dataset : {DATA_DIR}")
print("=" * 70)
print()

# ---- Load model -------------------------------------------------------------

print("Loading model...")
model = tf.keras.models.load_model(MODEL_H5_PATH)
print(f"  Model loaded. Input shape: {model.input_shape}")
print()

# ---- Preprocess helper ------------------------------------------------------

def preprocess(img_path):
    img = keras_image.load_img(img_path, target_size=(IMAGE_SIZE, IMAGE_SIZE))
    arr = keras_image.img_to_array(img) / 255.0
    return np.expand_dims(arr, axis=0)

# ---- Test predictions -------------------------------------------------------

total   = 0
correct = 0
results = []

header = f"  {'TRUE CLASS':<52} {'PREDICTED':<52} {'CONF':>6}  OK"
print(header)
print("  " + "-" * 52 + " " + "-" * 52 + " " + "-" * 6 + "  --")

random.seed(42)

for class_idx, class_name in enumerate(CLASS_NAMES):
    class_dir = os.path.join(DATA_DIR, class_name)
    if not os.path.isdir(class_dir):
        print(f"  [WARN] Class dir not found: {class_dir}")
        continue

    img_files = [
        f for f in os.listdir(class_dir)
        if f.lower().endswith(('.jpg', '.jpeg', '.png'))
    ]
    if not img_files:
        print(f"  [WARN] No images in {class_dir}")
        continue

    samples = random.sample(img_files, min(SAMPLES_PER_CLASS, len(img_files)))

    for img_file in samples:
        img_path = os.path.join(class_dir, img_file)
        try:
            inp        = preprocess(img_path)
            preds      = model.predict(inp, verbose=0)[0]
            pred_idx   = int(np.argmax(preds))
            confidence = float(preds[pred_idx])
            pred_name  = CLASS_NAMES[pred_idx]
            is_correct = (pred_idx == class_idx)

            total   += 1
            correct += int(is_correct)
            tick = "[OK]" if is_correct else "[X] "

            print(
                f"  {class_name:<52} {pred_name:<52} "
                f"{confidence:>5.1%}  {tick}"
            )
            results.append({
                "true": class_name, "pred": pred_name,
                "confidence": confidence, "correct": is_correct,
            })
        except Exception as e:
            print(f"  [ERROR] {img_file}: {e}")

# ---- Summary ----------------------------------------------------------------

print()
print("-" * 70)
print(f"  Sample Accuracy: {correct}/{total} = {correct / max(total, 1):.2%}")
print("=" * 70)
print()

# Per-class summary
print("  Per-class sample accuracy:")
class_correct = {}
class_total   = {}
for r in results:
    c = r["true"]
    class_correct[c] = class_correct.get(c, 0) + int(r["correct"])
    class_total[c]   = class_total.get(c,   0) + 1

for c in CLASS_NAMES:
    cc  = class_correct.get(c, 0)
    ct  = class_total.get(c, 0)
    bar = "#" * cc + "." * (ct - cc)
    pct = f"{cc/ct:.0%}" if ct > 0 else "N/A"
    print(f"    {c:<55} {cc}/{ct} [{bar}] {pct}")

print()
print("  Test complete. Start dev server and open /detect to test in-browser.")
print()
