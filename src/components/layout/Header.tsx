import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  completed: number;
  total: number;
  percent: number;
  onToggle: () => void;
  collapsed: boolean;
  mobileOpen: boolean;
}

export function Header({
  completed,
  total,
  percent,
  onToggle,
  collapsed,
  mobileOpen,
}: HeaderProps) {
  return (
    <header className="app-header">
      <button
        type="button"
        className="app-btn sidebar-toggle"
        onClick={onToggle}
        aria-label={mobileOpen ? 'Close menu' : collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed && !mobileOpen}
      >
        <span className="sidebar-toggle-icon">{mobileOpen ? '✕' : collapsed ? '☰' : '▶'}</span>
      </button>
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