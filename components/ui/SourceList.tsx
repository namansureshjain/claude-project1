'use client';

import { useState } from 'react';
import { resolveSources, tierLabels } from '@/data/sources';

/**
 * The evidence drawer. Collapsed by default so it never crowds the
 * explanation, but always one click away from any claim.
 */
export default function SourceList({
  ids,
  label = 'Sources',
  defaultOpen = false,
}: {
  ids: string[];
  label?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const list = resolveSources(ids);

  if (list.length === 0) {
    return (
      <p className="font-mono text-[10px] uppercase tracking-mission text-smoke">
        No public source — not disclosed
      </p>
    );
  }

  return (
    <div className="border-t border-white/[0.08] pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="label-mono">
          {label} <span className="text-ember">({list.length})</span>
        </span>
        <span className="font-mono text-[10px] text-smoke" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <ul className="mt-3 space-y-2.5">
          {list.map((s) => (
            <li key={s.id} className="text-[11px] leading-relaxed">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone underline decoration-white/20 underline-offset-2
                           transition-colors hover:decoration-ember hover:text-ember"
              >
                {s.title}
              </a>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-mission text-smoke">
                {s.publisher}
                {s.published ? ` · ${s.published}` : ''} · {tierLabels[s.tier]}
              </span>
              {s.note && <span className="mt-1 block text-[11px] text-smoke">{s.note}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
