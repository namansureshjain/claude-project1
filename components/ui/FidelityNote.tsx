import { rocket } from '@/data/rocket';

/** Requirement one of this project: never let a visualization imply accuracy it does not have. */
export default function FidelityNote() {
  return (
    <div className="border border-white/[0.09] bg-white/[0.015] p-5 md:p-6">
      <h3 className="label-mono mb-3">About the 3D model</h3>
      <p className="max-w-3xl text-[14px] leading-[1.75] text-bone/85">{rocket.modelFidelityNote}</p>

      <dl className="mt-5 grid gap-px bg-white/[0.07] sm:grid-cols-3">
        {[
          {
            t: 'Documented geometry',
            d: 'Shape follows published drawings or dimensioned documentation.',
            used: 'Not used here — no such documentation is public for Vikram-1.',
          },
          {
            t: 'Representative',
            d: 'Proportions derived from published overall dimensions and architecture.',
            used: 'Used for the stages, fairing, interstages and nozzles.',
          },
          {
            t: 'Conceptual',
            d: 'Stands in for something with no published geometry at all.',
            used: 'Used for avionics, guidance, telemetry and the payload arrangement.',
          },
        ].map((x) => (
          <div key={x.t} className="bg-void p-4">
            <dt className="font-mono text-[10px] uppercase tracking-mission text-ember">{x.t}</dt>
            <dd className="mt-2 text-[12px] leading-relaxed text-bone/85">{x.d}</dd>
            <dd className="mt-2 text-[11px] leading-relaxed text-smoke">{x.used}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
