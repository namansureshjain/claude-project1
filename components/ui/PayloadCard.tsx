'use client';

import type { Payload } from '@/data/types';
import { payloadCategoryLabels } from '@/data/payloads';
import { organizationById } from '@/data/organizations';
import { useExplorer } from '@/lib/store';
import ConfidenceBadge from './ConfidenceBadge';

export default function PayloadCard({ payload }: { payload: Payload }) {
  const selectPayload = useExplorer((s) => s.selectPayload);
  const setSceneMode = useExplorer((s) => s.setSceneMode);
  const selected = useExplorer((s) => s.selectedPayloadId) === payload.id;
  const org = organizationById.get(payload.organizationId);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => {
        setSceneMode('payload-bay');
        selectPayload(payload.id);
        document.getElementById('rocket')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className={`group relative flex h-full w-full flex-col items-start gap-3 border p-5 text-left
                  transition-colors duration-200 ${
                    selected
                      ? 'border-ember/60 bg-white/[0.05]'
                      : 'border-white/[0.09] hover:border-white/25 hover:bg-white/[0.03]'
                  }`}
    >
      <span
        className="absolute left-0 top-0 h-full w-[2px] transition-opacity duration-200
                   group-hover:opacity-100"
        style={{ backgroundColor: payload.accent, opacity: selected ? 1 : 0.35 }}
        aria-hidden
      />

      <span className="flex w-full items-baseline justify-between gap-3">
        <span
          className="font-mono text-[9px] uppercase tracking-mission"
          style={{ color: payload.accent }}
        >
          {payloadCategoryLabels[payload.category]}
        </span>
        <span className="label-mono">{payload.country}</span>
      </span>

      <span className="text-xl font-light leading-tight tracking-[-0.015em] text-paper">
        {payload.name}
      </span>
      <span className="text-[12px] text-smoke">{org?.name}</span>

      <span className="text-[13px] leading-relaxed text-bone/85">{payload.purpose}</span>

      <span className="mt-auto flex w-full items-center justify-between gap-2 pt-2">
        <ConfidenceBadge confidence={payload.outcome.confidence} />
        <span
          className="font-mono text-[9px] uppercase tracking-mission text-smoke
                     transition-colors group-hover:text-ember"
        >
          Inspect &rarr;
        </span>
      </span>
    </button>
  );
}
