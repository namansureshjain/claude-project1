import type { Organization } from './types';

export const organizations: Organization[] = [
  {
    id: 'skyroot',
    name: 'Skyroot Aerospace',
    country: 'India',
    city: 'Hyderabad',
    kind: 'launch-provider',
    founded: '2018',
    whatTheyBuild:
      'Small orbital launch vehicles. Skyroot develops the Vikram family, including the Vikram-S suborbital demonstrator flown in 2022 and the Vikram-1 orbital vehicle.',
    contribution:
      'Developed and operated Vikram-1 and flew Mission Aagaman, and carried its own SCOPE payload to validate onboard systems and gather flight data.',
    problemAddressed:
      'Small satellite operators have historically had to wait for a large rocket going roughly their way, and accept whatever orbit it was already flying. A small dedicated launcher trades raw capacity for schedule and orbit control.',
    whyOrbitalTestingMatters:
      'No ground test reproduces the full sequence: launch loads, staging shock, vacuum, thermal cycling and the real guidance problem, all in order, once. A first orbital flight is the only way to find out whether the integrated vehicle behaves as the models said it would.',
    domains: ['propulsion', 'structures', 'avionics', 'software', 'manufacturing', 'testing', 'payload-systems', 'telemetry'],
    sources: ['skyroot-site', 'isro-first-private', 'ieee-spectrum-vikram1', 'techcrunch-unicorn'],
  },
  {
    id: 'isro',
    name: 'ISRO / Department of Space',
    country: 'India',
    city: 'Bengaluru / Sriharikota',
    kind: 'space-agency',
    whatTheyBuild:
      'India’s national space programme: launch vehicles, spacecraft, and the national launch range and test infrastructure.',
    contribution:
      'Provided the launch range at Satish Dhawan Space Centre and supported the mission. Indian policy reforms from 2020 onward opened ISRO launch pads, propulsion test stands and other facilities to private operators.',
    problemAddressed:
      'Building a launch site, test stands and a tracking range from scratch is out of reach for a startup. Shared national infrastructure removes that barrier.',
    whyOrbitalTestingMatters:
      'A national range provides the safety, tracking and regulatory framework that makes a privately built orbital launch legally and practically possible.',
    domains: ['launch-infrastructure', 'ground-systems', 'testing'],
    sources: ['isro-first-private', 'space-com-inside', 'techcrunch-unicorn'],
  },
  {
    id: 'grahaa',
    name: 'Grahaa Space',
    country: 'India',
    kind: 'payload-customer',
    whatTheyBuild:
      'Earth-observation nanosatellites and a stackable nanosatellite platform designed to host third-party payloads.',
    contribution:
      'Flew SOLARAS on Mission Aagaman to validate its stackable nanosatellite platform, communication systems and hosted-payload architecture. SOLARAS also carried VISWA-M, an academic research payload from VIT-AP University.',
    problemAddressed:
      'Earth-observation data is often hours or days old by the time it reaches the people who need it. Grahaa Space has publicly described a long-term goal of streaming near-real-time geospatial video data for use on the ground.',
    whyOrbitalTestingMatters:
      'A satellite bus is a product. Before selling rides on it, you have to show that the structure, power, thermal design, radio link and hosted-payload interface actually work together in orbit, not just on a bench.',
    domains: ['payload-systems', 'telemetry'],
    sources: ['timestech-solaras-deploy', 'timestech-solaras-prelaunch', 'deccan-chronicle-payloads'],
  },
  {
    id: 'cosmoserve',
    name: 'Cosmoserve Space',
    country: 'India',
    kind: 'payload-customer',
    whatTheyBuild:
      'Active debris removal (ADR) technologies, including soft robotic capture mechanisms intended to grip objects that were never designed to be grabbed.',
    contribution:
      'Flew Mission Embrace on Vikram-1 — described by the company as an attempt at the world’s first in-orbit demonstration of soft robotic capture.',
    problemAddressed:
      'Most objects in orbit that need removing are tumbling, irregular and have no grapple fixture. Rigid arms need a known, cooperative target. A compliant gripper can conform to an uncooperative shape instead of requiring one.',
    whyOrbitalTestingMatters:
      'Compliant materials behave differently in vacuum and across large temperature swings than they do in a laboratory, and a capture attempt involves contact dynamics in microgravity that cannot be reproduced on the ground.',
    domains: ['payload-systems'],
    sources: ['business-standard-cosmoserve', 'inc42-cosmoserve-result', 'theweek-payloads'],
  },
  {
    id: 'dcubed',
    name: 'DCUBED (Dcubed GmbH)',
    country: 'Germany',
    kind: 'payload-customer',
    whatTheyBuild:
      'Deployable space hardware and release actuators — the small mechanisms that hold something folded during launch and let it unfold in orbit.',
    contribution:
      'Flew the uD3PP and mD3RN payloads on Mission Aagaman to validate deployable space technologies in real orbital conditions.',
    problemAddressed:
      'Almost everything useful in space is larger than the rocket that carries it: solar arrays, antennas, booms, sails. Deployment mechanisms are the single-point-of-failure hardware that turns a packed volume into a working spacecraft.',
    whyOrbitalTestingMatters:
      'Deployment is a one-shot event in vacuum, in microgravity, after a violent launch. Gravity on the ground masks exactly the behaviours that matter, so flight heritage is what customers actually buy.',
    domains: ['payload-systems', 'manufacturing'],
    sources: ['space-com-debut', 'deccan-chronicle-payloads'],
  },
  {
    id: 'cosmos-diamonds',
    name: 'Cosmos Diamonds',
    country: 'India',
    kind: 'artist-studio',
    whatTheyBuild:
      'Diamond jewellery. Their contribution to Mission Aagaman was a symbolic payload, not a spacecraft system.',
    contribution:
      'Created "Cosmic Bloom", described as an artistic diamond jewellery creation mounted on an aluminium base plate, reported as the first time diamonds were launched into space aboard an Indian rocket.',
    problemAddressed:
      'None in the engineering sense. Symbolic payloads mark a moment and fund or publicise a flight; they are not technology demonstrations and this site does not present them as such.',
    whyOrbitalTestingMatters:
      'Not applicable. This payload is commemorative, and is shown here in its own category so it is not mistaken for a satellite.',
    domains: ['payload-systems'],
    sources: ['theweek-payloads', 'business-standard-mission'],
  },
  {
    id: 'mattewada',
    name: 'Ajay Kumar Mattewada',
    country: 'India',
    city: 'Telangana',
    kind: 'artist-studio',
    whatTheyBuild:
      'Micro-art. An individual artist, not an aerospace organization.',
    contribution:
      'Created the Microart payload: an 18-carat gold micro-rocket reported to feature tiny sculptures of C. V. Raman, Vikram Sarabhai and A. P. J. Abdul Kalam.',
    problemAddressed:
      'None in the engineering sense — this is a tribute to the scientists the vehicle and its stages are named after.',
    whyOrbitalTestingMatters:
      'Not applicable. Listed separately from technology payloads for exactly that reason.',
    domains: ['payload-systems'],
    sources: ['hans-india-gold', 'theweek-payloads'],
  },
  {
    id: 'vitap',
    name: 'VIT-AP University',
    country: 'India',
    kind: 'academic',
    whatTheyBuild:
      'Academic research payloads. VIT-AP contributed VISWA-M, carried as a hosted payload aboard Grahaa Space’s SOLARAS.',
    contribution:
      'VISWA-M, an academic research payload, demonstrating SOLARAS’s ability to host third-party research and technology-demonstration payloads.',
    problemAddressed:
      'University groups rarely have the budget for a dedicated satellite. Hosted payload slots give students and researchers real flight data at a fraction of the cost.',
    whyOrbitalTestingMatters:
      'For a hosted payload, orbital flight is both the experiment and the proof that the hosting interface works.',
    domains: ['payload-systems'],
    sources: ['timestech-solaras-deploy'],
  },
];

export const organizationById = new Map(organizations.map((o) => [o.id, o]));
