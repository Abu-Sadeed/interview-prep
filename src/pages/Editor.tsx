import { useMemo, useState } from 'react';
import { z } from 'zod';
import { ALL_BLOCKS, TOPIC_CONTENT } from '../data/content';
import type { Block, Frequency, Tier, TopicKey } from '../types/content';
import { downloadTextFile, serializeContentFile } from '../utils/fileExport';
import { parsePrereqs } from '../utils/content';
import { sanitizeBlock } from '../utils/sanitize';

const tierSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  time: z.string().min(1),
  sections: z.array(z.object({ heading: z.string().min(1), items: z.array(z.string().min(1)).min(1) })).min(1),
  traps: z.array(z.string()),
  checkpoint: z.array(z.string()),
});

const blockSchema = z.object({
  id: z.string().min(1),
  phase: z.string().min(1),
  chip: z.string().min(1),
  freq: z.enum(['high', 'med', 'low']),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  prereqs: z.array(z.string().min(1)),
  tiers: z.array(tierSchema),
  grill: z.string().min(1),
});

type TopicOption = { key: TopicKey; label: string; phase: string; chip: string };

const topicOptions: TopicOption[] = [
  { key: 'java', label: 'Java Fundamentals', phase: 'Java Fundamentals', chip: 'java' },
  { key: 'spring', label: 'Spring Ecosystem', phase: 'Spring Ecosystem', chip: 'spring' },
  { key: 'springboot', label: 'Spring Boot', phase: 'Spring Boot', chip: 'springboot' },
  { key: 'javascript', label: 'JavaScript', phase: 'JavaScript', chip: 'javascript' },
  { key: 'jsbackend', label: 'JS Backend', phase: 'JS Backend', chip: 'nestjs' },
  { key: 'database', label: 'Database & Cache', phase: 'Database & Cache', chip: 'db' },
  { key: 'messaging', label: 'Messaging & Events', phase: 'Messaging & Events', chip: 'messaging' },
  { key: 'api', label: 'API + HTTP + Security', phase: 'API + HTTP + Security', chip: 'api' },
  { key: 'infra', label: 'Infrastructure & Tooling', phase: 'Infrastructure & Tooling', chip: 'infra' },
  { key: 'frontend', label: 'Frontend', phase: 'Frontend', chip: 'frontend' },
  { key: 'html', label: 'HTML + Web Semantics', phase: 'Frontend', chip: 'html' },
  { key: 'arch', label: 'Architecture & Design', phase: 'Architecture & Design', chip: 'arch' },
  { key: 'behavioral', label: 'Behavioral & Career', phase: 'Behavioral & Career', chip: 'arch' },
  { key: 'devops', label: 'DevOps', phase: 'DevOps', chip: 'infra' },
  { key: 'cloud', label: 'Cloud', phase: 'Cloud', chip: 'aws' },
  { key: 'typescript', label: 'TypeScript', phase: 'JavaScript', chip: 'ts' },
];

const chipOptions = Array.from(new Set(ALL_BLOCKS.map((block) => block.chip))).sort();

export function Editor() {
  const [topic, setTopic] = useState<TopicKey>('java');
  const [form, setForm] = useState<Block>({
    id: getNextBlockId('java'),
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
    const block = { ...form, prereqs: parsePrereqs(String(form.prereqs.join(','))), tiers: parsedTiers.value };
    return sanitizeBlock(block);
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
    const existingIds = new Set(ALL_BLOCKS.map((block) => block.id));
    const duplicateId = existingIds.has(result.data.id);
    const invalidPrereqs = result.data.prereqs.filter((id) => !existingIds.has(id) || id === result.data.id);

    if (duplicateId || invalidPrereqs.length > 0) {
      const messages = [];
      if (duplicateId) messages.push(`Block ${result.data.id} already exists.`);
      if (invalidPrereqs.length > 0) messages.push(`Invalid prerequisite ids: ${invalidPrereqs.join(', ')}`);
      setErrors(messages);
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
    <main className="editor-layout">
      <section className="editor-panel">
        <div style={{ marginBottom: '1.25rem' }}>
          <h1 className="editor-title">Content Editor</h1>
          <p className="editor-subtitle">Create a validated Block object and download the generated TypeScript content file for manual merge.</p>
        </div>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <label className="form-group">
            Topic
            <select value={topic} onChange={(event) => updateTopic(event.target.value as TopicKey)} className="form-input">
              {topicOptions.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
            </select>
          </label>
          <label className="form-group">
            Frequency
            <select value={form.freq} onChange={(event) => update('freq', event.target.value as Frequency)} className="form-input">
              <option value="high">high</option>
              <option value="med">med</option>
              <option value="low">low</option>
            </select>
          </label>
          <label className="form-group">
            Block ID
            <input type="text" value={form.id} onChange={(event) => update('id', event.target.value)} className="form-input" />
          </label>
          <label className="form-group">
            Chip
            <input value={form.chip} onChange={(event) => update('chip', event.target.value)} list="chip-options" className="form-input" />
            <datalist id="chip-options">{chipOptions.map((chip) => <option key={chip} value={chip} />)}</datalist>
          </label>
          <label className="form-group" style={{ gridColumn: 'span 2' }}>
            Phase
            <input value={form.phase} onChange={(event) => update('phase', event.target.value)} className="form-input" />
          </label>
          <label className="form-group" style={{ gridColumn: 'span 2' }}>
            Title
            <input value={form.title} onChange={(event) => update('title', event.target.value)} className="form-input" />
          </label>
          <label className="form-group" style={{ gridColumn: 'span 2' }}>
            Subtitle
            <input value={form.subtitle} onChange={(event) => update('subtitle', event.target.value)} className="form-input" />
          </label>
          <label className="form-group" style={{ gridColumn: 'span 2' }}>
            Prerequisites
            <input value={form.prereqs.join(', ')} onChange={(event) => update('prereqs', parsePrereqs(event.target.value))} placeholder="java-1, spring-1" className="form-input" />
          </label>
          <label className="form-group" style={{ gridColumn: 'span 2' }}>
            Tiers JSON
            <textarea value={tierJson} onChange={(event) => setTierJson(event.target.value)} rows={16} className="form-input" />
          </label>
          <label className="form-group" style={{ gridColumn: 'span 2' }}>
            Grill Prompt
            <textarea value={form.grill} onChange={(event) => update('grill', event.target.value)} rows={10} className="form-input" />
          </label>
        </div>
        {errors.length > 0 && (
          <div className="form-errors">
            <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>
          </div>
        )}
        <div className="form-actions">
          <button type="button" onClick={validate} className="form-btn form-btn-primary">Validate</button>
          <button type="button" onClick={download} className="form-btn form-btn-success">Download topic file</button>
          <button type="button" onClick={() => { const option = topicOptions.find((item) => item.key === topic); setForm({ id: getNextBlockId(topic), phase: option?.phase || form.phase, chip: option?.chip || form.chip, freq: 'high', title: '', subtitle: '', prereqs: [], tiers: [], grill: '' }); setTierJson('[]'); setErrors([]); }} className="form-btn form-btn-ghost">Reset</button>
        </div>
      </section>
      <aside className="editor-panel">
        <div className="json-preview-label">JSON Preview</div>
        {previewBlock ? (
          <pre className="json-preview">{JSON.stringify(previewBlock, null, 2)}</pre>
        ) : (
          <div className="json-preview">Invalid tier JSON.</div>
        )}
        <div className="json-preview-hint">
          <div className="json-preview-label">Export behavior</div>
          <p style={{ marginTop: '0.5rem' }}>The downloaded file contains the selected topic plus the new block. Merge it into <code>src/data/{topic}_content.ts</code> and import it from <code>src/data/content.ts</code>.</p>
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

function getNextBlockId(topicKey: TopicKey) {
  const topicBlocks = TOPIC_CONTENT[topicKey] || [];
  const maxSeq = topicBlocks.reduce((max, block) => {
    const match = block.id.match(new RegExp(`^${topicKey}-(\\d+)$`));
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  return `${topicKey}-${maxSeq + 1}`;
}
