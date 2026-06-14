import { useMemo, useState } from 'react';
import { ALL_BLOCKS } from '../data/content';
import { readDoneBlocks, writeDoneBlocks } from '../utils/content';

export function useProgress() {
  const [done, setDone] = useState<Set<string>>(() => readDoneBlocks());

  const progress = useMemo(() => {
    const count = Math.min(done.size, ALL_BLOCKS.length);
    return { count, percent: Math.min(100, Math.max(0, Math.round((count / ALL_BLOCKS.length) * 100))) };
  }, [done]);

  const toggleDone = (id: string) => {
    setDone((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      writeDoneBlocks(next);
      return next;
    });
  };

  return { done, progress, toggleDone };
}
