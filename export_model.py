"""
AgroVision AI -- TF.js Export Script
======================================
Exports the trained plant_disease_model.h5 to TF.js LayersModel format
using the tensorflowjs Python API directly (no CLI needed).
"""

import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import tensorflow as tf
import tensorflowjs as tfjs

MODEL_H5_PATH = r"C:\Users\pravi\Project\plant_disease_model.h5"
OUTPUT_DIR    = r"C:\Users\pravi\Project\public\model"
LABELS_OUT    = r"C:\Users\pravi\Project\src\data\classLabels.json"

print()
print("=" * 60)
print("  AgroVision AI -- TF.js Export")
print("=" * 60)
print(f"  Input  : {MODEL_H5_PATH}")
print(f"  Output : {OUTPUT_DIR}")
print(f"  tfjs   : {tfjs.__version__}")
print()

# Verify model exists
if not os.path.exists(MODEL_H5_PATH):
    print(f"  [ERROR] Model not found: {MODEL_H5_PATH}")
    sys.exit(1)

# Load model
print("  Loading model...")
model = tf.keras.models.load_model(MODEL_H5_PATH)
print(f"  Input shape  : {model.input_shape}")
print(f"  Output shape : {model.output_shape}")
print(f"  Total params : {model.count_params():,}")

# Prepare output dir
os.makedirs(OUTPUT_DIR, exist_ok=True)
for f in os.listdir(OUTPUT_DIR):
    fp = os.path.join(OUTPUT_DIR, f)
    if os.path.isfile(fp):
        os.remove(fp)
        print(f"  Removed old file: {f}")

# Export using Python API
print()
print("  Exporting to TF.js LayersModel format...")
try:
    tfjs.converters.save_keras_model(model, OUTPUT_DIR)
    print("  [OK] Export successful (unquantized)")
except Exception as e:
    print(f"  [ERROR] Export failed: {e}")
    sys.exit(1)

# Report output files
tfjs_files  = sorted(os.listdir(OUTPUT_DIR))
total_bytes = sum(os.path.getsize(os.path.join(OUTPUT_DIR, f)) for f in tfjs_files)

print()
print(f"  Files exported:")
for f in tfjs_files:
    size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
    print(f"    {f}  ({size/1024:.1f} KB)")
print(f"  Total size : {total_bytes/1024/1024:.1f} MB")

# Verify model.json exists and contains weights manifest
model_json_path = os.path.join(OUTPUT_DIR, "model.json")
if os.path.exists(model_json_path):
    with open(model_json_path, "r") as f:
        mj = json.load(f)
    shard_count = len(mj.get("weightsManifest", [{}])[0].get("paths", []))
    print(f"  model.json  : OK ({shard_count} weight shard(s))")
else:
    print("  [WARN] model.json not found!")

print()
print("=" * 60)
print("  EXPORT COMPLETE")
print("=" * 60)
print(f"  Model ready at : /model/model.json")
print(f"  MODEL_URL in config.js already set to: '/model/model.json'")
print()
print("  Next: run  python3.11 test_model.py")
print("=" * 60)
print()
