'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { components, geometricComponents, systemComponents } from '@/data/components';
import { useExplorer } from '@/lib/store';
import RocketSection from './RocketSection';
import ComponentHotspot from './ComponentHotspot';

interface Props {
  quality: number;
  animate: boolean;
  showHotspots: boolean;
  compactHotspots: boolean;
}

/**
 * The assembled vehicle, plus its idle motion.
 *
 * Idle motion is a slow circular drift, a very slow roll, a gentle float and a
 * small tilt toward the cursor. It damps to a stop while the user is actively
 * manipulating the camera and eases back when they let go, so the rocket feels
 * like a physical object being held still rather than an animation that fights
 * the user.
 */
export default function RocketModel({ quality, animate, showHotspots, compactHotspots }: Props) {
  const idle = useRef<THREE.Group>(null);
  const tiltTarget = useRef(new THREE.Vector2());

  const exploded = useExplorer((s) => s.exploded);
  const hoveredId = useExplorer((s) => s.hoveredComponentId);
  const selectedId = useExplorer((s) => s.selectedComponentId);
  const interacting = useExplorer((s) => s.interacting);
  const setHovered = useExplorer((s) => s.setHoveredComponentId);
  const selectComponent = useExplorer((s) => s.selectComponent);

  const { pointer } = useThree();

  /** Alternate hotspot labels left and right so they never stack. */
  const hotspots = useMemo(() => {
    const ordered = [...components]
      .filter((c) => c.length > 0 || systemComponents.includes(c))
      .sort((a, b) => b.position - a.position);
    return ordered.map((c, i) => ({ component: c, side: (i % 2 === 0 ? 1 : -1) as 1 | -1 }));
  }, []);

  useFrame((state, delta) => {
    const g = idle.current;
    if (!g) return;

    if (!animate) {
      g.position.set(0, 0, 0);
      g.rotation.set(0, g.rotation.y, 0);
      return;
    }

    const t = state.clock.elapsedTime;
    // Idle authority fades to zero while the user is driving the camera.
    const authority = THREE.MathUtils.damp(
      g.userData.authority ?? 1,
      interacting ? 0 : 1,
      2.6,
      delta,
    );
    g.userData.authority = authority;

    // Slow orbital drift plus a separate, slower vertical float.
    const driftX = Math.sin(t * 0.13) * 0.38 * authority;
    const driftZ = Math.cos(t * 0.13) * 0.38 * authority;
    const float = Math.sin(t * 0.19) * 0.24 * authority;

    g.position.x = THREE.MathUtils.damp(g.position.x, driftX, 3, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, driftZ, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, float, 3, delta);

    // Continuous slow roll about the vehicle's own axis.
    g.rotation.y += delta * 0.055 * authority;

    // Slight lean toward the cursor — enough to feel responsive, not enough
    // to be disorienting.
    tiltTarget.current.set(pointer.x, pointer.y);
    const tz = -tiltTarget.current.x * 0.055 * authority;
    const tx = tiltTarget.current.y * 0.04 * authority;
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, tz, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3, delta);
  });

  return (
    <group ref={idle}>
      {geometricComponents.map((c) => (
        <RocketSection
          key={c.id}
          component={c}
          exploded={exploded}
          hovered={hoveredId === c.id}
          selected={selectedId === c.id}
          dimmed={Boolean(selectedId) && selectedId !== c.id}
          quality={quality}
          animate={animate}
          onHover={setHovered}
          onSelect={selectComponent}
        />
      ))}

      {showHotspots &&
        hotspots.map(({ component: c, side }) => (
          <ComponentHotspot
            key={c.id}
            component={c}
            y={exploded ? c.position + c.explodedOffset : c.position}
            hovered={hoveredId === c.id}
            selected={selectedId === c.id}
            side={side}
            compact={compactHotspots}
            onHover={setHovered}
            onSelect={selectComponent}
          />
        ))}
    </group>
  );
}
