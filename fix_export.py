"""
AgroVision AI -- TF.js Compatible Re-Export
=============================================
Problem  : model.json was saved in Keras 3 format (batch_shape, new inbound_nodes)
           which TF.js 4.x cannot deserialize (expects Keras 2 format).
Solution : Rebuild identical architecture with tf_keras (Keras 2 API),
           transfer weights, save as Keras 2 .h5, convert with CLI.

TF.js compatibility:
  - Expects: "batchInputShape" in InputLayer config (Keras 2)
  - Got    : "batch_shape" in InputLayer config (Keras 3)
"""

import os
import sys
import json
import subprocess
import numpy as np

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# ---- Paths ------------------------------------------------------------------

MODEL_H5_PATH     = r"C:\Users\pravi\Project\plant_disease_model.h5"
MODEL_K2_PATH     = r"C:\Users\pravi\Project\plant_disease_model_k2.h5"
OUTPUT_DIR        = r"C:\Users\pravi\Project\public\model"
TFJS_CONVERTER    = r"C:\Users\pravi\AppData\Local\Python\pythoncore-3.11-64\Scripts\tensorflowjs_converter.exe"
NUM_CLASSES       = 15
IMAGE_SIZE        = 224

print()
print("=" * 62)
print("  AgroVision AI -- TF.js Compatible Re-Export")
print("=" * 62)

# ---- Step 1: Load trained weights from Keras 3 model ------------------------

print("\n[1] Loading trained Keras 3 model to extract weights...")
import tensorflow as tf
model_k3 = tf.keras.models.load_model(MODEL_H5_PATH)
weights_k3 = model_k3.get_weights()
print(f"    Input shape  : {model_k3.input_shape}")
print(f"    Output shape : {model_k3.output_shape}")
print(f"    Total params : {model_k3.count_params():,}")
print(f"    Weight arrays: {len(weights_k3)}")
for i, w in enumerate(weights_k3):
    print(f"      [{i:02d}] shape={w.shape} dtype={w.dtype}")

del model_k3  # Free memory

# ---- Step 2: Rebuild with tf_keras (Keras 2 API) ----------------------------

print("\n[2] Rebuilding identical architecture with tf_keras (Keras 2)...")
import tf_keras as keras
print(f"    tf_keras version: {keras.__version__}")

# Build same architecture as training script
base_model = keras.applications.MobileNetV2(
    input_shape = (IMAGE_SIZE, IMAGE_SIZE, 3),
    include_top = False,
    weights     = None,    # Don't load imagenet weights - we'll set them from training
)
base_model.trainable = False

inputs  = keras.Input(shape=(IMAGE_SIZE, IMAGE_SIZE, 3), name='input_1')
x       = base_model(inputs, training=False)
x       = keras.layers.GlobalAveragePooling2D()(x)
x       = keras.layers.Dense(256, activation='relu')(x)
x       = keras.layers.Dropout(0.4)(x)
x       = keras.layers.Dense(128, activation='relu')(x)
x       = keras.layers.Dropout(0.3)(x)
outputs = keras.layers.Dense(NUM_CLASSES, activation='softmax', name='predictions')(x)

model_k2 = keras.Model(inputs, outputs)
weights_k2_init = model_k2.get_weights()

print(f"    tf_keras model params  : {model_k2.count_params():,}")
print(f"    tf_keras weight arrays : {len(weights_k2_init)}")

# Verify weight shapes match
if len(weights_k3) != len(weights_k2_init):
    print(f"\n[ERROR] Weight count mismatch!")
    print(f"  Keras 3 model : {len(weights_k3)} arrays")
    print(f"  tf_keras model: {len(weights_k2_init)} arrays")
    print("\n  Trying shape-matched transfer...")
    
    # Build a mapping by shape
    k3_by_shape = {}
    for i, w in enumerate(weights_k3):
        k = str(w.shape)
        if k not in k3_by_shape:
            k3_by_shape[k] = []
        k3_by_shape[k].append(w)
    
    new_weights = []
    for w_init in weights_k2_init:
        k = str(w_init.shape)
        if k in k3_by_shape and k3_by_shape[k]:
            new_weights.append(k3_by_shape[k].pop(0))
        else:
            print(f"  [WARN] No match for shape {w_init.shape}, keeping init")
            new_weights.append(w_init)
    model_k2.set_weights(new_weights)
else:
    # Same count — direct transfer
    print("\n    Weight arrays match. Transferring weights directly...")
    shapes_match = all(a.shape == b.shape
                       for a, b in zip(weights_k3, weights_k2_init))
    print(f"    All shapes match: {shapes_match}")
    
    if not shapes_match:
        print("\n[ERROR] Shape mismatch detected:")
        for i, (a, b) in enumerate(zip(weights_k3, weights_k2_init)):
            if a.shape != b.shape:
                print(f"  [{i}] Keras3={a.shape}  tf_keras={b.shape}")
        sys.exit(1)
    
    model_k2.set_weights(weights_k3)
    print("    Weights transferred successfully!")

# ---- Step 3: Quick sanity check ---------------------------------------------

print("\n[3] Sanity check -- running dummy inference...")
dummy = np.zeros((1, IMAGE_SIZE, IMAGE_SIZE, 3), dtype=np.float32)
out   = model_k2.predict(dummy, verbose=0)
print(f"    Output shape : {out.shape}  (expected: (1, {NUM_CLASSES}))")
print(f"    Output sum   : {out.sum():.6f}  (expected: ~1.0 for softmax)")
assert out.shape == (1, NUM_CLASSES), "Shape mismatch!"
assert abs(out.sum() - 1.0) < 0.01,  "Softmax sum not ~1.0!"
print("    Sanity check PASSED!")

# ---- Step 4: Save as Keras 2 .h5 -------------------------------------------

print(f"\n[4] Saving Keras 2 model -> {MODEL_K2_PATH}")
model_k2.save(MODEL_K2_PATH)
size_mb = os.path.getsize(MODEL_K2_PATH) / 1024 / 1024
print(f"    Saved! ({size_mb:.1f} MB)")

# Quick verification: reload and check it's Keras 2 format
with open(MODEL_K2_PATH, 'rb') as f:
    header = f.read(8)
is_hdf5 = header[:4] == b'\x89HDF'
print(f"    HDF5 format  : {is_hdf5}")

# ---- Step 5: Convert to TF.js LayersModel via CLI ---------------------------

print(f"\n[5] Converting to TF.js LayersModel...")
print(f"    Converter: {TFJS_CONVERTER}")
print(f"    Output   : {OUTPUT_DIR}")

os.makedirs(OUTPUT_DIR, exist_ok=True)
# Clear old files
for f in os.listdir(OUTPUT_DIR):
    fp = os.path.join(OUTPUT_DIR, f)
    if os.path.isfile(fp):
        os.remove(fp)
        print(f"    Removed: {f}")

if not os.path.exists(TFJS_CONVERTER):
    print(f"[ERROR] Converter not found: {TFJS_CONVERTER}")
    sys.exit(1)

# Run converter
cmd = [
    TFJS_CONVERTER,
    '--input_format=keras',
    '--output_format=tfjs_layers_model',
    MODEL_K2_PATH,
    OUTPUT_DIR,
]
print(f"    Command: {' '.join(cmd)}")

result = subprocess.run(cmd, capture_output=True, text=True,
                        encoding='utf-8', errors='replace')

if result.returncode != 0:
    print(f"\n[ERROR] Conversion failed (exit {result.returncode})")
    print(f"  stdout: {result.stdout[:500]}")
    print(f"  stderr: {result.stderr[:500]}")
    sys.exit(1)

print("    [OK] Conversion successful!")
if result.stdout.strip():
    print(f"    stdout: {result.stdout.strip()[:200]}")

# ---- Step 6: Verify model.json format ---------------------------------------

print("\n[6] Verifying model.json...")
model_json_path = os.path.join(OUTPUT_DIR, 'model.json')
if not os.path.exists(model_json_path):
    print("[ERROR] model.json not found!")
    sys.exit(1)

with open(model_json_path, 'r', encoding='utf-8') as f:
    mj = json.load(f)

# Check format version
generated_by = mj.get('generatedBy', 'unknown')
converted_by = mj.get('convertedBy', 'unknown')
keras_ver    = mj.get('modelTopology', {}).get('keras_version', 'unknown')
print(f"    generatedBy  : {generated_by}")
print(f"    convertedBy  : {converted_by}")
print(f"    keras_version: {keras_ver}")

# Verify InputLayer has batchInputShape (Keras 2 format)
layers = mj.get('modelTopology', {}).get('model_config', {}).get('config', {}).get('layers', [])
input_layers = [l for l in layers if l['class_name'] == 'InputLayer']
print(f"\n    InputLayer count: {len(input_layers)}")
for il in input_layers[:2]:
    cfg = il['config']
    has_batch_input_shape = 'batch_input_shape' in cfg
    has_batchInputShape   = 'batchInputShape' in cfg
    has_batch_shape       = 'batch_shape' in cfg   # Keras 3 (BAD)
    print(f"    Layer: {il.get('name')}")
    print(f"      batch_input_shape : {has_batch_input_shape}")
    print(f"      batchInputShape   : {has_batchInputShape}")
    print(f"      batch_shape (K3)  : {has_batch_shape}  <- should be False!")
    if has_batch_input_shape:
        print(f"      value: {cfg['batch_input_shape']}")
    elif has_batchInputShape:
        print(f"      value: {cfg['batchInputShape']}")

# Check weight shards
shards = mj.get('weightsManifest', [{}])[0].get('paths', [])
print(f"\n    Weight shards: {len(shards)}")
print(f"    Shard files  : {shards}")

# Report file sizes
tfjs_files  = sorted(os.listdir(OUTPUT_DIR))
total_bytes = sum(os.path.getsize(os.path.join(OUTPUT_DIR, f)) for f in tfjs_files)
print(f"\n    Output files:")
for fn in tfjs_files:
    sz = os.path.getsize(os.path.join(OUTPUT_DIR, fn))
    print(f"      {fn}  ({sz/1024:.1f} KB)")
print(f"    Total: {total_bytes/1024/1024:.1f} MB")

# ---- Done -------------------------------------------------------------------

print()
print("=" * 62)
print("  RE-EXPORT COMPLETE")
print("=" * 62)
print(f"  Model URL : /model/model.json")
print(f"  Format    : TF.js LayersModel (Keras 2 compatible)")
print()
print("  Refresh the browser at http://localhost:5173/detect")
print("  Header should show 'Model: Ready *' in green.")
print("=" * 62)
print()
