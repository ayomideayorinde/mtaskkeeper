import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

export function ThemeButton() {
  const [dark, setDark] = useState(() => {
    try { return (localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark'; }
    catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* Storage may be disabled. */ }
  }, [dark]);
  return <button className="icon-button theme-button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>{dark ? <LuSun /> : <LuMoon />}</button>;
}
