'use client';

import { useEffect, useState } from 'react';
import { useExplorer } from '@/lib/store';
import { useReducedMotion } from '@/lib/hooks';

const STEPS = [
  'Establishing range link',
  'Loading vehicle geometry',
  'Initialising propulsion systems',
  'Arming avionics and telemetry',
  'Configuring payload deck',
  'Vehicle ready',
];

/**
 * Progressive loading screen.
 *
 * It advances on its own so the visitor always sees motion, but will not
 * dismiss until the 3D scene has actually rendered a frame — so the reveal
 * never hands over to a blank canvas.
 */
export default function Loader() {
  const sceneReady = useExplorer((s) => s.sceneReady);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    const delay = reduced ? 120 : 260 + Math.random() * 220;
    const id = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(id);
  }, [step, reduced]);

  useEffect(() => {
    if (!sceneReady || step < STEPS.length - 1) return;
    const id = setTimeout(() => setDismissed(true), reduced ? 80 : 650);
    return () => clearTimeout(id);
  }, [sceneReady, step, reduced]);

  if (dismissed) return null;

  const progress = ((step + (sceneReady ? 1 : 0)) / (STEPS.length + 1)) * 100;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[120] grid place-items-center bg-void transition-opacity duration-700
                  ${sceneReady && step >= STEPS.length - 1 ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative w-[min(30rem,82vw)] px-2">
        <p className="label-mono">Skyroot Aerospace / Mission Aagaman</p>
        <p className="mt-3 text-4xl font-light tracking-[-0.03em] text-paper md:text-5xl">VIKRAM-1</p>

        <div className="mt-8 h-px w-full bg-white/10">
          <div
            className="h-px bg-ember transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="mt-5 space-y-1.5" aria-label="Loading progress">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-mission
                          transition-colors duration-300 ${
                            i < step ? 'text-smoke' : i === step ? 'text-ember' : 'text-white/20'
                          }`}
            >
              <span aria-hidden className="w-3 text-center">
                {i < step ? '·' : i === step ? '>' : ''}
              </span>
              {s}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-sm text-[11px] leading-relaxed text-smoke">
          The 3D vehicle is a representative visualization built from published dimensions, not an
          engineering model.
        </p>
      </div>
    </div>
  );
}
