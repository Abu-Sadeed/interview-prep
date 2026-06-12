import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ALL_BLOCKS } from '../data/content';
import type { Block, Tier } from '../types/content';
import { useProgress } from '../hooks/useProgress';
import { useTierState } from '../hooks/useTierState';
import { getBlockById } from '../utils/content';
import { buildGrillPrompt } from '../utils/grill';
import { chipClass, freqClass, freqLabel } from '../utils/classes';
import { RichHtml } from './RichHtml';

const tierLabels = ['Tier 1 — Beginner', 'Tier 2 — Intermediate', 'Tier 3 — Advanced'];

export function BlockDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const block = getBlockById(Number(id));
  const { done, toggleDone } = useProgress();
  const [grillTier, setGrillTier] = useState(0);
  const [copied, setCopied] = useState(false);
  const { open, toggle } = useTierState(Number(id), block?.tiers.length || 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const prompt = useMemo(() => {
    if (!block) return '';
    return buildGrillPrompt(block, grillTier);
  }, [block, grillTier]);

  if (!block) {
    return (
      <main className="min-h-[calc(100vh-3.25rem)] p-8">
        <div className="rounded-lg border border-border bg-bg2 p-6 text-text dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">Block not found.</div>
      </main>
    );
  }

  const index = ALL_BLOCKS.findIndex((item) => item.id === block.id);
  const previous = index > 0 ? ALL_BLOCKS[index - 1] : undefined;
  const next = index < ALL_BLOCKS.length - 1 ? ALL_BLOCKS[index + 1] : undefined;
  const isDone = done.has(block.id);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-[900px] px-8 py-8">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.05em] ${chipClass(block.chip)}`}>{block.phase}</span>
        <span className="font-mono text-[10px] text-text3">Block {String(block.id).padStart(2, '0')}</span>
        <span className={`rounded px-2 py-0.5 font-mono text-[10px] ${freqClass(block.freq)}`}>{freqLabel(block.freq)}</span>
      </div>
      <h1 className="mb-2 text-[26px] font-bold leading-tight text-text dark:text-slate-100">{block.title}</h1>
      <p className="mb-4 text-text2">{block.subtitle}</p>
      {block.prereqs.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] text-text3">PREREQS:</span>
          {block.prereqs.map((prereqId) => {
            const prereq = getBlockById(prereqId);
            return prereq ? (
              <Link key={prereqId} to={`/block/${prereqId}`} className="rounded border border-border2 bg-bg3 px-2 py-0.5 font-mono text-[10px] text-blue-500 transition hover:border-blue-500 dark:border-slate-700 dark:bg-slate-900">
                Block {prereqId}: {prereq.title.split(' — ')[0]}
              </Link>
            ) : null;
          })}
        </div>
      )}
      {block.tiers.map((tier, tierIndex) => (
        <TierBlock key={tier.level} tier={tier} tierIndex={tierIndex} open={open[tierIndex]} onToggle={() => toggle(tierIndex)} />
      ))}
      <section className="mt-8 overflow-hidden rounded-lg border border-border2 bg-bg2 dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-border bg-bg3 px-5 py-3 dark:border-slate-800">
          <div className="font-mono text-[12px] font-semibold text-text dark:text-slate-100">Grill Prompt</div>
          <div className="text-[11px] text-text3">Copy and paste into any LLM to get grilled on this block</div>
        </div>
        <div className="flex gap-1 border-b border-border px-5 pt-3 dark:border-slate-800">
          {['Beginner', 'Intermediate', 'Advanced'].map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setGrillTier(index)}
              className={`rounded-t border px-3 py-1 font-mono text-[11px] transition ${
                grillTier === index
                  ? 'border-border2 bg-bg4 text-text dark:border-slate-600'
                  : 'border-border bg-bg2 text-text3 hover:text-text2 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>
        <div className="relative m-4 rounded-br-lg rounded-tl-lg border border-border2 bg-bg4 p-4 dark:border-slate-700">
          <pre className="font-mono text-[11px] leading-7 text-text2">{prompt}</pre>
          <button
            type="button"
            onClick={copyPrompt}
            className={`absolute right-3 top-3 rounded border px-3 py-1 font-mono text-[10px] transition ${
              copied
                ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:border-emerald-400 dark:bg-emerald-950/30 dark:text-emerald-300'
                : 'border-border2 bg-bg3 text-text2 hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:bg-slate-900'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="border-t border-border px-5 py-3 text-[10px] leading-6 text-text3 dark:border-slate-800">
          After studying all tiers, come back and say "Block {block.id} — done, grill me" in a new chat, or paste the prompt above into any LLM. Pass = mark complete. Fail = repeat that tier.
        </div>
      </section>
      <button
        type="button"
        onClick={() => toggleDone(block.id)}
        className={`mt-8 w-full rounded border px-4 py-3 font-mono text-[12px] font-semibold tracking-[0.05em] transition ${
          isDone
            ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:border-emerald-400 dark:bg-emerald-950/30 dark:text-emerald-300'
            : 'border-emerald-500/30 bg-transparent text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/20'
        }`}
      >
        {isDone ? 'Marked as complete — click to undo' : 'Mark block as complete'}
      </button>
      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <button type="button" onClick={() => navigate(previous ? `/block/${previous.id}` : '/')} className="rounded border border-border2 bg-transparent px-4 py-2 font-mono text-[11px] text-text2 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700">
          ← {previous ? `Block ${previous.id}` : 'Overview'}
        </button>
        <span className="font-mono text-[11px] text-text3">{index + 1} / {ALL_BLOCKS.length}</span>
        <button type="button" onClick={() => navigate(next ? `/block/${next.id}` : '/')} disabled={!next} className="rounded border border-border2 bg-blue-50 px-4 py-2 font-mono text-[11px] text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-blue-950/20 dark:text-blue-300 dark:hover:bg-blue-950/30">
          {next ? `Block ${next.id} →` : 'Done!'}
        </button>
      </div>
    </main>
  );
}

function TierBlock({ tier, tierIndex, open, onToggle }: { tier: Tier; tierIndex: number; open: boolean; onToggle: () => void }) {
  return (
    <section className={`mb-3 overflow-hidden rounded-lg border border-border bg-bg2 dark:border-slate-800 dark:bg-slate-900 ${tierIndex === 0 ? 'tier-t1' : tierIndex === 1 ? 'tier-t2' : 'tier-t3'}`}>
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-5 py-3 text-left transition hover:brightness-110">
        <div className="flex items-center gap-3">
          <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">{tierLabels[tierIndex]}</span>
          <span className="text-[13px] font-medium text-text dark:text-slate-100">{tier.level}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-text3">{tier.time}</span>
          <span className={`text-text3 transition ${open ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5">
          {tier.sections.map((section) => (
            <div key={section.heading} className="mb-5">
              <div className="mb-3 border-b border-border pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-blue-500 dark:border-slate-800">{section.heading}</div>
              <ul className="rich-html flex flex-col gap-2">
                {section.items.map((item) => <RichHtml key={item} html={item} />)}
              </ul>
            </div>
          ))}
          {tier.traps.length > 0 && (
            <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-600 dark:text-amber-300">Common Interview Traps</div>
              <ul className="flex flex-col gap-1 text-[12px] text-text2">
                {tier.traps.map((trap) => <li key={trap}>Trap: {trap}</li>)}
              </ul>
            </div>
          )}
          {tier.checkpoint.length > 0 && (
            <div className="mt-3 rounded border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-300">Self-Check Before Advancing</div>
              <ul className="flex flex-col gap-2 text-[12px] text-text2">
                {tier.checkpoint.map((question) => <li key={question}>Question: {question}</li>)}
              </ul>
              <div className="mt-2 border-t border-emerald-200 pt-2 font-mono text-[10px] text-text3 dark:border-emerald-900/30">If you can answer all questions confidently without notes → advance to next tier.</div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
