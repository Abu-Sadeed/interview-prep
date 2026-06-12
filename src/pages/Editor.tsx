import { useMemo, useState } from 'react';
import { z } from 'zod';
import { ALL_BLOCKS, TOPIC_CONTENT } from '../data/content';
import type { Block, Frequency, Tier, TopicKey } from '../types/content';
import { downloadTextFile, serializeContentFile } from '../utils/fileExport';
import { getPhaseForTopic, parsePrereqs } from '../utils/content';

const tierSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  time: z.string().min(1),
  sections: z.array(z.object({ heading: z.string().min(1), items: z.array(z.string().min(1)).min(1) })).min(1),
  traps: z.array(z.string()),
  checkpoint: z.array(z.string()),
});

const blockSchema = z.object({
  id: z.number().int().positive(),
  phase: z.string().min(1),
  chip: z.string().min(1),
  freq: z.enum(['high', 'med', 'low']),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  prereqs: z.array(z.number().int().positive()),
  tiers: z.array(tierSchema).min(1),
  grill: z.string().min(1),
});

type TopicOption = { key: TopicKey; label: string; phase: string; chip: string };

const topicOptions: TopicOption[] = [
  { key: 'java', label: 'Java Fundamentals', phase: 'Java Fundamentals', chip: 'java' },
  { key: 'spring', label: 'Spring Ecosystem', phase: 'Spring Ecosystem', chip: 'spring' },
  { key: 'jsbackend', label: 'JS Backend', phase: 'JS Backend', chip: 'nestjs' },
  { key: 'database', label: 'Database & Cache', phase: 'Database & Cache', chip: 'db' },
  { key: 'messaging', label: 'Messaging & Events', phase: 'Messaging & Events', chip: 'messaging' },
  { key: 'api', label: 'API + HTTP + Security', phase: 'API + HTTP + Security', chip: 'api' },
  { key: 'infra', label: 'Infrastructure & Tooling', phase: 'Infrastructure & Tooling', chip: 'infra' },
  { key: 'frontend', label: 'Frontend', phase: 'Frontend', chip: 'frontend' },
  { key: 'arch', label: 'Architecture & Design', phase: 'Architecture & Design', chip: 'arch' },
  { key: 'behavioral', label: 'Behavioral & Career', phase: 'Behavioral & Career', chip: 'arch' },
  { key: 'testing', label: 'Testing', phase: 'Cross-Cutting', chip: 'arch' },
  { key: 'devops', label: 'DevOps', phase: 'DevOps', chip: 'infra' },
  { key: 'typescript', label: 'TypeScript', phase: 'JS Backend', chip: 'ts' },
];

const chipOptions = Array.from(new Set(ALL_BLOCKS.map((block) => block.chip))).sort();

export function Editor() {
  const [topic, setTopic] = useState<TopicKey>('java');
  const [form, setForm] = useState<Block>({
    id: getNextBlockId(),
    phase: 'Java Fundamentals',
    chip: 'java',
    freq: 'high',
    title: '',
    subtitle: '',
    prereqs: [],
    tiers: [],
    grill: '',
  });
  const [tierJson, setTierJson] = useState('[]');
  const [errors, setErrors] = useState<string[]>([]);

  const parsedTiers = useMemo(() => parseTiers(tierJson), [tierJson]);
  const previewBlock = useMemo<Block | null>(() => {
    if (!parsedTiers.ok) return null;
    return { ...form, prereqs: parsePrereqs(String(form.prereqs.join(','))), tiers: parsedTiers.value };
  }, [form, parsedTiers]);

  const update = <K extends keyof Block>(key: K, value: Block[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateTopic = (nextTopic: TopicKey) => {
    const option = topicOptions.find((item) => item.key === nextTopic);
    if (!option) return;
    setTopic(nextTopic);
    setForm((current) => ({ ...current, phase: option.phase, chip: option.chip }));
  };

  const validate = () => {
    if (!previewBlock) {
      setErrors(['Tier JSON must be valid before validation.']);
      return null;
    }
    const result = blockSchema.safeParse(previewBlock);
    if (!result.success) {
      setErrors(result.error.issues.map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`));
      return null;
    }
    setErrors([]);
    return result.data;
  };

  const download = () => {
    const block = validate();
    if (!block) return;
    const existing = TOPIC_CONTENT[topic] || [];
    if (existing.some((item) => item.id === block.id)) {
      setErrors([`Block ${block.id} already exists in ${topic}_content.ts`]);
      return;
    }
    const content = serializeContentFile(topic, [...existing, block]);
    downloadTextFile(`${topic}_content.ts`, content);
  };

  return (
    <main className="grid min-h-[calc(100vh-3.25rem)] grid-cols-[minmax(0,1fr)_420px] gap-6 p-6">
      <section className="rounded-lg border border-border bg-bg2 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-text dark:text-slate-100">Content Editor</h1>
          <p className="text-text2">Create a validated Block object and download the generated TypeScript content file for manual merge.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-text2">
            Topic
            <select value={topic} onChange={(event) => updateTopic(event.target.value as TopicKey)} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950">
              {topicOptions.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
            </select>
          </label>
          <label className="text-sm text-text2">
            Frequency
            <select value={form.freq} onChange={(event) => update('freq', event.target.value as Frequency)} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950">
              <option value="high">high</option>
              <option value="med">med</option>
              <option value="low">low</option>
            </select>
          </label>
          <label className="text-sm text-text2">
            Block ID
            <input type="number" value={form.id} onChange={(event) => update('id', Number(event.target.value))} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="text-sm text-text2">
            Chip
            <input value={form.chip} onChange={(event) => update('chip', event.target.value)} list="chip-options" className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950" />
            <datalist id="chip-options">{chipOptions.map((chip) => <option key={chip} value={chip} />)}</datalist>
          </label>
          <label className="text-sm text-text2 md:col-span-2">
            Phase
            <input value={form.phase} onChange={(event) => update('phase', event.target.value)} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="text-sm text-text2 md:col-span-2">
            Title
            <input value={form.title} onChange={(event) => update('title', event.target.value)} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="text-sm text-text2 md:col-span-2">
            Subtitle
            <input value={form.subtitle} onChange={(event) => update('subtitle', event.target.value)} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="text-sm text-text2 md:col-span-2">
            Prerequisites
            <input value={form.prereqs.join(', ')} onChange={(event) => update('prereqs', parsePrereqs(event.target.value))} placeholder="1, 2, 9" className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 text-text dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="text-sm text-text2 md:col-span-2">
            Tiers JSON
            <textarea value={tierJson} onChange={(event) => setTierJson(event.target.value)} rows={16} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 font-mono text-[11px] text-text dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="text-sm text-text2 md:col-span-2">
            Grill Prompt
            <textarea value={form.grill} onChange={(event) => update('grill', event.target.value)} rows={10} className="mt-1 w-full rounded border border-border2 bg-bg3 px-3 py-2 font-mono text-[11px] text-text dark:border-slate-700 dark:bg-slate-950" />
          </label>
        </div>
        {errors.length > 0 && (
          <div className="mt-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            <ul className="list-inside list-disc">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
          </div>
        )}
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={validate} className="rounded border border-blue-300 bg-blue-50 px-4 py-2 font-mono text-[11px] font-semibold text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">Validate</button>
          <button type="button" onClick={download} className="rounded border border-emerald-300 bg-emerald-50 px-4 py-2 font-mono text-[11px] font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">Download topic file</button>
          <button type="button" onClick={() => { const option = topicOptions.find((item) => item.key === topic); setForm({ id: getNextBlockId(), phase: option?.phase || form.phase, chip: option?.chip || form.chip, freq: 'high', title: '', subtitle: '', prereqs: [], tiers: [], grill: '' }); setTierJson('[]'); setErrors([]); }} className="rounded border border-border2 bg-transparent px-4 py-2 font-mono text-[11px] text-text2 dark:border-slate-700">Reset</button>
        </div>
      </section>
      <aside className="rounded-lg border border-border bg-bg2 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-text3">JSON Preview</div>
        {previewBlock ? (
          <pre className="max-h-[calc(100vh-9rem)] overflow-auto rounded border border-border2 bg-bg4 p-3 font-mono text-[11px] leading-6 text-text2 dark:border-slate-700">{JSON.stringify(previewBlock, null, 2)}</pre>
        ) : (
          <div className="rounded border border-border2 bg-bg4 p-3 text-sm text-text2 dark:border-slate-700">Invalid tier JSON.</div>
        )}
        <div className="mt-5 rounded border border-border2 bg-bg3 p-4 text-sm leading-6 text-text2 dark:border-slate-700 dark:bg-slate-950">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-text3">Export behavior</div>
          <p className="mt-2">The downloaded file contains the selected topic plus the new block. Merge it into <code className="rounded bg-bg4 px-1 text-teal-300">src/data/{topic}_content.ts</code> and import it from <code className="rounded bg-bg4 px-1 text-teal-300">src/data/content.ts</code>.</p>
        </div>
      </aside>
    </main>
  );
}

function parseTiers(value: string): { ok: true; value: Tier[] } | { ok: false; value: null } {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return { ok: false, value: null };
    return { ok: true, value: parsed as Tier[] };
  } catch {
    return { ok: false, value: null };
  }
}

function getNextBlockId() {
  return Math.max(...ALL_BLOCKS.map((block) => block.id), 0) + 1;
}
