import { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { MODEL_URL, IMAGE_SIZE } from '../config';

/**
 * useModel — TensorFlow.js Model Lifecycle Hook
 * ─────────────────────────────────────────────
 * Loads and manages a TF.js LayersModel.
 *
 * States:
 *   'idle'     — MODEL_URL is not set; waiting for configuration
 *   'loading'  — model is being fetched / deserialized
 *   'ready'    — model is loaded and ready to predict
 *   'error'    — model failed to load
 *
 * Usage:
 *   const { model, status, error, predict } = useModel();
 */
export function useModel() {
  const [status, setStatus] = useState(MODEL_URL ? 'loading' : 'idle');
  const [error, setError]   = useState(null);
  const modelRef            = useRef(null);

  // ── Load model on mount ──────────────────────────────────────────────────
  useEffect(() => {
    if (!MODEL_URL) {
      setStatus('idle');
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setStatus('loading');
        setError(null);

        // Warm up the WebGL backend
        await tf.ready();

        const m = await tf.loadLayersModel(MODEL_URL);

        // Warm-up run so first real inference isn't slow
        const warmUp = tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
        m.predict(warmUp).dispose();
        warmUp.dispose();

        if (!cancelled) {
          modelRef.current = m;
          setStatus('ready');
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[useModel] Failed to load model:', err);
          setError(err.message || 'Unknown error loading model');
          setStatus('error');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Predict ──────────────────────────────────────────────────────────────
  /**
   * predict(imageElement)
   *
   * Runs inference on an HTMLImageElement / HTMLCanvasElement / HTMLVideoElement.
   * Returns an array of { classIndex, confidence } sorted by descending confidence.
   *
   * @param {HTMLElement} imageEl
   * @returns {Promise<Array<{classIndex: number, confidence: number}>>}
   */
  const predict = useCallback(async (imageEl) => {
    if (!modelRef.current) {
      throw new Error('Model is not loaded yet.');
    }

    return tf.tidy(() => {
      // 1. Convert to tensor [H, W, 3]
      const rawTensor = tf.browser.fromPixels(imageEl);

      // 2. Resize to [IMAGE_SIZE, IMAGE_SIZE, 3]
      const resized = tf.image.resizeBilinear(rawTensor, [IMAGE_SIZE, IMAGE_SIZE]);

      // 3. Normalise to [0, 1]
      const normalized = resized.div(255.0);

      // 4. Expand to [1, IMAGE_SIZE, IMAGE_SIZE, 3]
      const batched = normalized.expandDims(0);

      // 5. Run model
      const predictions = modelRef.current.predict(batched);

      // 6. Extract scores as JS array
      const scores = predictions.dataSync();

      // 7. Build sorted result
      const results = Array.from(scores)
        .map((confidence, classIndex) => ({ classIndex, confidence }))
        .sort((a, b) => b.confidence - a.confidence);

      return results;
    });
  }, []);

  return {
    model: modelRef.current,
    status,
    error,
    predict,
  };
}
