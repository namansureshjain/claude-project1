import type { Claim, FidelityClass } from './types';

/**
 * Vehicle-level facts about Vikram-1.
 *
 * Every number here is a `Claim` so the UI can show how well supported it is.
 * Where public sources disagree, the claim is marked `disputed` and the
 * disagreement is stated rather than resolved silently.
 */
export const rocket = {
  id: 'vikram-1',
  name: 'Vikram-1',
  operator: 'Skyroot Aerospace',
  tagline: 'Understand the machine that carries humanity to orbit.',
  intro:
    'Vikram-1 is a small orbital launch vehicle built by Skyroot Aerospace in Hyderabad, India. On 18 July 2026 it became the first privately developed Indian rocket to reach orbit from Indian soil.',

  height: {
    value: 'Approximately 20 m',
    confidence: 'reported',
    sources: ['wikipedia-vikram-i', 'gunter-vikram-1', 'business-standard-mission'],
  } as Claim,

  diameter: {
    value: 'Approximately 1.7 m',
    confidence: 'reported',
    sources: ['wikipedia-vikram-i', 'gunter-vikram-1'],
  } as Claim,

  stageCount: {
    value: 'Four stages — three solid, one liquid',
    confidence: 'confirmed',
    sources: ['ani-aagaman', 'wikipedia-vikram-i', 'gunter-vikram-1', 'voxelmatters-3dprint'],
  } as Claim,

  payloadCapacity: {
    value: 'Skyroot quotes up to 350 kg to low Earth orbit',
    confidence: 'disputed',
    dispute:
      'Published capability figures differ between sources and between vehicle configurations. Skyroot has quoted up to 350 kg to LEO; catalogue entries have listed 350 kg to a 500 km / 45° LEO and 260 kg to a 500 km sun-synchronous orbit, while other write-ups cite 480 kg to LEO and 290 kg to SSO. Treat any single figure as configuration-dependent rather than a fixed property of the vehicle.',
    sources: ['skyroot-site', 'wikipedia-vikram-i', 'gunter-vikram-1'],
  } as Claim,

  structure: {
    value: 'All-carbon-composite airframe',
    confidence: 'reported',
    sources: ['skyroot-site', 'ieee-spectrum-vikram1', 'business-standard-mission'],
  } as Claim,

  liftoffMass: {
    value: 'Not publicly disclosed in a form this project could verify',
    confidence: 'undisclosed',
    sources: [],
  } as Claim,

  launchMass: null,

  /** How literally the visitor should read the 3D model on screen. */
  modelFidelity: 'representative' as FidelityClass,
  modelFidelityNote:
    'The 3D vehicle in this site is a representative visualization. Skyroot has not published engineering drawings, stage lengths or component geometry for Vikram-1, so proportions are derived from the published overall height (about 20 m) and diameter (about 1.7 m) and from the published four-stage architecture. Individual section lengths, internal layout and surface detail are illustrative. This is not an engineering model and should not be measured.',
} as const;

export const mission = {
  id: 'aagaman',
  name: 'Mission Aagaman',
  meaning: '"Aagaman" means arrival.',
  date: {
    value: '18 July 2026',
    confidence: 'confirmed',
    sources: ['isro-first-private', 'cnbc-launch', 'space-com-debut', 'ani-aagaman'],
  } as Claim,
  liftoffTime: {
    value: '06:35 GMT',
    confidence: 'reported',
    sources: ['cnbc-launch', 'spaceflight-now-aagaman'],
  } as Claim,
  site: {
    value: 'Satish Dhawan Space Centre (SDSC SHAR), Sriharikota, India',
    confidence: 'confirmed',
    sources: ['isro-first-private', 'cnbc-launch', 'space-com-debut'],
  } as Claim,
  orbit: {
    value: '450 km low Earth orbit at 60° inclination',
    confidence: 'reported',
    sources: ['ani-aagaman', 'cnbc-launch', 'voxelmatters-3dprint'],
  } as Claim,
  duration: {
    value: 'Payload injection roughly 15–16 minutes after liftoff',
    confidence: 'reported',
    sources: ['cnbc-launch', 'voxelmatters-3dprint'],
  } as Claim,
  significance: {
    value:
      "First orbital launch of a privately developed Indian launch vehicle from Indian soil; widely reported as making India the third country with a private orbital launch capability.",
    confidence: 'confirmed',
    sources: ['isro-first-private', 'cnbc-launch', 'satellite-today-success', 'space-com-debut'],
  } as Claim,
  outcome: {
    value: 'Success — primary payloads were deployed into the target orbit',
    confidence: 'confirmed',
    sources: ['isro-first-private', 'space-com-debut', 'satellite-today-success'],
  } as Claim,
} as const;
