'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A very subtle Earth limb far below the vehicle: a dark sphere with an
 * atmospheric rim. Shader-based so it stays crisp and costs one draw call.
 */
const vertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  uniform vec3 uSun;
  uniform vec3 uAtmo;
  uniform vec3 uGround;
  uniform float uOpacity;

  void main() {
    float rim = 1.0 - max(dot(vNormalW, vViewDir), 0.0);
    float lit = max(dot(vNormalW, normalize(uSun)), 0.0);

    // Ground: barely visible, just enough to read as a surface.
    vec3 ground = uGround * (0.06 + lit * 0.5);
    // Atmosphere: thin bright band exactly on the limb, strongest where lit.
    float atmo = pow(rim, 3.4) * (0.25 + lit * 1.5);
    vec3 col = ground + uAtmo * atmo;

    gl_FragColor = vec4(col, uOpacity * clamp(0.25 + atmo * 1.4 + lit * 0.35, 0.0, 1.0));
  }
`;

export default function EarthLimb({
  quality = 1,
  animate = true,
}: {
  quality?: number;
  animate?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uSun: { value: new THREE.Vector3(-0.5, 0.75, 0.6) },
      uAtmo: { value: new THREE.Color('#5aa9ff') },
      uGround: { value: new THREE.Color('#0d2b4a') },
      uOpacity: { value: 1 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!animate || !ref.current) return;
    ref.current.rotation.y += delta * 0.008;
  });

  const seg = Math.max(24, Math.round(64 * quality));

  return (
    <mesh ref={ref} position={[0, -64, -6]} renderOrder={-1}>
      <sphereGeometry args={[56, seg, Math.round(seg / 2)]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
