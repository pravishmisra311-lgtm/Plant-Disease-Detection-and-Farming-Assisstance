import { useState, useMemo } from 'react';
import { GOVERNMENT_SCHEMES, SCHEME_CATEGORIES } from '../data/governmentSchemes';
import SchemeFilter from '../components/Schemes/SchemeFilter';
import SchemeCard from '../components/Schemes/SchemeCard';

const CATEGORY_STATS = SCHEME_CATEGORIES.slice(1).map((cat) => ({
  cat,
  count: GOVERNMENT_SCHEMES.filter((s) => s.category === cat).length,
}));

export default function SchemesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return GOVERNMENT_SCHEMES.filter((s) => {
      const matchCat    = activeCategory === 'All' || s.category === activeCategory;
      const matchSearch = !search || [s.name, s.fullName, s.description, s.category]
        .some((field) => field.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero anim-fade-in-down">
        <div className="page-hero-content">
          <div style={{ marginBottom: 'var(--sp-3)' }}>
            <span className="badge badge-primary">Central Government · India</span>
          </div>
          <h1>📋 Government Schemes</h1>
          <p>
            Discover agricultural welfare programs — income support, crop insurance, credit, market linkage,
            and technology adoption schemes designed for Indian farmers.
          </p>
        </div>
      </div>

      {/* Category stats */}
      <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginBottom: 'var(--sp-6)' }}>
        <div className="card anim-fade-in" style={{ padding: 'var(--sp-4) var(--sp-5)', display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--c-primary-light)' }}>
              {GOVERNMENT_SCHEMES.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Schemes</div>
          </div>
        </div>
        {CATEGORY_STATS.filter((s) => s.count > 0).map((s) => (
          <div
            key={s.cat}
            className="card anim-fade-in"
            style={{ padding: 'var(--sp-3) var(--sp-4)', cursor: 'pointer', transition: 'all var(--t-base)' }}
            onClick={() => setActiveCategory(s.cat === activeCategory ? 'All' : s.cat)}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--c-accent)' }}>
              {s.count}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.cat}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <SchemeFilter
        activeCategory={activeCategory}
        search={search}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearch}
      />

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-12)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-3)' }}>🔍</div>
          <h3>No schemes found</h3>
          <p>Try different keywords or select "All" in the category filter.</p>
          <button
            className="btn btn-outline mt-4"
            onClick={() => { setActiveCategory('All'); setSearch(''); }}
            style={{ marginTop: 'var(--sp-4)' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-4)' }}>
            Showing {filtered.length} of {GOVERNMENT_SCHEMES.length} schemes
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--sp-5)' }}>
            {filtered.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </>
      )}

      {/* Disclaimer */}
      <div className="card mt-8" style={{ marginTop: 'var(--sp-8)', background: 'rgba(67,97,238,0.05)', borderColor: 'var(--c-info)', padding: 'var(--sp-4) var(--sp-5)' }}>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
          <p style={{ fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>
            <strong>Disclaimer:</strong> Scheme details, eligibility criteria, and benefit amounts are subject to change.
            Always verify the latest information on the official government portals before applying.
            Information is provided for awareness and educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
