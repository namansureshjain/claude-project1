import type { Journey, ScaleReference, SystemNode, WhatIfScenario } from './types';

/* ------------------------------------------------------------------ */
/* "What would happen if...?" — conceptual demonstrations, not sims.   */
/* ------------------------------------------------------------------ */

export const whatIfDisclaimer =
  'These are conceptual demonstrations, not engineering simulations. They use simplified physics to make a relationship intuitive — more payload means less margin, less horizontal speed means no orbit. They are not models of Vikram-1 and must not be read as predictions about it.';

export const whatIfScenarios: WhatIfScenario[] = [
  {
    id: 'early-shutdown',
    question: 'What happens if the first stage stops too early?',
    shortAnswer: 'The vehicle arrives at staging slower and lower, and every stage above has to make up the shortfall — usually it cannot.',
    explanation:
      'Each stage is sized on the assumption that the one below it delivers a certain velocity. Cut the first stage short and the second stage starts from a worse state: lower, slower, and deeper in the atmosphere, where drag is still taking a cut. The shortfall does not shrink as you climb; it compounds, because the upper stages have no spare propellant to buy back speed they were never meant to provide. A small underperformance becomes a lower orbit. A large one becomes a suborbital trajectory and re-entry.',
    model: 'burn-duration',
    controlLabel: 'First-stage burn delivered',
    controlUnit: '% of nominal',
    min: 55,
    max: 100,
    nominal: 100,
  },
  {
    id: 'heavy-stage',
    question: 'What happens if a stage is too heavy?',
    shortAnswer: 'Every extra kilogram of structure is a kilogram of payload you no longer get.',
    explanation:
      'A rocket’s performance comes from its mass ratio: how much of it is propellant versus how much is hardware you have to drag along. Dry mass is the worst kind of mass, because you accelerate it the whole way and it does nothing at the end. On a small launcher the margins are thin enough that a few percent of extra structure can erase the entire payload. This is the reason Skyroot cites an all-carbon-composite airframe: not elegance, arithmetic.',
    model: 'dry-mass',
    controlLabel: 'Structural mass vs. design',
    controlUnit: '% of nominal',
    min: 100,
    max: 170,
    nominal: 100,
  },
  {
    id: 'heavier-payload',
    question: 'What happens if the payload is heavier?',
    shortAnswer: 'You reach a lower orbit — or you do not reach orbit at all.',
    explanation:
      'Payload and orbit trade against each other continuously. The same vehicle can put a light satellite in a high orbit or a heavy one in a low orbit, and published capability figures always come attached to a specific altitude and inclination. This is why a single "payload capacity" number is misleading: quoted figures for Vikram-1 differ between sources partly because they describe different destinations.',
    model: 'payload-mass',
    controlLabel: 'Payload mass',
    controlUnit: 'kg',
    min: 50,
    max: 500,
    nominal: 350,
  },
  {
    id: 'no-horizontal',
    question: 'What if the rocket reaches altitude but not enough horizontal velocity?',
    shortAnswer: 'It comes straight back down. Height is not orbit.',
    explanation:
      'This is the single most common misunderstanding about spaceflight. Going up 450 km is not difficult — a sounding rocket can do it. Staying there requires moving sideways at about 7.6 km/s, so that as you fall, the ground curves away underneath you at the same rate. A vehicle that reaches 450 km with no horizontal speed simply falls back and re-enters. Almost all of a launch vehicle’s energy goes into going sideways, not up.',
    model: 'horizontal-velocity',
    controlLabel: 'Horizontal velocity achieved',
    controlUnit: '% of orbital',
    min: 30,
    max: 105,
    nominal: 100,
  },
  {
    id: 'no-fairing',
    question: 'What happens without a fairing?',
    shortAnswer: 'The payloads take the full force and heat of supersonic air. Most would not survive it.',
    explanation:
      'Satellites are built for vacuum: thin panels, exposed instruments, deployable arrays folded flat. Flying one through the lower atmosphere at Mach 5 would subject it to aerodynamic pressure it was never designed for, surface heating, and an acoustic environment loud enough to damage structures on its own. The fairing takes all of that, then leaves before its weight starts costing performance.',
    model: 'fairing',
    controlLabel: 'Jettison altitude',
    controlUnit: 'relative',
    min: 0,
    max: 100,
    nominal: 62,
  },
  {
    id: 'no-separation',
    question: 'What happens if a stage cannot separate?',
    shortAnswer: 'The vehicle drags a dead motor. It almost certainly does not reach orbit.',
    explanation:
      'A spent stage is mostly empty casing, but "mostly empty" is not "weightless". The next stage was sized to push its own mass, not its own mass plus a discarded one, and it usually cannot. Worse, the next motor may be unable to ignite safely while still attached. This is why separation systems have to be absolutely reliable: they are single-shot, they cannot be tested in flight beforehand, and there is no recovery from getting one wrong.',
    model: 'staging',
    controlLabel: 'Retained dead mass',
    controlUnit: '% of stage',
    min: 0,
    max: 100,
    nominal: 0,
  },
  {
    id: 'no-deployment',
    question: 'What happens if the payload does not deploy?',
    shortAnswer: 'It stays attached and its mission is limited to what it can do from there.',
    explanation:
      'A satellite that does not separate cannot point itself independently, may not get the power or thermal conditions it needs, and shares the upper stage’s orbit and eventual fate. Sometimes partial results are still valuable: on Mission Aagaman, Cosmoserve reported that its Embrace petals did not deploy as intended, but that the system survived launch and its actuation and onboard software worked as expected, producing useful test data. That is a real outcome, and it is reported here as the company described it rather than smoothed into a success or a failure.',
    model: 'deployment',
    controlLabel: 'Deployment authority',
    controlUnit: '%',
    min: 0,
    max: 100,
    nominal: 100,
  },
];

/* ------------------------------------------------------------------ */
/* System View — drill down through the vehicle as a hierarchy.        */
/* ------------------------------------------------------------------ */

export const systemTree: SystemNode = {
  id: 'vikram-1',
  name: 'VIKRAM-1',
  summary:
    'A four-stage small orbital launch vehicle. Read top-down, it is a delivery system; read bottom-up, it is eight or nine subsystems that have to agree with each other.',
  children: [
    {
      id: 'sys-payload',
      name: 'Payload system',
      summary: 'Everything that exists to carry, protect and release the cargo.',
      componentIds: ['payload-fairing', 'payload-section', 'payload-adapter'],
    },
    {
      id: 'sys-propulsion',
      name: 'Propulsion',
      summary: 'Three solid stages for raw acceleration, one liquid module for precision.',
      children: [
        {
          id: 'sys-solid',
          name: 'Solid stages',
          summary: 'Kalam-1200, Kalam-250 and Kalam-100. Simple, powerful, uncontrollable once lit.',
          componentIds: ['stage-1', 'stage-2', 'stage-3', 'propulsion-nozzle-s1'],
        },
        {
          id: 'sys-liquid',
          name: 'Liquid propulsion',
          summary: 'The Orbital Adjustment Module and its four Raman-1 engines. Restartable in vacuum.',
          componentIds: ['stage-4-oam'],
        },
      ],
    },
    {
      id: 'sys-structures',
      name: 'Structural systems',
      summary: 'The carbon-composite load paths: casings, interstages and the fairing.',
      componentIds: ['composite-structures', 'interstage-1-2', 'interstage-2-3'],
    },
    {
      id: 'sys-avionics',
      name: 'Avionics',
      summary: 'Computing, sequencing, power and harnessing. The nervous system.',
      componentIds: ['avionics'],
    },
    {
      id: 'sys-gnc',
      name: 'Guidance, navigation & control',
      summary: 'Where am I, where should I be, what do I move to close the gap.',
      componentIds: ['gnc'],
    },
    {
      id: 'sys-separation',
      name: 'Separation systems',
      summary: 'The one-shot mechanisms that let the rocket shed its own past.',
      componentIds: ['separation-systems'],
    },
    {
      id: 'sys-interfaces',
      name: 'Ground & mission interfaces',
      summary: 'Telemetry down, and everything the vehicle is plugged into until liftoff.',
      componentIds: ['telemetry', 'ground-interfaces'],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Scale mode                                                          */
/* ------------------------------------------------------------------ */

export const scaleReferences: ScaleReference[] = [
  {
    id: 'human',
    name: 'Adult human',
    height: 1.7,
    note: 'Vikram-1 is roughly twelve people tall.',
    sourceNote: 'Nominal adult height used as a familiar reference, not a measurement.',
    icon: 'human',
  },
  {
    id: 'bus',
    name: 'City bus',
    height: 3.2,
    note: 'About the height of a double-decker’s lower deck and upper deck together.',
    sourceNote: 'Typical single-deck bus height; a familiar reference, not a specification.',
    icon: 'bus',
  },
  {
    id: 'tree',
    name: 'Mature neem tree',
    height: 12,
    note: 'Vikram-1 is noticeably taller than a full-grown street tree.',
    sourceNote: 'Typical mature height; used as a familiar reference.',
    icon: 'tree',
  },
  {
    id: 'building',
    name: 'Six-storey building',
    height: 18,
    note: 'At about 20 m, Vikram-1 is roughly a six- or seven-storey building laid on its side.',
    sourceNote: 'Approximate at 3 m per storey; a familiar reference, not a specification.',
    icon: 'building',
  },
  {
    id: 'aircraft',
    name: 'Regional airliner length',
    height: 27,
    note: 'Shorter than a typical regional jet — small, for something that reaches orbit.',
    sourceNote: 'Approximate length of a small regional airliner; a familiar reference only.',
    icon: 'aircraft',
  },
];

export const scaleNote =
  'Vikram-1’s height is reported at approximately 20 m and its diameter at approximately 1.7 m. Comparison objects are everyday references chosen to give a sense of scale; their heights are typical values, not measurements of specific objects.';

/* ------------------------------------------------------------------ */
/* Follow one component                                                */
/* ------------------------------------------------------------------ */

export const journeys: Journey[] = [
  {
    id: 'follow-engine',
    title: 'Follow the engine',
    subject: 'The Raman-1 liquid engine cluster',
    sources: ['voxelmatters-3dprint', '3dpi-engine', 'gunter-vikram-1', 'ani-aagaman', 'skyroot-site'],
    stages: [
      {
        id: 'design',
        label: 'Design',
        body: 'A small hypergolic bipropellant engine burning monomethylhydrazine with nitrogen tetroxide. Hypergolic propellants ignite on contact, which removes the igniter from the restart problem — the deciding factor when an engine has to light again in vacuum with no one watching.',
        confidence: 'reported',
      },
      {
        id: 'manufacture',
        label: 'Manufacturing',
        body: 'Skyroot reports its engines are 3D printed, and has described the shift from cast and machined engines to additive manufacturing as cutting production time from months to days per unit. Vikram-1 was reported as reaching orbit on India’s first fully 3D-printed rocket engine.',
        confidence: 'reported',
      },
      {
        id: 'integration',
        label: 'Integration',
        body: 'Four engines are clustered in the Orbital Adjustment Module, the vehicle’s fourth stage, beneath the payload deck and inside the upper section of the vehicle.',
        confidence: 'reported',
      },
      {
        id: 'launch',
        label: 'Launch',
        body: 'Through the entire solid-propulsion phase the cluster does nothing at all. It rides as passive mass through liftoff, maximum dynamic pressure, three motor burns and three separation shocks.',
        confidence: 'reported',
      },
      {
        id: 'ignition',
        label: 'Ignition',
        body: 'After third-stage separation, the module takes over. This is the first time the engines have ever fired on this vehicle in flight.',
        confidence: 'reported',
      },
      {
        id: 'operation',
        label: 'Operation',
        body: 'The cluster executes the final orbital insertion burn, delivering the payloads into a reported 450 km orbit at 60° inclination.',
        confidence: 'reported',
      },
      {
        id: 'outcome',
        label: 'Mission outcome',
        body: 'Injection was reported roughly 15 minutes after liftoff, with the mission’s primary payloads deployed successfully.',
        confidence: 'confirmed',
      },
    ],
  },
  {
    id: 'follow-payload',
    title: 'Follow the payload',
    subject: 'SOLARAS, Grahaa Space',
    sources: ['timestech-solaras-prelaunch', 'timestech-solaras-deploy', 'deccan-chronicle-inorbit'],
    stages: [
      {
        id: 'design',
        label: 'Design',
        body: 'A stackable nanosatellite platform built in India, designed so that the same bus can carry different payloads on later missions rather than being rebuilt each time.',
        confidence: 'reported',
      },
      {
        id: 'hosted',
        label: 'Hosting a guest',
        body: 'SOLARAS carries VISWA-M, an academic research payload from VIT-AP University — which is itself part of the test. If the hosted-payload interface works, the platform can be sold as a ride for other people’s experiments.',
        confidence: 'reported',
      },
      {
        id: 'integration',
        label: 'Integration',
        body: 'Mounted in the payload section beneath the fairing, alongside the mission’s other payloads.',
        confidence: 'reported',
      },
      {
        id: 'launch',
        label: 'Launch',
        body: 'Rides through ascent inside the fairing, then is exposed to space when the fairing is jettisoned after first-stage separation.',
        confidence: 'reported',
      },
      {
        id: 'deployment',
        label: 'Deployment',
        body: 'Released after orbital insertion. Grahaa Space reported SOLARAS as successfully deployed on the mission.',
        confidence: 'reported',
      },
      {
        id: 'orbit',
        label: 'Orbit',
        body: 'Operating in the mission’s reported 450 km low Earth orbit at 60° inclination.',
        confidence: 'reported',
      },
      {
        id: 'purpose',
        label: 'Mission purpose',
        body: 'Validate the bus, the communication systems and the hosted-payload architecture, so the platform can support future Earth-observation, commercial, scientific and institutional missions. Indian space startups publicly reported beginning analysis of in-orbit data in the days after the flight.',
        confidence: 'reported',
      },
    ],
  },
];
