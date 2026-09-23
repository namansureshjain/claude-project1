'use client';

import { useExplorer } from '@/lib/store';

/**
 * The first screen: almost entirely the vehicle, with the least type that
 * still says what this is and what to do.
 */
export default function Hero() {
  const toggleExploded = useExplorer((s) => s.toggleExploded);
  const exploded = useExplorer((s) => s.exploded);
  const selectedComponentId = useExplorer((s) => s.selectedComponentId);
  const selectedPayloadId = useExplorer((s) => s.selectedPayloadId);
  const sceneMode = useExplorer((s) => s.sceneMode);
  const webglFailed = useExplorer((s) => s.webglFailed);

  // Step out of the way once the visitor is reading about something specific.
  const recede = Boolean(
    selectedComponentId || selectedPayloadId || exploded || sceneMode !== 'vehicle',
  );

  return (
    <div
      className={`pointer-events-none relative z-20 flex min-h-[100svh] flex-col justify-between
                  px-5 pb-6 pt-24 transition-opacity duration-500 md:px-8 md:pb-10 md:pt-28
                  ${recede ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden={recede}
    >
      {/* On phones the vehicle sits behind the type, so the type needs a floor. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[62svh] bg-gradient-to-b
                   from-void via-void/85 to-transparent md:hidden"
        aria-hidden
      />

      <div className="relative max-w-[40rem]">
        <p className="label-mono animate-fadeUp">
          Skyroot Aerospace &middot; Mission Aagaman &middot; 18 July 2026
        </p>

        <h1
          className="mt-4 animate-fadeUp text-[clamp(3rem,10vw,7rem)] font-extralight leading-[0.86]
                     tracking-[-0.045em] text-paper"
          style={{ animationDelay: '80ms' }}
        >
          VIKRAM-1
        </h1>

        <p
          className="mt-5 max-w-md animate-fadeUp text-balance text-[clamp(1rem,2.4vw,1.35rem)]
                     font-light leading-snug text-bone/90"
          style={{ animationDelay: '160ms' }}
        >
          Understand the machine that carries humanity to orbit.
        </p>

        <p
          className="mt-4 max-w-sm animate-fadeUp text-[13px] leading-relaxed text-smoke"
          style={{ animationDelay: '240ms' }}
        >
          Explore the rocket. Understand every stage. Follow the technology. Meet the payloads.
        </p>

        <div
          className="pointer-events-auto mt-8 flex animate-fadeUp flex-wrap items-center gap-3"
          style={{ animationDelay: '320ms' }}
        >
          {!webglFailed && (
            <button type="button" onClick={toggleExploded} className="btn-solid">
              {exploded ? 'Reassemble' : 'Take it apart'}
            </button>
          )}
          <a href="#anatomy" className={webglFailed ? 'btn-solid' : 'btn-ghost'}>
            Explore the rocket
          </a>
        </div>
      </div>

      <div className="relative max-w-sm">
        <ul
          className="animate-fadeUp space-y-1 font-mono text-[9px] uppercase tracking-mission text-smoke"
          style={{ animationDelay: '420ms' }}
        >
          {!webglFailed && (
            <>
              <li className="hidden md:block">Drag to rotate</li>
              <li className="md:hidden">Swipe to rotate</li>
              <li>Click the rocket to open it</li>
            </>
          )}
          <li className="hidden md:block">Scroll to explore</li>
        </ul>

        <p
          className="mt-3 animate-fadeUp text-[10px] leading-relaxed text-smoke/70"
          style={{ animationDelay: '420ms' }}
        >
          Representative visualization. Built from published dimensions, not engineering drawings.
        </p>
      </div>
    </div>
  );
}
