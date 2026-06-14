import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  completed: number;
  total: number;
  percent: number;
}

export function Header({ completed, total, percent }: HeaderProps) {
  return (
    <header className="app-header">
      <Link to="/" className="app-header-brand">
        senior<em className="app-header-brand-muted">.</em>prep <em className="app-header-brand-muted">// v4.0</em>
      </Link>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="app-header-text">
        <strong>{completed}</strong> / {total} blocks complete
      </div>
      <ThemeToggle />
    </header>
  );
}
