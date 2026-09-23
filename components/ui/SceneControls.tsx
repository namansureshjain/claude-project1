'use client';

import { useExplorer } from '@/lib/store';
import LearningModeToggle from './LearningModeToggle';

/** The persistent, deliberately small control cluster over the 3D scene. */
export default function SceneControls() {
  const exploded = useExplorer((s) => s.exploded);
  const toggleExploded = useExplorer((s) => s.toggleExploded);
  const sceneMode = useExplorer((s) => s.sceneMode);
  const setSceneMode = useExplorer((s) => s.setSceneMode);
  const reset = useExplorer((s) => s.requestCameraReset);
  const selectPayload = useExplorer((s) => s.selectPayload);
  const sceneVisible = useExplorer((s) => s.sceneVisible);
  const webglFailed = useExplorer((s) => s.webglFailed);

  const inBay = sceneMode === 'payload-bay';

  // Without a 3D scene these controls have nothing to act on.
  if (!sceneVisible || webglFailed) return null;

  return (
    <div className="pointer-events-auto fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      <div className="hidden md:block">
        <LearningModeToggle />
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            if (inBay) {
              setSceneMode('vehicle');
              selectPayload(null);
            } else {
              setSceneMode('payload-bay');
            }
          }}
          aria-pressed={inBay}
          className={inBay ? 'btn-solid' : 'btn-ghost'}
        >
          {inBay ? 'Leave payload bay' : 'Payload bay'}
        </button>

        {!inBay && (
          <button type="button" onClick={toggleExploded} aria-pressed={exploded} className="btn-ghost">
            {exploded ? 'Assemble' : 'Exploded view'}
          </button>
        )}

        <button type="button" onClick={reset} className="btn-ghost">
          Reset view
        </button>
      </div>
    </div>
  );
}
