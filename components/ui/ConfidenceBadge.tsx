import type { Confidence } from '@/data/types';

const config: Record<Confidence, { label: string; className: string; title: string }> = {
  confirmed: {
    label: 'Confirmed',
    className: 'border-verified/50 text-verified',
    title: 'Stated by the operator, a government source, or corroborated across reliable reporting.',
  },
  reported: {
    label: 'Reported',
    className: 'border-signal/50 text-signal',
    title: 'Reported by reliable sources but not confirmed by a primary operator or government document.',
  },
  undisclosed: {
    label: 'Not disclosed',
    className: 'border-white/25 text-smoke',
    title: 'No reliable public source states this. Nothing has been inferred or invented in its place.',
  },
  disputed: {
    label: 'Sources differ',
    className: 'border-caution/60 text-caution',
    title: 'Reliable sources give different figures. The disagreement is shown rather than resolved silently.',
  },
};

export default function ConfidenceBadge({
  confidence,
  className = '',
}: {
  confidence: Confidence;
  className?: string;
}) {
  const c = config[confidence];
  return (
    <span
      title={c.title}
      className={`inline-flex shrink-0 items-center border px-1.5 py-0.5 font-mono text-[9px]
                  uppercase tracking-mission ${c.className} ${className}`}
    >
      {c.label}
    </span>
  );
}
