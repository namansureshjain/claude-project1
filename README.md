# Vikram-1 — Interactive Rocket Anatomy & Mission Explorer

An educational, interactive explorer for Skyroot Aerospace's **Vikram-1** launch vehicle and its
maiden orbital flight, **Mission Aagaman** (18 July 2026).

The goal is not a marketing page. It is to let someone who knows nothing about rockets click one,
take it apart, find out what each section does and why it exists, discover which organization built
it, and then walk into the payload bay and understand what each payload was actually for.

Every factual claim on the site is attached to a source and a confidence level. Where something is
not publicly known, the site says so rather than filling the gap with a plausible guess.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

Requires Node 18.18+ (developed on Node 22).

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| 3D | React Three Fiber 9, drei, three.js, @react-three/postprocessing |
| Animation | Framer Motion (UI), damped `useFrame` interpolation (3D) |
| State | Zustand |
| Styling | Tailwind CSS |

The 3D bundle is code-split and loaded with `next/dynamic` (`ssr: false`), so the first paint does
not wait on three.js.

---

## Project structure

```
app/
  layout.tsx            fonts, metadata, skip link
  page.tsx              section composition
  globals.css           design tokens and component classes

data/                   ALL content lives here — see "Editing content"
  types.ts              shared content types
  sources.ts            every source, with an evidence tier
  rocket.ts             vehicle- and mission-level facts
  components.ts         the rocket, section by section
  organizations.ts      companies and agencies
  payloads.ts           the six Mission Aagaman payloads
  mission.ts            flight sequence
  supplyChain.ts        "who builds a rocket?" domains
  glossary.ts           24 terms
  learning.ts           what-if scenarios, system tree, scale refs, journeys

components/
  three/                RocketScene, RocketModel, RocketSection, PayloadBay,
                        CameraRig, Starfield, EarthLimb, SceneLighting,
                        ComponentHotspot, OrbitScene, SceneStage
  panels/               ComponentDetailPanel, PayloadDetailPanel
  ui/                   everything else

lib/
  store.ts              Zustand store (the single source of interaction state)
  hooks.ts              reduced motion, media queries, performance tier
  geometry.ts           procedural geometry helpers (ogive, nozzle, stage)
```

---

## Editing content

Nothing user-facing is hard-coded in a React component. To change what the site says, edit `data/`.

### Add a rocket component

Append to `components` in `data/components.ts`:

```ts
{
  id: 'reaction-control',
  name: 'Reaction Control System',
  code: 'RCS',
  category: 'gnc',
  shortDescription: 'Small thrusters that point the vehicle when the main engine is off.',
  beginnerExplanation: '…',      // Level 1 — assumes no prior knowledge
  engineeringExplanation: '…',   // Level 2 — public information only
  whyItExists: '…',              // answers the "Why does this exist?" button
  role: '…',
  developer:    { value: 'Skyroot Aerospace', confidence: 'confirmed', sources: ['skyroot-site'] },
  manufacturer: { value: 'Supplier not publicly disclosed', confidence: 'undisclosed', sources: [] },
  technologies: ['Cold gas thrusters'],
  connectsTo: ['gnc', 'stage-4-oam'],
  keyTerms: ['attitude-control'],
  position: 6.6,          // vertical centre, scene units (1 unit = 1 m, vehicle centred on y = 0)
  length: 0,              // 0 = cross-cutting system: hotspot only, no mesh
  explodedOffset: 0.7,    // extra vertical offset in exploded view
  radius: 0.65,
  fidelity: 'conceptual',
  sources: ['skyroot-site'],
}
```

Geometry rules:

- The vehicle spans `y = -10` (base) to `y = +10` (nose), matching the published ~20 m height.
- `length > 0` gives the section a mesh. Add a `case` in `buildGeometry()` in
  `components/three/RocketSection.tsx` if it needs a shape other than a tapered barrel.
- `length === 0` means a cross-cutting system: it gets an interactive hotspot but no geometry.
- Keep `explodedOffset` values such that no two sections overlap when exploded, and re-check the
  exploded camera distance in `CameraRig.tsx` if the stack gets taller.

### Add a payload

Append to `payloads` in `data/payloads.ts`. `bayAngle` and `bayRadius` place it on the payload deck;
`category` controls which bucket it appears under, and the categories are deliberately distinct —
a customer satellite, a technology demonstration and a commemorative object are not the same thing
and should not be merged.

### Add an organization

Append to `organizations` in `data/organizations.ts` and reference its `id` from a payload's
`organizationId` or a supply-chain domain's `organizationIds`.

### Add a source

Append to `sources` in `data/sources.ts` with a `tier`:

| Tier | Meaning |
| --- | --- |
| `primary-operator` | Skyroot, or a payload operator, about their own hardware |
| `primary-government` | ISRO / Department of Space / Government of India |
| `specialist-press` | Aerospace trade and specialist publications |
| `wire-press` | Wire services and mainstream reporting |
| `reference` | Catalogues and reference works, for cross-checking only |

Then reference the source's `id` from any `Claim.sources` array.

### The confidence model

Every fact is a `Claim`:

```ts
{ value: string; confidence: 'confirmed' | 'reported' | 'undisclosed' | 'disputed';
  sources: string[]; dispute?: string }
```

- **confirmed** — stated by the operator or a government source, or corroborated across reliable reporting.
- **reported** — reported by reliable sources, not confirmed by a primary document.
- **undisclosed** — nobody has published this. Say so. Do not infer it.
- **disputed** — reliable sources disagree. Set `dispute` to explain the disagreement rather than
  silently picking a number. (Vikram-1's payload capability figure is the live example.)

**Do not invent suppliers.** A company that makes a similar component is not evidence that it made
this one. `supplyChain.ts` carries a standing disclaimer to that effect and the UI renders it.

---

## Replacing or updating the 3D model

The vehicle is **built procedurally** from published dimensions — there is no `.glb` to swap, and
this is a deliberate choice: Skyroot has not published engineering drawings for Vikram-1, so a
detailed "accurate" model would be a fabrication. The site labels the model as a *representative
visualization* throughout, and `FidelityNote.tsx` explains exactly what that means.

To adjust the procedural model, edit `buildGeometry()` in `components/three/RocketSection.tsx` and
the helpers in `lib/geometry.ts` (`ogiveProfile`, `fairingGeometry`, `stageGeometry`,
`nozzleGeometry`, `bandGeometry`).

If Skyroot later publishes real geometry and you want to load a GLTF asset instead:

1. Put the file in `public/models/`.
2. In `RocketModel.tsx`, load it with drei's `useGLTF` inside the existing `<Suspense>` boundary,
   and preload with `useGLTF.preload('/models/vikram-1.glb')`.
3. Map each named mesh in the GLTF to a component `id` so hover, selection and the exploded
   offsets keep working — `RocketSection` only needs a geometry, not a specific shape.
4. Update the affected components' `fidelity` from `representative` to `documented-geometry`, and
   revise `rocket.modelFidelityNote` in `data/rocket.ts` so the disclosure stays accurate.

---

## Accessibility

The 3D view enhances the content; it is never the only route to it.

- **Text component explorer** (`TextExplorer`) lists every component with the same data, filterable
  by category, and drives the 3D camera when the scene is available.
- **Hotspots are real buttons**, rendered as DOM through drei's `<Html>`, so they are focusable and
  announced.
- **Keyboard**: skip link, focus-visible outlines throughout, `Escape` closes panels and the
  glossary, arrow keys step the mission timeline when the scrubber is focused.
- **Reduced motion**: `prefers-reduced-motion: reduce` stops the idle orbit, the roll, the cursor
  tilt, the starfield drift and the Earth rotation, switches the R3F frameloop to `demand`, disables
  postprocessing, and collapses CSS transitions.
- **Fallbacks**: if WebGL is missing or the context is lost, `StaticRocketFallback` renders an SVG
  schematic, explains what happened, and links to the text explorer.
- Colour is never the only carrier of meaning — confidence badges have text labels, not just colour.

## Performance

- three.js is code-split and lazy-loaded; first-load JS for the page is ~199 kB.
- `usePerformanceTier()` probes cores, device memory and pointer type, then scales geometry
  segment counts, star count, DPR, antialiasing, the environment resolution, the Earth limb and
  postprocessing.
- The scene stops rendering entirely (`frameloop="never"`) once scrolled out of view.
- `AdaptiveDpr` drops resolution under load.
- Lighting uses drei `Lightformer`s rather than an HDRI, so there is no environment map to download.
- The orbit visualization is a separate, dynamically imported canvas that only mounts in its section.

---

## Testing checklist

Verified during development on a headless Chromium (SwiftShader) at desktop and mobile viewports:

- Desktop hero, exploded view, component focus, payload bay
- Mobile layout, bottom-sheet panels, touch interaction
- Keyboard traversal and `Escape` handling
- `prefers-reduced-motion: reduce`
- WebGL unavailable (fallback schematic) and simulated context loss
- Low-performance tier rendering path

---

## Factual scope and disclaimer

This is an independent educational project. It is not affiliated with Skyroot Aerospace, ISRO, the
Department of Space, or any payload operator, and it contains no proprietary or confidential
information — only material already in the public record, each item linked to its source.

Where the public record is thin, the site shows that thinness rather than papering over it. That is
the point.
