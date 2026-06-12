import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { useProgress } from './hooks/useProgress';
import { ALL_BLOCKS } from './data/content';

export function Layout() {
  const { progress } = useProgress();

  return (
    <div className="app-layout">
      <Header completed={progress.count} total={ALL_BLOCKS.length} percent={progress.percent} />
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
