'use client';

import { useId } from 'react';
import { useReducedMotion } from '@/lib/hooks';

/**
 * The flag of India, drawn to the official proportions: 3:2, three equal
 * bands, and an Ashoka Chakra whose diameter is three quarters of the height
 * of the white band, with 24 spokes.
 *
 * The wave is an SVG turbulence displacement rather than a GIF, so it stays
 * crisp at any size and costs nothing to download. It holds still for anyone
 * who has asked for reduced motion.
 */
export default function IndianFlag({ width = 42 }: { width?: number }) {
  const reduced = useReducedMotion();
  const rawId = useId().replace(/:/g, '');
  const filterId = `flag-wave-${rawId}`;

  const spokes = Array.from({ length: 24 }, (_, i) => (i / 24) * Math.PI * 2);

  return (
    <svg
      width={width}
      height={width * (2 / 3) + 10}
      viewBox="0 0 96 74"
      role="img"
      aria-label="Flag of India"
      className="overflow-visible"
    >
      <defs>
        <filter id={filterId} x="-25%" y="-40%" width="150%" height="180%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.014 0.038"
            numOctaves="2"
            result="noise"
          >
            {!reduced && (
              <animate
                attributeName="baseFrequency"
                dur="7s"
                values="0.014 0.038; 0.021 0.052; 0.014 0.038"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={reduced ? 1.2 : 3.4}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Pole */}
      <rect x="0" y="2" width="2.4" height="72" rx="1.2" fill="#8b939f" />

      <g filter={`url(#${filterId})`}>
        <rect x="2.4" y="4" width="90" height="20" fill="#FF9933" />
        <rect x="2.4" y="24" width="90" height="20" fill="#FFFFFF" />
        <rect x="2.4" y="44" width="90" height="20" fill="#138808" />

        {/* Ashoka Chakra */}
        <g stroke="#000080" fill="none">
          <circle cx="47.4" cy="34" r="7.5" strokeWidth="1.1" />
          <circle cx="47.4" cy="34" r="1.15" fill="#000080" stroke="none" />
          {spokes.map((a, i) => (
            <line
              key={i}
              x1={47.4 + Math.cos(a) * 1.5}
              y1={34 + Math.sin(a) * 1.5}
              x2={47.4 + Math.cos(a) * 7}
              y2={34 + Math.sin(a) * 7}
              strokeWidth="0.55"
            />
          ))}
        </g>

        <rect
          x="2.4"
          y="4"
          width="90"
          height="60"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  );
}
