'use client';

import { useExplorer } from '@/lib/store';

const INGREDIENTS = [
  'Materials',
  'Propulsion',
  'Software',
  'Electronics',
  'Structures',
  'People',
  'Payloads',
];

export default function Finale() {
  const reset = useExplorer((s) => s.requestCameraReset);
  const setExploded = useExplorer((s) => s.setExploded);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[clamp(1.5rem,4.5vw,2.75rem)] font-extralight leading-[1.15] tracking-[-0.025em] text-paper">
        Every rocket is a system of thousands of decisions.
      </p>

      <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
        {INGREDIENTS.map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            <span className="border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-mission text-bone">
              {t}
            </span>
            {i < INGREDIENTS.length - 1 && (
              <span className="font-mono text-[12px] text-ember" aria-hidden>
                +
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-[12px] uppercase tracking-mission text-ember">=</p>

      <p className="mt-6 text-[15px] leading-relaxed text-bone/85 md:text-lg">
        A vehicle capable of putting something into orbit.
      </p>

      <p className="mx-auto mt-6 max-w-xl text-[13px] leading-relaxed text-smoke">
        None of those parts is impressive on its own. A carbon tube, a block of propellant, a
        circuit board, four small engines printed rather than machined. What makes a launch vehicle
        remarkable is that all of it has to be right at the same time, once, with nobody on board.
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#rocket"
          onClick={() => {
            reset();
            setExploded(false);
          }}
          className="btn-solid"
        >
          Start with the rocket
        </a>
        <a href="#payloads" className="btn-ghost">
          Explore another system
        </a>
      </div>
    </div>
  );
}
