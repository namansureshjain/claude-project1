'use client';

import { useState } from 'react';

/**
 * The distinction beginners most often miss: the rocket is not the point.
 */
export default function RocketVsPayload() {
  const [side, setSide] = useState<'rocket' | 'payload'>('rocket');

  return (
    <div className="grid gap-px border border-white/[0.09] bg-white/[0.07] md:grid-cols-2">
      {(['rocket', 'payload'] as const).map((k) => {
        const activeSide = side === k;
        const isRocket = k === 'rocket';
        return (
          <button
            key={k}
            type="button"
            onMouseEnter={() => setSide(k)}
            onFocus={() => setSide(k)}
            onClick={() => setSide(k)}
            aria-pressed={activeSide}
            className={`bg-void p-6 text-left transition-colors duration-300 md:p-9 ${
              activeSide ? 'bg-white/[0.04]' : ''
            }`}
          >
            <span
              className={`label-mono transition-colors ${activeSide ? 'text-ember' : ''}`}
            >
              {isRocket ? 'The vehicle' : 'The reason'}
            </span>

            <h3 className="mt-3 text-2xl font-light tracking-[-0.02em] text-paper md:text-3xl">
              {isRocket ? 'Rocket' : 'Payload'}
            </h3>

            <p className="mt-1 font-mono text-[11px] uppercase tracking-mission text-ember">
              {isRocket ? '= transportation system' : '= the thing being delivered'}
            </p>

            <p className="mt-5 text-[14px] leading-[1.75] text-bone/90">
              {isRocket
                ? 'Nineteen of Vikram-1’s twenty metres exist to move the top metre. Four stages, three motors, a nose cone and a guidance system — all of it is consumed, discarded or left in orbit as spent hardware. The vehicle is the journey, and the journey is over in about sixteen minutes.'
                : 'Six objects rode in the top of the vehicle: two satellites, three technology demonstrations and two commemorative pieces. These are what the mission was actually for. Their work begins at the moment the rocket’s work ends.'}
            </p>

            <ul className="mt-5 space-y-2">
              {(isRocket
                ? [
                    'Built to be used once, then thrown away',
                    'Success means it stopped existing in the right place',
                    'Measured in thrust, mass ratio and seconds',
                  ]
                : [
                    'Built to keep working for months or years',
                    'Success means it is still alive and sending data',
                    'Measured in images, signals and answers',
                  ]
              ).map((t) => (
                <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-smoke">
                  <span className="mt-[7px] h-1 w-1 shrink-0 bg-ember" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
