import { NavLink, Link } from '../../router';
import { APP_NAME } from '../../config';

const NAV_ITEMS = [
  { to: '/',          icon: '🏠', label: 'Home',               end: true  },
  { to: '/detect',   icon: '🔬', label: 'Disease Detection',  badge: 'AI' },
  { to: '/farming',  icon: '🌾', label: 'Farming Assistant'             },
  { to: '/schemes',  icon: '📋', label: 'Govt. Schemes'                },
];

export default function Sidebar({ isOpen, onClose, currentPage }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="sidebar-logo" onClick={onClose}>
          <div className="sidebar-logo-icon">🌿</div>
          <div>
            <div className="sidebar-logo-text">{APP_NAME}</div>
            <div className="sidebar-logo-sub">Plant Intelligence</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </NavLink>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: '1.5rem' }}>Resources</div>
          <a
            href="https://www.icar.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
          >
            <span className="nav-icon">🔗</span>
            <span className="nav-label">ICAR Portal</span>
          </a>

        </nav>

        <div className="sidebar-footer">
          © 2026 {APP_NAME}. All Rights Reserved.
        </div>
      </aside>
    </>
  );
}
