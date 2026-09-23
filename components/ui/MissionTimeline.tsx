'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { timeline, timelineNote } from '@/data/mission';
import { componentById } from '@/data/components';
import { payloadById } from '@/data/payloads';
import { useExplorer } from '@/lib/store';
import { useReducedMotion } from '@/lib/hooks';
import ClaimLine from './ClaimLine';
import ConfidenceBadge from './ConfidenceBadge';
import SourceList from './SourceList';

const W = 1000;
const H = 320;

/** Gravity-turn-shaped ascent path. Illustrative, not a plotted trajectory. */
function pathPoint(t: number) {
  const x = 60 + Math.pow(t, 1.55) * (W - 130);
  const y = H - 40 - (1 - Math.pow(1 - t, 2.1)) * (H - 90);
  return { x, y };
}

export default function MissionTimeline() {
  const index = useExplorer((s) => s.timelineIndex);
  const setIndex = useExplorer((s) => s.setTimelineIndex);
  const selectComponent = useExplorer((s) => s.selectComponent);
  const setExploded = useExplorer((s) => s.setExploded);
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLInputElement>(null);

  const event = timeline[Math.min(index, timeline.length - 1)];

  const pathD = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 80; i += 1) {
      const { x, y } = pathPoint(i / 80);
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, []);

  const marker = pathPoint(event.t);
  // Clamp the floating label so it never runs off either edge of the diagram.
  const labelX = Math.min(Math.max(marker.x, 96), W - 96);

  const step = useCallback(
    (dir: number) => setIndex(Math.min(timeline.length - 1, Math.max(0, index + dir))),
    [index, setIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== railRef.current) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  return (
    <div className="space-y-8">
      {/* Trajectory diagram */}
      <div className="relative border border-white/[0.08] bg-white/[0.012]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label={`Ascent diagram. Current event: ${event.title}.`}
        >
          <defs>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d2b4a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0d2b4a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b1f" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff6b1f" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Atmosphere bands — conceptual, unlabelled by altitude. */}
          <rect x="0" y={H - 44} width={W} height="44" fill="url(#ground)" />
          <line x1="0" y1={H - 44} x2={W} y2={H - 44} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          {[0.28, 0.52, 0.76].map((f, i) => (
            <line
              key={f}
              x1="0"
              y1={(H - 44) * (1 - f)}
              x2={W}
              y2={(H - 44) * (1 - f)}
              stroke="rgba(255,255,255,0.045)"
              strokeDasharray="3 8"
              strokeWidth="1"
            />
          ))}

          <path d={pathD} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
          <path
            d={pathD}
            fill="none"
            stroke="url(#trail)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 2000,
              strokeDashoffset: 2000 - 2000 * event.t,
              transition: reduced ? 'none' : 'stroke-dashoffset 600ms cubic-bezier(0.16,1,0.3,1)',
            }}
          />

          {timeline.map((e, i) => {
            const p = pathPoint(e.t);
            const active = i === index;
            return (
              <g key={e.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 5.5 : 3}
                  fill={active ? '#ff6b1f' : i < index ? '#8b939f' : 'rgba(255,255,255,0.25)'}
                />
                {active && (
                  <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="#ff6b1f" strokeOpacity="0.5" />
                )}
              </g>
            );
          })}

          <g
            style={{
              transform: `translate(${labelX}px, ${Math.max(marker.y, 34)}px)`,
              transition: reduced ? 'none' : 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <text
              x="0"
              y="-22"
              textAnchor="middle"
              className="fill-bone"
              style={{ font: '500 13px var(--font-mono)' }}
            >
              {event.title}
            </text>
          </g>

          <text x="60" y={H - 14} className="fill-[#8b939f]" style={{ font: '400 11px var(--font-mono)' }}>
            SRIHARIKOTA
          </text>
          <text
            x={W - 60}
            y={H - 14}
            textAnchor="end"
            className="fill-[#8b939f]"
            style={{ font: '400 11px var(--font-mono)' }}
          >
            450 KM LEO (REPORTED)
          </text>
        </svg>

        <p className="border-t border-white/[0.07] px-4 py-2 text-[10px] leading-relaxed text-smoke">
          Conceptual ascent diagram. The curve shows the shape of a gravity turn, not Vikram-1&rsquo;s
          plotted trajectory.
        </p>
      </div>

      {/* Scrubber */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => step(-1)} className="btn-ghost" aria-label="Previous event">
            &larr;
          </button>
          <input
            ref={railRef}
            type="range"
            min={0}
            max={timeline.length - 1}
            step={1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            aria-label="Mission timeline scrubber"
            aria-valuetext={`${event.clock}. ${event.title}`}
            className="h-1 w-full cursor-pointer appearance-none bg-white/12 accent-ember
                       [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-ember"
          />
          <button type="button" onClick={() => step(1)} className="btn-ghost" aria-label="Next event">
            &rarr;
          </button>
        </div>

        <ol className="scrollbar-thin -mx-5 flex gap-1.5 overflow-x-auto px-5 md:mx-0 md:px-0">
          {timeline.map((e, i) => (
            <li key={e.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? 'step' : undefined}
                className={`border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-mission
                            transition-colors ${
                              i === index
                                ? 'border-ember bg-ember text-void'
                                : 'border-white/12 text-smoke hover:border-white/30 hover:text-bone'
                            }`}
              >
                {e.title}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Event reader */}
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5 border border-white/[0.09] p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-mission text-ember">
              {event.clock}
            </span>
            <ConfidenceBadge confidence={event.altitudeNote.confidence} />
          </div>

          <h3 className="text-2xl font-light tracking-[-0.02em] text-paper">{event.title}</h3>

          <div>
            <h4 className="label-mono mb-1.5">What happens</h4>
            <p className="text-[14px] leading-[1.75] text-bone/90">{event.whatHappens}</p>
          </div>

          <div>
            <h4 className="label-mono mb-1.5">Why</h4>
            <p className="text-[14px] leading-[1.75] text-bone/90">{event.whyItHappens}</p>
          </div>

          <ClaimLine label="Altitude" claim={event.altitudeNote} />

          <SourceList ids={event.sources} />
        </div>

        <aside className="space-y-5 border border-white/[0.09] p-5">
          <div>
            <h4 className="label-mono mb-2">Systems involved</h4>
            <ul className="flex flex-wrap gap-1.5">
              {event.activeComponentIds.map((cid) => {
                const c = componentById.get(cid);
                if (!c) return null;
                return (
                  <li key={cid}>
                    <button
                      type="button"
                      onClick={() => {
                        setExploded(true);
                        selectComponent(cid);
                        document
                          .getElementById('rocket')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="border border-white/12 px-2 py-1 font-mono text-[9px] uppercase
                                 tracking-mission text-smoke transition-colors
                                 hover:border-ember/60 hover:text-bone"
                    >
                      {c.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="label-mono mb-2">
              Payloads still attached
              <span className="ml-1.5 text-ember">{event.attachedPayloadIds.length}</span>
            </h4>
            <ul className="space-y-1">
              {event.attachedPayloadIds.map((pid) => {
                const p = payloadById.get(pid);
                if (!p) return null;
                return (
                  <li key={pid} className="flex items-center gap-2 text-[12px] text-bone/85">
                    <span
                      className="h-1.5 w-1.5 shrink-0"
                      style={{ backgroundColor: p.accent }}
                      aria-hidden
                    />
                    {p.name}
                  </li>
                );
              })}
            </ul>
            {event.id === 'deployment' && (
              <p className="mt-2 text-[11px] leading-relaxed text-smoke">
                SCOPE, SOLARAS and the DCUBED demonstrators have been released. Embrace was a
                demonstration aboard the vehicle, and the two symbolic payloads have no published
                deployment.
              </p>
            )}
          </div>
        </aside>
      </div>

      <p className="border-l-2 border-white/15 pl-3 text-[12px] leading-relaxed text-smoke">
        {timelineNote}
      </p>
    </div>
  );
}
