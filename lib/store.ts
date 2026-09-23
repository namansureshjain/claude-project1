'use client';

import { create } from 'zustand';

export type SectionId = 'rocket' | 'anatomy' | 'payloads' | 'mission' | 'supply' | 'learn';
export type LearningMode = 'simple' | 'engineering';

/** Which 3D scene the canvas is currently showing. */
export type SceneMode = 'vehicle' | 'payload-bay' | 'orbit';

interface ExplorerState {
  section: SectionId;
  setSection: (s: SectionId) => void;

  sceneMode: SceneMode;
  setSceneMode: (m: SceneMode) => void;

  exploded: boolean;
  setExploded: (v: boolean) => void;
  toggleExploded: () => void;

  hoveredComponentId: string | null;
  setHoveredComponentId: (id: string | null) => void;

  selectedComponentId: string | null;
  selectComponent: (id: string | null) => void;

  selectedPayloadId: string | null;
  selectPayload: (id: string | null) => void;

  selectedOrganizationId: string | null;
  selectOrganization: (id: string | null) => void;

  learningMode: LearningMode;
  setLearningMode: (m: LearningMode) => void;
  toggleLearningMode: () => void;

  /** True while the user is actively dragging/zooming — idle motion pauses. */
  interacting: boolean;
  setInteracting: (v: boolean) => void;

  /** Bumping this asks the camera rig to return to the hero framing. */
  resetToken: number;
  requestCameraReset: () => void;

  timelineIndex: number;
  setTimelineIndex: (i: number) => void;

  glossaryTermId: string | null;
  openGlossaryTerm: (id: string | null) => void;

  whyOpenFor: string | null;
  openWhy: (id: string | null) => void;

  /** Set once the 3D scene has finished its first render. */
  sceneReady: boolean;
  setSceneReady: (v: boolean) => void;

  /** False once the scene has scrolled out of view. Detail panels follow it. */
  sceneVisible: boolean;
  setSceneVisible: (v: boolean) => void;

  /** Falls back to the text-only explorer when WebGL is unavailable. */
  webglFailed: boolean;
  setWebglFailed: (v: boolean) => void;
}

export const useExplorer = create<ExplorerState>((set, get) => ({
  section: 'rocket',
  setSection: (section) => set({ section }),

  sceneMode: 'vehicle',
  // Switching scenes clears the selection belonging to the scene being left,
  // so a stale panel never hangs over a view it no longer describes.
  setSceneMode: (sceneMode) =>
    set(
      sceneMode === 'payload-bay'
        ? { sceneMode, selectedComponentId: null, exploded: false, whyOpenFor: null }
        : { sceneMode, selectedPayloadId: null },
    ),

  exploded: false,
  setExploded: (exploded) => set({ exploded }),
  toggleExploded: () => {
    const next = !get().exploded;
    set({ exploded: next, selectedComponentId: next ? get().selectedComponentId : null });
  },

  hoveredComponentId: null,
  setHoveredComponentId: (hoveredComponentId) => set({ hoveredComponentId }),

  selectedComponentId: null,
  selectComponent: (selectedComponentId) =>
    set({ selectedComponentId, selectedPayloadId: null, whyOpenFor: null }),

  selectedPayloadId: null,
  selectPayload: (selectedPayloadId) => set({ selectedPayloadId, selectedComponentId: null }),

  selectedOrganizationId: null,
  selectOrganization: (selectedOrganizationId) => set({ selectedOrganizationId }),

  learningMode: 'simple',
  setLearningMode: (learningMode) => set({ learningMode }),
  toggleLearningMode: () =>
    set({ learningMode: get().learningMode === 'simple' ? 'engineering' : 'simple' }),

  interacting: false,
  setInteracting: (interacting) => set({ interacting }),

  resetToken: 0,
  requestCameraReset: () =>
    set({
      resetToken: get().resetToken + 1,
      selectedComponentId: null,
      selectedPayloadId: null,
      exploded: false,
      sceneMode: 'vehicle',
    }),

  timelineIndex: 0,
  setTimelineIndex: (timelineIndex) => set({ timelineIndex }),

  glossaryTermId: null,
  openGlossaryTerm: (glossaryTermId) => set({ glossaryTermId }),

  whyOpenFor: null,
  openWhy: (whyOpenFor) => set({ whyOpenFor }),

  sceneReady: false,
  setSceneReady: (sceneReady) => set({ sceneReady }),

  sceneVisible: true,
  setSceneVisible: (sceneVisible) => set({ sceneVisible }),

  webglFailed: false,
  setWebglFailed: (webglFailed) => set({ webglFailed }),
}));
