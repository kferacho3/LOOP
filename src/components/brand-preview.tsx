'use client';
import { useEffect, useState } from 'react';
import { DEFAULT_PALETTE, isPalette, palettes, type PaletteId } from '@/content/brand';
const key = 'loop-brand-palette';
export function BrandTheme() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('theme');
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(key);
    } catch {}
    const palette = isPalette(query) ? query : isPalette(saved) ? saved : DEFAULT_PALETTE;
    document.documentElement.dataset.palette = palette;
    if (isPalette(query)) {
      try {
        localStorage.setItem(key, query);
      } catch {}
    }
  }, []);
  return null;
}
export function BrandPreview() {
  const [selected, setSelected] = useState<PaletteId>(DEFAULT_PALETTE);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const current = document.documentElement.dataset.palette;
      if (isPalette(current)) setSelected(current);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  function choose(id: PaletteId) {
    setSelected(id);
    document.documentElement.setAttribute('data-palette', id);
    try {
      localStorage.setItem(key, id);
    } catch {}
    setMessage('Palette applied across this browser.');
  }
  return (
    <div className="shell pb-24">
      <fieldset>
        <legend className="mb-6 text-lg font-bold">Choose a palette</legend>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {palettes.map((p) => (
            <label key={p.id} className="cursor-pointer border border-line bg-paper p-6">
              <div className="mb-6 flex h-20" aria-hidden>
                {p.colors.map((c) => (
                  <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="palette"
                  value={p.id}
                  checked={selected === p.id}
                  onChange={() => choose(p.id)}
                />
                <span className="font-bold">{p.name}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{p.description}</p>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href={`/?theme=${selected}`} className="brand-button">
          Preview the homepage
        </a>
        <button
          className="brand-button secondary"
          onClick={() => {
            choose(DEFAULT_PALETTE);
            try {
              localStorage.removeItem(key);
            } catch {}
            setMessage('Reset to the published palette.');
          }}
        >
          Reset to default
        </button>
        <button
          className="brand-button secondary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`${location.origin}/?theme=${selected}`);
              setMessage('Preview link copied.');
            } catch {
              setMessage(`Preview link: ${location.origin}/?theme=${selected}`);
            }
          }}
        >
          Copy preview link
        </button>
      </div>
      <p role="status" className="mt-5 text-sm">
        {message}
      </p>
      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
        Your selection follows you between pages and after refresh. It changes only your preview;
        the public site keeps its published palette.
      </p>
    </div>
  );
}
