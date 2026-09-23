import type { SupplyCategory } from './types';

/**
 * "Who builds a rocket?"
 *
 * Important: Skyroot has not published a supplier list for Vikram-1, and this
 * project will not infer one. A company making a similar part is not evidence
 * that it made this part. Where nothing is publicly documented, the category
 * says so plainly — that is a more useful answer than a plausible guess.
 */
export const supplyCategories: SupplyCategory[] = [
  {
    id: 'propulsion',
    name: 'Propulsion',
    description:
      'The solid motors that do the lifting and the liquid module that does the aiming: Kalam-1200, Kalam-250, Kalam-100 and the Raman-1 cluster.',
    publiclyKnown: {
      value:
        'Developed by Skyroot Aerospace. Skyroot publicly describes 3D-printed liquid engines. Component-level suppliers, propellant suppliers and casing fabricators are not publicly disclosed.',
      confidence: 'confirmed',
      sources: ['skyroot-site', 'voxelmatters-3dprint', '3dpi-engine'],
    },
    organizationIds: ['skyroot'],
    componentIds: ['stage-1', 'stage-2', 'stage-3', 'stage-4-oam', 'propulsion-nozzle-s1'],
  },
  {
    id: 'structures',
    name: 'Structures',
    description:
      'Motor casings, interstages, the fairing and the load paths that hold them together.',
    publiclyKnown: {
      value:
        'Skyroot describes Vikram-1 as having an all-carbon-composite airframe. Whether composite layup and winding is done in-house or by a partner is not publicly disclosed.',
      confidence: 'reported',
      sources: ['skyroot-site', 'ieee-spectrum-vikram1'],
    },
    organizationIds: ['skyroot'],
    componentIds: ['composite-structures', 'payload-fairing', 'interstage-1-2', 'interstage-2-3'],
  },
  {
    id: 'avionics',
    name: 'Avionics',
    description: 'Flight computers, sequencing, power and harnessing.',
    publiclyKnown: {
      value:
        'Skyroot publicly describes modular avionics on Vikram-1. Board-level suppliers, processors and component vendors are not publicly disclosed.',
      confidence: 'reported',
      sources: ['skyroot-site'],
    },
    organizationIds: ['skyroot'],
    componentIds: ['avionics'],
  },
  {
    id: 'software',
    name: 'Software',
    description: 'Flight software, guidance algorithms, the countdown sequencer and ground control software.',
    publiclyKnown: {
      value: 'Supplier not publicly disclosed. No public source used here names a software partner for Vikram-1.',
      confidence: 'undisclosed',
      sources: [],
    },
    organizationIds: ['skyroot'],
    componentIds: ['gnc', 'avionics'],
  },
  {
    id: 'payload-systems',
    name: 'Payload systems',
    description: 'The deck, adapters and dispensers that hold payloads and release them.',
    publiclyKnown: {
      value:
        'Payload customers on Mission Aagaman are publicly identified: Grahaa Space, Cosmoserve Space, DCUBED, plus Skyroot’s own SCOPE and two symbolic payloads. The dispenser and adapter hardware suppliers are not publicly disclosed.',
      confidence: 'confirmed',
      sources: ['space-com-debut', 'deccan-chronicle-payloads', 'timestech-solaras-deploy'],
    },
    organizationIds: ['skyroot', 'grahaa', 'cosmoserve', 'dcubed', 'cosmos-diamonds', 'mattewada', 'vitap'],
    componentIds: ['payload-adapter', 'payload-section'],
  },
  {
    id: 'telemetry',
    name: 'Telemetry',
    description: 'Onboard instrumentation, the radio downlink and the ground stations that receive it.',
    publiclyKnown: {
      value:
        'Skyroot’s SCOPE payload was described as collecting flight performance data. Telemetry hardware suppliers and the ground station network are not publicly disclosed in the sources used here.',
      confidence: 'undisclosed',
      sources: ['space-com-debut', 'deccan-chronicle-inorbit'],
    },
    organizationIds: ['skyroot'],
    componentIds: ['telemetry'],
  },
  {
    id: 'ground-systems',
    name: 'Ground systems',
    description: 'Launch mount, umbilicals, checkout equipment and the countdown chain.',
    publiclyKnown: {
      value:
        'Vikram-1 launched from ISRO’s Satish Dhawan Space Centre with ISRO support. The division of ground equipment between Skyroot and ISRO is not publicly itemised.',
      confidence: 'confirmed',
      sources: ['isro-first-private', 'space-com-inside'],
    },
    organizationIds: ['skyroot', 'isro'],
    componentIds: ['ground-interfaces'],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Fabrication of motors, engines, structures and electronics.',
    publiclyKnown: {
      value:
        'Skyroot has publicly described additive manufacturing of engines, citing a shift from cast and machined engines to 3D printing. Reporting also notes Skyroot drew on India’s existing aerospace supplier base and on the expertise of former ISRO engineers, without naming specific vendors for Vikram-1.',
      confidence: 'reported',
      sources: ['voxelmatters-3dprint', '3dpi-engine', 'space-com-inside', 'ieee-spectrum-vikram1'],
    },
    organizationIds: ['skyroot'],
    componentIds: ['stage-4-oam', 'composite-structures'],
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Static fires, structural qualification, environmental testing and integrated checkout.',
    publiclyKnown: {
      value:
        'Indian policy reforms opened ISRO propulsion test stands and other facilities to private operators. Which specific Vikram-1 test campaigns used ISRO facilities is not publicly itemised.',
      confidence: 'reported',
      sources: ['space-com-inside', 'techcrunch-unicorn'],
    },
    organizationIds: ['skyroot', 'isro'],
    componentIds: ['stage-1', 'stage-4-oam'],
  },
  {
    id: 'launch-infrastructure',
    name: 'Launch infrastructure',
    description: 'The range itself: pad, safety, tracking and airspace and maritime clearance.',
    publiclyKnown: {
      value:
        'Satish Dhawan Space Centre (SDSC SHAR), Sriharikota, operated by ISRO / Department of Space, Government of India.',
      confidence: 'confirmed',
      sources: ['isro-first-private', 'cnbc-launch'],
    },
    organizationIds: ['isro'],
    componentIds: ['ground-interfaces'],
  },
];

export const supplyChainDisclaimer =
  'Skyroot Aerospace has not published a component supplier list for Vikram-1. This project therefore names an organization only where a reliable public source ties it to the mission. Where nothing is documented, the entry reads "supplier not publicly disclosed" rather than offering a plausible guess. A company that makes a similar part is not evidence that it made this part.';
