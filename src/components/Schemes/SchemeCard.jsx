import { useState } from 'react';

const CATEGORY_COLORS = {
  'Income Support':       '#ff6b35',
  'Insurance':            '#4361ee',
  'Credit':               '#06d6a0',
  'Market':               '#f77f00',
  'Organic/Sustainability': '#2d6a4f',
  'Technology':           '#7b2d8b',
};

export default function SchemeCard({ scheme }) {
  const [expanded, setExpanded] = useState(false);
  const color = CATEGORY_COLORS[scheme.category] || 'var(--c-primary-light)';

  return (
    <div
      className="card card-grid-item"
      style={{ borderTop: `3px solid ${color}`, transition: 'all var(--t-base)' }}
    >
      {/* Card Header */}
      <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start', marginBottom: 'var(--sp-3)' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 'var(--r-md)',
          background: `${color}18`, border: `1.5px solid ${color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', flexShrink: 0,
        }}>
          {scheme.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color }}>
              {scheme.name}
            </span>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px',
              borderRadius: 'var(--r-full)', background: `${color}18`, color,
              border: `1px solid ${color}44`,
            }}>
              {scheme.category}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.4 }}>
            {scheme.fullName}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 3 }}>
            Est. {scheme.launchYear} · {scheme.ministry}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 'var(--sp-3)' }}>
        {scheme.description}
      </p>

      {/* Expand toggle */}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setExpanded((p) => !p)}
        style={{ width: '100%', justifyContent: 'space-between' }}
        id={`scheme-${scheme.id}-expand-btn`}
        aria-expanded={expanded}
      >
        <span>{expanded ? 'Hide Details' : 'View Details'}</span>
        <span style={{ transition: 'transform var(--t-fast)', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="anim-fade-in-up" style={{ marginTop: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {/* Benefits */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color, marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              🎁 Key Benefits
            </div>
            <ul style={{ paddingLeft: 'var(--sp-4)' }}>
              {scheme.benefits.map((b, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', listStyle: 'disc', marginBottom: 'var(--sp-1)', lineHeight: 1.55 }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--c-info)', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ✅ Eligibility
            </div>
            <ul style={{ paddingLeft: 'var(--sp-4)' }}>
              {scheme.eligibility.map((e, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', listStyle: 'disc', marginBottom: 'var(--sp-1)', lineHeight: 1.55 }}>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--c-warning)', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              📄 Documents Required
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {scheme.documents.map((doc, i) => (
                <span key={i} className="badge badge-neutral">{doc}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', flexWrap: 'wrap', paddingTop: 'var(--sp-2)', borderTop: '1px solid var(--border-light)' }}>
            <a
              href={scheme.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              id={`scheme-${scheme.id}-apply-btn`}
            >
              🔗 {scheme.applyLabel}
            </a>
            {scheme.helpline && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                📞 {scheme.helpline}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
