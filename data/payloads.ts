import type { Payload } from './types';

/**
 * The six payloads publicly reported aboard Mission Aagaman.
 *
 * Categories are kept distinct on purpose: a customer satellite, an in-house
 * flight-data payload, technology demonstrations and symbolic art are not the
 * same kind of object and are not collapsed into one "satellite" bucket.
 */
export const payloads: Payload[] = [
  {
    id: 'scope',
    name: 'SCOPE',
    subtitle: 'Skyroot’s own flight-validation payload',
    organizationId: 'skyroot',
    country: 'India',
    category: 'in-house-demonstration',
    purpose: 'Validate Skyroot’s own spacecraft systems and collect data on how Vikram-1 actually performed.',
    missionRole:
      'Skyroot’s in-house payload, reported as one of the two satellites injected into low Earth orbit on this flight.',
    whatItDoes:
      'SCOPE carries Skyroot’s own systems and instrumentation. It was described as validating the company’s onboard spacecraft systems and mission technologies during the flight, and as collecting data used to assess the rocket’s performance.',
    whyItWasSent:
      'A first orbital flight is a company’s single best opportunity to learn. Rather than fly a mass simulator, Skyroot used the slot to test hardware it intends to reuse and to instrument its own vehicle.',
    technologyTested:
      'Skyroot-proprietary onboard spacecraft systems and mission technologies, plus flight data collection. Skyroot has not published a detailed subsystem breakdown of SCOPE.',
    whatTheyHopeToLearn:
      'How the vehicle behaved against prediction, and whether the company’s own spacecraft building blocks survive and function in orbit — both of which feed directly into the next vehicle.',
    deployment: {
      value: 'Reported as injected into low Earth orbit',
      confidence: 'reported',
      sources: ['wikipedia-vikram-i', 'voxelmatters-3dprint', 'space-com-debut'],
    },
    outcome: {
      value: 'Reported successful; Skyroot described collecting flight performance data',
      confidence: 'reported',
      sources: ['space-com-debut', 'deccan-chronicle-inorbit'],
    },
    bayAngle: 0,
    bayRadius: 0.32,
    accent: '#ff6b1f',
    sources: ['deccan-chronicle-payloads', 'space-com-debut', 'voxelmatters-3dprint', 'deccan-chronicle-inorbit'],
  },
  {
    id: 'solaras',
    name: 'SOLARAS',
    subtitle: 'Grahaa Space’s stackable nanosatellite platform',
    organizationId: 'grahaa',
    country: 'India',
    category: 'customer-satellite',
    purpose: 'Prove that Grahaa Space’s stackable nanosatellite bus works in orbit and can host other people’s payloads.',
    missionRole:
      'A customer satellite, reported as one of the two spacecraft injected into low Earth orbit on Mission Aagaman.',
    whatItDoes:
      'SOLARAS was designed to validate Grahaa Space’s stackable nanosatellite platform, its communication systems and its hosted-payload architecture. It also carries VISWA-M, an academic research payload developed by VIT-AP University, demonstrating that the platform can support research and technology-demonstration missions.',
    whyItWasSent:
      'Grahaa Space is building a satellite platform it intends to fly repeatedly. Before it can sell capacity on that platform, it has to demonstrate the bus, the radio link and the hosted-payload interface working together in real conditions.',
    technologyTested:
      'Stackable nanosatellite bus, communication systems, and a hosted-payload architecture carrying a third-party academic payload.',
    whatTheyHopeToLearn:
      'Whether the small-satellite design holds up in real space conditions and can support future Earth-observation, commercial, scientific and institutional missions. The company’s stated longer-term aim is streaming near-real-time geospatial video data for use on the ground.',
    deployment: {
      value: 'Deployed — reported as successfully deployed into low Earth orbit',
      confidence: 'reported',
      sources: ['timestech-solaras-deploy', 'wikipedia-vikram-i'],
    },
    outcome: {
      value: 'Reported successful deployment; operators reported beginning analysis of in-orbit data',
      confidence: 'reported',
      sources: ['timestech-solaras-deploy', 'deccan-chronicle-inorbit'],
    },
    bayAngle: Math.PI * 0.5,
    bayRadius: 0.32,
    accent: '#4ea1ff',
    sources: ['timestech-solaras-deploy', 'timestech-solaras-prelaunch', 'deccan-chronicle-payloads', 'deccan-chronicle-inorbit'],
  },
  {
    id: 'embrace',
    name: 'Embrace',
    subtitle: 'Cosmoserve’s soft robotic capture demonstration',
    organizationId: 'cosmoserve',
    country: 'India',
    category: 'technology-demonstration',
    purpose: 'Attempt what the company described as the world’s first in-orbit demonstration of soft robotic capture.',
    missionRole:
      'A technology demonstration flown on Vikram-1 — Cosmoserve Space’s first orbital demonstration, called Mission Embrace.',
    whatItDoes:
      'Embrace is a soft robotic capture system built around compliant "petals" designed to close around an object. Unlike rigid grappling systems, a compliant gripper can adapt to irregular shapes and orientations, which is what real debris looks like.',
    whyItWasSent:
      'Active debris removal only works if you can grab something that was never designed to be grabbed. Cosmoserve is developing capture technology for exactly that case, and the behaviour of a compliant mechanism in vacuum, in microgravity and across orbital temperature swings cannot be established on the ground.',
    technologyTested:
      'Soft robotic capture mechanism, its actuation system, and the onboard software controlling the capture sequence.',
    whatTheyHopeToLearn:
      'Whether a compliant capture mechanism survives launch and functions in orbit, and how the actuation and control behave in the real environment — data the company reported as valuable despite the deployment problem.',
    deployment: {
      value: 'Not publicly disclosed as a separated free-flyer; reported as a demonstration aboard the launch vehicle',
      confidence: 'undisclosed',
      sources: ['inc42-cosmoserve-result', 'business-standard-cosmoserve'],
    },
    outcome: {
      value:
        'Partial success, per the company: the robotic petals did not deploy as intended, but the system withstood launch and the actuation system and onboard software functioned as expected, generating useful in-orbit test data',
      confidence: 'reported',
      sources: ['inc42-cosmoserve-result'],
    },
    bayAngle: Math.PI,
    bayRadius: 0.32,
    accent: '#5bc98a',
    sources: ['business-standard-cosmoserve', 'inc42-cosmoserve-result', 'theweek-payloads'],
  },
  {
    id: 'dcubed',
    name: 'uD3PP & mD3RN',
    subtitle: 'DCUBED deployable technology demonstrators',
    organizationId: 'dcubed',
    country: 'Germany',
    category: 'technology-demonstration',
    purpose: 'Validate DCUBED’s deployable space technologies under real orbital conditions.',
    missionRole: 'Technology demonstration payloads from Germany, flown among Mission Aagaman’s primary payloads.',
    whatItDoes:
      'The uD3PP and mD3RN payloads exercise DCUBED’s deployable hardware — the mechanisms that hold a structure folded through launch and release it once in orbit.',
    whyItWasSent:
      'Deployment mechanisms are bought on flight heritage. A customer choosing a release actuator for a solar array wants to know it has worked in orbit, not that it worked in a vacuum chamber.',
    technologyTested:
      'Deployable space technologies and release mechanisms. DCUBED has not published a detailed public breakdown of these two payloads through the sources used here.',
    whatTheyHopeToLearn:
      'Whether the mechanisms survive launch loads and actuate correctly in vacuum and microgravity — the qualification step that turns a component into a sellable product.',
    deployment: {
      value: 'Reported among the primary payloads successfully deployed on the mission',
      confidence: 'reported',
      sources: ['space-com-debut'],
    },
    outcome: {
      value: 'Reported as part of the mission’s successful primary payload deployment',
      confidence: 'reported',
      sources: ['space-com-debut'],
    },
    bayAngle: Math.PI * 1.5,
    bayRadius: 0.32,
    accent: '#e8b13b',
    sources: ['space-com-debut', 'deccan-chronicle-payloads'],
  },
  {
    id: 'cosmic-bloom',
    name: 'Cosmic Bloom',
    subtitle: 'A symbolic payload by Cosmos Diamonds',
    organizationId: 'cosmos-diamonds',
    country: 'India',
    category: 'symbolic-art',
    purpose: 'Commemorative. Not a technology demonstration and not a satellite.',
    missionRole: 'A symbolic payload carried on the maiden flight.',
    whatItDoes:
      'Cosmic Bloom is described as an artistic diamond jewellery creation mounted on an aluminium base plate. It was reported as the first time diamonds were launched into space aboard an Indian rocket.',
    whyItWasSent:
      'Symbolic payloads mark an occasion. They are a long tradition on first flights, and they are shown in their own category here so nobody mistakes them for working spacecraft.',
    technologyTested: 'None. This payload is commemorative.',
    whatTheyHopeToLearn: 'Not applicable.',
    deployment: {
      value: 'Not publicly disclosed',
      confidence: 'undisclosed',
      sources: [],
    },
    outcome: {
      value: 'Reported as flown on the mission',
      confidence: 'reported',
      sources: ['theweek-payloads', 'business-standard-mission'],
    },
    bayAngle: Math.PI * 0.25,
    bayRadius: 0.5,
    accent: '#cfd6e2',
    sources: ['theweek-payloads', 'business-standard-mission'],
  },
  {
    id: 'microart',
    name: 'Microart',
    subtitle: 'An 18-carat gold micro-rocket tribute',
    organizationId: 'mattewada',
    country: 'India',
    category: 'symbolic-art',
    purpose: 'Commemorative tribute to three Indian scientists. Not a technology demonstration.',
    missionRole: 'A symbolic micro-art payload carried on the maiden flight.',
    whatItDoes:
      'An 18-carat gold rocket created by Telangana artist Ajay Kumar Mattewada, reported to feature tiny sculptures of C. V. Raman, Vikram Sarabhai and A. P. J. Abdul Kalam.',
    whyItWasSent:
      'The vehicle and its stages are named after these scientists: the Kalam motors, the Raman engines, and Vikram-1 itself after Vikram Sarabhai. The payload is a tribute to the people the hardware is named for.',
    technologyTested: 'None. This payload is commemorative.',
    whatTheyHopeToLearn: 'Not applicable.',
    deployment: {
      value: 'Not publicly disclosed',
      confidence: 'undisclosed',
      sources: [],
    },
    outcome: {
      value: 'Reported as flown on the mission',
      confidence: 'reported',
      sources: ['hans-india-gold', 'theweek-payloads'],
    },
    bayAngle: Math.PI * 1.25,
    bayRadius: 0.5,
    accent: '#e4c07a',
    sources: ['hans-india-gold', 'theweek-payloads'],
  },
];

export const payloadById = new Map(payloads.map((p) => [p.id, p]));

export const payloadCategoryLabels: Record<Payload['category'], string> = {
  'customer-satellite': 'Customer satellite',
  'technology-demonstration': 'Technology demonstration',
  'in-house-demonstration': 'In-house flight validation',
  'symbolic-art': 'Symbolic / art payload',
};

export const payloadCategoryNotes: Record<Payload['category'], string> = {
  'customer-satellite': 'A spacecraft a paying customer wanted placed in a specific orbit.',
  'technology-demonstration': 'Hardware flown to prove it works in orbit, so it can be sold or scaled later.',
  'in-house-demonstration': 'Flown by the launch provider to validate its own systems and gather flight data.',
  'symbolic-art': 'Commemorative objects. They carry meaning, not a technical function.',
};
