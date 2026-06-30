// ─────────────────────────────────────────────────────────────────────────────
//  App Configuration
// ─────────────────────────────────────────────────────────────────────────────

/**
 * MODEL_URL — TensorFlow.js model trained on PlantVillage dataset.
 *
 * Locally trained MobileNetV2 transfer learning model (15 classes):
 *   Pepper × 2, Potato × 3, Tomato × 10 classes
 *
 * Model files are served from /public/model/ by the Vite dev server.
 * For production, host the model files on a CDN and update this URL.
 */
export const MODEL_URL = '/model/model.json';

/** Input image dimensions expected by the model (MobileNetV2 standard). */
export const IMAGE_SIZE = 224;

/** Number of top predictions to display. */
export const TOP_K = 5;

/**
 * Number of output classes in the trained model.
 * Must match the number of class folders in the training dataset.
 * Classes (alphabetical order — Keras flow_from_directory default):
 *   0  Pepper — Bacterial Spot
 *   1  Pepper — Healthy
 *   2  Potato — Early Blight
 *   3  Potato — Late Blight
 *   4  Potato — Healthy
 *   5  Tomato — Bacterial Spot
 *   6  Tomato — Early Blight
 *   7  Tomato — Late Blight
 *   8  Tomato — Leaf Mold
 *   9  Tomato — Septoria Leaf Spot
 *  10  Tomato — Spider Mites
 *  11  Tomato — Target Spot
 *  12  Tomato — Yellow Leaf Curl Virus
 *  13  Tomato — Mosaic Virus
 *  14  Tomato — Healthy
 */
export const NUM_CLASSES = 15;

/** App display name. */
export const APP_NAME = 'AgroVision AI';
