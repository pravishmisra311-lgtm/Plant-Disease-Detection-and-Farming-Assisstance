import { useState } from 'react';
import { SEASONS } from '../../data/farmingTips';

function SeasonTag({ label, color }) {
  return (
    <span style={{
      fontSize: '0.7rem', fontWeight: 600, padding: '2px 9px',
      borderRadius: 'var(--r-full)',
      background: `${color}22`,
      color,
      border: `1px solid ${color}55`,
    }}>
      {label}
    </span>
  );
}

export default function TipCard({ crop, data }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview',  label: '📋 Overview'  },
    { id: 'pests',     label: '🐛 Pest Mgmt' },
    { id: 'schedule',  label: '📅 Schedule'  },
  ];

  return (
    <div className="card card-grid-item anim-scale-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--sp-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{data.icon}</span>
          <div>
            <h3 style={{ margin: 0 }}>{crop}</h3>
            <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 6, flexWrap: 'wrap' }}>
              {data.season.kharif && <SeasonTag label="Kharif" color={SEASONS.kharif.color} />}
              {data.season.rabi   && <SeasonTag label="Rabi"   color={SEASONS.rabi.color}   />}
              {data.season.zaid   && <SeasonTag label="Zaid"   color={SEASONS.zaid.color}   />}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 'var(--sp-4)', overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: 'var(--sp-2) var(--sp-4)',
              fontSize: '0.82rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--c-primary-light)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--c-primary-light)' : '2px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--t-fast)',
            }}
            id={`${crop.replace(/\s+/g, '-').toLowerCase()}-tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          <InfoRow label="🗓️ Sowing"        value={data.sowingMonths} />
          <InfoRow label="🌾 Harvest"        value={data.harvestMonths} />
          <InfoRow label="🌍 Soil Type"      value={data.soilType} />
          <InfoRow label="💧 Water Needs"    value={data.waterRequirement} />
          <InfoRow label="📐 Spacing"        value={data.spacing} />
          <InfoRow label="🚿 Irrigation"     value={data.irrigation} />
          <InfoRow label="🧪 Fertilizer"     value={`Basal: ${data.fertilizer.basal}`} />
          <InfoRow label="📈 Top Dress"      value={data.fertilizer.topDress} />
          {data.cropRotation?.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', minWidth: 110, paddingTop: 2 }}>🔄 Rotation</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {data.cropRotation.map((c) => (
                  <span key={c} className="badge badge-neutral">{c}</span>
                ))}
              </div>
            </div>
          )}
          {data.tips?.length > 0 && (
            <div style={{ marginTop: 'var(--sp-2)', padding: 'var(--sp-3)', background: 'var(--bg-surface-2)', borderRadius: 'var(--r-md)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--c-accent-warm)', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                💡 Pro Tips
              </div>
              <ul style={{ paddingLeft: 'var(--sp-4)' }}>
                {data.tips.map((tip, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', listStyle: 'disc', marginBottom: 'var(--sp-2)', lineHeight: 1.5 }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Pest Management Tab */}
      {activeTab === 'pests' && (
        <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {data.pestManagement.map((pm, i) => (
            <div key={i} style={{ padding: 'var(--sp-3)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg-surface-2)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-danger)', marginBottom: 6 }}>
                🐛 {pm.pest}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Control: </strong>{pm.control}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="anim-fade-in">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {[
              { phase: 'Land Preparation', time: '2-3 weeks before sowing', icon: '🚜', color: '#8B4513' },
              { phase: 'Sowing / Planting', time: data.sowingMonths, icon: '🌱', color: 'var(--c-primary-light)' },
              { phase: 'First Irrigation',  time: '5-7 DAS', icon: '💧', color: '#0096c7' },
              { phase: 'Fertilizer (Basal)', time: 'At sowing', icon: '🧪', color: '#7b2d8b' },
              { phase: 'Fertilizer (Top Dress)', time: data.fertilizer.topDress, icon: '📈', color: '#f77f00' },
              { phase: 'Harvest', time: data.harvestMonths, icon: '🌾', color: 'var(--c-accent-warm)' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--r-full)',
                    background: `${step.color}22`, border: `2px solid ${step.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0,
                  }}>
                    {step.icon}
                  </div>
                  {i < 5 && <div style={{ width: 2, height: 24, background: 'var(--border)', margin: '4px 0' }} />}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 2 }}>{step.phase}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', minWidth: 110, paddingTop: 2, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}
