import { ALL_BLOCKS } from '../data/content';
import type { Block } from '../types/content';

const DONE_KEY = 'prep_done';

export function readDoneBlocks(): Set<string> {
  try {
    const raw = localStorage.getItem(DONE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(
      Array.isArray(parsed)
        ? parsed.filter((id): id is string => typeof id === 'string' && ALL_BLOCKS.some((block) => block.id === id))
        : [],
    );
  } catch {
    return new Set<string>();
  }
}

export function writeDoneBlocks(done: Set<string>) {
  localStorage.setItem(DONE_KEY, JSON.stringify([...done].sort((a, b) => a.localeCompare(b))));
}

export function getBlockById(id: string): Block | undefined {
  return ALL_BLOCKS.find((block) => block.id === id);
}

export function groupBlocksByPhase(blocks: Block[] = ALL_BLOCKS) {
  return blocks.reduce<Record<string, Block[]>>((groups, block) => {
    groups[block.phase] = groups[block.phase] || [];
    groups[block.phase].push(block);
    return groups;
  }, {});
}

export function parsePrereqs(value: string): string[] {
  return value
    .split(/[,\s]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}
