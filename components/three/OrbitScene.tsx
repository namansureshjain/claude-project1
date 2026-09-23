'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks';

const EARTH_R = 3;
// 450 km against a 6,371 km mean radius, to scale.
const ORBIT_R = EARTH_R * (1 + 450 / 6371);

function Earth() {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();
  useFrame((_, d) => {
    if (!reduced && ref.current) ref.current.rotation.y += d * 0.045;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[EARTH_R, 48, 32]} />
        <meshStandardMaterial color="#0f2c4d" metalness={0.1} roughness={0.85} />
      </mesh>
      {/* Atmosphere shell — deliberately thin, because it is. */}
      <mesh>
        <sphereGeometry args={[EARTH_R * 1.016, 48, 32]} />
        <meshBasicMaterial color="#5aa9ff" transparent opacity={0.13} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function OrbitRing() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i += 1) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ORBIT_R, 0, Math.sin(a) * ORBIT_R));
    }
    return pts;
  }, []);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#ff6b1f', transparent: true, opacity: 0.9 }))} />
  );
}

function Satellite() {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();
  useFrame((state) => {
    if (!ref.current) return;
    const t = reduced ? 0.6 : state.clock.elapsedTime * 0.28;
    ref.current.position.set(Math.cos(t) * ORBIT_R, 0, Math.sin(t) * ORBIT_R);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.13, 0.13, 0.13]} />
      <meshStandardMaterial color="#ff6b1f" emissive="#ff6b1f" emissiveIntensity={1.4} />
    </mesh>
  );
}

/** The ascent: mostly sideways, which is the entire point of the diagram. */
function AscentArc() {
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i += 1) {
      const t = i / 64;
      const r = EARTH_R + (ORBIT_R - EARTH_R) * Math.pow(t, 0.55);
      // Swept across the near face of the planet so the path is not hidden behind it.
      const a = Math.PI * 0.1 + t * Math.PI * 0.55;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  return (
    <primitive
      object={new THREE.Line(geo, new THREE.LineDashedMaterial({ color: '#cbd3dd', dashSize: 0.14, gapSize: 0.09 }))}
      onUpdate={(l: THREE.Line) => l.computeLineDistances()}
    />
  );
}

export default function OrbitScene() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      // Framed so the whole planet fits: the point of the diagram is how
      // little daylight there is between the surface and a 450 km orbit.
      camera={{ position: [0, 4.6, 11.6], fov: 36 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? 'demand' : 'always'}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 5, 4]} intensity={2.2} color="#fff2e4" />
      <group rotation={[0.32, 0, 0.18]}>
        <Earth />
        <OrbitRing />
        <AscentArc />
        <Satellite />
      </group>
    </Canvas>
  );
}
