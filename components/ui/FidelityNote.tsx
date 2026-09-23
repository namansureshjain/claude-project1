import { rocket } from '@/data/rocket';

/** Requirement one of this project: never let a visualization imply accuracy it does not have. */
export default function FidelityNote() {
  return (
    <div className="border border-white/[0.09] bg-white/[0.015] p-5 md:p-6">
      <h3 className="label-mono mb-3">About the 3D model</h3>
      <p className="max-w-3xl text-[14px] leading-[1.75] text-bone/85">{rocket.modelFidelityNote}</p>

      <div className="mt-5 grid gap-px bg-white/[0.07] sm:grid-cols-2">
        <div className="bg-void p-4">
          <h4 className="font-mono text-[10px] uppercase tracking-mission text-ember">
            The Earth and the Moon
          </h4>
          <p className="mt-2 text-[12px] leading-relaxed text-bone/85">
            The planet uses NASA imagery, which is in the public domain: surface
            colour, city lights, topography and cloud cover. The coastlines and the
            lights are real. The globe is turned so that India faces the viewer and the
            launch site is marked, and the sun&rsquo;s direction and the viewing altitude
            were chosen to compose the shot rather than to reconstruct a particular
            moment in the flight.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-smoke">
            The Moon is not photographic. No lunar map is bundled with this project, so
            its surface is generated procedurally, and it is drawn a little larger than
            the half-degree it really subtends. Do not read features into it.
          </p>
        </div>
        <div className="bg-void p-4">
          <h4 className="font-mono text-[10px] uppercase tracking-mission text-ember">
            The livery
          </h4>
          <p className="mt-2 text-[12px] leading-relaxed text-bone/85">
            The white airframe, the chevron run and the blue base with the SKYROOT
            wordmark follow Skyroot&rsquo;s published vehicle renders, drawn here onto the
            model rather than copied from an image. The most widely circulated of those
            renders is labelled Vikram II; Skyroot uses the same livery family across the
            Vikram vehicles, so treat this as a faithful livery rather than a measured
            reproduction of Vikram-1&rsquo;s exact markings.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-smoke">
            Skyroot&rsquo;s logo mark is deliberately left off: it could not be reproduced
            accurately here, and an approximation would be worse than its absence.
          </p>
        </div>
      </div>

      <dl className="mt-px grid gap-px bg-white/[0.07] sm:grid-cols-3">
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
