'use client';

import { useState } from 'react';
import { scaleNote, scaleReferences } from '@/data/learning';
import { rocket } from '@/data/rocket';
import ConfidenceBadge from './ConfidenceBadge';
import SourceList from './SourceList';

const ROCKET_H = 20;

/** "Put it in perspective." Everything shares one vertical scale. */
export default function ScaleComparison() {
  const [activeId, setActiveId] = useState(scaleReferences[0].id);
  const active = scaleReferences.find((r) => r.id === activeId)!;
  const tallest = Math.max(ROCKET_H, active.height);

  const pct = (h: number) => `${(h / tallest) * 100}%`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
      <div className="border border-white/[0.08] p-5 md:p-8">
        <div className="flex h-[22rem] items-end gap-8 md:h-[26rem] md:gap-14">
          {/* Vikram-1 */}
          <figure className="flex h-full flex-1 flex-col justify-end">
            <div
              className="relative w-full max-w-[2.1rem] transition-[height] duration-700 ease-out"
              style={{ height: pct(ROCKET_H) }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b from-smoke to-ash"
                style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 top-[14%] bg-gradient-to-b from-ash to-steel" aria-hidden />
              <div className="absolute inset-x-0 bottom-[22%] h-[2px] bg-ember" aria-hidden />
            </div>
            <figcaption className="mt-3">
              <span className="block font-mono text-[10px] uppercase tracking-mission text-ember">
                Vikram-1
              </span>
              <span className="text-[13px] text-bone">~20 m</span>
            </figcaption>
          </figure>

          {/* Comparison object */}
          <figure className="flex h-full flex-1 flex-col justify-end">
            <div
              className="w-full max-w-[9rem] transition-[height] duration-700 ease-out"
              style={{ height: pct(active.height) }}
            >
              <Silhouette icon={active.icon} />
            </div>
            <figcaption className="mt-3">
              <span className="label-mono block">{active.name}</span>
              <span className="text-[13px] text-bone">~{active.height} m</span>
            </figcaption>
          </figure>

          {/* Scale rule */}
          <div className="hidden h-full w-14 shrink-0 flex-col justify-between border-l border-white/10 pl-2 sm:flex">
            {[20, 15, 10, 5, 0].map((m) => (
              <span key={m} className="font-mono text-[9px] text-smoke">
                {m} m
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[14px] leading-relaxed text-bone/85">{active.note}</p>
      </div>

      <div className="space-y-5">
        <div
          role="radiogroup"
          aria-label="Comparison object"
          className="scrollbar-thin -mx-5 flex gap-1.5 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0"
        >
          {scaleReferences.map((r) => (
            <button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={activeId === r.id}
              onClick={() => setActiveId(r.id)}
              className={`shrink-0 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-mission
                          transition-colors ${
                            activeId === r.id
                              ? 'border-ember bg-ember text-void'
                              : 'border-white/12 text-smoke hover:border-white/30 hover:text-bone'
                          }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="border border-white/[0.08] p-4">
          <div className="flex items-start justify-between gap-3">
            <span className="label-mono">Vehicle height</span>
            <ConfidenceBadge confidence={rocket.height.confidence} />
          </div>
          <p className="mt-1.5 text-[13px] text-bone">{rocket.height.value}</p>
          <div className="mt-3 flex items-start justify-between gap-3">
            <span className="label-mono">Diameter</span>
            <ConfidenceBadge confidence={rocket.diameter.confidence} />
          </div>
          <p className="mt-1.5 text-[13px] text-bone">{rocket.diameter.value}</p>
        </div>

        <p className="text-[11px] leading-relaxed text-smoke">{scaleNote}</p>
        <p className="text-[11px] leading-relaxed text-smoke">{active.sourceNote}</p>

        <SourceList ids={[...rocket.height.sources]} label="Sources for vehicle dimensions" />
      </div>
    </div>
  );
}

function Silhouette({ icon }: { icon: string }) {
  const fill = '#4b525c';
  switch (icon) {
    case 'human':
      return (
        <svg viewBox="0 0 30 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <circle cx="15" cy="11" r="8" fill={fill} />
          <rect x="9" y="21" width="12" height="42" rx="4" fill={fill} />
          <rect x="10" y="62" width="4" height="38" fill={fill} />
          <rect x="16" y="62" width="4" height="38" fill={fill} />
        </svg>
      );
    case 'bus':
      return (
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect x="2" y="4" width="96" height="42" rx="5" fill={fill} />
          <rect x="10" y="12" width="20" height="14" fill="#0e1013" />
          <rect x="38" y="12" width="20" height="14" fill="#0e1013" />
          <rect x="66" y="12" width="20" height="14" fill="#0e1013" />
          <circle cx="24" cy="50" r="8" fill={fill} />
          <circle cx="76" cy="50" r="8" fill={fill} />
        </svg>
      );
    case 'tree':
      return (
        <svg viewBox="0 0 80 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect x="35" y="55" width="10" height="45" fill={fill} />
          <circle cx="40" cy="36" r="30" fill={fill} />
          <circle cx="20" cy="50" r="17" fill={fill} />
          <circle cx="60" cy="50" r="17" fill={fill} />
        </svg>
      );
    case 'building':
      return (
        <svg viewBox="0 0 70 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect x="2" y="0" width="66" height="100" fill={fill} />
          {[0, 1, 2, 3, 4, 5].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={10 + c * 20} y={8 + r * 15} width="12" height="9" fill="#0e1013" />
            )),
          )}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <ellipse cx="60" cy="22" rx="58" ry="8" fill={fill} />
          <path d="M55 18 L40 2 L48 18 Z" fill={fill} />
          <path d="M55 26 L40 40 L48 26 Z" fill={fill} />
          <path d="M104 18 L114 6 L112 18 Z" fill={fill} />
        </svg>
      );
  }
}
