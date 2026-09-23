'use client';

import { useMemo, useState } from 'react';
import { categoryLabels, components } from '@/data/components';
import type { ComponentCategory } from '@/data/types';
import { useExplorer } from '@/lib/store';
import ConfidenceBadge from './ConfidenceBadge';

const CATEGORIES: (ComponentCategory | 'all')[] = [
  'all',
  'propulsion',
  'structures',
  'payload-systems',
  'avionics',
  'gnc',
  'separation',
  'mission-interfaces',
];

/**
 * Every component, reachable without the 3D view.
 *
 * This is not a fallback bolted on at the end: it is the same data, in a form
 * that works with a keyboard, a screen reader, or a device that cannot run
 * WebGL. Selecting here also drives the 3D camera when the scene is available.
 */
export default function TextExplorer() {
  const [filter, setFilter] = useState<ComponentCategory | 'all'>('all');
  const selectComponent = useExplorer((s) => s.selectComponent);
  const setExploded = useExplorer((s) => s.setExploded);
  const setSceneMode = useExplorer((s) => s.setSceneMode);
  const selectedId = useExplorer((s) => s.selectedComponentId);
  const mode = useExplorer((s) => s.learningMode);

  const list = useMemo(
    () =>
      [...components]
        .filter((c) => filter === 'all' || c.category === filter)
        .sort((a, b) => b.position - a.position),
    [filter],
  );

  const open = (id: string) => {
    setSceneMode('vehicle');
    setExploded(true);
    selectComponent(id);
    document.getElementById('rocket')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Horizontally scrollable on small screens rather than wrapping into a wall. */}
      <div
        role="tablist"
        aria-label="Filter components by category"
        className="scrollbar-thin -mx-5 mb-6 flex gap-1.5 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            type="button"
            onClick={() => setFilter(c)}
            className={`shrink-0 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-mission
                        transition-colors duration-200 ${
                          filter === c
                            ? 'border-ember bg-ember text-void'
                            : 'border-white/12 text-smoke hover:border-white/30 hover:text-bone'
                        }`}
          >
            {c === 'all' ? `All (${components.length})` : categoryLabels[c]}
          </button>
        ))}
      </div>

      <ul className="grid gap-px bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <li key={c.id} className="bg-void">
            <button
              type="button"
              onClick={() => open(c.id)}
              aria-current={selectedId === c.id ? 'true' : undefined}
              className={`group flex h-full w-full flex-col items-start gap-3 p-5 text-left
                          transition-colors duration-200 hover:bg-white/[0.035] ${
                            selectedId === c.id ? 'bg-white/[0.05]' : ''
                          }`}
            >
              <span className="flex w-full items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-mission text-ember">
                  {c.code}
                </span>
                <span className="label-mono">{categoryLabels[c.category]}</span>
              </span>

              <span className="text-lg font-light leading-snug tracking-[-0.01em] text-paper">
                {c.name}
              </span>

              <span className="text-[13px] leading-relaxed text-smoke">
                {mode === 'simple' ? c.shortDescription : c.role}
              </span>

              <span className="mt-auto flex w-full items-center justify-between gap-2 pt-2">
                <ConfidenceBadge confidence={c.manufacturer.confidence} />
                <span
                  className="font-mono text-[9px] uppercase tracking-mission text-smoke
                             transition-colors group-hover:text-ember"
                >
                  Open &rarr;
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
