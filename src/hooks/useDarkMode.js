import { useState, useEffect } from 'react';

/**
 * useDarkMode — Persistent dark/light theme hook
 * ──────────────────────────────────────────────
 * Reads initial preference from localStorage, falls back to OS preference.
 * Applies 'data-theme="dark"' attribute to <html> element.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('agrovision-theme');
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('agrovision-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
