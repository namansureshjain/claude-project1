'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useInView, useWebGLSupport } from '@/lib/hooks';
import SourceList from './SourceList';

const OrbitScene = dynamic(() => import('@/components/three/OrbitScene'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <span className="label-mono">Loading orbit view</span>
    </div>
  ),
});

const QUESTIONS = [
  {
    q: 'What is low Earth orbit?',
    a: 'Orbits from roughly 160 km up to about 2,000 km. Mission Aagaman’s payloads were reported placed at 450 km, which sits comfortably inside it. Low enough for sharp Earth imaging and a short radio round trip; high enough that the remaining traces of atmosphere take years, not days, to pull a satellite down.',
  },
  {
    q: 'How high is 450 km, really?',
    a: 'About the distance from Delhi to Jaipur, but straight up. It sounds enormous and it is not: on the diagram here, drawn to scale, the orbit sits barely off the surface. Earth’s radius is around 6,371 km, so 450 km is about 7% of it. Satellites in low Earth orbit are skimming the planet.',
  },
  {
    q: 'What does orbital velocity mean?',
    a: 'Roughly 7.6 km/s at this altitude — about 27,000 km/h, or Delhi to Mumbai in three minutes. It is the speed at which the curve of your fall exactly matches the curve of the Earth. Reaching it is what almost all of a rocket’s energy is spent on.',
  },
  {
    q: "Why doesn't the satellite fall back to Earth?",
    a: 'It is falling. Continuously. It simply keeps missing. Gravity is pulling it down the whole time, but it is moving sideways so fast that by the time it has fallen a few metres, the ground has curved away by the same amount. Orbit is not the absence of gravity; it is falling arranged so that you never land.',
  },
  {
    q: 'Why is reaching orbit different from reaching altitude?',
    a: 'Going up is easy. A sounding rocket can touch 450 km and be back on the ground in minutes, because it has height but almost no sideways speed. Staying up needs that speed. Look at the dashed ascent path here: it barely climbs and mostly curves sideways. That is not a stylistic choice — that is what a launch actually looks like.',
  },
];

export default function OrbitVisualization() {
  const [open, setOpen] = useState(0);
  const webgl = useWebGLSupport();
  // The secondary canvas only mounts once its section is near the viewport.
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full overflow-hidden border border-white/[0.08] bg-void"
      >
        {webgl === false ? <OrbitFallback /> : inView && webgl && <OrbitScene />}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.07] bg-void/70 px-3 py-2 backdrop-blur-sm">
          <Legend color="#ff6b1f" label="450 km orbit (reported)" />
          <Legend color="#8b939f" label="Ascent path (conceptual)" dashed />
          <Legend color="#5aa9ff" label="Atmosphere" />
        </div>
      </div>

      <div>
        <ul className="border-t border-white/[0.08]">
          {QUESTIONS.map((item, i) => (
            <li key={item.q} className="border-b border-white/[0.08]">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-start justify-between gap-4 py-4 text-left"
              >
                <span
                  className={`text-[15px] leading-snug transition-colors ${
                    open === i ? 'text-ember' : 'text-bone'
                  }`}
                >
                  {item.q}
                </span>
                <span className="mt-1 shrink-0 font-mono text-[11px] text-smoke" aria-hidden>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <p className="pb-5 pr-6 text-[14px] leading-[1.75] text-bone/85">{item.a}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <SourceList
            ids={['ani-aagaman', 'cnbc-launch', 'isro-first-private']}
            label="Sources for the orbit figures"
          />
        </div>
      </div>
    </div>
  );
}

/** Shown when WebGL is unavailable: the same point, drawn flat. */
function OrbitFallback() {
  return (
    <div className="grid h-full place-items-center p-6">
      <svg viewBox="0 0 200 200" className="h-full w-auto" role="img"
           aria-label="Diagram, to scale: a 450 km orbit sits very close to the Earth's surface.">
        <circle cx="100" cy="100" r="70" fill="#0f2c4d" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(90,169,255,0.45)" strokeWidth="1" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="#ff6b1f" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="175" cy="100" r="3.5" fill="#ff6b1f" />
        <text x="100" y="192" textAnchor="middle" className="fill-[#8b939f]"
              style={{ font: '400 9px var(--font-mono)' }}>
          450 KM ORBIT, TO SCALE
        </text>
      </svg>
    </div>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-mission text-smoke">
      <span
        className="h-[2px] w-4"
        style={{
          background: dashed
            ? `repeating-linear-gradient(to right, ${color} 0 3px, transparent 3px 6px)`
            : color,
        }}
        aria-hidden
      />
      {label}
    </span>
  );
}
