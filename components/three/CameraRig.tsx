'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { componentById } from '@/data/components';
import { payloadById } from '@/data/payloads';
import { useExplorer } from '@/lib/store';

const HERO_DISTANCE = 40;
const HERO_HEIGHT = 0.5;

interface Props {
  isMobile: boolean;
  animate: boolean;
}

/**
 * Camera behaviour.
 *
 * The camera has two modes that never fight each other: a scripted transition
 * toward whatever the interface has focused, and free orbit once the user
 * takes hold of it. Grabbing the controls cancels the script; choosing a
 * component or pressing reset starts a new one. Nothing ever snaps except an
 * explicit reset, and even that is eased.
 */
export default function CameraRig({ isMobile, animate }: Props) {
  const controls = useRef<OrbitControlsImpl>(null);
  const scripted = useRef(true);
  const desiredPos = useRef(new THREE.Vector3(0, HERO_HEIGHT, HERO_DISTANCE));
  const desiredTarget = useRef(new THREE.Vector3(0, 0, 0));

  const { camera } = useThree();

  const selectedComponentId = useExplorer((s) => s.selectedComponentId);
  const selectedPayloadId = useExplorer((s) => s.selectedPayloadId);
  const sceneMode = useExplorer((s) => s.sceneMode);
  const exploded = useExplorer((s) => s.exploded);
  const resetToken = useExplorer((s) => s.resetToken);
  const setInteracting = useExplorer((s) => s.setInteracting);

  // On a tall, narrow screen the vehicle would otherwise fill the whole height
  // and collide with the hero type, so pull back and sit it low in the frame.
  const heroDistance = isMobile ? HERO_DISTANCE * 1.62 : HERO_DISTANCE;
  const heroHeight = isMobile ? 4.2 : HERO_HEIGHT;
  const heroTargetY = isMobile ? 3.4 : 0;

  // Recompute the target framing whenever the interface focuses something new.
  useEffect(() => {
    const azimuth = camera.position.x === 0 && camera.position.z === 0
      ? 0
      : Math.atan2(camera.position.x, camera.position.z);

    if (sceneMode === 'payload-bay') {
      const p = selectedPayloadId ? payloadById.get(selectedPayloadId) : null;
      const deckY = 8.5;
      desiredTarget.current.set(0, deckY, 0);
      const d = p ? 3.1 : 4.4;
      desiredPos.current.set(Math.sin(azimuth) * d, deckY + 0.9, Math.cos(azimuth) * d);
      scripted.current = true;
      return;
    }

    if (selectedComponentId) {
      const c = componentById.get(selectedComponentId);
      if (c) {
        const y = exploded ? c.position + c.explodedOffset : c.position;
        // Frame the section at roughly 60% of the viewport height.
        const span = Math.max(c.length, 1.6);
        const d = THREE.MathUtils.clamp((span / 0.55 / 2) / Math.tan(THREE.MathUtils.degToRad(16)), 7, 34);
        desiredTarget.current.set(0, y, 0);
        desiredPos.current.set(Math.sin(azimuth) * d, y + span * 0.22, Math.cos(azimuth) * d);
        scripted.current = true;
        return;
      }
    }

    const d = exploded ? heroDistance * 1.46 : heroDistance;
    desiredTarget.current.set(0, exploded ? 0 : heroTargetY, 0);
    desiredPos.current.set(
      Math.sin(azimuth) * d,
      exploded ? HERO_HEIGHT : heroHeight,
      Math.cos(azimuth) * d,
    );
    scripted.current = true;
  }, [
    selectedComponentId,
    selectedPayloadId,
    sceneMode,
    exploded,
    resetToken,
    camera,
    heroDistance,
    heroHeight,
    heroTargetY,
  ]);

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c || !scripted.current) return;

    const rate = animate ? 2.6 : 1000;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredPos.current.x, rate, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredPos.current.y, rate, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredPos.current.z, rate, delta);

    c.target.x = THREE.MathUtils.damp(c.target.x, desiredTarget.current.x, rate, delta);
    c.target.y = THREE.MathUtils.damp(c.target.y, desiredTarget.current.y, rate, delta);
    c.target.z = THREE.MathUtils.damp(c.target.z, desiredTarget.current.z, rate, delta);

    c.update();

    if (
      camera.position.distanceTo(desiredPos.current) < 0.02 &&
      c.target.distanceTo(desiredTarget.current) < 0.02
    ) {
      scripted.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.55}
      zoomSpeed={0.6}
      minDistance={3}
      maxDistance={70}
      // Keep the vehicle readable: no flipping past the poles.
      minPolarAngle={0.22}
      maxPolarAngle={Math.PI - 0.22}
      onStart={() => {
        scripted.current = false;
        setInteracting(true);
      }}
      onEnd={() => setInteracting(false)}
    />
  );
}
