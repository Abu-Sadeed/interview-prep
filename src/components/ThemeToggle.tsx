import { useDarkMode } from '../hooks/useDarkMode';

export function ThemeToggle() {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => setIsDark((value) => !value)}
      className="rounded border border-border2 bg-transparent px-3 py-1 font-mono text-[10px] text-text3 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-300 dark:hover:text-blue-300"
    >
      {isDark ? 'Dark' : 'Light'}
    </button>
  );
}
