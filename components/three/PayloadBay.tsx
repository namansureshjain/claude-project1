'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { payloads } from '@/data/payloads';
import type { Payload } from '@/data/types';
import { useExplorer } from '@/lib/store';

const DECK_Y = 8.5;

/**
 * The payload deck, opened up.
 *
 * Positions on the deck are a layout choice, not a documented arrangement:
 * Skyroot has not published how the six payloads were physically mounted.
 * The point of this view is which payloads flew and what each one is, not
 * where its bolts were.
 */
export default function PayloadBay({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const selected = useExplorer((s) => s.selectedPayloadId);
  const selectPayload = useExplorer((s) => s.selectPayload);
  const interacting = useExplorer((s) => s.interacting);

  useFrame((_, delta) => {
    if (!group.current || !animate) return;
    const speed = interacting ? 0 : 0.09;
    group.current.rotation.y += delta * speed;
  });

  return (
    <group position={[0, DECK_Y, 0]}>
      {/* Deck plate and its mounting ring. */}
      <mesh position={[0, -0.52, 0]} receiveShadow>
        <cylinderGeometry args={[0.66, 0.7, 0.06, 48]} />
        <meshStandardMaterial color="#4a5058" metalness={0.75} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.67, 0.012, 6, 48]} />
        <meshStandardMaterial color="#ff6b1f" metalness={0.3} roughness={0.6} />
      </mesh>

      <group ref={group}>
        {payloads.map((p, i) => (
          <PayloadObject
            key={p.id}
            index={i}
            payload={p}
            selected={selected === p.id}
            dimmed={Boolean(selected) && selected !== p.id}
            animate={animate}
            onSelect={() => selectPayload(p.id)}
          />
        ))}
      </group>
    </group>
  );
}

function PayloadObject({
  payload,
  index,
  selected,
  dimmed,
  animate,
  onSelect,
}: {
  payload: Payload;
  index: number;
  selected: boolean;
  dimmed: boolean;
  animate: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  const x = Math.cos(payload.bayAngle) * payload.bayRadius;
  const z = Math.sin(payload.bayAngle) * payload.bayRadius;
  const symbolic = payload.category === 'symbolic-art';
  const height = symbolic ? 0.12 : 0.34;

  useFrame((_, delta) => {
    if (!ref.current || !mat.current) return;
    const rate = animate ? 8 : 1000;
    const targetY = selected ? -0.3 : -0.49 + height / 2;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, rate, delta);
    const s = THREE.MathUtils.damp(ref.current.scale.x, selected ? 1.18 : 1, rate, delta);
    ref.current.scale.setScalar(s);
    mat.current.emissiveIntensity = THREE.MathUtils.damp(
      mat.current.emissiveIntensity,
      selected ? 1.1 : 0.12,
      rate,
      delta,
    );
    mat.current.opacity = THREE.MathUtils.damp(mat.current.opacity, dimmed ? 0.25 : 1, rate, delta);
    mat.current.transparent = mat.current.opacity < 0.995;
    if (animate && !selected) ref.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={ref} position={[x, -0.49 + height / 2, z]}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        castShadow
      >
        {symbolic ? (
          <octahedronGeometry args={[0.09, 0]} />
        ) : (
          <boxGeometry args={[0.17, height, 0.17]} />
        )}
        <meshStandardMaterial
          ref={mat}
          color={payload.accent}
          emissive={payload.accent}
          emissiveIntensity={0.12}
          metalness={symbolic ? 0.95 : 0.5}
          roughness={symbolic ? 0.12 : 0.45}
        />
      </mesh>

      {/* Deployable panels on the spacecraft, so a satellite reads as a
          satellite rather than a coloured block. Panel size and arrangement are
          illustrative — no public source describes these payloads' geometry. */}
      {!symbolic &&
        [-1, 1].map((sign) => (
          <mesh key={sign} position={[sign * 0.17, height * 0.18, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.16, 0.012, 0.13]} />
            <meshStandardMaterial
              color="#1b2b4a"
              metalness={0.35}
              roughness={0.3}
              emissive="#1f3a6b"
              emissiveIntensity={0.25}
            />
          </mesh>
        ))}

      <Html
        position={[0, height / 2 + 0.12 + (index % 3) * 0.16, 0]}
        center
        distanceFactor={2.9}
        zIndexRange={[40, 0]}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          aria-label={`${payload.name} — ${payload.subtitle}`}
          aria-pressed={selected}
          className={`whitespace-nowrap border px-1.5 py-0.5 font-mono text-[8px] uppercase
                      tracking-mission transition-colors duration-200 ${
                        selected
                          ? 'border-ember bg-ember text-void'
                          : 'border-white/25 bg-void/70 text-smoke hover:border-ember/70 hover:text-bone'
                      }`}
        >
          {payload.name}
        </button>
      </Html>
    </group>
  );
}
