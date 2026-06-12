import { ALL_BLOCKS } from '../data/content';
import type { Block } from '../types/content';

const DONE_KEY = 'prep_done';

export function readDoneBlocks(): Set<number> {
  try {
    const raw = localStorage.getItem(DONE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(
      Array.isArray(parsed)
        ? parsed
            .map(Number)
            .filter((id) => Number.isFinite(id) && ALL_BLOCKS.some((block) => block.id === id))
        : [],
    );
  } catch {
    return new Set<number>();
  }
}

export function writeDoneBlocks(done: Set<number>) {
  localStorage.setItem(DONE_KEY, JSON.stringify([...done].sort((a, b) => a - b)));
}

export function getBlockById(id: number): Block | undefined {
  return ALL_BLOCKS.find((block) => block.id === id);
}

export function groupBlocksByPhase(blocks: Block[] = ALL_BLOCKS) {
  return blocks.reduce<Record<string, Block[]>>((groups, block) => {
    groups[block.phase] = groups[block.phase] || [];
    groups[block.phase].push(block);
    return groups;
  }, {});
}

export function parsePrereqs(value: string): number[] {
  return value
    .split(/[,\s]+/)
    .map((part) => Number(part.trim()))
    .filter((value) => Number.isFinite(value) && value > 0);
}
