import { useState, useCallback } from 'react';
import { useModel } from '../hooks/useModel';
import { NUM_CLASSES } from '../config';
import ModelStatus from '../components/Detection/ModelStatus';
import ImageUploader from '../components/Detection/ImageUploader';
import PredictionResult from '../components/Detection/PredictionResult';

export default function DetectionPage() {
  const { status, error, predict } = useModel();
  const [imageEl,     setImageEl]     = useState(null);
  const [results,     setResults]     = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState(null);

  const handleImageReady = useCallback((img, url) => {
    setImageEl(img);
    setResults(null);
    setAnalyzeError(null);
    if (!img) return;
    // Auto-analyze if model is ready
    if (status === 'ready') runPrediction(img);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const runPrediction = async (img) => {
    if (!img) return;
    setIsAnalyzing(true);
    setAnalyzeError(null);
    setResults(null);
    try {
      const res = await predict(img);
      setResults(res);
    } catch (err) {
      setAnalyzeError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = () => runPrediction(imageEl);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero anim-fade-in-down">
        <div className="page-hero-content">
          <h1>🔬 Plant Disease Detection</h1>
          <p>
            Upload a plant leaf image to identify diseases and receive AI-powered insights for crop health management.
          </p>
        </div>
      </div>

      {status !== 'ready' && <ModelStatus status={status} error={error} />}

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)', alignItems: 'start' }}>
        {/* Left: Upload */}
        <div>
          <h3 className="section-title">📸 Upload Image</h3>
          <ImageUploader
            onImageReady={handleImageReady}
            disabled={status === 'loading'}
          />

          {/* Analyze button */}
          {imageEl && status === 'ready' && (
            <button
              className="btn btn-primary btn-lg w-full mt-4"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              id="analyze-btn"
              style={{ width: '100%', marginTop: 'var(--sp-4)' }}
            >
              {isAnalyzing
                ? <><span className="spinner spinner-sm" /> Analyzing…</>
                : '🧠 Analyze Image'
              }
            </button>
          )}

          {imageEl && status !== 'ready' && (
            <div style={{ marginTop: 'var(--sp-3)', padding: 'var(--sp-3) var(--sp-4)', background: 'rgba(249,168,37,0.08)', border: '1px solid rgba(249,168,37,0.3)', borderRadius: 'var(--r-md)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--c-warning)', margin: 0 }}>
                ⚠️ Image ready — but model is not loaded. Configure the model URL in{' '}
                <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 3 }}>src/config.js</code>{' '}
                to run predictions.
              </p>
            </div>
          )}

          {analyzeError && (
            <div style={{ marginTop: 'var(--sp-3)', padding: 'var(--sp-3)', background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.3)', borderRadius: 'var(--r-md)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--c-danger)', margin: 0 }}>
                ❌ {analyzeError}
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="card mt-6" style={{ marginTop: 'var(--sp-6)' }}>
            <h4 style={{ marginBottom: 'var(--sp-3)', fontSize: '0.9rem' }}>📸 Tips for Best Results</h4>
            <ul style={{ paddingLeft: 'var(--sp-4)' }}>
              {[
                'Take a clear, well-lit photo of the affected leaf',
                'Single leaf filling most of the frame works best',
                'Avoid shadows, blurry or overexposed images',
                'Use natural daylight for accurate color reproduction',
                'Include both healthy and affected areas if possible',
              ].map((tip, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', listStyle: 'disc', marginBottom: 'var(--sp-2)', lineHeight: 1.5 }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <h3 className="section-title">📊 Detection Results</h3>

          {!results && !isAnalyzing && (
            <div
              className="card"
              style={{ textAlign: 'center', padding: 'var(--sp-12) var(--sp-8)', color: 'var(--text-muted)' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-3)' }}>🌱</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 'var(--sp-2)' }}>
                Awaiting Analysis
              </div>
              <p style={{ fontSize: '0.85rem' }}>
                Upload a plant image{status === 'ready' ? ' and click Analyze' : ' to get started'}.
              </p>
            </div>
          )}

          <PredictionResult results={results} isAnalyzing={isAnalyzing} />

          {/* Supported classes info */}
          {!results && !isAnalyzing && (
            <div className="card mt-4" style={{ marginTop: 'var(--sp-4)' }}>
              <h4 style={{ marginBottom: 'var(--sp-3)', fontSize: '0.9rem' }}>🌿 Supported Plants &amp; Diseases</h4>
              <div style={{ marginBottom: 'var(--sp-3)', display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                {['Pepper 🫑', 'Potato 🥔', 'Tomato 🍅'].map((p) => (
                  <span key={p} className="badge badge-primary" style={{ fontSize: '0.78rem', padding: '4px 12px' }}>{p}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  'Bacterial Spot', 'Early Blight', 'Late Blight', 'Leaf Mold',
                  'Septoria Leaf Spot', 'Spider Mites', 'Target Spot',
                  'Yellow Leaf Curl Virus', 'Mosaic Virus', 'Healthy',
                ].map((d) => (
                  <span key={d} className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>{d}</span>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Mobile single column fallback handled by CSS media queries */}
      <style>{`
        @media (max-width: 768px) {
          .detection-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
