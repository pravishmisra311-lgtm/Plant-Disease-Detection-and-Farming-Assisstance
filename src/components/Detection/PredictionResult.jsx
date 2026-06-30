import { DISEASE_LABELS, DISEASE_TREATMENTS } from '../../data/diseaseLabels';
import { TOP_K } from '../../config';

function SeverityBadge({ severity }) {
  const map = {
    None:     'badge-success',
    Low:      'badge-primary',
    Moderate: 'badge-warning',
    Severe:   'badge-danger',
    Critical: 'badge-danger',
  };
  return <span className={`badge ${map[severity] || 'badge-neutral'}`}>{severity} Risk</span>;
}

function ConfidenceBar({ confidence, color }) {
  const pct = (confidence * 100).toFixed(1);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.78rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>Confidence</span>
        <strong style={{ color }}>{pct}%</strong>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill confidence-bar-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function PredictionResult({ results, isAnalyzing }) {
  if (isAnalyzing) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-10)' }}>
        <div className="spinner spinner-lg" style={{ margin: '0 auto var(--sp-4)' }} />
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.1rem', marginBottom: 'var(--sp-2)' }}>
          Analyzing Image…
        </div>
        <p style={{ fontSize: '0.85rem' }}>Running inference on your plant image</p>
      </div>
    );
  }

  if (!results || results.length === 0) return null;

  // Get top-K valid results (filter to valid label indices)
  const topResults = results
    .filter(r => r.classIndex >= 0 && r.classIndex < DISEASE_LABELS.length)
    .slice(0, TOP_K);

  if (topResults.length === 0) return null;

  const top      = topResults[0];
  const topLabel = DISEASE_LABELS[top.classIndex];
  const treatment = DISEASE_TREATMENTS[topLabel?.disease] || DISEASE_TREATMENTS['Healthy'];

  const topConfidence = top.confidence * 100;
  const topColor = topLabel?.isHealthy ? 'var(--c-success)'
    : topConfidence > 80 ? 'var(--c-danger)'
    : topConfidence > 50 ? 'var(--c-warning)'
    : 'var(--c-info)';

  return (
    <div className="anim-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      {/* Primary Prediction */}
      <div className="card" style={{ borderLeft: `4px solid ${topColor}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              Top Prediction
            </div>
            <h3 style={{ color: topColor, margin: 0 }}>{topLabel?.label || 'Unknown'}</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
              Plant: <strong style={{ color: 'var(--text-primary)' }}>{topLabel?.plant}</strong>
              &nbsp;·&nbsp;
              Disease: <strong style={{ color: 'var(--text-primary)' }}>{topLabel?.disease}</strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
            {topLabel?.isHealthy
              ? <span className="badge badge-success">✅ Healthy</span>
              : <span className="badge badge-danger">⚠️ Diseased</span>}
            <SeverityBadge severity={treatment?.severity || 'Unknown'} />
          </div>
        </div>

        <ConfidenceBar confidence={top.confidence} color={topColor} />
      </div>

      {/* Treatment Info */}
      {treatment && !topLabel?.isHealthy && (
        <div className="card anim-fade-in-up delay-200">
          <h4 style={{ marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            🩺 Disease Information
          </h4>
          <p style={{ marginBottom: 'var(--sp-4)', fontSize: '0.9rem' }}>{treatment.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-4)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-danger)', marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                💊 Treatment Steps
              </div>
              <ul style={{ paddingLeft: 'var(--sp-4)' }}>
                {treatment.treatment.map((step, i) => (
                  <li key={i} style={{
                    fontSize: '0.83rem',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--sp-2)',
                    listStyle: 'disc',
                    lineHeight: 1.5,
                  }}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-success)', marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                🛡️ Prevention
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {treatment.prevention}
              </p>
            </div>
          </div>
        </div>
      )}

      {topLabel?.isHealthy && (
        <div className="card anim-fade-in-up delay-200" style={{ borderColor: 'var(--c-success)', background: 'rgba(6,214,160,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span style={{ fontSize: '2rem' }}>🌱</span>
            <div>
              <h4 style={{ color: 'var(--c-success)', marginBottom: 4 }}>Plant looks healthy!</h4>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>{treatment.prevention}</p>
            </div>
          </div>
        </div>
      )}

      {/* All predictions */}
      {topResults.length > 1 && (
        <div className="card anim-fade-in-up delay-300">
          <h4 style={{ marginBottom: 'var(--sp-4)' }}>📊 All Predictions (Top {topResults.length})</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {topResults.map((res, i) => {
              const lbl   = DISEASE_LABELS[res.classIndex];
              const pct   = (res.confidence * 100).toFixed(2);
              const color = i === 0 ? topColor
                : lbl?.isHealthy ? 'var(--c-success)'
                : 'var(--text-muted)';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                  <span style={{ width: 22, height: 22, borderRadius: 'var(--r-full)', background: color, color: '#fff', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {lbl?.label || `Class ${res.classIndex}`}
                      </span>
                      <strong style={{ fontSize: '0.82rem', color }}>{pct}%</strong>
                    </div>
                    <div className="progress-bar" style={{ height: 5 }}>
                      <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
