import { useEffect, useState } from 'react';

export function useTierState(blockId: number, count: number) {
  const [open, setOpen] = useState(() => {
    return Array.from({ length: count }, (_, index) => {
      const key = `tier_${blockId}_${index}`;
      return sessionStorage.getItem(key) !== 'closed';
    });
  });

  useEffect(() => {
    setOpen((current) => {
      if (current.length === count) {
        return current;
      }
      return Array.from({ length: count }, (_, index) => current[index] !== false);
    });
  }, [blockId, count]);

  const toggle = (index: number) => {
    const key = `tier_${blockId}_${index}`;
    setOpen((current) => {
      const next = [...current];
      next[index] = !next[index];
      sessionStorage.setItem(key, next[index] ? 'open' : 'closed');
      return next;
    });
  };

  return { open, toggle };
}
