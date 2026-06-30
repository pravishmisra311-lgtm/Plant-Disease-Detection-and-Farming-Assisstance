import { useState, useMemo } from 'react';
import { FARMING_TIPS, CROPS, SEASONS, SOIL_TYPES } from '../data/farmingTips';
import CropSelector from '../components/Farming/CropSelector';
import TipCard from '../components/Farming/TipCard';

export default function FarmingPage() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [seasonFilter, setSeasonFilter] = useState('all');

  // Filtered crops based on search + season
  const displayCrops = useMemo(() => {
    let crops = selectedCrop ? [selectedCrop] : CROPS;

    if (searchQuery) {
      crops = crops.filter((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (seasonFilter !== 'all') {
      crops = crops.filter((c) => {
        const data = FARMING_TIPS[c];
        return data?.season?.[seasonFilter];
      });
    }

    return crops.filter((c) => FARMING_TIPS[c]); // only crops with data
  }, [selectedCrop, searchQuery, seasonFilter]);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero anim-fade-in-down">
        <div className="page-hero-content">
          <div style={{ marginBottom: 'var(--sp-3)' }}>
            <span className="badge badge-primary">18 Crops · Expert Knowledge Base</span>
          </div>
          <h1>🌾 Farming Assistant</h1>
          <p>
            Complete crop management guides — sowing schedules, fertilizer programs, irrigation,
            pest management, and expert tips for every major Indian crop.
          </p>
        </div>
      </div>

      {/* Season Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
        {Object.entries(SEASONS).map(([key, s]) => (
          <div
            key={key}
            className="card"
            style={{
              borderLeft: `3px solid ${s.color}`,
              cursor: 'pointer',
              background: seasonFilter === key ? `${s.color}12` : undefined,
              transition: 'all var(--t-base)',
            }}
            onClick={() => setSeasonFilter(seasonFilter === key ? 'all' : key)}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: s.color, marginBottom: 4 }}>
              {s.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.months}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card anim-fade-in" style={{ marginBottom: 'var(--sp-6)', display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <CropSelector value={selectedCrop} onChange={setSelectedCrop} />

        <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
          <label className="form-label" htmlFor="crop-search">🔍 Search Crops</label>
          <input
            id="crop-search"
            type="text"
            className="form-input"
            placeholder="e.g. Tomato, Rice, Wheat…"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSelectedCrop(''); }}
          />
        </div>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => { setSelectedCrop(''); setSearchQuery(''); setSeasonFilter('all'); }}
          style={{ marginBottom: 2 }}
          id="reset-filter-btn"
        >
          ✕ Reset
        </button>
      </div>

      {/* Soil types reference */}
      <div style={{ marginBottom: 'var(--sp-6)' }}>
        <h3 className="section-title">🌍 Soil Type Reference</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-3)' }}>
          {Object.entries(SOIL_TYPES).map(([name, info]) => (
            <div key={name} className="card" style={{ padding: 'var(--sp-4)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-primary-light)', marginBottom: 'var(--sp-2)' }}>
                {name}
              </div>
              <p style={{ fontSize: '0.78rem', marginBottom: 'var(--sp-2)', lineHeight: 1.5 }}>{info.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {info.crops.map((c) => (
                  <span
                    key={c}
                    className="badge badge-primary"
                    style={{ cursor: 'pointer', fontSize: '0.65rem' }}
                    onClick={() => setSelectedCrop(c)}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--sp-4)' }}>
        <h3 className="section-title" style={{ margin: 0 }}>
          🌱 Crop Guides
          <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 8 }}>
            ({displayCrops.length} crops)
          </span>
        </h3>
      </div>

      {/* Crop Cards Grid */}
      {displayCrops.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-12)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-3)' }}>🔍</div>
          <h3>No crops found</h3>
          <p>Try a different search term or remove filters.</p>
          <button className="btn btn-outline mt-4" onClick={() => { setSelectedCrop(''); setSearchQuery(''); setSeasonFilter('all'); }} style={{ marginTop: 'var(--sp-4)' }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--sp-5)' }}>
          {displayCrops.map((crop) => (
            <TipCard key={crop} crop={crop} data={FARMING_TIPS[crop]} />
          ))}
        </div>
      )}
    </div>
  );
}
