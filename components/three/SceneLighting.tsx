'use client';

import { Environment, Lightformer } from '@react-three/drei';
import { SUN_DIR } from './Earth';

/**
 * Cinematic lighting built entirely from local light shapes — no HDRI download,
 * so the scene renders identically offline and adds nothing to the payload.
 *
 * A cool key from above-left reads as sunlight; a warm low fill from the right
 * picks out the composite surfaces; a long soft strip behind the vehicle gives
 * the metallic rings their highlight.
 */
export default function SceneLighting({ quality }: { quality: number }) {
  return (
    <>
      <ambientLight intensity={0.36} color="#9fb4d4" />
      {/* Key light on the same axis as the Earth's sun, so the vehicle is lit
          from where the terminator says it should be. A white airframe needs
          far less intensity than the bare-metal look it replaced. */}
      <directionalLight
        position={SUN_DIR.clone().multiplyScalar(22).toArray()}
        intensity={2.0}
        color="#fff4e8"
        castShadow={false}
      />
      {/* Earthshine: cool bounce from the planet below. */}
      <directionalLight position={[3, -12, 4]} intensity={0.42} color="#7fb0ff" />
      <directionalLight position={[8, -4, -6]} intensity={0.22} color="#ffa877" />
      <pointLight position={[0, -12, 6]} intensity={0.5} color="#3d7fd6" distance={60} decay={2} />

      <Environment resolution={quality > 0.7 ? 256 : 128} frames={1} background={false}>
        <Lightformer
          form="rect"
          intensity={3.0}
          color="#ffffff"
          position={[-6, 8, 6]}
          rotation={[0, Math.PI / 5, 0]}
          scale={[8, 26, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.9}
          color="#ffc9a8"
          position={[7, -3, -4]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[6, 22, 1]}
        />
        <Lightformer
          form="circle"
          intensity={1.1}
          color="#8fc2ff"
          position={[0, -16, 8]}
          scale={[14, 14, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#ffffff"
          position={[0, 0, -14]}
          scale={[20, 30, 1]}
        />
      </Environment>
    </>
  );
}
