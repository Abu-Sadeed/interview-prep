import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ALL_BLOCKS } from '../../data/content';
import type { Block } from '../../types/content';
import { useProgress } from '../../hooks/useProgress';
import { groupBlocksByPhase } from '../../utils/content';
import { PhaseGroup } from './PhaseGroup';

const filters: Array<'all' | 'high' | 'med' | 'low'> = ['all', 'high', 'med', 'low'];

const activeFilterClasses: Record<string, string> = {
  all: 'filter-btn-active-all',
  high: 'filter-btn-active-high',
  med: 'filter-btn-active-med',
  low: 'filter-btn-active-low',
};

export function Sidebar() {
  const location = useLocation();
  const { done } = useProgress();
  const [query, setQuery] = useState('');
  const [activeFreq, setActiveFreq] = useState<'all' | 'high' | 'med' | 'low'>('all');

  const phases = useMemo(() => groupBlocksByPhase(ALL_BLOCKS), []);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredPhases = useMemo(() => {
    const result: Record<string, Block[]> = {};
    Object.entries(phases).forEach(([phase, blocks]) => {
      const filtered = blocks.filter((block) => {
        const matchesSearch =
          !normalizedQuery ||
          block.title.toLowerCase().includes(normalizedQuery) ||
          (typeof block.subtitle === 'string' && block.subtitle.toLowerCase().includes(normalizedQuery));
        const matchesFreq = activeFreq === 'all' || block.freq === activeFreq;
        return matchesSearch && matchesFreq;
      });
      if (filtered.length > 0) {
        result[phase] = filtered;
      }
    });
    return result;
  }, [phases, normalizedQuery, activeFreq]);

  const visibleCount = useMemo(
    () => Object.values(filteredPhases).reduce((sum, blocks) => sum + blocks.length, 0),
    [filteredPhases],
  );

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
            className={`filter-btn ${activeFreq === filter ? activeFilterClasses[filter] : ''}`}
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
        {Object.entries(filteredPhases).map(([phase, blocks]) => (
          <PhaseGroup key={phase} phase={phase} blocks={blocks} done={done} activePath={location.pathname} />
        ))}
      </nav>
    </aside>
  );
}
