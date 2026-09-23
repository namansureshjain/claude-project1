'use client';

import { Html } from '@react-three/drei';
import type { RocketComponent } from '@/data/types';

interface Props {
  component: RocketComponent;
  y: number;
  hovered: boolean;
  selected: boolean;
  /** Push the label out to the right of the vehicle rather than the left. */
  side: 1 | -1;
  /** On phones the text labels are dropped and only the markers remain. */
  compact: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

/**
 * An interactive marker pinned to a section.
 *
 * Rendered as DOM through drei's <Html>, which means it is a real button:
 * focusable, announced by screen readers and usable without the 3D view.
 */
export default function ComponentHotspot({
  component,
  y,
  hovered,
  selected,
  side,
  compact,
  onHover,
  onSelect,
}: Props) {
  const active = hovered || selected;
  const isSystem = component.length === 0;

  return (
    <Html
      position={[side * (component.radius + (compact ? 0.5 : 1.5)), y, 0]}
      center={false}
      distanceFactor={compact ? 26 : 17}
      zIndexRange={[40, 0]}
      style={{ pointerEvents: 'none' }}
    >
      <div
        className={`flex items-center gap-2 ${side === 1 ? '' : 'flex-row-reverse'}`}
        style={{ transform: side === 1 ? 'translateY(-50%)' : 'translate(-100%, -50%)' }}
      >
        <button
          type="button"
          aria-label={`${component.name}. ${component.shortDescription}`}
          aria-pressed={selected}
          onPointerEnter={() => onHover(component.id)}
          onPointerLeave={() => onHover(null)}
          onFocus={() => onHover(component.id)}
          onBlur={() => onHover(null)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(component.id);
          }}
          className="relative grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full
                     transition-transform duration-200 hover:scale-125"
          style={{ pointerEvents: 'auto' }}
        >
          <span
            className={`absolute inset-0 rounded-full border transition-colors duration-200 ${
              active ? 'border-ember bg-ember/40' : 'border-white/50 bg-white/10'
            }`}
          />
          {isSystem && (
            <span className="absolute inset-[3px] rounded-full bg-signal/70" aria-hidden />
          )}
          {selected && (
            <span
              className="absolute inset-0 animate-pulseRing rounded-full border border-ember"
              aria-hidden
            />
          )}
        </button>

        {!compact && (
          <span
            className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-mission
                        transition-opacity duration-300 ${
                          active ? 'text-bone opacity-100' : 'text-smoke opacity-70'
                        }`}
          >
            <span className="text-ember">{component.code}</span>
            <span className="mx-1 text-white/25">/</span>
            {component.name}
          </span>
        )}
      </div>
    </Html>
  );
}
