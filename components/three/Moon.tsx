'use client';

import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { createMoonTexture } from '@/lib/moonTexture';

/**
 * The Moon, high and to the right of the vehicle.
 *
 * Lit by the same key light as everything else, so its phase agrees with the
 * Earth's terminator. Its apparent size is a little larger than the half-degree
 * it really subtends — at true scale it would be about fifteen pixels — and its
 * surface is generated rather than photographed. Both are noted on the site.
 */
export default function Moon({ quality = 1 }: { quality?: number }) {
  const texture = useMemo(() => createMoonTexture(quality > 0.7 ? 1024 : 512), [quality]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh position={[55, 40, -150]}>
      <sphereGeometry args={[2.6, Math.round(48 * quality) + 16, Math.round(24 * quality) + 8]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.96}
        metalness={0}
        // Excluded from fog: the Moon is far beyond the fog's far plane, and
        // fogging it would erase it entirely.
        fog={false}
      />
    </mesh>
  );
}
