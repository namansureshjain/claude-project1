'use client';

import { useState } from 'react';
import { payloads } from '@/data/payloads';
import { organizationById, organizations } from '@/data/organizations';
import { useExplorer } from '@/lib/store';
import SourceList from './SourceList';

/**
 * Rocket to payload to company to problem.
 *
 * The point of this view is the chain, not the diagram: a rocket is a delivery
 * system for someone else's attempt at a real problem, and this makes that
 * visible in one screen.
 */
export default function PayloadNetwork() {
  const selectedOrgId = useExplorer((s) => s.selectedOrganizationId);
  const selectOrganization = useExplorer((s) => s.selectOrganization);
  const selectPayload = useExplorer((s) => s.selectPayload);
  const setSceneMode = useExplorer((s) => s.setSceneMode);
  const [hover, setHover] = useState<string | null>(null);

  const org = selectedOrgId ? organizationById.get(selectedOrgId) : null;

  return (
    <div id="payload-network" className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="scrollbar-thin -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <div className="min-w-[44rem]">
          {/* Vehicle node */}
          <div className="flex justify-center">
            <span
              className="border border-ember/50 bg-ember/10 px-4 py-2 font-mono text-[10px]
                         uppercase tracking-mission text-ember"
            >
              Vikram-1
            </span>
          </div>

          <Connector />

          {/* Payload row */}
          <div className="grid grid-cols-6 gap-2">
            {payloads.map((p) => (
              <button
                key={p.id}
                type="button"
                onMouseEnter={() => setHover(p.organizationId)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.organizationId)}
                onBlur={() => setHover(null)}
                onClick={() => {
                  setSceneMode('payload-bay');
                  selectPayload(p.id);
                  selectOrganization(p.organizationId);
                  document
                    .getElementById('rocket')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="border border-white/12 px-2 py-2.5 text-center transition-colors
                           hover:border-white/35"
                style={{ borderBottomColor: p.accent, borderBottomWidth: 2 }}
              >
                <span className="block font-mono text-[9px] uppercase tracking-mission text-bone">
                  {p.name}
                </span>
              </button>
            ))}
          </div>

          <Connector />

          {/* Organization row */}
          <div className="grid grid-cols-6 gap-2">
            {payloads.map((p) => {
              const o = organizationById.get(p.organizationId);
              const active = selectedOrgId === p.organizationId || hover === p.organizationId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setHover(p.organizationId)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(p.organizationId)}
                  onBlur={() => setHover(null)}
                  onClick={() => selectOrganization(p.organizationId)}
                  aria-pressed={selectedOrgId === p.organizationId}
                  className={`border px-2 py-2.5 text-center transition-colors ${
                    active ? 'border-ember/60 bg-ember/10' : 'border-white/12 hover:border-white/35'
                  }`}
                >
                  <span
                    className={`block text-[11px] leading-tight ${active ? 'text-bone' : 'text-smoke'}`}
                  >
                    {o?.name}
                  </span>
                </button>
              );
            })}
          </div>

          <Connector />

          {/* Problem row */}
          <div className="grid grid-cols-6 gap-2">
            {payloads.map((p) => {
              const o = organizationById.get(p.organizationId);
              return (
                <p
                  key={p.id}
                  className="border border-white/[0.07] bg-white/[0.015] px-2 py-2.5 text-center
                             text-[10px] leading-snug text-smoke"
                >
                  {o?.kind === 'artist-studio' ? 'Commemorative' : shorten(o?.problemAddressed ?? '')}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Organization reader */}
      <aside className="border border-white/[0.09] p-5" aria-live="polite">
        {org ? (
          <div className="space-y-5">
            <div>
              <span className="label-mono">
                {org.country}
                {org.city ? ` · ${org.city}` : ''}
              </span>
              <h3 className="mt-1.5 text-xl font-light tracking-[-0.015em] text-paper">{org.name}</h3>
            </div>

            <Field label="What they build" body={org.whatTheyBuild} />
            <Field label="What they contributed" body={org.contribution} />
            <Field label="What problem it addresses" body={org.problemAddressed} />
            <Field label="Why orbital testing matters" body={org.whyOrbitalTestingMatters} />

            <SourceList ids={org.sources} />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="label-mono">Organization</p>
            <p className="text-[13px] leading-relaxed text-smoke">
              Select a company in the chain to read what they build, what they contributed to Mission
              Aagaman, and the real-world problem their technology is aimed at.
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {organizations
                .filter((o) => o.kind !== 'space-agency')
                .map((o) => (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => selectOrganization(o.id)}
                      className="border border-white/12 px-2 py-1 font-mono text-[9px] uppercase
                                 tracking-mission text-smoke transition-colors
                                 hover:border-ember/60 hover:text-bone"
                    >
                      {o.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h4 className="label-mono mb-1.5">{label}</h4>
      <p className="text-[13px] leading-relaxed text-bone/85">{body}</p>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex h-8 justify-center" aria-hidden>
      <span className="w-px bg-gradient-to-b from-white/25 to-white/5" />
    </div>
  );
}

function shorten(s: string) {
  const first = s.split('. ')[0];
  return first.length > 88 ? `${first.slice(0, 85)}…` : first;
}
