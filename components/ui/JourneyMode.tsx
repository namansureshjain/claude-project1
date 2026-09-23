'use client';

import { useState } from 'react';
import { journeys } from '@/data/learning';
import ConfidenceBadge from './ConfidenceBadge';
import SourceList from './SourceList';

/** Follow one thing end to end: design, manufacture, flight, outcome. */
export default function JourneyMode() {
  const [activeId, setActiveId] = useState(journeys[0].id);
  const journey = journeys.find((j) => j.id === activeId)!;

  return (
    <div>
      <div role="tablist" aria-label="Choose what to follow" className="mb-8 flex flex-wrap gap-1.5">
        {journeys.map((j) => (
          <button
            key={j.id}
            role="tab"
            aria-selected={activeId === j.id}
            type="button"
            onClick={() => setActiveId(j.id)}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-mission
                        transition-colors ${
                          activeId === j.id
                            ? 'border-ember bg-ember text-void'
                            : 'border-white/12 text-smoke hover:border-white/30 hover:text-bone'
                        }`}
          >
            {j.title}
          </button>
        ))}
      </div>

      <p className="mb-6 text-[13px] text-smoke">
        Following: <span className="text-bone">{journey.subject}</span>
      </p>

      <ol className="relative border-l border-white/[0.1] pl-6 md:pl-8">
        {journey.stages.map((s, i) => (
          <li key={s.id} className="relative pb-8 last:pb-0">
            <span
              className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-[9px] w-[9px] border border-ember
                         bg-void md:-left-[calc(2rem+5px)]"
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-mission text-ember">
                {String(i + 1).padStart(2, '0')} &middot; {s.label}
              </span>
              <ConfidenceBadge confidence={s.confidence} />
            </div>
            <p className="mt-2 max-w-2xl text-[14px] leading-[1.75] text-bone/90">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 max-w-2xl">
        <SourceList ids={journey.sources} />
      </div>
    </div>
  );
}
