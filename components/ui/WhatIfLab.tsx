'use client';

import { useMemo, useState } from 'react';
import { whatIfDisclaimer, whatIfScenarios } from '@/data/learning';
import type { WhatIfScenario } from '@/data/types';

type Status = 'nominal' | 'degraded' | 'failed';

interface Outcome {
  headline: string;
  detail: string;
  meter: number;
  status: Status;
}

/**
 * Conceptual demonstrations.
 *
 * Each one exposes a single relationship with a single slider. The maths is
 * deliberately crude and labelled as such: the goal is for someone to feel
 * why margins are thin, not to predict anything about Vikram-1.
 */
function evaluate(s: WhatIfScenario, v: number): Outcome {
  switch (s.model) {
    case 'burn-duration': {
      // Velocity shortfall compounds: later stages cannot buy it back.
      const achieved = Math.max(0, 1 - (100 - v) * 0.028);
      if (v >= 99) return { headline: 'Nominal orbit', detail: 'The stage delivers what the upper stages were sized for. Injection as planned.', meter: 1, status: 'nominal' };
      if (achieved > 0.82) return { headline: 'Low orbit, short life', detail: 'Injection happens, but below target. The satellite works and re-enters sooner than planned.', meter: achieved, status: 'degraded' };
      if (achieved > 0.6) return { headline: 'Marginal orbit', detail: 'Barely orbital. Drag begins taking it down within weeks. Much of the mission is lost.', meter: achieved, status: 'degraded' };
      return { headline: 'Suborbital — re-entry', detail: 'The vehicle never reaches orbital velocity. It arcs over and comes back down.', meter: achieved, status: 'failed' };
    }
    case 'dry-mass': {
      const extra = (v - 100) / 100;
      const payload = Math.max(0, 1 - extra * 3.4);
      if (v <= 101) return { headline: 'Full payload', detail: 'Structure is at its design mass. The whole payload allocation is available.', meter: 1, status: 'nominal' };
      if (payload > 0.4) return { headline: `Payload cut to ~${Math.round(payload * 100)}%`, detail: 'Extra inert mass is accelerated the whole way and does nothing at the end. It comes straight out of the customer’s allocation.', meter: payload, status: 'degraded' };
      if (payload > 0) return { headline: `Payload cut to ~${Math.round(payload * 100)}%`, detail: 'Almost nothing left to sell. This is why a composite airframe is an arithmetic decision, not an aesthetic one.', meter: payload, status: 'failed' };
      return { headline: 'No payload capability', detail: 'The vehicle can now only lift itself. A few percent of extra structure erased the entire mission.', meter: 0, status: 'failed' };
    }
    case 'payload-mass': {
      const alt = Math.max(0, 1 - Math.max(0, v - 200) / 420);
      if (v <= 350) return { headline: `Reaches target orbit with ${v} kg`, detail: 'Within the capability Skyroot quotes for low Earth orbit. Sources differ on the exact figure, and it always depends on the destination.', meter: alt, status: 'nominal' };
      if (alt > 0.3) return { headline: `${v} kg — lower orbit only`, detail: 'The same vehicle can still fly this, but not as high. Payload and altitude trade against each other continuously.', meter: alt, status: 'degraded' };
      return { headline: `${v} kg — beyond capability`, detail: 'No orbit is reachable with this mass. It would need a larger vehicle.', meter: alt, status: 'failed' };
    }
    case 'horizontal-velocity': {
      if (v >= 99) return { headline: 'Orbit achieved', detail: 'The fall curves exactly as fast as the Earth does. The satellite keeps missing the ground.', meter: 1, status: 'nominal' };
      if (v > 92) return { headline: 'Elliptical, grazing the atmosphere', detail: 'It comes back around, but the low point dips into air thick enough to slow it. It will not last.', meter: v / 100, status: 'degraded' };
      return { headline: 'Ballistic — it comes back down', detail: `At ${v}% of orbital velocity the vehicle simply falls. It may reach 450 km, but height was never the problem.`, meter: v / 100, status: 'failed' };
    }
    case 'fairing': {
      if (v < 25) return { headline: 'Jettisoned too early', detail: 'The payloads are exposed while the air is still significant. Heating and aerodynamic loads reach hardware never designed for them.', meter: 0.3, status: 'failed' };
      if (v > 88) return { headline: 'Jettisoned too late', detail: 'The payloads are safe, but the shell has been carried as dead weight well past the point it stopped earning its place. Performance is lost.', meter: 0.6, status: 'degraded' };
      return { headline: 'Jettison window', detail: 'Late enough that heating on the payload is acceptable, early enough that the mass penalty is small. This is the compromise the whole design is built around.', meter: 1, status: 'nominal' };
    }
    case 'staging': {
      const loss = v / 100;
      if (v === 0) return { headline: 'Clean separation', detail: 'The spent stage is gone. The next motor accelerates only what still matters.', meter: 1, status: 'nominal' };
      if (loss < 0.35) return { headline: 'Partial separation', detail: 'Some structure is retained. Performance drops, and the vehicle may be aerodynamically or dynamically wrong.', meter: 1 - loss * 2, status: 'degraded' };
      return { headline: 'Separation failure', detail: 'The vehicle is dragging a dead motor. The next stage was never sized for this, and may not be able to ignite safely at all.', meter: Math.max(0, 1 - loss * 2), status: 'failed' };
    }
    case 'deployment': {
      if (v > 85) return { headline: 'Deployed', detail: 'The payload is pushed off with just enough relative velocity to open a safe gap without tumbling it.', meter: 1, status: 'nominal' };
      if (v > 25) return { headline: 'Partial deployment', detail: 'Something moved, but not fully. Useful data may still come back — Cosmoserve reported exactly this outcome for Embrace on Mission Aagaman.', meter: v / 100, status: 'degraded' };
      return { headline: 'Remained attached', detail: 'The payload stays on the vehicle. It cannot point itself, and it shares the upper stage’s orbit and fate.', meter: v / 100, status: 'failed' };
    }
  }
}

const statusColor: Record<Status, string> = {
  nominal: '#5bc98a',
  degraded: '#e8b13b',
  failed: '#ff5f4d',
};

export default function WhatIfLab() {
  const [activeId, setActiveId] = useState(whatIfScenarios[0].id);
  const scenario = whatIfScenarios.find((s) => s.id === activeId)!;
  const [value, setValue] = useState(scenario.nominal);

  const outcome = useMemo(() => evaluate(scenario, value), [scenario, value]);

  const select = (id: string) => {
    const next = whatIfScenarios.find((s) => s.id === id)!;
    setActiveId(id);
    setValue(next.nominal);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[19rem_1fr] lg:items-start">
      <ul className="border-t border-white/[0.08]">
        {whatIfScenarios.map((s) => (
          <li key={s.id} className="border-b border-white/[0.08]">
            <button
              type="button"
              onClick={() => select(s.id)}
              aria-current={activeId === s.id ? 'true' : undefined}
              className={`w-full py-3.5 pr-3 text-left text-[14px] leading-snug transition-colors ${
                activeId === s.id ? 'text-ember' : 'text-smoke hover:text-bone'
              }`}
            >
              {s.question}
            </button>
          </li>
        ))}
      </ul>

      <div className="border border-white/[0.09] p-5 md:p-7">
        <span className="label-mono">Conceptual demonstration</span>
        <h3 className="mt-2 text-xl font-light leading-snug tracking-[-0.015em] text-paper md:text-2xl">
          {scenario.question}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-bone/85">{scenario.shortAnswer}</p>

        {/* The control */}
        <div className="mt-7">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor="whatif-slider" className="label-mono">
              {scenario.controlLabel}
            </label>
            <span className="font-mono text-[13px] text-bone">
              {value}
              <span className="ml-1 text-[10px] text-smoke">{scenario.controlUnit}</span>
            </span>
          </div>
          <input
            id="whatif-slider"
            type="range"
            min={scenario.min}
            max={scenario.max}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none bg-white/12
                       [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-ember"
          />
          <div className="mt-1 flex justify-between font-mono text-[9px] text-smoke">
            <span>{scenario.min}</span>
            <span>{scenario.max}</span>
          </div>
        </div>

        {/* The outcome */}
        <div
          className="mt-7 border-l-2 pl-4"
          style={{ borderColor: statusColor[outcome.status] }}
          aria-live="polite"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-mission"
            style={{ color: statusColor[outcome.status] }}
          >
            {outcome.status === 'nominal' ? 'Nominal' : outcome.status === 'degraded' ? 'Degraded' : 'Mission lost'}
          </span>
          <p className="mt-1.5 text-lg font-light leading-snug text-paper">{outcome.headline}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-bone/85">{outcome.detail}</p>

          <div className="mt-4 h-1 w-full max-w-sm bg-white/10">
            <div
              className="h-1 transition-[width] duration-300 ease-out"
              style={{
                width: `${Math.max(2, outcome.meter * 100)}%`,
                backgroundColor: statusColor[outcome.status],
              }}
            />
          </div>
        </div>

        <p className="mt-7 border-t border-white/[0.07] pt-4 text-[14px] leading-[1.75] text-bone/85">
          {scenario.explanation}
        </p>

        <p className="mt-5 text-[11px] leading-relaxed text-smoke">{whatIfDisclaimer}</p>
      </div>
    </div>
  );
}
