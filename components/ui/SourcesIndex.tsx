import { sources, tierLabels } from '@/data/sources';
import type { SourceTier } from '@/data/types';

const ORDER: SourceTier[] = [
  'primary-operator',
  'primary-government',
  'specialist-press',
  'wire-press',
  'reference',
];

/** Every source the site draws on, grouped by how much weight it is given. */
export default function SourcesIndex() {
  return (
    <div className="space-y-8">
      {ORDER.map((tier) => {
        const group = sources.filter((s) => s.tier === tier);
        if (group.length === 0) return null;
        return (
          <section key={tier}>
            <h3 className="label-mono mb-3">
              {tierLabels[tier]} <span className="text-ember">({group.length})</span>
            </h3>
            <ul className="grid gap-px bg-white/[0.07] sm:grid-cols-2">
              {group.map((s) => (
                <li key={s.id} className="bg-void p-4">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] leading-snug text-bone underline decoration-white/20
                               underline-offset-2 transition-colors hover:text-ember hover:decoration-ember"
                  >
                    {s.title}
                  </a>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-mission text-smoke">
                    {s.publisher}
                    {s.published ? ` · ${s.published}` : ''}
                  </p>
                  {s.note && <p className="mt-2 text-[11px] leading-relaxed text-smoke">{s.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
