'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { Canvas, type RootState } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useExplorer } from '@/lib/store';
import { useIsMobile, usePerformanceTier, useReducedMotion } from '@/lib/hooks';
import RocketModel from './RocketModel';
import PayloadBay from './PayloadBay';
import Starfield from './Starfield';
import Earth from './Earth';
import Moon from './Moon';
import LaunchSiteMarker from './LaunchSiteMarker';
import CameraRig from './CameraRig';
import SceneLighting from './SceneLighting';

function SceneReadySignal() {
  const setSceneReady = useExplorer((s) => s.setSceneReady);
  useEffect(() => {
    // One frame after mount the scene has drawn at least once.
    const id = requestAnimationFrame(() => setSceneReady(true));
    return () => cancelAnimationFrame(id);
  }, [setSceneReady]);
  return null;
}

export default function RocketScene({ paused = false }: { paused?: boolean }) {
  const reduced = useReducedMotion();
  const tier = usePerformanceTier();
  const isMobile = useIsMobile();
  const [contextLost, setContextLost] = useState(false);

  const sceneMode = useExplorer((s) => s.sceneMode);
  const exploded = useExplorer((s) => s.exploded);
  const selectComponent = useExplorer((s) => s.selectComponent);
  const selectPayload = useExplorer((s) => s.selectPayload);
  const setWebglFailed = useExplorer((s) => s.setWebglFailed);
  const sceneReady = useExplorer((s) => s.sceneReady);

  const animate = !reduced;
  const quality = tier === 'low' ? 0.5 : tier === 'medium' ? 0.75 : 1;
  const starCount = tier === 'low' ? 450 : tier === 'medium' ? 900 : 1600;
  const usePost = tier === 'high' && !reduced;

  const onCreated = useCallback(
    ({ gl }: RootState) => {
      const canvas = gl.domElement;
      const onLost = (e: Event) => {
        e.preventDefault();
        setContextLost(true);
        setWebglFailed(true);
      };
      canvas.addEventListener('webglcontextlost', onLost);
    },
    [setWebglFailed],
  );

  if (contextLost) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={tier === 'low' ? [1, 1.3] : [1, 2]}
      gl={{
        antialias: tier !== 'low',
        powerPreference: 'high-performance',
        alpha: true,
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0.5, 40], fov: 32, near: 0.1, far: 1400 }}
      onCreated={onCreated}
      onPointerMissed={() => {
        // Clicking empty space clears the current selection but never the view.
        selectComponent(null);
        selectPayload(null);
      }}
      frameloop={paused ? 'never' : reduced ? 'demand' : 'always'}
    >
      <color attach="background" args={['#07080a']} />
      <fog attach="fog" args={['#07080a', 140, 520]} />

      <Suspense fallback={null}>
        <SceneLighting quality={quality} />
        <Starfield count={starCount} animate={animate} />
        {/* Earth and the Moon load their own textures, so they get their own
            Suspense boundary and the vehicle is never held up waiting on them. */}
        <Suspense fallback={null}>
          <Earth quality={quality} animate={animate} clouds={tier !== 'low'} />
          {tier !== 'low' && <Moon quality={quality} />}
        </Suspense>

        {/* Mounted only after the first frame - see LaunchSiteMarker. Skipped
            on phones, where the wider hero framing pushes the site off the
            left edge and the label would be clipped. */}
        {sceneMode === 'vehicle' && sceneReady && !isMobile && <LaunchSiteMarker />}

        {sceneMode === 'payload-bay' ? (
          <PayloadBay animate={animate} />
        ) : (
          <RocketModel
            quality={quality}
            animate={animate}
            showHotspots={exploded}
            compactHotspots={isMobile}
          />
        )}

        {usePost && (
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.22} luminanceThreshold={0.88} luminanceSmoothing={0.2} mipmapBlur />
            <Vignette offset={0.32} darkness={0.5} />
          </EffectComposer>
        )}

        <Preload all />
        <SceneReadySignal />
      </Suspense>

      <CameraRig isMobile={isMobile} animate={animate} />
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
