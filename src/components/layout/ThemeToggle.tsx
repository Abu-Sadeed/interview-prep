import { useDarkMode } from '../../hooks/useDarkMode';

export function ThemeToggle() {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => setIsDark((value) => !value)}
      className="app-btn"
    >
      {isDark ? 'Dark' : 'Light'}
    </button>
  );
}
