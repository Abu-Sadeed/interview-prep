import { Link } from 'react-router-dom';
import { ALL_BLOCKS } from '../data/content';
import { useProgress } from '../hooks/useProgress';
import { groupBlocksByPhase } from '../utils/content';
import { parseTierTime } from '../utils/grill';
import { chipClass, freqClass, freqLabel } from '../utils/classes';

export function Overview() {
  const { progress } = useProgress();
  const phases = groupBlocksByPhase(ALL_BLOCKS);
  const totalTime = ALL_BLOCKS.reduce((total, block) => total + block.tiers.reduce((sum, tier) => sum + parseTierTime(tier.time), 0), 0);
  const high = ALL_BLOCKS.filter((block) => block.freq === 'high').length;
  const medium = ALL_BLOCKS.filter((block) => block.freq === 'med').length;
  const low = ALL_BLOCKS.filter((block) => block.freq === 'low').length;

  return (
    <main className="ov min-h-[calc(100vh-3.25rem)] p-8">
      <div className="mb-2 text-3xl font-bold text-text dark:text-slate-100">Interview Prep Syllabus</div>
      <div className="mb-8 text-text2">{ALL_BLOCKS.length} blocks · {ALL_BLOCKS.filter((block) => block.tiers.length).length} with tier content · beginner → senior level 5+</div>
      <div className="mb-10 grid grid-cols-4 gap-3">
        <Stat number={ALL_BLOCKS.length} label="Total blocks" />
        <Stat number={Object.keys(phases).length} label="Study sessions" />
        <Stat number={`${Math.round(totalTime / 60)}h`} label="Est. study time" />
        <Stat number={progress.count} label="Completed" />
      </div>
      <div className="mb-10 rounded-lg border border-border bg-bg2 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-text3">Study Strategy — Use the sidebar filter to focus</div>
        <div className="grid grid-cols-3 gap-3">
          <FrequencyCard label="High Frequency" count={high} tone="red" text="Almost certain to be asked. Do these first regardless of tech." />
          <FrequencyCard label="Medium Frequency" count={medium} tone="amber" text="50–60% of interviews. Study after all high-freq blocks are done." />
          <FrequencyCard label="Low Frequency" count={low} tone="slate" text="Niche or role-specific. Study only if interview is for that tech." />
        </div>
      </div>
      {Object.entries(phases).map(([phase, blocks]) => (
        <section key={phase} className="mb-8">
          <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-text3">{phase}</div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2">
            {blocks.map((block) => (
                <Link
                  key={block.id}
                  to={`/block/${block.id}`}
                  className="cursor-pointer rounded border border-border bg-bg2 p-3 transition hover:border-border2 hover:bg-bg3 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <div className="font-mono text-[10px] text-text3">Block {String(block.id).padStart(2, '0')}</div>
                  <div className="my-1 text-[12px] font-medium text-text dark:text-slate-100">{block.title.split(' — ')[0]}</div>
                  <div className="text-[11px] text-text3">{block.title.split(' — ')[1] || block.subtitle.split(',')[0]}</div>
                  <span className={`mt-2 inline-block rounded px-1.5 py-px font-mono text-[9px] ${freqClass(block.freq)}`}>{freqLabel(block.freq)}</span>
                  <span className={`ml-2 rounded px-1.5 py-px font-mono text-[9px] uppercase ${chipClass(block.chip)}`}>{block.chip}</span>
                </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function Stat({ number, label }: { number: number | string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg2 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
      <div className="font-mono text-2xl font-semibold text-blue-500 dark:text-blue-300">{number}</div>
      <div className="mt-1 text-[11px] text-text3">{label}</div>
    </div>
  );
}

function FrequencyCard({ label, count, tone, text }: { label: string; count: number; tone: 'red' | 'amber' | 'slate'; text: string }) {
  const toneClass = tone === 'red'
    ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300'
    : tone === 'amber'
      ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300'
      : 'bg-bg3 border-border2 text-text2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300';

  return (
    <div className={`rounded border p-3 ${toneClass}`}>
      <div className="font-mono text-lg font-semibold">{count}</div>
      <div className="my-1 text-[12px] font-semibold">{label}</div>
      <div className="text-[11px] leading-5">{text}</div>
    </div>
  );
}
