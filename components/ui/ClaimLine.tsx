import type { Claim } from '@/data/types';
import ConfidenceBadge from './ConfidenceBadge';

/** A single sourced fact: label, value, and how well it is supported. */
export default function ClaimLine({ label, claim }: { label: string; claim: Claim }) {
  return (
    <div className="rule-row">
      <span className="label-mono shrink-0">{label}</span>
      <span className="flex flex-wrap items-baseline justify-end gap-2 text-right text-[13px] text-bone">
        <span>{claim.value}</span>
        <ConfidenceBadge confidence={claim.confidence} />
      </span>
    </div>
  );
}

export function DisputeNote({ claim }: { claim: Claim }) {
  if (claim.confidence !== 'disputed' || !claim.dispute) return null;
  return (
    <p className="mt-2 border-l-2 border-caution/60 bg-caution/[0.06] py-2 pl-3 text-[12px] leading-relaxed text-bone/80">
      <span className="label-mono mb-1 block text-caution">Why sources differ</span>
      {claim.dispute}
    </p>
  );
}
