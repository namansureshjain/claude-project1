'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Deep-space backdrop. Points rather than a texture, so it costs nothing to
 * download and scales down cleanly on weak hardware.
 */
export default function Starfield({
  count = 1400,
  radius = 110,
  animate = true,
}: {
  count?: number;
  radius?: number;
  animate?: boolean;
}) {
  const ref = useRef<THREE.Points>(null);

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const warm = new THREE.Color('#ffd7b8');
    const cool = new THREE.Color('#cfe0ff');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i += 1) {
      // Even distribution on a sphere shell, pushed outward so nothing clips.
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.65 + Math.random() * 0.35);
      const s = Math.sqrt(1 - u * u);
      positions[i * 3] = r * s * Math.cos(theta);
      positions[i * 3 + 1] = r * s * Math.sin(theta);
      positions[i * 3 + 2] = r * u;

      sizes[i] = Math.random() < 0.06 ? 1.8 + Math.random() * 1.4 : 0.35 + Math.random() * 0.75;

      const pick = Math.random();
      const c = pick < 0.12 ? warm : pick < 0.28 ? cool : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, sizes, colors };
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!animate || !ref.current) return;
    ref.current.rotation.y += delta * 0.004;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        sizeAttenuation
        size={0.42}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
