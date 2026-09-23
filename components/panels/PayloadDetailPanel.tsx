'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { payloadById, payloadCategoryLabels, payloadCategoryNotes } from '@/data/payloads';
import { organizationById } from '@/data/organizations';
import { useExplorer } from '@/lib/store';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';
import ClaimLine from '@/components/ui/ClaimLine';
import SourceList from '@/components/ui/SourceList';

export default function PayloadDetailPanel() {
  const id = useExplorer((s) => s.selectedPayloadId);
  const close = useExplorer((s) => s.selectPayload);
  const selectOrganization = useExplorer((s) => s.selectOrganization);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const sceneVisible = useExplorer((s) => s.sceneVisible);
  const payload = id && sceneVisible ? payloadById.get(id) : null;
  const org = payload ? organizationById.get(payload.organizationId) : null;

  useEffect(() => {
    if (!payload) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [payload, close]);

  return (
    <AnimatePresence>
      {payload && (
        <motion.aside
          role="dialog"
          aria-label={`${payload.name} payload details`}
          initial={reduced ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: -40, opacity: 0 }}
          animate={reduced ? { opacity: 1 } : isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: -40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          className="panel scrollbar-thin fixed z-[95] overflow-y-auto
                     max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[76svh] max-md:rounded-t-xl
                     md:left-6 md:top-20 md:bottom-24 md:w-[26.5rem]"
        >
          <div className="sticky top-0 z-10 bg-carbon/95 px-5 pb-3 pt-4 backdrop-blur-xl md:px-6 md:pt-5">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20 md:hidden" aria-hidden />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span
                  className="font-mono text-[10px] uppercase tracking-mission"
                  style={{ color: payload.accent }}
                >
                  {payloadCategoryLabels[payload.category]}
                </span>
                <h3 className="mt-1.5 text-2xl font-light leading-tight tracking-[-0.02em] text-paper">
                  {payload.name}
                </h3>
                <p className="mt-1 text-[12px] text-smoke">{payload.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => close(null)}
                className="btn-ghost shrink-0"
                aria-label="Close payload details"
              >
                Close
              </button>
            </div>
          </div>

          <div className="space-y-6 px-5 pb-8 md:px-6">
            <p className="border-l-2 border-white/15 pl-3 text-[11px] leading-relaxed text-smoke">
              {payloadCategoryNotes[payload.category]}
            </p>

            <p className="text-[15px] leading-relaxed text-bone">{payload.purpose}</p>

            <section aria-label="Identification">
              <ClaimLine
                label="Organization"
                claim={{ value: org?.name ?? 'Unknown', confidence: 'confirmed', sources: payload.sources }}
              />
              <ClaimLine
                label="Country"
                claim={{ value: payload.country, confidence: 'confirmed', sources: payload.sources }}
              />
              <ClaimLine
                label="Type"
                claim={{
                  value: payloadCategoryLabels[payload.category],
                  confidence: 'confirmed',
                  sources: payload.sources,
                }}
              />
              <ClaimLine label="Deployment" claim={payload.deployment} />
              <ClaimLine label="Outcome" claim={payload.outcome} />
            </section>

            <section>
              <h4 className="label-mono mb-2">Mission role</h4>
              <p className="text-[14px] leading-[1.75] text-bone/90">{payload.missionRole}</p>
            </section>

            <section>
              <h4 className="label-mono mb-2">What it does</h4>
              <p className="text-[14px] leading-[1.75] text-bone/90">{payload.whatItDoes}</p>
            </section>

            <section>
              <h4 className="label-mono mb-2">Why it was sent</h4>
              <p className="text-[14px] leading-[1.75] text-bone/90">{payload.whyItWasSent}</p>
            </section>

            <section>
              <h4 className="label-mono mb-2">Technology being tested</h4>
              <p className="text-[14px] leading-[1.75] text-bone/90">{payload.technologyTested}</p>
            </section>

            <section>
              <h4 className="label-mono mb-2">What they hope to learn</h4>
              <p className="text-[14px] leading-[1.75] text-bone/90">{payload.whatTheyHopeToLearn}</p>
            </section>

            {org && (
              <button
                type="button"
                onClick={() => {
                  selectOrganization(org.id);
                  document.getElementById('payload-network')?.scrollIntoView({ block: 'center' });
                }}
                className="w-full border border-white/12 px-3 py-2.5 text-left transition-colors
                           hover:border-ember/50"
              >
                <span className="label-mono block">About the organization</span>
                <span className="mt-1 block text-[13px] text-bone">{org.name}</span>
              </button>
            )}

            <SourceList ids={payload.sources} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
