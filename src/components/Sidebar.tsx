import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ALL_BLOCKS } from '../data/content';
import type { Block } from '../types/content';
import { useProgress } from '../hooks/useProgress';
import { groupBlocksByPhase } from '../utils/content';
import { freqClass } from '../utils/classes';

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
    <aside className="sticky top-[3.25rem] flex h-[calc(100vh-3.25rem)] flex-col border-r border-border bg-bg2 dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-border p-3 dark:border-slate-800">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search blocks..."
          className="w-full rounded border border-border2 bg-bg3 px-3 py-2 font-mono text-[11px] text-text outline-none transition placeholder:text-text3 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        />
      </div>
      <div className="flex flex-wrap gap-1 border-b border-border px-3 py-2 dark:border-slate-800">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFreq(filter)}
            className={`rounded border px-2 py-0.5 font-mono text-[10px] transition ${
              activeFreq === filter
                ? filter === 'all'
                  ? 'border-blue-300/30 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300'
                  : filter === 'high'
                    ? 'border-red-300/30 bg-red-50 text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300'
                    : filter === 'med'
                      ? 'border-amber-300/30 bg-amber-50 text-amber-600 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300'
                      : 'border-slate-500 bg-bg4 text-text2 dark:border-slate-600'
                : 'border-border2 bg-transparent text-text3 hover:border-border3 hover:text-text2 dark:border-slate-700 dark:text-slate-400'
            }`}
          >
            {filter === 'all' ? 'All' : filter === 'high' ? 'HIGH FREQ' : filter === 'med' ? 'MED FREQ' : 'LOW FREQ'}
          </button>
        ))}
      </div>
      {(normalizedQuery || activeFreq !== 'all') && (
        <div className="px-3 pb-1 pt-0 font-mono text-[10px] text-text3">
          {visibleCount} block{visibleCount === 1 ? '' : 's'} shown
        </div>
      )}
      <nav className="flex-1 overflow-y-auto py-2">
        {Object.entries(phases).map(([phase, blocks]) => (
          <PhaseGroup key={phase} phase={phase} blocks={blocks} done={done} activePath={location.pathname} />
        ))}
      </nav>
    </aside>
  );
}

function PhaseGroup({ phase, blocks, done, activePath }: { phase: string; blocks: Block[]; done: Set<number>; activePath: string }) {
  return (
    <section>
      <div className="px-4 pb-1 pt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-text3">{phase}</div>
      {blocks.map((block) => {
        const isDone = done.has(block.id);
        const isActive = activePath === `/block/${block.id}`;
        return (
          <Link
            key={block.id}
            to={`/block/${block.id}`}
            className={`flex items-center gap-2 border-l-2 border-transparent px-4 py-1.5 transition ${
              isActive
                ? 'border-blue-500 bg-bg3'
                : isDone
                  ? 'border-emerald-500 hover:bg-bg3'
                  : 'hover:bg-bg3'
            } dark:bg-slate-950 dark:hover:bg-slate-900`}
          >
            <span className="min-w-[22px] font-mono text-[10px] text-text3">{String(block.id).padStart(2, '0')}</span>
            <span className={`flex-1 text-[12px] leading-tight ${isActive ? 'text-text' : 'text-text2'} dark:text-slate-300`}>
              {block.title.split(' — ')[0]}
            </span>
            <span className={`shrink-0 rounded px-1.5 py-px font-mono text-[9px] ${freqClass(block.freq)}`}>{block.freq.toUpperCase()}</span>
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isDone ? 'bg-emerald-500' : isActive ? 'bg-blue-500' : 'bg-border3'}`} />
          </Link>
        );
      })}
    </section>
  );
}
