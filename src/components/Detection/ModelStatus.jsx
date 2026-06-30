import { MODEL_URL } from '../../config';

/**
 * ModelStatus — shows the current state of the TF.js model
 */
export default function ModelStatus({ status, error }) {
  const configs = {
    idle: {
      color: 'var(--c-warning)',
      icon: '⚠️',
      title: 'Model Not Configured',
      message: (
        <>
          No TensorFlow.js model URL is set. To enable real predictions,
          add your model URL to{' '}
          <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, fontSize: '0.85em' }}>
            src/config.js
          </code>{' '}
          → <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, fontSize: '0.85em' }}>MODEL_URL</code>.
        </>
      ),
    },
    loading: {
      color: 'var(--c-info)',
      icon: '⏳',
      title: 'Loading Model…',
      message: 'Fetching and initializing the TensorFlow.js model. This may take a moment.',
    },
    ready: {
      color: 'var(--c-success)',
      icon: '✅',
      title: 'Model Ready',
      message: 'The AI model is loaded and ready to analyze plant images.',
    },
    error: {
      color: 'var(--c-danger)',
      icon: '❌',
      title: 'Model Load Failed',
      message: error || 'An unexpected error occurred while loading the model.',
    },
  };

  const cfg = configs[status] || configs.idle;

  return (
    <div
      className="card anim-fade-in"
      style={{
        border: `1.5px solid ${cfg.color}`,
        background: `color-mix(in srgb, ${cfg.color} 8%, var(--bg-surface))`,
        marginBottom: 'var(--sp-6)',
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.5rem', lineHeight: 1, marginTop: 2 }}>{cfg.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1rem',
            color: cfg.color,
            marginBottom: 'var(--sp-1)',
          }}>
            {cfg.title}
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
            {cfg.message}
          </p>

          {status === 'idle' && (
            <div
              style={{
                marginTop: 'var(--sp-4)',
                padding: 'var(--sp-3) var(--sp-4)',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 'var(--sp-2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Quick Setup Guide
              </div>
              <ol style={{ listStyle: 'decimal', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 2 }}>
                <li>Train a plant disease model (PlantVillage dataset recommended)</li>
                <li>Export via Python: <code style={{ background: 'var(--bg-surface-2)', padding: '1px 5px', borderRadius: 3 }}>model.save('path/to/model')</code></li>
                <li>Convert to TF.js: <code style={{ background: 'var(--bg-surface-2)', padding: '1px 5px', borderRadius: 3 }}>tensorflowjs_converter</code></li>
                <li>Host <code style={{ background: 'var(--bg-surface-2)', padding: '1px 5px', borderRadius: 3 }}>model.json</code> + <code style={{ background: 'var(--bg-surface-2)', padding: '1px 5px', borderRadius: 3 }}>.bin</code> files publicly</li>
                <li>Set <code style={{ background: 'var(--bg-surface-2)', padding: '1px 5px', borderRadius: 3 }}>MODEL_URL</code> in <code style={{ background: 'var(--bg-surface-2)', padding: '1px 5px', borderRadius: 3 }}>src/config.js</code></li>
              </ol>
            </div>
          )}

          {status === 'loading' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginTop: 'var(--sp-3)' }}>
              <div className="spinner spinner-sm" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Loading from: <code style={{ wordBreak: 'break-all' }}>{MODEL_URL}</code>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
