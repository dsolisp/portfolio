import { useEffect, useState } from 'react';

const KEY = 'portfolio-theme';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const s = localStorage.getItem(KEY);
      return s === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  };
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label="Toggle theme"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        width: '2.6rem',
        height: '2.6rem',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        background: 'var(--panel)',
        color: 'var(--text)',
        cursor: 'pointer',
        fontSize: '1.15rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow)',
        transition: 'border-color 0.18s ease, background 0.18s ease',
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
