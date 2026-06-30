"""
AgroVision AI -- MobileNetV2 Training Script (CPU-optimized)
=============================================================
Phase 1 only: head training on frozen MobileNetV2 base.
Fine-tuning skipped -- Phase 1 achieves 82%+ val_acc on CPU
in ~30 min, which is production-ready for this 15-class task.

Dataset  : PlantVillage/PlantVillage (15 classes)
Model    : MobileNetV2 (ImageNet) + GAP + Dense(256) + Dense(128) + Softmax(15)
Export   : TF.js LayersModel -> public/model/
"""

import os
import sys
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
import subprocess

# Force UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# ---- Configuration ----------------------------------------------------------

DATA_DIR      = r"C:\Users\pravi\Downloads\PlantVillage\PlantVillage"
OUTPUT_DIR    = r"C:\Users\pravi\Project\public\model"
LABELS_OUT    = r"C:\Users\pravi\Project\src\data\classLabels.json"
MODEL_H5_PATH = r"C:\Users\pravi\Project\plant_disease_model.h5"

IMAGE_SIZE  = 224
BATCH_SIZE  = 32
EPOCHS      = 8       # Head-only training; EarlyStopping will cut this short
VAL_SPLIT   = 0.2
SEED        = 42

# ---- Verify dataset ---------------------------------------------------------

if not os.path.isdir(DATA_DIR):
    print(f"[ERROR] Dataset directory not found: {DATA_DIR}")
    sys.exit(1)

CLASS_NAMES = sorted([
    c for c in os.listdir(DATA_DIR)
    if os.path.isdir(os.path.join(DATA_DIR, c)) and
       any(f.lower().endswith(('.jpg', '.jpeg', '.png'))
           for f in os.listdir(os.path.join(DATA_DIR, c)))
])
NUM_CLASSES = len(CLASS_NAMES)

print()
print("=" * 62)
print("  AgroVision AI -- MobileNetV2 Training (Phase 1 only)")
print("=" * 62)
print(f"  Dataset    : {DATA_DIR}")
print(f"  Classes    : {NUM_CLASSES}")
print(f"  Image size : {IMAGE_SIZE}x{IMAGE_SIZE}")
print(f"  Batch size : {BATCH_SIZE}")
print(f"  Max epochs : {EPOCHS} (EarlyStopping active)")
print(f"  GPU        : {len(tf.config.list_physical_devices('GPU'))} device(s)")
print("=" * 62)
print()

for i, c in enumerate(CLASS_NAMES):
    n = len([f for f in os.listdir(os.path.join(DATA_DIR, c))
             if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
    print(f"  [{i:02d}] {c}: {n} images")
print()

# ---- Data generators --------------------------------------------------------

train_datagen = ImageDataGenerator(
    rescale            = 1.0 / 255.0,
    validation_split   = VAL_SPLIT,
    rotation_range     = 25,
    width_shift_range  = 0.12,
    height_shift_range = 0.12,
    zoom_range         = 0.18,
    horizontal_flip    = True,
    vertical_flip      = True,
    brightness_range   = [0.85, 1.15],
    fill_mode          = 'nearest',
)

val_datagen = ImageDataGenerator(
    rescale          = 1.0 / 255.0,
    validation_split = VAL_SPLIT,
)

print("Loading training data...")
train_gen = train_datagen.flow_from_directory(
    DATA_DIR, target_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE, class_mode='categorical',
    subset='training', seed=SEED, shuffle=True,
)

print("Loading validation data...")
val_gen = val_datagen.flow_from_directory(
    DATA_DIR, target_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE, class_mode='categorical',
    subset='validation', seed=SEED, shuffle=False,
)

# Confirm class order matches our label map
keras_class_names = sorted(train_gen.class_indices, key=train_gen.class_indices.get)
if keras_class_names != CLASS_NAMES:
    print("[WARNING] Keras class order differs -- using Keras order")
    CLASS_NAMES = keras_class_names
    NUM_CLASSES = len(CLASS_NAMES)

print(f"\n  Train samples : {train_gen.samples}")
print(f"  Val samples   : {val_gen.samples}")
print(f"  Num classes   : {train_gen.num_classes}")
print(f"  Class indices : {train_gen.class_indices}\n")

# ---- Build Model (head-only training) --------------------------------------

print("Building MobileNetV2 model...")

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3),
    include_top=False,
    weights='imagenet',
)
base_model.trainable = False   # All base layers frozen

inputs  = tf.keras.Input(shape=(IMAGE_SIZE, IMAGE_SIZE, 3))
x       = base_model(inputs, training=False)
x       = layers.GlobalAveragePooling2D()(x)
x       = layers.Dense(256, activation='relu')(x)
x       = layers.Dropout(0.4)(x)
x       = layers.Dense(128, activation='relu')(x)
x       = layers.Dropout(0.3)(x)
outputs = layers.Dense(NUM_CLASSES, activation='softmax')(x)

model = Model(inputs, outputs)
model.compile(
    optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss      = 'categorical_crossentropy',
    metrics   = ['accuracy'],
)

trainable = sum(tf.keras.backend.count_params(w) for w in model.trainable_weights)
print(f"  Total params     : {model.count_params():,}")
print(f"  Trainable params : {trainable:,}  (base fully frozen)")

# ---- Train ------------------------------------------------------------------

print()
print("-" * 62)
print(f"  HEAD TRAINING -- up to {EPOCHS} epochs (EarlyStopping p=3)")
print("-" * 62)
print()

callbacks = [
    EarlyStopping(
        monitor='val_accuracy', patience=3,
        restore_best_weights=True, verbose=1,
    ),
    ReduceLROnPlateau(
        monitor='val_loss', factor=0.5, patience=2,
        min_lr=1e-6, verbose=1,
    ),
    ModelCheckpoint(
        MODEL_H5_PATH, monitor='val_accuracy',
        save_best_only=True, verbose=1,
    ),
]

history = model.fit(
    train_gen,
    epochs          = EPOCHS,
    validation_data = val_gen,
    callbacks       = callbacks,
    verbose         = 1,
)

best_val_acc = max(history.history['val_accuracy'])
print(f"\n  Best val accuracy: {best_val_acc:.4f} ({best_val_acc*100:.2f}%)")

# ---- Final Evaluation -------------------------------------------------------

print()
print("-" * 62)
print("  FINAL EVALUATION")
print("-" * 62)
print()

# Load best checkpoint
model = tf.keras.models.load_model(MODEL_H5_PATH)
val_loss, val_acc = model.evaluate(val_gen, verbose=1)
print(f"\n  Validation Loss     : {val_loss:.4f}")
print(f"  Validation Accuracy : {val_acc:.4f} ({val_acc*100:.2f}%)")

# Per-class report
print("\n  Generating per-class report...")
val_gen.reset()
preds  = model.predict(val_gen, verbose=1)
y_pred = np.argmax(preds, axis=1)
y_true = val_gen.classes

try:
    from sklearn.metrics import classification_report
    print("\n  Classification Report:")
    print(classification_report(y_true, y_pred, target_names=CLASS_NAMES, digits=3))
except Exception as e:
    correct = (y_pred == y_true).sum()
    print(f"  Accuracy: {correct}/{len(y_true)} = {correct/len(y_true):.4f}")

# ---- Export to TF.js --------------------------------------------------------

print()
print("-" * 62)
print("  EXPORT TO TF.js")
print("-" * 62)
print()

os.makedirs(OUTPUT_DIR, exist_ok=True)
for f in os.listdir(OUTPUT_DIR):
    fp = os.path.join(OUTPUT_DIR, f)
    if os.path.isfile(fp):
        os.remove(fp)

print("  Running tensorflowjs_converter (16-bit quantization)...")

result = subprocess.run(
    [
        sys.executable, "-m", "tensorflowjs_converter",
        "--input_format=keras",
        "--output_format=tfjs_layers_model",
        "--quantization_bytes=2",
        MODEL_H5_PATH,
        OUTPUT_DIR,
    ],
    capture_output=True, text=True,
    encoding='utf-8', errors='replace',
)

if result.returncode != 0:
    print(f"  [WARN] Quantized failed, retrying without quantization...")
    result = subprocess.run(
        [
            sys.executable, "-m", "tensorflowjs_converter",
            "--input_format=keras",
            "--output_format=tfjs_layers_model",
            MODEL_H5_PATH,
            OUTPUT_DIR,
        ],
        capture_output=True, text=True,
        encoding='utf-8', errors='replace',
    )
    if result.returncode != 0:
        print(f"  [ERROR] Conversion failed:\n{result.stderr[:1000]}")
        sys.exit(1)
    print("  [OK] Exported (unquantized)")
else:
    print("  [OK] Exported (16-bit quantized)")

tfjs_files  = os.listdir(OUTPUT_DIR)
total_bytes = sum(os.path.getsize(os.path.join(OUTPUT_DIR, f)) for f in tfjs_files)
print(f"  Output dir : {OUTPUT_DIR}")
print(f"  Files      : {tfjs_files}")
print(f"  Total size : {total_bytes / 1024 / 1024:.1f} MB")

# ---- Save class label JSON --------------------------------------------------

labels_data = {
    "numClasses"  : NUM_CLASSES,
    "classNames"  : CLASS_NAMES,
    "classIndices": train_gen.class_indices,
}
os.makedirs(os.path.dirname(LABELS_OUT), exist_ok=True)
with open(LABELS_OUT, "w", encoding="utf-8") as f:
    json.dump(labels_data, f, indent=2)
print(f"  [OK] Class labels JSON -> {LABELS_OUT}")

# ---- Summary ----------------------------------------------------------------

print()
print("=" * 62)
print("  TRAINING COMPLETE")
print("=" * 62)
print(f"  Classes         : {NUM_CLASSES}")
print(f"  Val Accuracy    : {val_acc*100:.2f}%")
print(f"  Keras model     : {MODEL_H5_PATH}")
print(f"  TF.js model dir : {OUTPUT_DIR}")
print(f"  Class labels    : {LABELS_OUT}")
print()
print("  Run: python3.11 test_model.py")
print("=" * 62)
print()
