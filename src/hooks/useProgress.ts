import { useMemo, useState } from 'react';
import { ALL_BLOCKS } from '../data/content';
import { readDoneBlocks, writeDoneBlocks } from '../utils/content';

export function useProgress() {
  const [done, setDone] = useState<Set<number>>(() => readDoneBlocks());

  const progress = useMemo(() => {
    const count = done.size;
    return { count, percent: count > 0 ? Math.round((count / ALL_BLOCKS.length) * 100) : 0 };
  }, [done]);

  const toggleDone = (id: number) => {
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
