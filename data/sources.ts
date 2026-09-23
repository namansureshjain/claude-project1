import type { Source } from './types';

/**
 * Every factual claim in this site points at one or more of these entries.
 *
 * Ordering roughly follows the evidence hierarchy the project works to:
 * operator and government primary sources first, then specialist aerospace
 * press, then wire/mainstream reporting, then reference works.
 */
export const sources: Source[] = [
  {
    id: 'skyroot-site',
    title: 'Skyroot Aerospace — On-Demand Space Launch Vehicles',
    publisher: 'Skyroot Aerospace',
    url: 'https://www.skyroot.in/',
    tier: 'primary-operator',
    note: 'Vehicle operator. Primary source for Vikram-1 design claims and quoted payload capability.',
  },
  {
    id: 'isro-first-private',
    title: 'First private orbital launch lifts off from Sriharikota',
    publisher: 'ISRO / Department of Space, Government of India',
    url: 'https://www.isro.gov.in/First_private_orbital_launch_lifts_from_Sriharikota.html',
    tier: 'primary-government',
    published: '2026-07-18',
    note: 'Range provider and national space agency confirmation of the launch and orbit injection.',
  },
  {
    id: 'spaceflight-now-aagaman',
    title: 'Vikram-1 • Mission Aagaman',
    publisher: 'Spaceflight Now',
    url: 'https://spaceflightnow.com/launch/vikram-1-mission-aagaman/',
    tier: 'specialist-press',
    published: '2026-07-18',
  },
  {
    id: 'ieee-spectrum-vikram1',
    title: "Skyroot Aerospace's Vikram-1 Ignites India's Ascent",
    publisher: 'IEEE Spectrum',
    url: 'https://spectrum.ieee.org/skyroot-aerospace-vikram-1-launch',
    tier: 'specialist-press',
    published: '2026-07',
  },
  {
    id: 'space-com-debut',
    title: "'The dawn of a new space era': Vikram-1, India's 1st private orbital rocket, aces debut launch",
    publisher: 'Space.com',
    url: 'https://www.space.com/space-exploration/launches-spacecraft/skyroot-aerospace-india-first-private-orbital-launch-vikram-1',
    tier: 'specialist-press',
    published: '2026-07-18',
  },
  {
    id: 'space-com-inside',
    title: "Getting Vikram-1 to orbit: Inside Skyroot Aerospace's coming bid to make spaceflight history",
    publisher: 'Space.com',
    url: 'https://www.space.com/space-exploration/launches-spacecraft/getting-vikram-1-to-orbit-inside-skyroot-aerospaces-coming-bid-to-make-spaceflight-history',
    tier: 'specialist-press',
    published: '2026-07',
  },
  {
    id: 'satellite-today-success',
    title: 'Skyroot Aerospace Makes History for India With First Launch Success',
    publisher: 'Via Satellite',
    url: 'https://www.satellitetoday.com/launch/2026/07/20/skyroot-aerospace-makes-history-for-india-with-first-launch-success/',
    tier: 'specialist-press',
    published: '2026-07-20',
  },
  {
    id: 'cnbc-launch',
    title: "India's Skyroot launches Vikram-1 in first private orbital rocket mission",
    publisher: 'CNBC',
    url: 'https://www.cnbc.com/2026/07/18/indias-skyroot-launches-first-private-orbital-rocket-mission.html',
    tier: 'wire-press',
    published: '2026-07-18',
  },
  {
    id: 'ani-aagaman',
    title: "'Mission Aagaman': Skyroot's Vikram-1 reaches orbit, marks new era for India's private space sector",
    publisher: 'ANI News',
    url: 'https://aninews.in/news/national/general-news/mission-aagaman-skyroots-vikram-1-reaches-orbit-marks-new-era-for-indias-private-space-sector20260718123655/',
    tier: 'wire-press',
    published: '2026-07-18',
    note: 'Source for the published ascent narrative: Mach milestones, stage order and the 450 km / 60° injection.',
  },
  {
    id: 'business-standard-mission',
    title: "India's first private orbital launch: Everything about Skyroot's Vikram-1",
    publisher: 'Business Standard',
    url: 'https://www.business-standard.com/technology/tech-news/skyroot-vikram-1-mission-aagaman-private-orbital-launch-india-126071700363_1.html',
    tier: 'wire-press',
    published: '2026-07-17',
  },
  {
    id: 'business-standard-cosmoserve',
    title: 'Cosmoserve to test world-first soft robotic space debris capture on Vikram-1',
    publisher: 'Business Standard',
    url: 'https://www.business-standard.com/industry/news/cosmoserve-to-test-world-first-soft-robotic-space-debris-capture-on-vikram-1-126070700623_1.html',
    tier: 'wire-press',
    published: '2026-07-07',
  },
  {
    id: 'inc42-cosmoserve-result',
    title: 'Cosmoserve Says Soft Robotic Capture Demo Gathered Key Data Despite Glitch',
    publisher: 'Inc42',
    url: 'https://inc42.com/buzz/cosmoserve-says-soft-robotic-capture-demo-gathered-key-data-despite-glitch/',
    tier: 'wire-press',
    published: '2026-07',
    note: 'Operator-reported outcome of Mission Embrace: partial success, petals did not deploy.',
  },
  {
    id: 'timestech-solaras-deploy',
    title: "Grahaa Space Successfully Deploys SOLARAS Aboard Skyroot Aerospace's Vikram-1 Mission",
    publisher: 'TimesTech',
    url: 'https://timestech.in/grahaa-space-successfully-deploys-solaras-aboard-skyroot-aerospaces-vikram-1-mission/',
    tier: 'wire-press',
    published: '2026-07',
  },
  {
    id: 'timestech-solaras-prelaunch',
    title: "Grahaa Space Prepares to Launch SOLARAS on Skyroot Aerospace's Vikram-1 Mission",
    publisher: 'TimesTech',
    url: 'https://timestech.in/grahaa-space-prepares-to-launch-solaras-on-skyroot-aerospaces-vikram-1-mission/',
    tier: 'wire-press',
    published: '2026-07',
  },
  {
    id: 'deccan-chronicle-payloads',
    title: "India's First Private Orbital Rocket, Skyroot's Vikram-1 To Carry Multiple Test Payloads",
    publisher: 'Deccan Chronicle',
    url: 'https://www.deccanchronicle.com/southern-states/telangana/indias-first-private-orbital-rocket-skyroots-vikram-1-to-carry-multiple-test-payloads-1968940',
    tier: 'wire-press',
    published: '2026-07',
  },
  {
    id: 'deccan-chronicle-inorbit',
    title: 'Space Start-Ups Celebrate Vikram-1 Success; Begin Analysing In-Orbit Data',
    publisher: 'Deccan Chronicle',
    url: 'https://www.deccanchronicle.com/southern-states/telangana/telangana-space-start-ups-celebrate-vikram-1-success-begin-analysing-in-orbit-data-1972056',
    tier: 'wire-press',
    published: '2026-07',
  },
  {
    id: 'theweek-payloads',
    title: 'Vikram-1 to carry attractive payloads; gold, diamonds, in-orbit robotic arm and more',
    publisher: 'The Week',
    url: 'https://www.theweek.in/news/sci-tech/2026/07/07/vikram-1-india-commercial-space-launch-gold-diamonds-robotic-arm.html',
    tier: 'wire-press',
    published: '2026-07-07',
  },
  {
    id: 'hans-india-gold',
    title: "Gold tribute to India's space pioneers to ride aboard Vikram-1",
    publisher: 'The Hans India',
    url: 'https://www.thehansindia.com/business/gold-tribute-to-indias-space-pioneers-to-ride-aboard-vikram-1-1094493',
    tier: 'wire-press',
    published: '2026-07',
  },
  {
    id: 'voxelmatters-3dprint',
    title: 'Skyroot’s Vikram-1 reaches orbit with 3D printed rocket engines',
    publisher: 'VoxelMatters',
    url: 'https://www.voxelmatters.com/skyroots-vikram-1-reaches-orbit-with-3d-printed-rocket-engines/',
    tier: 'specialist-press',
    published: '2026-07',
  },
  {
    id: '3dpi-engine',
    title: "Skyroot's Vikram-1 Reaches Orbit on India's First Fully 3D Printed Rocket Engine",
    publisher: '3D Printing Industry',
    url: 'https://3dprintingindustry.com/news/skyroots-vikram-1-reaches-orbit-on-indias-first-fully-3d-printed-rocket-engine-253353/',
    tier: 'specialist-press',
    published: '2026-07',
  },
  {
    id: 'techcrunch-unicorn',
    title: "India's first space tech unicorn emerges as Skyroot gears up for orbital launch",
    publisher: 'TechCrunch',
    url: 'https://techcrunch.com/2026/05/07/indias-first-space-tech-unicorn-emerges-as-skyroot-gears-up-for-orbital-launch/',
    tier: 'wire-press',
    published: '2026-05-07',
  },
  {
    id: 'wikipedia-vikram-i',
    title: 'Vikram-I',
    publisher: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Vikram-I',
    tier: 'reference',
    note: 'Used only for cross-checking stage naming and published performance figures, never as a sole source for a claim marked confirmed.',
  },
  {
    id: 'gunter-vikram-1',
    title: 'Vikram-1 — Gunter’s Space Page',
    publisher: "Gunter's Space Page",
    url: 'https://space.skyrocket.de/doc_lau/vikram-1.htm',
    tier: 'reference',
    note: 'Long-running launch vehicle and spacecraft catalogue; used for stage and payload cross-checks.',
  },
];

export const sourceById = new Map(sources.map((s) => [s.id, s]));

export function resolveSources(ids: string[]): Source[] {
  return ids.map((id) => sourceById.get(id)).filter((s): s is Source => Boolean(s));
}

export const tierLabels: Record<Source['tier'], string> = {
  'primary-operator': 'Operator (primary)',
  'primary-government': 'Government / agency (primary)',
  'specialist-press': 'Specialist aerospace press',
  'wire-press': 'Wire & mainstream press',
  reference: 'Reference catalogue',
};
