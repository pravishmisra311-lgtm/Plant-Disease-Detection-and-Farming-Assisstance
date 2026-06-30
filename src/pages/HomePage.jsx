import { Link } from '../router';
import { APP_NAME } from '../config';

const FEATURES = [
  {
    icon: '🔬',
    title: 'AI Disease Detection',
    desc: 'Upload a leaf photo and get instant AI-powered disease identification with treatment recommendations.',
    to: '/detect',
    color: '#2d6a4f',
  },
  {
    icon: '🌾',
    title: 'Farming Assistant',
    desc: 'Access detailed crop management guides — sowing schedules, fertilizers, irrigation, pest control, and more.',
    to: '/farming',
    color: '#0096c7',
    badge: '18 Crops',
  },
  {
    icon: '📋',
    title: 'Government Schemes',
    desc: 'Discover PM-KISAN, PMFBY, KCC, eNAM, and 8+ more central schemes with eligibility and apply links.',
    to: '/schemes',
    color: '#7b2d8b',
    badge: '12+ Schemes',
  },
];

const STATS = [
  { value: '15+',  label: 'Disease Classes',     icon: '🦠' },
  { value: '18',   label: 'Crop Guides',          icon: '🌱' },
  { value: '12+',  label: 'Govt. Schemes',        icon: '📋' },
];

export default function HomePage() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero anim-fade-in-down" style={{ textAlign: 'center' }}>
        <div className="page-hero-content">
          <div style={{ fontSize: '3.5rem', marginBottom: 'var(--sp-4)' }} className="anim-float">🌿</div>
          <h1 style={{ marginBottom: 'var(--sp-3)', fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            {APP_NAME}
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: 'var(--sp-6)', maxWidth: 520, margin: '0 auto var(--sp-6)' }}>
            AI-powered plant disease detection and comprehensive farming intelligence for smarter crop health monitoring and decision making.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/detect" className="btn btn-accent btn-lg" id="hero-detect-btn">
              🔬 Detect Disease
            </Link>
            <Link to="/farming" className="btn btn-outline btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} id="hero-farming-btn">
              🌾 Farming Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}>
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`card anim-fade-in-up delay-${(i + 1) * 100}`}
            style={{ textAlign: 'center', padding: 'var(--sp-5)' }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: 'var(--sp-2)' }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--c-primary-light)' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <h2 className="section-title anim-fade-in delay-300">What Can You Do?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-5)', marginBottom: 'var(--sp-8)' }}>
        {FEATURES.map((f, i) => (
          <Link
            key={f.to}
            to={f.to}
            className={`card card-grid-item`}
            style={{ textDecoration: 'none', borderTop: `3px solid ${f.color}`, display: 'block' }}
            id={`home-feature-${f.to.replace('/', '')}-card`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-4)' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 'var(--r-lg)',
                background: `${f.color}18`, border: `2px solid ${f.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem',
              }}>
                {f.icon}
              </div>
              {f.badge && (
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700, padding: '3px 9px',
                  borderRadius: 'var(--r-full)', background: `${f.color}18`,
                  color: f.color, border: `1px solid ${f.color}33`,
                }}>
                  {f.badge}
                </span>
              )}
            </div>
            <h3 style={{ marginBottom: 'var(--sp-2)', color: f.color }}>{f.title}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{f.desc}</p>
            <div style={{ marginTop: 'var(--sp-4)', display: 'flex', alignItems: 'center', gap: 4, color: f.color, fontWeight: 600, fontSize: '0.85rem' }}>
              Explore →
            </div>
          </Link>
        ))}
      </div>

      {/* How it works */}
      <h2 className="section-title anim-fade-in delay-400">How Disease Detection Works</h2>
      <div className="card anim-fade-in-up delay-500" style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-6)' }}>
          {[
            { step: '01', icon: '📸', title: 'Upload Leaf Image', desc: 'Upload a clear image of the affected plant leaf.' },
            { step: '02', icon: '⚙️', title: 'Analyze Image',     desc: 'The system analyzes the uploaded image.' },
            { step: '03', icon: '🧠', title: 'Detect Disease',    desc: 'AI identifies the disease and crop condition.' },
            { step: '04', icon: '📊', title: 'View Results',      desc: 'View disease details and recommendations.' },
          ].map((s) => (
            <div key={s.step} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--c-primary-light)', letterSpacing: '0.12em', marginBottom: 'var(--sp-2)' }}>
                STEP {s.step}
              </div>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--sp-2)' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--sp-1)' }}>
                {s.title}
              </div>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
