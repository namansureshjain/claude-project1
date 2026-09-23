'use client';

/**
 * Shown when WebGL is unavailable or the context is lost.
 *
 * The 3D view is an enhancement, not the only route to the content, so this
 * states what happened plainly and points at the explorer that has everything.
 */
export default function StaticRocketFallback({
  reason,
}: {
  /** 'unsupported' = the browser never had WebGL; 'lost' = it went away mid-session. */
  reason: 'unsupported' | 'lost';
}) {
  const lost = reason === 'lost';

  return (
    <div className="relative h-full w-full overflow-hidden bg-void">
      <div className="grid-lines absolute inset-0 opacity-50" aria-hidden />

      {/* A flat schematic of the vehicle, so the page still shows a rocket. */}
      <svg
        viewBox="0 0 120 520"
        className="absolute left-1/2 top-1/2 h-[68vh] -translate-x-1/2 -translate-y-1/2 opacity-80"
        role="img"
        aria-label="Schematic side view of the Vikram-1 launch vehicle, nose at the top, four stages below."
      >
        <defs>
          <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#23282f" />
            <stop offset="45%" stopColor="#5a6069" />
            <stop offset="100%" stopColor="#1b1f25" />
          </linearGradient>
        </defs>
        <path d="M60 4 Q84 58 84 84 L36 84 Q36 58 60 4 Z" fill="url(#body)" />
        <rect x="36" y="84" width="48" height="42" fill="url(#body)" />
        <rect x="39" y="126" width="42" height="14" fill="#2a2e35" />
        <rect x="37" y="140" width="46" height="96" fill="url(#body)" />
        <rect x="39" y="236" width="42" height="12" fill="#2a2e35" />
        <rect x="35" y="248" width="50" height="118" fill="url(#body)" />
        <rect x="37" y="366" width="46" height="14" fill="#2a2e35" />
        <rect x="33" y="380" width="54" height="104" fill="url(#body)" />
        <rect x="33" y="452" width="54" height="5" fill="#ff6b1f" />
        <path d="M33 484 Q28 506 22 514 L98 514 Q92 506 87 484 Z" fill="#4a5058" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-void/90 p-5 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          <p className="label-mono">
            {lost ? '3D view interrupted' : '3D view unavailable'}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-bone/85">
            {lost
              ? 'The 3D scene lost its graphics context, which usually means the device ran short of GPU memory. Everything on this site is still available as text.'
              : 'This browser or device cannot run WebGL, so the interactive vehicle is shown as a schematic. Everything on this site is still available as text.'}
          </p>
          <a href="#anatomy" className="btn-solid mt-4 inline-block">
            Open the component explorer
          </a>
        </div>
      </div>
    </div>
  );
}
