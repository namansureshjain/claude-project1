'use client';

import { Environment, Lightformer } from '@react-three/drei';

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
      <ambientLight intensity={0.42} color="#9fb4d4" />
      <directionalLight position={[-9, 14, 8]} intensity={2.7} color="#fff4e8" castShadow={false} />
      <directionalLight position={[8, -4, -6]} intensity={0.38} color="#ffa877" />
      <pointLight position={[0, -12, 6]} intensity={0.5} color="#3d7fd6" distance={60} decay={2} />

      <Environment resolution={quality > 0.7 ? 256 : 128} frames={1} background={false}>
        <Lightformer
          form="rect"
          intensity={4.2}
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
