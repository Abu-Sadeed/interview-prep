import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useProgress } from './hooks/useProgress';
import { ALL_BLOCKS } from './data/content';

export function Layout() {
  const { progress } = useProgress();

  return (
    <div className="min-h-screen bg-bg text-text dark:bg-slate-950 dark:text-slate-100">
      <Header completed={progress.count} total={ALL_BLOCKS.length} percent={progress.percent} />
      <div className="grid grid-cols-[272px_minmax(0,1fr)]">
        <Sidebar />
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
