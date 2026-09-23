'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categoryLabels, componentById } from '@/data/components';
import { glossaryById } from '@/data/glossary';
import { useExplorer } from '@/lib/store';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';
import ClaimLine from '@/components/ui/ClaimLine';
import ConfidenceBadge from '@/components/ui/ConfidenceBadge';
import SourceList from '@/components/ui/SourceList';
import LearningModeToggle from '@/components/ui/LearningModeToggle';

const fidelityCopy: Record<string, string> = {
  'documented-geometry': 'Geometry follows published documentation.',
  representative:
    'Representative visualization. Proportions come from the published overall height and diameter; internal detail is illustrative.',
  conceptual:
    'Conceptual visualization. This system has no separately published geometry, so it is shown as a marker rather than modelled hardware.',
};

/**
 * The component reader.
 *
 * Progressive disclosure, in order: what it is, what it does, why it exists,
 * how it works, who builds it, the numbers, then the evidence. A beginner can
 * stop after the second paragraph; an enthusiast can keep going to the sources.
 */
export default function ComponentDetailPanel() {
  const id = useExplorer((s) => s.selectedComponentId);
  const close = useExplorer((s) => s.selectComponent);
  const mode = useExplorer((s) => s.learningMode);
  const whyOpenFor = useExplorer((s) => s.whyOpenFor);
  const openWhy = useExplorer((s) => s.openWhy);
  const openGlossaryTerm = useExplorer((s) => s.openGlossaryTerm);
  const selectComponent = useExplorer((s) => s.selectComponent);

  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const sceneVisible = useExplorer((s) => s.sceneVisible);
  const component = id && sceneVisible ? componentById.get(id) : null;

  useEffect(() => {
    if (!component) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [component, close]);

  const whyOpen = whyOpenFor === component?.id;

  return (
    <AnimatePresence>
      {component && (
        <motion.aside
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          aria-label={`${component.name} details`}
          initial={reduced ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: 40, opacity: 0 }}
          animate={reduced ? { opacity: 1 } : isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          className="panel scrollbar-thin fixed z-[95] overflow-y-auto
                     max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[76svh] max-md:rounded-t-xl
                     md:right-6 md:top-20 md:bottom-24 md:w-[26.5rem]"
        >
          {/* Mobile bottom-sheet grabber. */}
          <div className="sticky top-0 z-10 bg-carbon/95 px-5 pb-3 pt-4 backdrop-blur-xl md:px-6 md:pt-5">
            <div
              className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20 md:hidden"
              aria-hidden
            />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="label-mono">
                  <span className="text-ember">{component.code}</span>
                  {` · ${categoryLabels[component.category]}`}
                </span>
                <h3 className="mt-1.5 text-2xl font-light leading-tight tracking-[-0.02em] text-paper">
                  {component.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => close(null)}
                className="btn-ghost shrink-0"
                aria-label="Close component details"
              >
                Close
              </button>
            </div>
          </div>

          <div className="space-y-6 px-5 pb-8 md:px-6">
            <p className="text-[15px] leading-relaxed text-bone">{component.shortDescription}</p>

            <div className="flex items-center justify-between gap-3">
              <span className="label-mono">Explanation depth</span>
              <LearningModeToggle />
            </div>

            <section aria-label="Explanation">
              <h4 className="label-mono mb-2">
                {mode === 'simple' ? 'What it does' : 'Engineering view'}
              </h4>
              <p className="text-[14px] leading-[1.75] text-bone/90">
                {mode === 'simple' ? component.beginnerExplanation : component.engineeringExplanation}
              </p>
            </section>

            {/* "Why does this exist?" — the beginner's real question. */}
            <section>
              <button
                type="button"
                onClick={() => openWhy(whyOpen ? null : component.id)}
                aria-expanded={whyOpen}
                className="flex w-full items-center justify-between gap-3 border border-ember/35
                           bg-ember/[0.06] px-3 py-2.5 text-left transition-colors hover:bg-ember/[0.12]"
              >
                <span className="font-mono text-[10px] uppercase tracking-mission text-ember">
                  Why does this exist?
                </span>
                <span className="font-mono text-[11px] text-ember" aria-hidden>
                  {whyOpen ? '−' : '+'}
                </span>
              </button>
              {whyOpen && (
                <p className="mt-3 border-l-2 border-ember/40 pl-3 text-[14px] leading-[1.75] text-bone/90">
                  {component.whyItExists}
                </p>
              )}
            </section>

            <section aria-label="Who builds it">
              <h4 className="label-mono mb-1">Who builds it</h4>
              <ClaimLine label="Developer" claim={component.developer} />
              <ClaimLine label="Manufacturer" claim={component.manufacturer} />
              {component.manufacturer.confidence === 'undisclosed' && (
                <p className="mt-2 text-[12px] leading-relaxed text-smoke">
                  Skyroot has not published a component supplier list for Vikram-1. Rather than infer
                  one from companies that make similar parts, this entry states that it is not
                  disclosed.
                </p>
              )}
            </section>

            {component.specs && component.specs.length > 0 && (
              <section aria-label="Published figures">
                <h4 className="label-mono mb-1">Published figures</h4>
                {component.specs.map((s) => (
                  <ClaimLine key={s.label} label={s.label} claim={s.claim} />
                ))}
              </section>
            )}

            <section aria-label="Technologies">
              <h4 className="label-mono mb-2">Technology</h4>
              <ul className="flex flex-wrap gap-1.5">
                {component.technologies.map((t) => (
                  <li
                    key={t}
                    className="border border-white/12 px-2 py-1 font-mono text-[9px] uppercase
                               tracking-mission text-smoke"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            {component.connectsTo.length > 0 && (
              <section aria-label="Connected systems">
                <h4 className="label-mono mb-2">Connects to</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {component.connectsTo.map((cid) => {
                    const other = componentById.get(cid);
                    if (!other) return null;
                    return (
                      <li key={cid}>
                        <button
                          type="button"
                          onClick={() => selectComponent(cid)}
                          className="border border-white/12 px-2 py-1 font-mono text-[9px] uppercase
                                     tracking-mission text-smoke transition-colors
                                     hover:border-ember/60 hover:text-bone"
                        >
                          {other.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {component.keyTerms.length > 0 && (
              <section aria-label="Key terms">
                <h4 className="label-mono mb-2">Key terms</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {component.keyTerms.map((tid) => {
                    const term = glossaryById.get(tid);
                    if (!term) return null;
                    return (
                      <li key={tid}>
                        <button
                          type="button"
                          onClick={() => openGlossaryTerm(tid)}
                          className="border-b border-dashed border-ember/50 text-[12px] text-bone
                                     transition-colors hover:text-ember"
                        >
                          {term.term}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            <section>
              <div className="flex items-start gap-2 border border-white/[0.08] bg-white/[0.02] p-3">
                <ConfidenceBadge
                  confidence={component.fidelity === 'conceptual' ? 'undisclosed' : 'reported'}
                />
                <p className="text-[11px] leading-relaxed text-smoke">
                  {fidelityCopy[component.fidelity]}
                </p>
              </div>
            </section>

            <SourceList ids={component.sources} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
