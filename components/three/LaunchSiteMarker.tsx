'use client';

import { Html } from '@react-three/drei';
import { LAUNCH_SITE_POSITION } from './Earth';

/**
 * Pins Sriharikota on the globe, so the country the vehicle launched from is
 * named rather than left for the viewer to recognise from the coastline.
 *
 * Mounted a frame late, once the scene reports ready. drei's <Html> creates its
 * React root inside a layout effect; mounted during React StrictMode's initial
 * double-invocation, that root is torn down and subsequent render() calls
 * silently no-op, leaving a correctly positioned but empty container. Mounting
 * after the first frame sidesteps it. The hotspot labels never hit this because
 * they only appear once the vehicle is exploded.
 */
export default function LaunchSiteMarker() {
  return (
    <group position={LAUNCH_SITE_POSITION}>
      {/* Not `center`: that would centre the whole dot-plus-label row on the
          site, putting the dot well to the west of it. Anchoring the row at the
          point and nudging back by half the dot keeps the dot itself on
          Sriharikota, with the label running out over the Bay of Bengal. */}
      <Html zIndexRange={[45, 0]} style={{ pointerEvents: 'none' }}>
        <div
          className="flex items-center gap-2 whitespace-nowrap"
          style={{ transform: 'translate(-5px, -50%)' }}
        >
          <span className="relative block h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 rounded-full border border-ember bg-ember/40" />
            <span className="absolute inset-[3px] rounded-full bg-ember" />
          </span>
          <span className="font-mono text-[10px] uppercase leading-tight tracking-mission text-bone drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            <span className="text-ember">Sriharikota</span>
            <span className="mx-1 text-white/40">/</span>
            India
          </span>
        </div>
      </Html>
    </group>
  );
}
