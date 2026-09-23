'use client';

import { useExplorer } from '@/lib/store';

/** Switches every explanation on the site between two depths. */
export default function LearningModeToggle({ compact = false }: { compact?: boolean }) {
  const mode = useExplorer((s) => s.learningMode);
  const setMode = useExplorer((s) => s.setLearningMode);

  return (
    <div
      role="radiogroup"
      aria-label="Explanation depth"
      className={`inline-flex border border-white/15 ${compact ? '' : 'p-0.5'}`}
    >
      {(['simple', 'engineering'] as const).map((m) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          onClick={() => setMode(m)}
          className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-mission transition-colors
                      duration-200 ${
                        mode === m ? 'bg-ember text-void' : 'text-smoke hover:text-bone'
                      }`}
        >
          {m === 'simple' ? 'Simple' : 'Engineering'}
        </button>
      ))}
    </div>
  );
}
