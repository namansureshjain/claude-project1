'use client';

import { useState } from 'react';
import { supplyCategories, supplyChainDisclaimer } from '@/data/supplyChain';
import { componentById } from '@/data/components';
import { organizationById } from '@/data/organizations';
import { useExplorer } from '@/lib/store';
import ConfidenceBadge from './ConfidenceBadge';
import SourceList from './SourceList';

/**
 * "Who builds a rocket?"
 *
 * A modern launch vehicle is an ecosystem, not a monolith — but only where
 * that ecosystem is publicly documented. Categories with nothing disclosed say
 * so, which is the honest shape of this particular supply chain.
 */
/** Short forms for the radial hub, where long names would collide or clip. */
const hubLabel: Record<string, string> = {
  'launch-infrastructure': 'Launch infra',
  'payload-systems': 'Payload sys',
  'ground-systems': 'Ground sys',
};

export default function SupplyChainGraph() {
  const [activeId, setActiveId] = useState(supplyCategories[0].id);
  const active = supplyCategories.find((c) => c.id === activeId)!;
  const selectComponent = useExplorer((s) => s.selectComponent);
  const setExploded = useExplorer((s) => s.setExploded);
  const selectOrganization = useExplorer((s) => s.selectOrganization);

  const n = supplyCategories.length;

  return (
    <div className="space-y-8">
      <p className="max-w-3xl border-l-2 border-caution/50 bg-caution/[0.05] py-3 pl-4 text-[13px] leading-relaxed text-bone/85">
        {supplyChainDisclaimer}
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
        {/* Radial hub — desktop and tablet */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] md:block">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            {supplyCategories.map((c, i) => {
              const a = (i / n) * Math.PI * 2 - Math.PI / 2;
              return (
                <line
                  key={c.id}
                  x1="50"
                  y1="50"
                  x2={50 + Math.cos(a) * 30}
                  y2={50 + Math.sin(a) * 30}
                  stroke={c.id === activeId ? '#ff6b1f' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={c.id === activeId ? 0.5 : 0.3}
                />
              );
            })}
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="block font-mono text-[10px] uppercase tracking-mission text-ember">
              Vikram-1
            </span>
            <span className="mt-1 block text-[10px] text-smoke">4 stages &middot; 6 payloads</span>
          </div>

          {supplyCategories.map((c, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            const left = 50 + Math.cos(a) * 34;
            const top = 50 + Math.sin(a) * 34;
            const activeCat = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                aria-pressed={activeCat}
                className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border px-2 py-1
                            font-mono text-[9px] uppercase tracking-mission transition-colors ${
                              activeCat
                                ? 'border-ember bg-ember text-void'
                                : 'border-white/15 bg-void/80 text-smoke hover:border-white/40 hover:text-bone'
                            }`}
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                {hubLabel[c.id] ?? c.name}
              </button>
            );
          })}
        </div>

        {/* Category chips — mobile */}
        <div className="scrollbar-thin -mx-5 flex gap-1.5 overflow-x-auto px-5 md:hidden">
          {supplyCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              aria-pressed={c.id === activeId}
              className={`shrink-0 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-mission ${
                c.id === activeId ? 'border-ember bg-ember text-void' : 'border-white/12 text-smoke'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Reader */}
        <div className="space-y-6 border border-white/[0.09] p-5 md:p-6" aria-live="polite">
          <div>
            <span className="label-mono">Domain</span>
            <h3 className="mt-1.5 text-xl font-light tracking-[-0.015em] text-paper">{active.name}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-smoke">{active.description}</p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <h4 className="label-mono">What is publicly known</h4>
              <ConfidenceBadge confidence={active.publiclyKnown.confidence} />
            </div>
            <p className="text-[14px] leading-[1.75] text-bone/90">{active.publiclyKnown.value}</p>
          </div>

          <div>
            <h4 className="label-mono mb-2">Organizations publicly associated</h4>
            {active.organizationIds.length === 0 ? (
              <p className="text-[13px] text-smoke">None publicly named.</p>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {active.organizationIds.map((oid) => {
                  const o = organizationById.get(oid);
                  if (!o) return null;
                  return (
                    <li key={oid}>
                      <button
                        type="button"
                        onClick={() => {
                          selectOrganization(oid);
                          document
                            .getElementById('payload-network')
                            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="border border-white/12 px-2 py-1 text-[11px] text-smoke
                                   transition-colors hover:border-ember/60 hover:text-bone"
                      >
                        {o.name}
                        <span className="ml-1.5 font-mono text-[9px] text-smoke/70">{o.country}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div>
            <h4 className="label-mono mb-2">Components in this domain</h4>
            <ul className="flex flex-wrap gap-1.5">
              {active.componentIds.map((cid) => {
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

          <SourceList ids={active.publiclyKnown.sources} />
        </div>
      </div>
    </div>
  );
}
