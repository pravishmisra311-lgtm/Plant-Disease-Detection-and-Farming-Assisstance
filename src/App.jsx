import { useState } from 'react';
import { useRouter } from './router';
import { useDarkMode } from './hooks/useDarkMode';
import Sidebar from './components/Layout/Sidebar';
import Header  from './components/Layout/Header';
import HomePage      from './pages/HomePage';
import DetectionPage from './pages/DetectionPage';
import FarmingPage   from './pages/FarmingPage';
import SchemesPage   from './pages/SchemesPage';

export default function App() {
  const { isDark, toggle } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { page } = useRouter();

  // Render the correct page based on the current hash route
  function renderPage() {
    switch (page) {
      case '/':        return <HomePage />;
      case '/detect':  return <DetectionPage />;
      case '/farming': return <FarmingPage />;
      case '/schemes': return <SchemesPage />;
      default:
        return (
          <div className="page-wrapper" style={{ textAlign: 'center', paddingTop: '5rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
            <h1>Page Not Found</h1>
            <p style={{ marginBottom: '2rem' }}>This page doesn't exist in AgroVision AI.</p>
            <a href="#/" className="btn btn-primary">Go Home</a>
          </div>
        );
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={page}
      />

      <div className="main-content">
        <Header
          isDark={isDark}
          onToggleTheme={toggle}
          onMenuToggle={() => setSidebarOpen((p) => !p)}
          currentPage={page}
        />

        <main>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
