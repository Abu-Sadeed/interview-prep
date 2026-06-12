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
      <main className="main-content">
        <div className="editor-panel">Block not found.</div>
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
    <main className="block-detail-container">
      <div className="block-detail-header-row">
        <span className={`chip ${chipClass(block.chip)}`}>{block.phase}</span>
        <span style={{ fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace', fontSize: '0.625rem', color: 'var(--color-text3)' }}>Block {String(block.id).padStart(2, '0')}</span>
        <span className={`tag ${freqClass(block.freq)}`}>{freqLabel(block.freq)}</span>
      </div>
      <h1 className="block-detail-title">{block.title}</h1>
      <p className="block-detail-subtitle">{block.subtitle}</p>
      {block.prereqs.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace', fontSize: '0.625rem', color: 'var(--color-text3)' }}>PREREQS:</span>
          {block.prereqs.map((prereqId) => {
            const prereq = getBlockById(prereqId);
            return prereq ? (
              <Link key={prereqId} to={`/block/${prereqId}`} className="prereq-link">
                Block {prereqId}: {prereq.title.split(' — ')[0]}
              </Link>
            ) : null;
          })}
        </div>
      )}
      {block.tiers.map((tier, tierIndex) => (
        <TierBlock key={tier.level} tier={tier} tierIndex={tierIndex} open={open[tierIndex]} onToggle={() => toggle(tierIndex)} />
      ))}
      <section className="grill-section">
        <div className="grill-header">
          <div className="grill-title">Grill Prompt</div>
          <div className="grill-subtitle">Copy and paste into any LLM to get grilled on this block</div>
        </div>
        <div className="grill-tabs">
          {['Beginner', 'Intermediate', 'Advanced'].map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setGrillTier(index)}
              className={`grill-tab ${grillTier === index ? 'grill-tab-active' : ''}`}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>
        <div className="grill-body">
          <pre className="grill-prompt">{prompt}</pre>
          <button
            type="button"
            onClick={copyPrompt}
            className={`grill-copy-btn ${copied ? 'grill-copy-btn-success' : ''}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="grill-footer">
          After studying all tiers, come back and say "Block {block.id} — done, grill me" in a new chat, or paste the prompt above into any LLM. Pass = mark complete. Fail = repeat that tier.
        </div>
      </section>
      <button
        type="button"
        onClick={() => toggleDone(block.id)}
        className={`done-btn ${isDone ? 'done-btn-done' : ''}`}
      >
        {isDone ? 'Marked as complete — click to undo' : 'Mark block as complete'}
      </button>
      <div className="nav-buttons">
        <button type="button" onClick={() => navigate(previous ? `/block/${previous.id}` : '/')} className="nav-btn">
          ← {previous ? `Block ${previous.id}` : 'Overview'}
        </button>
        <span style={{ fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace', fontSize: '0.6875rem', color: 'var(--color-text3)' }}>{index + 1} / {ALL_BLOCKS.length}</span>
        <button type="button" onClick={() => navigate(next ? `/block/${next.id}` : '/')} disabled={!next} className={`nav-btn nav-btn-next`}>
          {next ? `Block ${next.id} →` : 'Done!'}
        </button>
      </div>
    </main>
  );
}

function TierBlock({ tier, tierIndex, open, onToggle }: { tier: Tier; tierIndex: number; open: boolean; onToggle: () => void }) {
  return (
    <section className={`tier-panel ${tierIndex === 0 ? 'tier-t1' : tierIndex === 1 ? 'tier-t2' : 'tier-t3'}`}>
      <button type="button" onClick={onToggle} className="tier-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="tier-label">{tierLabels[tierIndex]}</span>
          <span className="tier-title">{tier.level}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="tier-meta">{tier.time}</span>
          <span className={`tier-chevron ${open ? 'tier-chevron-open' : ''}`}>▾</span>
        </div>
      </button>
      {open && (
        <div className="tier-body">
          {tier.sections.map((section) => (
            <div key={section.heading} style={{ marginBottom: '1.25rem' }}>
              <div className="tier-section-heading">{section.heading}</div>
              <ul className="tier-list">
                {section.items.map((item) => <RichHtml key={item} html={item} />)}
              </ul>
            </div>
          ))}
          {tier.traps.length > 0 && (
            <div className="tier-traps">
              <div className="tier-traps-title">Common Interview Traps</div>
              <ul className="tier-traps-list">
                {tier.traps.map((trap) => <li key={trap}>Trap: {trap}</li>)}
              </ul>
            </div>
          )}
          {tier.checkpoint.length > 0 && (
            <div className="tier-checkpoint">
              <div className="tier-checkpoint-title">Self-Check Before Advancing</div>
              <ul className="tier-checkpoint-list">
                {tier.checkpoint.map((question) => <li key={question}>Question: {question}</li>)}
              </ul>
              <div className="tier-checkpoint-hint">If you can answer all questions confidently without notes → advance to next tier.</div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
