import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  completed: number;
  total: number;
  percent: number;
}

export function Header({ completed, total, percent }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-13 items-center gap-4 border-b border-border bg-bg2 px-6 dark:border-slate-800 dark:bg-slate-950">
      <Link to="/" className="font-mono text-xs font-semibold tracking-[0.04em] text-blue-500 dark:text-blue-300">
        senior<em className="not-italic text-text3">.</em>prep <em className="not-italic text-text3">// v4.0</em>
      </Link>
      <div className="max-w-96 flex-1">
        <div className="h-0.5 overflow-hidden rounded bg-border">
          <div className="h-full rounded bg-gradient-to-r from-blue-500 to-emerald-400 transition-[width] duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="font-mono text-[11px] text-text3">
        <strong className="text-blue-500 dark:text-blue-300">{completed}</strong> / {total} blocks complete
      </div>
      <ThemeToggle />
    </header>
  );
}
