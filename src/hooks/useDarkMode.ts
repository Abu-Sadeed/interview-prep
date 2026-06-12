import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('prep_theme') !== 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('prep_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, setIsDark };
}
