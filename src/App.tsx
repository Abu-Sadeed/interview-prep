import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { useProgress } from './hooks/useProgress';
import { ALL_BLOCKS } from './data/content';

export function Layout() {
  const { progress } = useProgress();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const handleOverlayClick = () => {
    setMobileOpen(false);
  };

  return (
    <div className="app-layout">
      <Header
        completed={progress.count}
        total={ALL_BLOCKS.length}
        percent={progress.percent}
        onToggle={handleToggle}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
      />
      <div className="app">
        <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onOverlayClick={handleOverlayClick} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}