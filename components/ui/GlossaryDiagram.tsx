import type { GlossaryTerm } from '@/data/types';

const S = '#8b939f';
const A = '#ff6b1f';
const P = '#e6e3dd';

/** Tiny explanatory diagrams. Each shows one mechanism, nothing decorative. */
export default function GlossaryDiagram({ kind }: { kind: GlossaryTerm['diagram'] }) {
  if (!kind || kind === 'none') return null;

  const wrap = (children: React.ReactNode, label: string) => (
    <figure className="mt-4 border border-white/[0.08] bg-white/[0.015] p-4">
      <svg viewBox="0 0 220 110" className="h-auto w-full max-w-[18rem]" role="img" aria-label={label}>
        {children}
      </svg>
      <figcaption className="mt-2 font-mono text-[9px] uppercase tracking-mission text-smoke">
        {label}
      </figcaption>
    </figure>
  );

  switch (kind) {
    case 'thrust':
      return wrap(
        <>
          <rect x="88" y="26" width="26" height="54" rx="5" fill={S} />
          <path d="M88 26 L101 6 L114 26 Z" fill={P} />
          <path d="M92 80 L110 80 L118 96 L84 96 Z" fill={S} />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${94 + i * 7} 98 L${94 + i * 7} ${104 + i * 2}`}
              stroke={A}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={0.9 - i * 0.2}
            />
          ))}
          <path d="M150 62 L150 30" stroke={P} strokeWidth="1.5" markerEnd="url(#ar)" />
          <path d="M150 30 l-4 7 h8 z" fill={P} />
          <text x="156" y="44" fill={P} style={{ font: '400 10px var(--font-mono)' }}>
            THRUST
          </text>
          <path d="M60 30 L60 62" stroke={A} strokeWidth="1.5" />
          <path d="M60 62 l-4 -7 h8 z" fill={A} />
          <text x="10" y="26" fill={A} style={{ font: '400 10px var(--font-mono)' }}>
            EXHAUST
          </text>
        </>,
        'Mass thrown backwards produces forward thrust',
      );

    case 'staging':
      return wrap(
        <>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${20 + i * 68} 0)`}>
              <rect x="14" y={i === 0 ? 30 : i === 1 ? 24 : 18} width="22" height={i === 0 ? 56 : i === 1 ? 44 : 30} rx="4" fill={i === 2 ? A : S} opacity={i === 2 ? 1 : 0.85} />
              <path d={`M14 ${i === 0 ? 30 : i === 1 ? 24 : 18} L25 ${i === 0 ? 12 : i === 1 ? 8 : 4} L36 ${i === 0 ? 30 : i === 1 ? 24 : 18} Z`} fill={P} />
              {i > 0 && (
                <g opacity="0.4">
                  <rect x="44" y={i === 1 ? 62 : 52} width="14" height="16" rx="2" fill={S} />
                </g>
              )}
              <text x="25" y="100" textAnchor="middle" fill={S} style={{ font: '400 9px var(--font-mono)' }}>
                {`T${i + 1}`}
              </text>
            </g>
          ))}
        </>,
        'Each spent stage is dropped so it is no longer accelerated',
      );

    case 'orbit':
      return wrap(
        <>
          <circle cx="110" cy="62" r="34" fill="#0f2c4d" />
          <circle cx="110" cy="62" r="34" fill="none" stroke="rgba(90,169,255,0.4)" strokeWidth="1" />
          <ellipse cx="110" cy="62" rx="48" ry="48" fill="none" stroke={A} strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="158" cy="62" r="4" fill={A} />
          <path d="M158 54 L158 42" stroke={P} strokeWidth="1.2" />
          <path d="M158 42 l-3 6 h6 z" fill={P} />
          <text x="164" y="38" fill={P} style={{ font: '400 9px var(--font-mono)' }}>
            7.6 KM/S
          </text>
          <path d="M158 70 L158 82" stroke={S} strokeWidth="1.2" />
          <text x="150" y="96" textAnchor="end" fill={S} style={{ font: '400 9px var(--font-mono)' }}>
            FALLING
          </text>
        </>,
        'Sideways speed makes the fall miss the planet',
      );

    case 'fairing':
      return wrap(
        <>
          <g>
            <path d="M74 60 L74 30 Q74 10 88 4" fill="none" stroke={P} strokeWidth="2" />
            <path d="M102 60 L102 30 Q102 10 88 4" fill="none" stroke={P} strokeWidth="2" />
            <rect x="80" y="34" width="16" height="22" rx="2" fill={A} />
            <text x="88" y="78" textAnchor="middle" fill={S} style={{ font: '400 9px var(--font-mono)' }}>
              CLOSED
            </text>
          </g>
          <g transform="translate(76 0)">
            <path d="M74 60 L74 30 Q74 10 84 4" fill="none" stroke={P} strokeWidth="2" opacity="0.5" transform="translate(-14 0) rotate(-16 74 60)" />
            <path d="M102 60 L102 30 Q102 10 92 4" fill="none" stroke={P} strokeWidth="2" opacity="0.5" transform="translate(14 0) rotate(16 102 60)" />
            <rect x="80" y="34" width="16" height="22" rx="2" fill={A} />
            <text x="88" y="78" textAnchor="middle" fill={S} style={{ font: '400 9px var(--font-mono)' }}>
              JETTISONED
            </text>
          </g>
        </>,
        'The shell protects, then leaves once air no longer matters',
      );

    case 'gimbal':
      return wrap(
        <>
          <rect x="96" y="14" width="26" height="52" rx="5" fill={S} />
          <path d="M96 14 L109 0 L122 14 Z" fill={P} />
          <g transform="rotate(14 109 66)">
            <path d="M100 66 L118 66 L126 84 L92 84 Z" fill={S} />
            <path d="M109 86 L109 104" stroke={A} strokeWidth="3" strokeLinecap="round" />
          </g>
          <path d="M150 74 Q166 62 160 44" fill="none" stroke={P} strokeWidth="1.2" />
          <path d="M160 44 l-4 7 h7 z" fill={P} />
          <text x="150" y="98" fill={S} style={{ font: '400 9px var(--font-mono)' }}>
            NOSE SWINGS
          </text>
          <text x="10" y="96" fill={A} style={{ font: '400 9px var(--font-mono)' }}>
            EXHAUST TILTS
          </text>
        </>,
        'Tilting the exhaust one way swings the nose the other',
      );

    case 'isp':
      return wrap(
        <>
          {[
            { label: 'SOLID', w: 58, y: 28 },
            { label: 'LIQUID', w: 96, y: 62 },
          ].map((b) => (
            <g key={b.label}>
              <text x="8" y={b.y + 4} fill={S} style={{ font: '400 9px var(--font-mono)' }}>
                {b.label}
              </text>
              <rect x="62" y={b.y - 7} width={b.w} height="12" fill={b.label === 'LIQUID' ? A : S} />
            </g>
          ))}
          <text x="62" y="92" fill={S} style={{ font: '400 9px var(--font-mono)' }}>
            EFFICIENCY PER UNIT OF PROPELLANT
          </text>
        </>,
        'Liquid engines are typically more efficient; solids give more thrust per unit of hardware',
      );

    case 'stability':
      return wrap(
        <>
          <rect x="52" y="44" width="120" height="22" rx="10" fill={S} />
          <path d="M172 44 L206 55 L172 66 Z" fill={P} />
          {/* Centre of pressure ahead of centre of mass: the unstable case. */}
          <circle cx="150" cy="55" r="5" fill={A} />
          <text x="150" y="36" textAnchor="middle" fill={A} style={{ font: '400 9px var(--font-mono)' }}>
            CP
          </text>
          <circle cx="100" cy="55" r="5" fill={P} />
          <text x="100" y="36" textAnchor="middle" fill={P} style={{ font: '400 9px var(--font-mono)' }}>
            CM
          </text>
          <path d="M150 70 Q150 86 130 92" fill="none" stroke={A} strokeWidth="1.2" />
          <path d="M130 92 l8 -2 l-3 6 z" fill={A} />
          <text x="10" y="98" fill={S} style={{ font: '400 9px var(--font-mono)' }}>
            AIR PUSHES AT CP, VEHICLE PIVOTS ABOUT CM
          </text>
        </>,
        'Centre of pressure ahead of centre of mass: the vehicle wants to flip',
      );

    default:
      return null;
  }
}
