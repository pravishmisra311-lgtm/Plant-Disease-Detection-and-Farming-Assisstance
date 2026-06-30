const PAGE_TITLES = {
  '/':        'Welcome — AgroVision AI',
  '/detect':  '🔬 Disease Detection',
  '/farming': '🌾 Farming Assistant',
  '/schemes': '📋 Government Schemes',
};

export default function Header({ isDark, onToggleTheme, onMenuToggle, currentPage }) {
  const title = PAGE_TITLES[currentPage] || 'AgroVision AI';

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button
          className="hamburger"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          id="hamburger-btn"
        >
          <span />
          <span />
          <span />
        </button>
        <span className="header-title">{title}</span>
      </div>

      <div className="header-actions">

        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          id="theme-toggle-btn"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
