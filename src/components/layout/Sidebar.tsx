import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ALL_BLOCKS } from '../../data/content';
import type { Block } from '../../types/content';
import { useProgress } from '../../hooks/useProgress';
import { groupBlocksByPhase } from '../../utils/content';
import { freqClass } from '../../utils/classes';

const filters: Array<'all' | 'high' | 'med' | 'low'> = ['all', 'high', 'med', 'low'];

export function Sidebar() {
  const location = useLocation();
  const { done } = useProgress();
  const [query, setQuery] = useState('');
  const [activeFreq, setActiveFreq] = useState<'all' | 'high' | 'med' | 'low'>('all');

  const phases = useMemo(() => groupBlocksByPhase(ALL_BLOCKS), []);
  const normalizedQuery = query.trim().toLowerCase();

  const visibleCount = ALL_BLOCKS.filter((block) => {
    const matchesSearch = !normalizedQuery || block.title.toLowerCase().includes(normalizedQuery);
    const matchesFreq = activeFreq === 'all' || block.freq === activeFreq;
    return matchesSearch && matchesFreq;
  }).length;

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-header">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search blocks..."
          className="app-search"
        />
      </div>
      <div className="filter-bar">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFreq(filter)}
            className={`filter-btn ${
              activeFreq === filter
                ? filter === 'all'
                  ? 'filter-btn-active-all'
                  : filter === 'high'
                    ? 'filter-btn-active-high'
                    : filter === 'med'
                      ? 'filter-btn-active-med'
                      : 'filter-btn-active-low'
                : ''
            }`}
          >
            {filter === 'all' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ display: 'inline-flex', gap: '2px' }}>
                  <span className="filter-dot filter-dot-red" />
                  <span className="filter-dot filter-dot-amber" />
                  <span className="filter-dot filter-dot-gray" />
                </span>
                All
              </span>
            ) : filter === 'high' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                <span className="filter-dot filter-dot-red" />
                High
              </span>
            ) : filter === 'med' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                <span className="filter-dot filter-dot-amber" />
                Med
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                <span className="filter-dot filter-dot-gray" />
                Low
              </span>
            )}
          </button>
        ))}
      </div>
      {(normalizedQuery || activeFreq !== 'all') && (
        <div className="filter-count">
          {visibleCount} block{visibleCount === 1 ? '' : 's'} shown
        </div>
      )}
      <nav className="nav">
        {Object.entries(phases).map(([phase, blocks]) => (
          <PhaseGroup key={phase} phase={phase} blocks={blocks} done={done} activePath={location.pathname} />
        ))}
      </nav>
    </aside>
  );
}

function PhaseGroup({ phase, blocks, done, activePath }: { phase: string; blocks: Block[]; done: Set<number>; activePath: string }) {
  return (
    <section className="phase-group">
      <div className="phase-label">{phase}</div>
      {blocks.map((block) => {
        const isDone = done.has(block.id);
        const isActive = activePath === `/block/${block.id}`;
        return (
          <Link
            key={block.id}
            to={`/block/${block.id}`}
            className={`nav-link ${isActive ? 'nav-link-active' : ''} ${isDone ? 'nav-link-done' : ''}`}
          >
            <span className="nav-link-id">{String(block.id).padStart(2, '0')}</span>
            <span className="nav-link-title">{block.title.split(' — ')[0]}</span>
            <span className={`nav-link-freq ${freqClass(block.freq)}`}>{block.freq.toUpperCase()}</span>
            <span className={`nav-link-dot ${isDone ? 'nav-link-dot-done' : isActive ? 'nav-link-dot-active' : 'nav-link-dot-idle'}`} />
          </Link>
        );
      })}
    </section>
  );
}
