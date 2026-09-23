import type { Claim, RocketComponent } from './types';

const skyrootDeveloper: Claim = {
  value: 'Skyroot Aerospace (Hyderabad, India)',
  confidence: 'confirmed',
  sources: ['skyroot-site', 'isro-first-private', 'ieee-spectrum-vikram1'],
};

/** Used wherever no public source names a manufacturing partner. Never guess. */
const supplierUndisclosed: Claim = {
  value: 'Supplier not publicly disclosed',
  confidence: 'undisclosed',
  sources: [],
};

/**
 * The rocket, section by section.
 *
 * `position` is the vertical centre of the section in scene units (1 unit = 1 m),
 * with the vehicle centred on y = 0, so the base sits at -10 and the nose at +10.
 * Sections with `length: 0` are cross-cutting systems that have no separate
 * geometry — they get a hotspot on their host section instead of a mesh.
 */
export const components: RocketComponent[] = [
  {
    id: 'payload-fairing',
    name: 'Payload Fairing',
    code: 'PLF',
    category: 'structures',
    shortDescription: 'The nose cone that shields the payloads during the climb through the atmosphere.',
    beginnerExplanation:
      'The fairing is the pointed shell at the very top. Going through the lower atmosphere at several times the speed of sound is violent: the air pushes hard, heats the surface and would shake a satellite apart. The fairing takes all of that so the payloads inside do not have to. Once the rocket is high enough that air no longer matters, the shell splits open and is thrown away, because from that point on it is only dead weight.',
    engineeringExplanation:
      'An ogive nose and cylindrical barrel section enclose the payload volume. It carries aerodynamic pressure and the acoustic and vibration environment of ascent, and protects against aerodynamic heating during the high dynamic-pressure phase. Fairing jettison is scheduled for when free-molecular heating on the payload falls below the acceptable limit — early enough that the mass penalty is small, late enough that the payloads are never exposed to meaningful heating. On Mission Aagaman the fairing was separated after first-stage separation, exposing the satellites to space for the first time. Skyroot describes Vikram-1 structures as all-carbon-composite; specific fairing layup, separation mechanism and jettison altitude have not been published.',
    whyItExists:
      'Because satellites are built for vacuum, not for a hurricane. Without a fairing the payload would have to survive supersonic airflow, be shaped aerodynamically, and carry structure it will never use once in orbit. It is far cheaper to wrap them in a shell for four minutes and then throw the shell away.',
    role: 'Aerodynamic and environmental protection for the payload stack during atmospheric flight.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Carbon composite structures', 'Pyrotechnic or pneumatic separation', 'Acoustic blankets'],
    connectsTo: ['payload-section', 'payload-adapter', 'separation-systems'],
    keyTerms: ['fairing', 'dynamic-pressure', 'composite-structure', 'separation'],
    position: 8.6,
    length: 2.8,
    explodedOffset: 3.9,
    radius: 0.85,
    fidelity: 'representative',
    sources: ['ani-aagaman', 'skyroot-site', 'ieee-spectrum-vikram1'],
    specs: [
      {
        label: 'Jettison event',
        claim: {
          value: 'Separated after first-stage separation on Mission Aagaman',
          confidence: 'reported',
          sources: ['ani-aagaman'],
        },
      },
      {
        label: 'Material',
        claim: {
          value: 'Carbon composite, per Skyroot’s all-composite airframe description',
          confidence: 'reported',
          sources: ['skyroot-site', 'ieee-spectrum-vikram1'],
        },
      },
    ],
  },
  {
    id: 'payload-section',
    name: 'Payload Section',
    code: 'PL',
    category: 'payload-systems',
    shortDescription: 'The volume where the satellites and experiments ride. This is the reason the rocket exists.',
    beginnerExplanation:
      'Everything else on this vehicle is transport. This small volume near the top holds the things people actually wanted in space: two satellites, several technology experiments and two symbolic objects. The rocket burns almost all of its mass to move this one part of itself to orbital speed.',
    engineeringExplanation:
      'The payload volume sits above the orbital adjustment module and inside the fairing. Payloads are mounted to a deck and to dispensers that hold them rigidly through launch loads and then release them on command once the vehicle reaches the target orbit. Mission Aagaman carried six payloads: Skyroot’s SCOPE, Grahaa Space’s SOLARAS, Cosmoserve’s Embrace soft-robotic capture demonstrator, DCUBED deployable technology demonstrators, and two symbolic payloads. Skyroot has not published the dispenser type, payload volume envelope or the individual mounting arrangement.',
    whyItExists:
      'A launch vehicle is a delivery service. The payload section is the cargo hold — the only part of the rocket the customer is paying to move.',
    role: 'Carries, protects and releases the mission payloads.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Payload dispensers', 'Separation springs', 'Mission data interfaces'],
    connectsTo: ['payload-fairing', 'payload-adapter', 'stage-4-oam', 'separation-systems'],
    keyTerms: ['payload', 'payload-adapter', 'separation', 'leo'],
    position: 8.5,
    length: 1.6,
    explodedOffset: 1.3,
    radius: 0.5,
    fidelity: 'conceptual',
    sources: ['deccan-chronicle-payloads', 'theweek-payloads', 'voxelmatters-3dprint', 'space-com-debut'],
  },
  {
    id: 'payload-adapter',
    name: 'Payload Adapter & Deck',
    code: 'PLA',
    category: 'payload-systems',
    shortDescription: 'The mechanical and electrical interface between a customer’s satellite and the rocket.',
    beginnerExplanation:
      'A satellite and a rocket are built by different companies, often in different countries. The adapter is the agreed handshake between them: a standard plate with known bolt positions, known strength, known electrical connectors. It means a satellite builder can design for the adapter instead of designing for one specific rocket.',
    engineeringExplanation:
      'The adapter transfers payload loads into the upper-stage structure and provides the separation plane. It typically carries the release mechanism, the umbilical connections used for pre-launch checkout and battery charging, and the mounting interface for hosted payloads that remain attached. For Mission Aagaman, several payloads were deployed as free-flying spacecraft while at least one technology demonstrator remained attached to the vehicle. The specific adapter design and interface standard used on Vikram-1 has not been published.',
    whyItExists:
      'Because you cannot bolt every satellite directly to a rocket. A standard interface turns a custom integration problem into a repeatable one, which is what makes routine commercial launch possible.',
    role: 'Structural and electrical interface; provides the separation plane for deployed payloads.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Separation interface', 'Umbilical connections', 'Load transfer structure'],
    connectsTo: ['payload-section', 'stage-4-oam', 'separation-systems', 'avionics'],
    keyTerms: ['payload-adapter', 'separation', 'payload'],
    position: 7.45,
    length: 0.5,
    explodedOffset: 1.0,
    radius: 0.6,
    fidelity: 'conceptual',
    sources: ['voxelmatters-3dprint', 'inc42-cosmoserve-result'],
  },
  {
    id: 'stage-4-oam',
    name: 'Orbital Adjustment Module',
    code: 'OAM',
    category: 'propulsion',
    shortDescription: 'The liquid-propelled fourth stage that trims the trajectory into a precise orbit.',
    beginnerExplanation:
      'The three solid stages below are enormously powerful but crude: once lit they burn until they are empty, and you cannot stop them. That is fine for the brute work of getting up and fast, but a satellite needs to be placed at a specific height and angle. This small liquid stage is the precision instrument. It can be throttled off, coasted, and lit again in vacuum, so it can nudge the vehicle into exactly the orbit the customer paid for and then release each payload where it belongs.',
    engineeringExplanation:
      'The fourth stage is a liquid-propulsion module powered by a cluster of four Raman-1 engines burning monomethylhydrazine with nitrogen tetroxide, with a reported total thrust of about 3.4 kN. These propellants are hypergolic — they ignite on contact — which removes the need for a separate igniter and makes restart in vacuum mechanically simple and reliable. Restart capability allows a coast phase between the end of solid-stage flight and orbital injection, and allows sequential deployment of multiple payloads at different points in the orbit. Skyroot reports the Raman engines are additively manufactured. On Mission Aagaman the module executed the final insertion burn into a reported 450 km orbit at 60° inclination.',
    whyItExists:
      'Solid motors cannot be shut down or restarted. If a rocket only had solid stages, the orbit you got would be whatever the last motor happened to give you. A restartable liquid stage converts "roughly the right place" into "exactly the right place", and lets one launch serve several customers with different destinations.',
    role: 'Final orbital insertion, orbit trimming, attitude control during coast and payload deployment sequencing.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Hypergolic bipropellant propulsion', 'Additive manufacturing', 'Restartable engines', 'Thrust vector / attitude control'],
    connectsTo: ['stage-3', 'payload-adapter', 'avionics', 'gnc'],
    keyTerms: ['restartable-engine', 'propellant', 'oxidizer', 'liquid-engine', 'inclination'],
    position: 6.6,
    length: 1.2,
    explodedOffset: 0.7,
    radius: 0.65,
    fidelity: 'representative',
    sources: ['gunter-vikram-1', 'wikipedia-vikram-i', 'ani-aagaman', 'voxelmatters-3dprint', '3dpi-engine'],
    specs: [
      {
        label: 'Engines',
        claim: {
          value: '4 × Raman-1',
          confidence: 'reported',
          sources: ['gunter-vikram-1', 'wikipedia-vikram-i'],
        },
      },
      {
        label: 'Propellant',
        claim: {
          value: 'MMH / N₂O₄ (hypergolic bipropellant)',
          confidence: 'reported',
          sources: ['gunter-vikram-1', 'wikipedia-vikram-i'],
        },
      },
      {
        label: 'Total thrust',
        claim: {
          value: 'About 3.4 kN',
          confidence: 'reported',
          sources: ['gunter-vikram-1', 'wikipedia-vikram-i'],
        },
      },
      {
        label: 'Restart in vacuum',
        claim: {
          value: 'Reported as restartable in vacuum',
          confidence: 'reported',
          sources: ['voxelmatters-3dprint'],
        },
      },
      {
        label: 'Manufacturing',
        claim: {
          value: '3D-printed engines, per Skyroot',
          confidence: 'reported',
          sources: ['voxelmatters-3dprint', '3dpi-engine', 'skyroot-site'],
        },
      },
    ],
  },
  {
    id: 'stage-3',
    name: 'Third Stage — Kalam-100',
    code: 'S3',
    category: 'propulsion',
    shortDescription: 'The smallest and highest-flying solid stage; it does the last of the heavy accelerating.',
    beginnerExplanation:
      'By the time this stage lights, the rocket is already above almost all of the atmosphere. There is nothing left to push through — the job now is purely to go faster sideways. It is the smallest of the three solid motors because it only has to accelerate what remains, which by this point is a small fraction of what left the pad.',
    engineeringExplanation:
      'Kalam-100 is the third solid stage, with a reported maximum thrust of about 100 kN. It operates in near-vacuum, so its nozzle can use a high expansion ratio that would be inefficient at sea level. Its burn takes the vehicle most of the way to orbital velocity; on Mission Aagaman the solid-propulsion phase concluded with third-stage separation, handing over to the liquid orbital adjustment module for final insertion. Burn duration, propellant mass and nozzle geometry have not been published.',
    whyItExists:
      'Each stage is sized for the mass it still has to move. Carrying a first-stage-sized motor this high would be absurd: most of its weight would be structure you no longer need. A smaller motor at the top is how a rocket stops wasting energy on itself.',
    role: 'Final solid-propulsion acceleration toward orbital velocity in near-vacuum.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Solid rocket motor', 'Composite motor casing', 'High expansion-ratio nozzle'],
    connectsTo: ['interstage-2-3', 'stage-4-oam', 'gnc', 'separation-systems'],
    keyTerms: ['solid-rocket-motor', 'stage', 'specific-impulse', 'thrust'],
    position: 5.0,
    length: 2.0,
    explodedOffset: 0.0,
    radius: 0.7,
    fidelity: 'representative',
    sources: ['wikipedia-vikram-i', 'gunter-vikram-1', 'ani-aagaman'],
    specs: [
      {
        label: 'Motor',
        claim: { value: 'Kalam-100', confidence: 'reported', sources: ['wikipedia-vikram-i', 'gunter-vikram-1'] },
      },
      {
        label: 'Maximum thrust',
        claim: { value: 'About 100 kN', confidence: 'reported', sources: ['wikipedia-vikram-i', 'gunter-vikram-1'] },
      },
      {
        label: 'Propellant',
        claim: { value: 'Solid', confidence: 'reported', sources: ['wikipedia-vikram-i', 'ani-aagaman'] },
      },
    ],
  },
  {
    id: 'interstage-2-3',
    name: 'Interstage 2/3',
    code: 'IS23',
    category: 'structures',
    shortDescription: 'The short structural collar that joins the second and third stages and lets them part cleanly.',
    beginnerExplanation:
      'Two stages cannot simply be glued together, because one of them has to let go in flight. The interstage is a short section designed to hold them rigidly while they push on each other, and then to release in a controlled way at exactly the right moment.',
    engineeringExplanation:
      'The interstage transfers thrust and bending loads between stages during flight and houses the separation plane. It has to survive the compressive load of the stage above during the lower stage’s burn, then release without recontact. Vikram-1’s separation mechanism type and the interstage construction are not publicly documented beyond Skyroot’s general description of an all-composite airframe.',
    whyItExists:
      'Staging is only useful if the discarded stage actually leaves, cleanly, without hitting the stage above. The interstage is the structure that makes a controlled break-up part of the design rather than an accident.',
    role: 'Structural link and separation plane between the second and third stages.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Composite structures', 'Separation systems'],
    connectsTo: ['stage-2', 'stage-3', 'separation-systems'],
    keyTerms: ['interstage', 'stage', 'separation', 'composite-structure'],
    position: 3.7,
    length: 0.6,
    explodedOffset: -0.7,
    radius: 0.72,
    fidelity: 'representative',
    sources: ['ani-aagaman', 'skyroot-site'],
  },
  {
    id: 'stage-2',
    name: 'Second Stage — Kalam-250',
    code: 'S2',
    category: 'propulsion',
    shortDescription: 'Takes over above the dense atmosphere and keeps building speed.',
    beginnerExplanation:
      'The first stage got the rocket up and out of the thick air. The second stage takes over a much lighter vehicle and keeps accelerating it. From here on the rocket is turning from going up to going sideways, because orbit is about speed across the sky, not height.',
    engineeringExplanation:
      'Kalam-250 is the second solid stage, with a reported maximum thrust of about 250 kN. It ignites after first-stage separation and burns through the upper atmosphere, where reduced ambient pressure allows better nozzle efficiency than at sea level. On Mission Aagaman it completed its burn and separated, followed by ignition of Kalam-100. Burn duration and propellant mass have not been published.',
    whyItExists:
      'The first stage’s casing, nozzle and structure weigh many times what is left in it at burnout. Continuing to drag that empty hardware would eat most of the remaining performance. The second stage exists so that dead mass can be dropped.',
    role: 'Mid-ascent acceleration after the atmosphere thins.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Solid rocket motor', 'Composite motor casing'],
    connectsTo: ['interstage-1-2', 'interstage-2-3', 'gnc', 'separation-systems'],
    keyTerms: ['solid-rocket-motor', 'stage', 'thrust', 'propellant'],
    position: 1.5,
    length: 3.8,
    explodedOffset: -1.3,
    radius: 0.8,
    fidelity: 'representative',
    sources: ['wikipedia-vikram-i', 'gunter-vikram-1', 'ani-aagaman'],
    specs: [
      {
        label: 'Motor',
        claim: { value: 'Kalam-250', confidence: 'reported', sources: ['wikipedia-vikram-i', 'gunter-vikram-1'] },
      },
      {
        label: 'Maximum thrust',
        claim: { value: 'About 250 kN', confidence: 'reported', sources: ['wikipedia-vikram-i', 'gunter-vikram-1'] },
      },
      {
        label: 'Propellant',
        claim: { value: 'Solid', confidence: 'reported', sources: ['wikipedia-vikram-i', 'ani-aagaman'] },
      },
    ],
  },
  {
    id: 'interstage-1-2',
    name: 'Interstage 1/2',
    code: 'IS12',
    category: 'structures',
    shortDescription: 'The collar between the booster and the second stage — the first thing to let go in flight.',
    beginnerExplanation:
      'This is where the rocket first comes apart on purpose. It holds the big booster to everything above it while the booster is pushing, then releases once the booster is spent.',
    engineeringExplanation:
      'This interstage carries the highest compressive and bending loads of any structural joint on the vehicle, because it sits between the largest motor and the entire stack above it during maximum dynamic pressure. It houses the first separation plane. Construction details and separation hardware for Vikram-1 are not publicly documented.',
    whyItExists:
      'It is the joint that has to be strongest and then has to fail on command. That contradiction is the entire engineering problem of staging.',
    role: 'Structural link and separation plane between the first and second stages.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Composite structures', 'Separation systems'],
    connectsTo: ['stage-1', 'stage-2', 'separation-systems'],
    keyTerms: ['interstage', 'separation', 'composite-structure', 'dynamic-pressure'],
    position: -0.8,
    length: 0.8,
    explodedOffset: -2.0,
    radius: 0.82,
    fidelity: 'representative',
    sources: ['ani-aagaman', 'skyroot-site'],
  },
  {
    id: 'stage-1',
    name: 'First Stage — Kalam-1200',
    code: 'S1',
    category: 'propulsion',
    shortDescription: 'The booster. It produces most of the thrust needed immediately after liftoff.',
    beginnerExplanation:
      'At the moment of release the rocket is at its heaviest and its slowest, and gravity is pulling the whole thing straight back down. The first stage exists to win that argument. It is by far the biggest motor on the vehicle, and it burns for only a couple of minutes, but in that time it lifts the rocket off the pad and pushes it through the thickest, most resistant part of the atmosphere.',
    engineeringExplanation:
      'Kalam-1200 is the solid first stage, with a reported maximum thrust of about 1,000 kN. A solid motor is a case packed with a cast propellant grain that contains both fuel and oxidiser; once ignited it burns along the exposed grain surface until the propellant is consumed, and cannot be throttled or shut down. The grain geometry therefore sets the thrust-versus-time curve. Skyroot describes Vikram-1 motor casings as carbon composite, which lowers inert mass and so raises the mass ratio available for payload. On Mission Aagaman, published accounts describe the vehicle passing Mach 1 about 25 seconds after liftoff and Mach 5 around the 90-second mark, with the stage carrying the vehicle through the region of highest dynamic pressure before separating. Burn duration, propellant mass and grain design are not public.',
    whyItExists:
      'Thrust must exceed weight or nothing happens at all. Every kilogram on the pad — including the upper stages, the fairing and the propellant they have not burned yet — has to be lifted by this one motor. That is why it is bigger than everything above it combined.',
    role: 'Liftoff thrust and acceleration through the dense lower atmosphere.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Solid rocket motor', 'Carbon composite motor casing', 'Thrust vector control'],
    connectsTo: ['propulsion-nozzle-s1', 'interstage-1-2', 'gnc', 'composite-structures'],
    keyTerms: ['solid-rocket-motor', 'thrust', 'propellant', 'dynamic-pressure', 'stage'],
    position: -4.9,
    length: 7.4,
    explodedOffset: -2.6,
    radius: 0.85,
    fidelity: 'representative',
    sources: ['wikipedia-vikram-i', 'gunter-vikram-1', 'ani-aagaman', 'ieee-spectrum-vikram1'],
    specs: [
      {
        label: 'Motor',
        claim: { value: 'Kalam-1200', confidence: 'reported', sources: ['wikipedia-vikram-i', 'gunter-vikram-1'] },
      },
      {
        label: 'Maximum thrust',
        claim: { value: 'About 1,000 kN', confidence: 'reported', sources: ['wikipedia-vikram-i', 'gunter-vikram-1'] },
      },
      {
        label: 'Mach 1',
        claim: { value: 'About 25 s after liftoff, as published for Mission Aagaman', confidence: 'reported', sources: ['ani-aagaman'] },
      },
      {
        label: 'Mach 5',
        claim: { value: 'Around the 90 s mark, as published for Mission Aagaman', confidence: 'reported', sources: ['ani-aagaman'] },
      },
      {
        label: 'Casing material',
        claim: { value: 'Carbon composite, per Skyroot’s all-composite airframe description', confidence: 'reported', sources: ['skyroot-site', 'ieee-spectrum-vikram1'] },
      },
    ],
  },
  {
    id: 'propulsion-nozzle-s1',
    name: 'First-Stage Nozzle Assembly',
    code: 'NOZ',
    category: 'propulsion',
    shortDescription: 'The bell at the base that turns hot gas into directed thrust — and steers the rocket.',
    beginnerExplanation:
      'Burning propellant on its own just makes a very hot, very high-pressure mess. The nozzle is the shape that turns that mess into a fast jet pointing one way, which is what actually pushes the rocket the other way. On most launch vehicles the nozzle can also be tilted slightly, and that tilt is how the rocket steers: point the exhaust a little left and the nose swings a little right.',
    engineeringExplanation:
      'A converging–diverging nozzle accelerates combustion products from subsonic in the chamber, through sonic at the throat, to supersonic at the exit, converting thermal energy and pressure into directed momentum. Expansion ratio is a compromise: a first-stage nozzle must avoid flow separation at sea-level ambient pressure, so it is less expanded — and therefore less efficient in vacuum — than an upper-stage nozzle. Throat and liner materials face the full combustion temperature and erosive particle flow of a solid motor. Thrust vector control on solid stages is commonly achieved by deflecting the nozzle or injecting into the exhaust; the specific method and actuator arrangement used on Vikram-1 has not been published.',
    whyItExists:
      'Without a nozzle you have a bomb. With one you have an engine. The shape is the whole difference between energy going everywhere and energy going one direction.',
    role: 'Expands combustion products into supersonic exhaust; the primary means of thrust vector control in first-stage flight.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Converging–diverging nozzle', 'Ablative / high-temperature materials', 'Thrust vector control'],
    connectsTo: ['stage-1', 'gnc'],
    keyTerms: ['thrust', 'specific-impulse', 'attitude-control', 'solid-rocket-motor'],
    position: -9.3,
    length: 1.4,
    explodedOffset: -3.2,
    radius: 0.85,
    fidelity: 'representative',
    sources: ['wikipedia-vikram-i', 'gunter-vikram-1'],
  },

  /* ---- Cross-cutting systems: hotspots without their own geometry ---- */

  {
    id: 'avionics',
    name: 'Avionics',
    code: 'AVI',
    category: 'avionics',
    shortDescription: 'The vehicle’s nervous system — the computers, power and wiring that run everything.',
    beginnerExplanation:
      'Nobody is flying this rocket. There is no pilot and there is no time for someone on the ground to react — events happen in tenths of a second, hundreds of kilometres away. The avionics are the electronics that make every decision on board: when to light a motor, when to let a stage go, how far to tilt the nozzle, when to release a satellite. They also supply the power and carry the signals that let every other system do its job.',
    engineeringExplanation:
      'Avionics covers the flight computer and sequencer, power generation and distribution, the harness, and the interfaces to sensors, actuators, pyrotechnic devices and the telemetry chain. The environment is hostile in a specific way: sustained vibration and acoustic loading through the boost phase, shock at every separation event, wide temperature swings, and a vacuum that removes convective cooling. Skyroot has publicly described Vikram-1 as using modular avionics, which allows the same building blocks to be reconfigured across vehicle variants. Specific processors, bus architecture, redundancy scheme and software stack have not been published.',
    whyItExists:
      'Because a rocket flight is a sequence of irreversible events that must happen in the right order, within milliseconds, with no one available to intervene. That sequence has to live somewhere on board.',
    role: 'Onboard computing, sequencing, power distribution and system interfaces.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Modular avionics', 'Flight sequencer', 'Power distribution', 'Harnessing'],
    connectsTo: ['gnc', 'telemetry', 'separation-systems', 'stage-4-oam', 'payload-adapter'],
    keyTerms: ['avionics', 'telemetry', 'guidance', 'separation'],
    position: 3.9,
    length: 0,
    explodedOffset: -0.7,
    radius: 0.75,
    fidelity: 'conceptual',
    sources: ['skyroot-site', 'ieee-spectrum-vikram1'],
    specs: [
      {
        label: 'Architecture',
        claim: { value: 'Described by Skyroot as modular avionics', confidence: 'reported', sources: ['skyroot-site'] },
      },
    ],
  },
  {
    id: 'gnc',
    name: 'Guidance, Navigation & Control',
    code: 'GNC',
    category: 'gnc',
    shortDescription: 'Knows where the rocket is, decides where it should be, and moves the controls to close the gap.',
    beginnerExplanation:
      'Three separate questions, often confused. Navigation asks: where am I, how fast, pointing which way? Guidance asks: given that, what path should I be on to reach the target orbit? Control asks: what do I physically move — how far to tilt the nozzle — to get onto that path without the vehicle tumbling? A rocket is naturally unstable, a bit like balancing a broom on your palm, so this loop runs continuously from liftoff to the final burn.',
    engineeringExplanation:
      'Navigation is typically an inertial measurement unit propagating position, velocity and attitude, often aided by satellite navigation. Guidance computes a steering command toward the target orbital state, trading gravity losses against drag losses and steering losses. Control closes the attitude loop through thrust vector control on the powered stages and through the reaction control or engine gimbal authority of the upper stage during coast. The control problem is hardest at maximum dynamic pressure, where aerodynamic forces are large and the vehicle must be flown close to zero angle of attack to limit structural loading. Vikram-1’s sensor suite, guidance algorithm and control authority figures have not been published.',
    whyItExists:
      'Reaching space is easy compared with reaching orbit. Orbit requires being at a specific altitude with a specific speed in a specific direction, all at once. Nothing gets there by pointing up and hoping.',
    role: 'Determines vehicle state, computes the trajectory and commands the steering actuators.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Inertial navigation', 'Closed-loop guidance', 'Thrust vector control', 'Attitude control'],
    connectsTo: ['avionics', 'propulsion-nozzle-s1', 'stage-4-oam', 'telemetry'],
    keyTerms: ['guidance', 'navigation', 'attitude-control', 'inclination', 'orbital-velocity'],
    position: 2.4,
    length: 0,
    explodedOffset: -1.3,
    radius: 0.8,
    fidelity: 'conceptual',
    sources: ['skyroot-site', 'ieee-spectrum-vikram1'],
  },
  {
    id: 'telemetry',
    name: 'Telemetry & Tracking',
    code: 'TLM',
    category: 'mission-interfaces',
    shortDescription: 'Streams the vehicle’s health and position to the ground throughout flight.',
    beginnerExplanation:
      'A rocket is gone in minutes and never comes back. The only way anyone learns what happened inside it is if it says so as it goes: pressures, temperatures, voltages, position, whether each event actually occurred. That radio stream is telemetry. On a first flight it is arguably the most valuable product of the mission, because it is what tells the engineers whether the design behaved as predicted.',
    engineeringExplanation:
      'Telemetry encodes sensor channels from across the vehicle into a downlink received by ground stations along the flight path, complemented by independent tracking from the range. On Mission Aagaman, Skyroot’s in-house SCOPE payload was described as collecting data used to assess the rocket’s performance during flight, and payload operators publicly described beginning analysis of in-orbit data after launch. Link budgets, frequencies, bandwidth and the ground station network used are not publicly documented in detail.',
    whyItExists:
      'A maiden flight is an experiment. An experiment you cannot measure is just an expensive event.',
    role: 'Downlinks vehicle and mission data; supports range tracking and post-flight analysis.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['RF downlink', 'Onboard instrumentation', 'Ground station network'],
    connectsTo: ['avionics', 'gnc', 'ground-interfaces'],
    keyTerms: ['telemetry', 'avionics'],
    position: 5.3,
    length: 0,
    explodedOffset: 0.0,
    radius: 0.68,
    fidelity: 'conceptual',
    sources: ['deccan-chronicle-inorbit', 'space-com-debut'],
  },
  {
    id: 'separation-systems',
    name: 'Separation Systems',
    code: 'SEP',
    category: 'separation',
    shortDescription: 'The mechanisms that make the rocket come apart on purpose, exactly once, at exactly the right time.',
    beginnerExplanation:
      'A launch involves several deliberate break-ups: two stages let go, the nose cone splits and falls away, the satellites push off from their mounts. Each of these is a one-shot mechanism that has to hold absolutely rigid for the entire flight, then release within milliseconds when told to, and then not bump into anything on the way out.',
    engineeringExplanation:
      'Separation devices generally hold a joint in preload until a command releases it, then impart a controlled relative velocity so the parts do not recontact. Common approaches include pyrotechnic bolts and linear charges, clamp bands, and low-shock non-explosive actuators; springs or cold-gas thrusters provide the push-off. The engineering constraints are shock transmitted to sensitive payloads, debris generation, and the tight tolerance on relative velocity and tip-off rates. Mission Aagaman involved first-stage separation, fairing jettison, second- and third-stage separation and payload deployments. Vikram-1’s specific separation hardware has not been publicly documented.',
    whyItExists:
      'Every gram of spent hardware you carry is a gram of payload you do not. Separation is how a rocket sheds its own past.',
    role: 'Controlled release of stages, fairing halves and payloads.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Separation mechanisms', 'Push-off springs', 'Shock management'],
    connectsTo: ['interstage-1-2', 'interstage-2-3', 'payload-fairing', 'payload-adapter', 'avionics'],
    keyTerms: ['separation', 'interstage', 'fairing', 'payload-adapter'],
    position: -0.8,
    length: 0,
    explodedOffset: -2.0,
    radius: 0.86,
    fidelity: 'conceptual',
    sources: ['ani-aagaman'],
  },
  {
    id: 'composite-structures',
    name: 'Composite Airframe',
    code: 'STR',
    category: 'structures',
    shortDescription: 'The carbon-fibre skin and casings that carry every load while weighing as little as possible.',
    beginnerExplanation:
      'A rocket is mostly propellant. Everything that is not propellant is weight you have to accelerate for nothing, so the structure is under constant pressure to be lighter. Carbon composite — carbon fibre set in resin — is used because it is very strong for its weight and can be laid up so the fibres run along the directions where the loads actually are, which metal cannot do.',
    engineeringExplanation:
      'Structural mass drives the mass ratio in the rocket equation, and on a small launch vehicle a few percent of inert mass is a large fraction of the payload. Filament-wound or laid-up carbon composite casings and airframe sections allow the laminate to be tailored to the hoop and axial loads of a pressurised motor case and to the bending loads of atmospheric flight. Skyroot publicly describes Vikram-1 as having an all-carbon-composite structure and has cited that choice as a mass-reduction measure. Layup schedules, fibre and resin systems, and section masses are not published.',
    whyItExists:
      'Because on a small rocket the difference between a composite airframe and a metal one is not a small efficiency gain — it can be the difference between carrying a useful payload and carrying none.',
    role: 'Primary load-carrying structure for motor casings, interstages and the fairing.',
    developer: skyrootDeveloper,
    manufacturer: supplierUndisclosed,
    technologies: ['Carbon fibre composites', 'Filament winding', 'Bonded structures'],
    connectsTo: ['stage-1', 'stage-2', 'stage-3', 'payload-fairing', 'interstage-1-2'],
    keyTerms: ['composite-structure', 'stage', 'thrust'],
    position: -3.0,
    length: 0,
    explodedOffset: -2.6,
    radius: 0.86,
    fidelity: 'conceptual',
    sources: ['skyroot-site', 'ieee-spectrum-vikram1', 'business-standard-mission'],
    specs: [
      {
        label: 'Airframe',
        claim: {
          value: 'Described by Skyroot as all-carbon-composite',
          confidence: 'reported',
          sources: ['skyroot-site', 'ieee-spectrum-vikram1'],
        },
      },
    ],
  },
  {
    id: 'ground-interfaces',
    name: 'Ground & Range Interfaces',
    code: 'GSE',
    category: 'mission-interfaces',
    shortDescription: 'Everything the rocket is connected to until the moment it leaves: pad, checkout, range safety.',
    beginnerExplanation:
      'The rocket spends far longer plugged into the ground than it spends flying. Until liftoff it is held on a launch mount, powered and monitored through umbilical cables, and watched by a range whose job is to protect people on the ground. A launch vehicle without that infrastructure is an object that cannot be launched.',
    engineeringExplanation:
      'Ground systems cover the launch mount and hold-down, umbilicals for power, data and conditioning, the checkout and countdown sequencing system, and the range interfaces including tracking and flight safety. Vikram-1 flew from Satish Dhawan Space Centre at Sriharikota with ISRO supporting the mission; Indian reforms from 2020 onward and the 2023 space policy opened ISRO launch pads, propulsion test stands and other facilities to private operators, which is what made a private orbital launch from Indian soil possible. Mission Aagaman was reported to have lifted off after a hold of about 35 minutes. Vikram-1’s specific flight termination arrangements have not been published in detail by the operator, so this project does not describe them.',
    whyItExists:
      'A launch vehicle is only half of a launch. The other half is a site, a countdown, and a range that can guarantee the flight is safe for everyone who is not on the rocket.',
    role: 'Pad, checkout, countdown and range interfaces up to liftoff.',
    developer: {
      value: 'Skyroot Aerospace, launching from ISRO’s Satish Dhawan Space Centre with ISRO support',
      confidence: 'confirmed',
      sources: ['isro-first-private', 'cnbc-launch', 'space-com-inside'],
    },
    manufacturer: {
      value: 'Launch range operated by ISRO / Department of Space, Government of India',
      confidence: 'confirmed',
      sources: ['isro-first-private', 'space-com-inside'],
    },
    technologies: ['Launch mount', 'Umbilicals', 'Countdown sequencing', 'Range tracking'],
    connectsTo: ['telemetry', 'avionics'],
    keyTerms: ['telemetry', 'separation'],
    position: -7.5,
    length: 0,
    explodedOffset: -3.2,
    radius: 0.86,
    fidelity: 'conceptual',
    sources: ['isro-first-private', 'space-com-inside', 'techcrunch-unicorn'],
  },
];

export const componentById = new Map(components.map((c) => [c.id, c]));

/** Sections that get their own mesh in the 3D scene, bottom to top. */
export const geometricComponents = components
  .filter((c) => c.length > 0)
  .sort((a, b) => a.position - b.position);

/** Cross-cutting systems that are shown as hotspots only. */
export const systemComponents = components.filter((c) => c.length === 0);

export const categoryLabels: Record<RocketComponent['category'], string> = {
  'payload-systems': 'Payload systems',
  propulsion: 'Propulsion',
  structures: 'Structures',
  avionics: 'Avionics',
  gnc: 'Guidance, navigation & control',
  separation: 'Separation systems',
  'mission-interfaces': 'Mission & ground interfaces',
};
