/**
 * Shared content types for the Vikram-1 explorer.
 *
 * Everything the UI renders comes from these structures, so new components,
 * payloads, organizations and sources can be added without touching React.
 */

/** How well-supported a factual claim is. Never guess — use `undisclosed`. */
export type Confidence = 'confirmed' | 'reported' | 'undisclosed' | 'disputed';

/** How literally the 3D geometry should be read. Requirement: never fake accuracy. */
export type FidelityClass =
  | 'documented-geometry'
  | 'representative'
  | 'conceptual';

export type SourceTier =
  | 'primary-operator'
  | 'primary-government'
  | 'specialist-press'
  | 'wire-press'
  | 'reference';

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  tier: SourceTier;
  /** ISO date of publication where known. */
  published?: string;
  note?: string;
}

/** A single sourced claim. The UI renders the badge + the sources together. */
export interface Claim {
  value: string;
  confidence: Confidence;
  sources: string[];
  /** Shown when confidence is `disputed` — explains what the disagreement is. */
  dispute?: string;
}

export type ComponentCategory =
  | 'payload-systems'
  | 'propulsion'
  | 'structures'
  | 'avionics'
  | 'gnc'
  | 'separation'
  | 'mission-interfaces';

export interface RocketComponent {
  id: string;
  name: string;
  /** Short mission-control style code, e.g. "S1". */
  code: string;
  category: ComponentCategory;
  shortDescription: string;
  /** Level 1 — for an intelligent person who knows nothing about rockets. */
  beginnerExplanation: string;
  /** Level 2 — for someone who wants the engineering, public information only. */
  engineeringExplanation: string;
  /** Answers the "Why does this exist?" button. */
  whyItExists: string;
  role: string;
  developer: Claim;
  manufacturer: Claim;
  technologies: string[];
  /** Other component ids this one physically or functionally connects to. */
  connectsTo: string[];
  keyTerms: string[];
  /** Vertical centre of the section in scene units, assembled. */
  position: number;
  /** Section length in scene units. */
  length: number;
  /** Extra vertical offset applied in exploded view (scene units). */
  explodedOffset: number;
  /** Outer radius in scene units at the widest point of the section. */
  radius: number;
  fidelity: FidelityClass;
  sources: string[];
  /** Publicly documented figures, rendered as a spec table. */
  specs?: { label: string; claim: Claim }[];
}

export type PayloadCategory =
  | 'customer-satellite'
  | 'technology-demonstration'
  | 'in-house-demonstration'
  | 'symbolic-art';

export type DeploymentStatus =
  | 'deployed'
  | 'remained-attached'
  | 'not-publicly-disclosed';

export interface Payload {
  id: string;
  name: string;
  subtitle: string;
  organizationId: string;
  country: string;
  category: PayloadCategory;
  /** One line the user reads first. */
  purpose: string;
  missionRole: string;
  whatItDoes: string;
  whyItWasSent: string;
  technologyTested: string;
  whatTheyHopeToLearn: string;
  deployment: Claim;
  outcome: Claim;
  /** Angle (radians) around the payload deck for the 3D payload bay. */
  bayAngle: number;
  /** Radius from the deck centre in scene units. */
  bayRadius: number;
  accent: string;
  sources: string[];
}

export type SupplyDomain =
  | 'propulsion'
  | 'structures'
  | 'avionics'
  | 'software'
  | 'payload-systems'
  | 'ground-systems'
  | 'telemetry'
  | 'manufacturing'
  | 'testing'
  | 'launch-infrastructure';

export interface Organization {
  id: string;
  name: string;
  country: string;
  city?: string;
  kind: 'launch-provider' | 'payload-customer' | 'space-agency' | 'artist-studio' | 'academic';
  whatTheyBuild: string;
  contribution: string;
  problemAddressed: string;
  whyOrbitalTestingMatters: string;
  domains: SupplyDomain[];
  founded?: string;
  sources: string[];
}

export interface SupplyCategory {
  id: SupplyDomain;
  name: string;
  description: string;
  /** What is publicly known about who does this work for Vikram-1. */
  publiclyKnown: Claim;
  organizationIds: string[];
  componentIds: string[];
}

export interface TimelineEvent {
  id: string;
  /** Mission-elapsed label as published, e.g. "T-00:00:10". Never invented. */
  clock: string;
  /** Normalised 0..1 position for the scrubber. Presentation only. */
  t: number;
  title: string;
  whatHappens: string;
  whyItHappens: string;
  systemsInvolved: string[];
  /** Component ids that are active/highlighted at this moment. */
  activeComponentIds: string[];
  /** Payload ids still attached to the vehicle at this moment. */
  attachedPayloadIds: string[];
  altitudeNote: Claim;
  sources: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  short: string;
  full: string;
  /** Tiny inline diagram key, drawn by the Glossary component. */
  diagram?: 'thrust' | 'staging' | 'orbit' | 'fairing' | 'gimbal' | 'isp' | 'stability' | 'none';
  related: string[];
}

export interface WhatIfScenario {
  id: string;
  question: string;
  shortAnswer: string;
  explanation: string;
  /** Which conceptual simulation drives the visual. */
  model: 'burn-duration' | 'dry-mass' | 'payload-mass' | 'horizontal-velocity' | 'fairing' | 'staging' | 'deployment';
  /** Label for the single slider the user manipulates. */
  controlLabel: string;
  controlUnit: string;
  min: number;
  max: number;
  nominal: number;
}

export interface SystemNode {
  id: string;
  name: string;
  summary: string;
  children?: SystemNode[];
  componentIds?: string[];
}

export interface ScaleReference {
  id: string;
  name: string;
  /** Height in metres. */
  height: number;
  note: string;
  sourceNote: string;
  icon: 'human' | 'bus' | 'tree' | 'building' | 'aircraft' | 'rocket';
}

export interface JourneyStage {
  id: string;
  label: string;
  body: string;
  confidence: Confidence;
}

export interface Journey {
  id: string;
  title: string;
  subject: string;
  stages: JourneyStage[];
  sources: string[];
}
