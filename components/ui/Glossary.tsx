'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { glossary, glossaryById } from '@/data/glossary';
import { useExplorer } from '@/lib/store';
import { useReducedMotion } from '@/lib/hooks';
import GlossaryDiagram from './GlossaryDiagram';

export default function Glossary() {
  const openId = useExplorer((s) => s.glossaryTermId);
  const open = useExplorer((s) => s.openGlossaryTerm);
  const [query, setQuery] = useState('');
  const reduced = useReducedMotion();

  const term = openId ? glossaryById.get(openId) : null;
  const filtered = glossary.filter(
    (g) =>
      query.trim() === '' ||
      g.term.toLowerCase().includes(query.toLowerCase()) ||
      g.short.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!term) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') open(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [term, open]);

  return (
    <div>
      <div className="mb-6 max-w-sm">
        <label htmlFor="glossary-search" className="label-mono mb-1.5 block">
          Search terms
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="thrust, interstage, inclination…"
          className="w-full border border-white/12 bg-transparent px-3 py-2 text-[14px] text-bone
                     placeholder:text-smoke/60 focus:border-ember/60 focus:outline-none"
        />
      </div>

      <ul className="grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <li key={g.id} className="bg-void">
            <button
              type="button"
              onClick={() => open(g.id)}
              className="group h-full w-full p-4 text-left transition-colors hover:bg-white/[0.035]"
            >
              <span className="block text-[15px] text-paper transition-colors group-hover:text-ember">
                {g.term}
              </span>
              <span className="mt-1 block text-[12px] leading-relaxed text-smoke">{g.short}</span>
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="py-8 text-[13px] text-smoke">No term matches that search.</p>
      )}

      <AnimatePresence>
        {term && (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-void/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => open(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={term.term}
              initial={reduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="panel scrollbar-thin max-h-[82svh] w-full max-w-lg overflow-y-auto p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="label-mono">Glossary</span>
                  <h3 className="mt-1.5 text-2xl font-light tracking-[-0.02em] text-paper">
                    {term.term}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => open(null)}
                  className="btn-ghost"
                  aria-label="Close glossary entry"
                >
                  Close
                </button>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-bone">{term.short}</p>
              <p className="mt-3 text-[14px] leading-[1.75] text-bone/85">{term.full}</p>

              <GlossaryDiagram kind={term.diagram} />

              {term.related.length > 0 && (
                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <h4 className="label-mono mb-2">Related</h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {term.related.map((rid) => {
                      const r = glossaryById.get(rid);
                      if (!r) return null;
                      return (
                        <li key={rid}>
                          <button
                            type="button"
                            onClick={() => open(rid)}
                            className="border border-white/12 px-2 py-1 font-mono text-[9px] uppercase
                                       tracking-mission text-smoke transition-colors
                                       hover:border-ember/60 hover:text-bone"
                          >
                            {r.term}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
