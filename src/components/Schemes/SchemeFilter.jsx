import { SCHEME_CATEGORIES } from '../../data/governmentSchemes';

export default function SchemeFilter({ activeCategory, search, onCategoryChange, onSearchChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 480 }}>
        <span style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-muted)', fontSize: '1rem', pointerEvents: 'none',
        }}>
          🔍
        </span>
        <input
          type="text"
          className="form-input"
          placeholder="Search schemes by name or keyword…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ paddingLeft: 42, width: '100%' }}
          id="scheme-search"
        />
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
        {SCHEME_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
            id={`filter-${cat.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()}`}
            style={{ borderRadius: 'var(--r-full)' }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
