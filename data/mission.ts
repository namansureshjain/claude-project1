import type { TimelineEvent } from './types';

/**
 * Mission Aagaman flight sequence.
 *
 * Public reporting gives the ORDER of events and a small number of anchored
 * milestones (Mach 1 at about 25 s, Mach 5 around 90 s, injection at roughly
 * 15-16 minutes). It does not give a full published event-time table, so the
 * `clock` field is left qualitative wherever no time was published, and `t` is
 * a presentation-only scrubber position — not a claim about timing.
 */
export const timeline: TimelineEvent[] = [
  {
    id: 'countdown',
    clock: 'T-00:00:10',
    t: 0,
    title: 'Terminal count',
    whatHappens:
      'The vehicle is on its launch mount at Satish Dhawan Space Centre, running on internal power, with the flight sequencer in control of the countdown. Mission Aagaman lifted off after a hold of about 35 minutes.',
    whyItHappens:
      'The last seconds are handed to the onboard computer because no human can react fast enough to abort meaningfully. Everything from here is automatic.',
    systemsInvolved: ['Avionics', 'Ground & range interfaces', 'Telemetry'],
    activeComponentIds: ['avionics', 'ground-interfaces', 'telemetry'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'On the pad, Sriharikota', confidence: 'confirmed', sources: ['isro-first-private'] },
    sources: ['isro-first-private', 'cnbc-launch'],
  },
  {
    id: 'liftoff',
    clock: 'T+00:00:00',
    t: 0.06,
    title: 'Liftoff',
    whatHappens:
      'The Kalam-1200 solid first stage ignites and the vehicle leaves the pad. Liftoff was at 06:35 GMT on 18 July 2026.',
    whyItHappens:
      'A solid motor cannot be test-fired and then held. The instant it lights, the vehicle is committed — thrust exceeds weight and it goes.',
    systemsInvolved: ['First stage', 'Nozzle assembly', 'Guidance, navigation & control'],
    activeComponentIds: ['stage-1', 'propulsion-nozzle-s1', 'gnc'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'Sea level', confidence: 'confirmed', sources: ['isro-first-private'] },
    sources: ['cnbc-launch', 'isro-first-private', 'ani-aagaman'],
  },
  {
    id: 'mach-1',
    clock: 'T+00:00:25',
    t: 0.16,
    title: 'Through Mach 1',
    whatHappens:
      'Published accounts describe the Kalam-1200 booster pushing Vikram-1 past the speed of sound about 25 seconds after clearing the pad.',
    whyItHappens:
      'Going supersonic in dense air is the roughest part of the flight. Shock waves form on the vehicle and aerodynamic loads climb steeply toward maximum dynamic pressure.',
    systemsInvolved: ['First stage', 'Composite airframe', 'Guidance, navigation & control'],
    activeComponentIds: ['stage-1', 'composite-structures', 'gnc'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'Low atmosphere; specific altitude not published', confidence: 'undisclosed', sources: [] },
    sources: ['ani-aagaman'],
  },
  {
    id: 'mach-5',
    clock: 'T+00:01:30',
    t: 0.28,
    title: 'Hypersonic',
    whatHappens:
      'By roughly the 90-second mark the launcher had accelerated past Mach 5, still under first-stage power.',
    whyItHappens:
      'The vehicle is now light enough and high enough that acceleration climbs sharply. Air density is falling fast, so drag stops being the limiting factor and raw speed becomes the objective.',
    systemsInvolved: ['First stage', 'Guidance, navigation & control', 'Telemetry'],
    activeComponentIds: ['stage-1', 'gnc', 'telemetry'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'Upper atmosphere; specific altitude not published', confidence: 'undisclosed', sources: [] },
    sources: ['ani-aagaman'],
  },
  {
    id: 'stage-1-sep',
    clock: 'After first-stage burnout (time not published)',
    t: 0.4,
    title: 'First-stage separation',
    whatHappens:
      'Kalam-1200, having carried the rocket through the thickest part of the atmosphere, separates cleanly.',
    whyItHappens:
      'The motor is empty, but its casing and nozzle are not weightless. Carrying them further would cost more performance than the remaining stages can spare.',
    systemsInvolved: ['Separation systems', 'Interstage 1/2', 'Avionics'],
    activeComponentIds: ['separation-systems', 'interstage-1-2', 'stage-1'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'Above the dense atmosphere; altitude not published', confidence: 'undisclosed', sources: [] },
    sources: ['ani-aagaman'],
  },
  {
    id: 'fairing-jettison',
    clock: 'After first-stage separation (time not published)',
    t: 0.5,
    title: 'Fairing jettison',
    whatHappens:
      'The payload fairing separates, exposing the satellites to space for the first time.',
    whyItHappens:
      'Once the air is thin enough that heating and aerodynamic loads no longer threaten the payloads, the shell is pure dead weight. Dropping it this early is worth more than the protection it still offers.',
    systemsInvolved: ['Payload fairing', 'Separation systems'],
    activeComponentIds: ['payload-fairing', 'separation-systems', 'payload-section'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'Altitude not published', confidence: 'undisclosed', sources: [] },
    sources: ['ani-aagaman'],
  },
  {
    id: 'stage-2',
    clock: 'Second-stage flight (times not published)',
    t: 0.62,
    title: 'Second stage — Kalam-250',
    whatHappens:
      'The second stage burns and then separates, followed by ignition of Kalam-100, the smallest and highest-flying solid stage.',
    whyItHappens:
      'The trajectory is now pitching over hard. Height alone does nothing; what matters from here is horizontal speed, and the upper stages exist to build it.',
    systemsInvolved: ['Second stage', 'Interstage 2/3', 'Guidance, navigation & control'],
    activeComponentIds: ['stage-2', 'interstage-2-3', 'gnc'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'Altitude not published', confidence: 'undisclosed', sources: [] },
    sources: ['ani-aagaman'],
  },
  {
    id: 'stage-3',
    clock: 'Third-stage flight (times not published)',
    t: 0.74,
    title: 'Third stage — Kalam-100',
    whatHappens:
      'The solid-propulsion phase concludes with the separation of stage 3, handing the mission to the Orbital Adjustment Module.',
    whyItHappens:
      'Solid motors have done all they usefully can. They are powerful and simple, but they cannot be shut down or restarted, and the last part of reaching a specific orbit needs exactly those abilities.',
    systemsInvolved: ['Third stage', 'Separation systems'],
    activeComponentIds: ['stage-3', 'separation-systems'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: 'Altitude not published', confidence: 'undisclosed', sources: [] },
    sources: ['ani-aagaman'],
  },
  {
    id: 'oam-burn',
    clock: 'Final insertion burn (time not published)',
    t: 0.87,
    title: 'Orbital insertion',
    whatHappens:
      'The liquid-fuelled Orbital Adjustment Module executes its final insertion burn, delivering the payloads into a reported 450 km low Earth orbit at 60° inclination.',
    whyItHappens:
      'This is the moment "up" becomes "around". The burn raises and circularises the trajectory so the vehicle stops falling back toward the atmosphere and starts falling around the planet instead.',
    systemsInvolved: ['Orbital Adjustment Module', 'Guidance, navigation & control', 'Avionics'],
    activeComponentIds: ['stage-4-oam', 'gnc', 'avionics'],
    attachedPayloadIds: ['scope', 'solaras', 'embrace', 'dcubed', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: '450 km, reported', confidence: 'reported', sources: ['ani-aagaman', 'cnbc-launch'] },
    sources: ['ani-aagaman', 'cnbc-launch', 'voxelmatters-3dprint'],
  },
  {
    id: 'deployment',
    clock: 'Roughly 15–16 minutes after liftoff',
    t: 0.95,
    title: 'Payload deployment',
    whatHappens:
      'Payloads are released. Reports describe injection about 15 minutes after liftoff and the mission deploying its primary payloads, including Skyroot’s SCOPE and Grahaa Space’s SOLARAS, into low Earth orbit.',
    whyItHappens:
      'A satellite is pushed off gently, with just enough relative velocity to open a safe gap. Too hard and you tumble it; too soft and it stays alongside the stage that released it.',
    systemsInvolved: ['Payload adapter', 'Separation systems', 'Avionics'],
    activeComponentIds: ['payload-adapter', 'payload-section', 'separation-systems'],
    attachedPayloadIds: ['embrace', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: '450 km, reported', confidence: 'reported', sources: ['ani-aagaman', 'cnbc-launch'] },
    sources: ['cnbc-launch', 'space-com-debut', 'voxelmatters-3dprint', 'timestech-solaras-deploy'],
  },
  {
    id: 'operations',
    clock: 'Post-deployment',
    t: 1,
    title: 'Payload operations',
    whatHappens:
      'The deployed spacecraft begin operations and their operators start working through the data. Indian space startups publicly reported analysing in-orbit data in the days after the flight. Cosmoserve reported a partial success for Mission Embrace: the capture system survived launch and its actuation and software worked, but the robotic petals did not deploy as intended.',
    whyItHappens:
      'The launch is the beginning of the mission, not the end of it. What the flight is actually worth is decided over the following weeks, in the data.',
    systemsInvolved: ['Payloads', 'Telemetry'],
    activeComponentIds: ['payload-section', 'telemetry'],
    attachedPayloadIds: ['embrace', 'cosmic-bloom', 'microart'],
    altitudeNote: { value: '450 km, reported', confidence: 'reported', sources: ['ani-aagaman'] },
    sources: ['deccan-chronicle-inorbit', 'inc42-cosmoserve-result'],
  },
];

export const timelineNote =
  'Skyroot has not published a full event-time table for Mission Aagaman. The order of events and the anchored milestones shown here come from published accounts of the flight; where no time was published, none is invented. Scrubber positions are for navigation only and are not a claim about timing.';
