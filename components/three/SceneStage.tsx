'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useExplorer } from '@/lib/store';
import StaticRocketFallback from '@/components/ui/StaticRocketFallback';

const RocketScene = dynamic(() => import('./RocketScene'), { ssr: false });

function webglSupported() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

/**
 * Hosts the 3D scene behind the page.
 *
 * Three states are handled explicitly rather than assumed away: WebGL missing
 * or blocked, the scene failing at runtime, and the scene being scrolled out of
 * view (where it stops rendering entirely instead of burning battery).
 */
export default function SceneStage() {
  const [support, setSupport] = useState<'checking' | 'ok' | 'none'>('checking');
  const [offscreen, setOffscreen] = useState(false);
  const webglFailed = useExplorer((s) => s.webglFailed);
  const setSceneReady = useExplorer((s) => s.setSceneReady);
  const setSceneVisible = useExplorer((s) => s.setSceneVisible);
  const setWebglFailed = useExplorer((s) => s.setWebglFailed);

  useEffect(() => {
    const ok = webglSupported();
    setSupport(ok ? 'ok' : 'none');
    if (!ok) {
      // Without a scene there is nothing to wait for, so release the loader,
      // and tell the rest of the interface to drop its 3D-only affordances.
      setSceneReady(true);
      setWebglFailed(true);
    }
  }, [setSceneReady, setWebglFailed]);

  useEffect(() => {
    const onScroll = () => {
      const away = window.scrollY > window.innerHeight * 0.85;
      setOffscreen(away);
      setSceneVisible(!away);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setSceneVisible]);

  const failed = support === 'none' || webglFailed;

  return (
    <div
      // 100svh rather than inset-0: a fixed full-height box is sized to the
      // large viewport on mobile, so part of the scene would sit under the
      // browser chrome and the vehicle would be cropped. overflow-hidden keeps
      // hotspot labels, which are real DOM nodes, from widening the document.
      className="fixed inset-x-0 top-0 z-0 h-[100svh] overflow-hidden"
      aria-hidden={!failed}
      style={{ visibility: offscreen ? 'hidden' : 'visible' }}
    >
      {failed ? (
        <StaticRocketFallback reason={support === 'none' ? 'unsupported' : 'lost'} />
      ) : (
        support === 'ok' && <RocketScene paused={offscreen} />
      )}
    </div>
  );
}
