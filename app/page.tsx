'use client';

import SceneStage from '@/components/three/SceneStage';
import ComponentDetailPanel from '@/components/panels/ComponentDetailPanel';
import PayloadDetailPanel from '@/components/panels/PayloadDetailPanel';
import Finale from '@/components/ui/Finale';
import FidelityNote from '@/components/ui/FidelityNote';
import Glossary from '@/components/ui/Glossary';
import Hero from '@/components/ui/Hero';
import JourneyMode from '@/components/ui/JourneyMode';
import Loader from '@/components/ui/Loader';
import MissionFacts from '@/components/ui/MissionFacts';
import MissionTimeline from '@/components/ui/MissionTimeline';
import Nav from '@/components/ui/Nav';
import OrbitVisualization from '@/components/ui/OrbitVisualization';
import PayloadCard from '@/components/ui/PayloadCard';
import PayloadNetwork from '@/components/ui/PayloadNetwork';
import RocketVsPayload from '@/components/ui/RocketVsPayload';
import ScaleComparison from '@/components/ui/ScaleComparison';
import SceneControls from '@/components/ui/SceneControls';
import SectionHeading from '@/components/ui/SectionHeading';
import SourcesIndex from '@/components/ui/SourcesIndex';
import SupplyChainGraph from '@/components/ui/SupplyChainGraph';
import SystemExplorer from '@/components/ui/SystemExplorer';
import TextExplorer from '@/components/ui/TextExplorer';
import WhatIfLab from '@/components/ui/WhatIfLab';
import { payloads } from '@/data/payloads';

const shell = 'mx-auto w-full max-w-[110rem] px-5 md:px-8';

export default function Page() {
  return (
    <>
      <Loader />
      <SceneStage />
      <Nav />

      <main id="main">
        {/* ---- Hero: the vehicle, and as little else as possible ---- */}
        <section
          id="rocket"
          aria-label="Vikram-1 in orbit"
          className="pointer-events-none relative z-10"
        >
          <div className={shell}>
            <Hero />
          </div>
        </section>

        {/* Everything below scrolls over the scene. */}
        <div className="relative z-10 bg-void">
          {/* ---- Anatomy ---- */}
          <section id="anatomy" className={`${shell} scroll-mt-16 py-20 md:py-28`}>
            <SectionHeading
              index="01 / Anatomy"
              title="Take the rocket apart."
              lede="Twenty metres, four stages, and a few hundred kilograms of cargo at the very top. Open the exploded view, then pick any section to find out what it does, why it exists and who builds it. Every claim carries its evidence."
            />

            <div className="mb-14">
              <MissionFacts />
            </div>

            <h3 className="label-mono mb-5">Component explorer</h3>
            <TextExplorer />

            <div className="mt-16">
              <SectionHeading index="01.2 / System view" title="The same vehicle, as a hierarchy." />
              <SystemExplorer />
            </div>

            <div className="mt-16">
              <FidelityNote />
            </div>
          </section>

          {/* ---- Payloads ---- */}
          <section id="payloads" className={`${shell} scroll-mt-16 border-t border-white/[0.07] py-20 md:py-28`}>
            <SectionHeading
              index="02 / Payloads"
              title="What Mission Aagaman actually carried."
              lede="Six payloads, and they are not six of the same thing. Two satellites, three technology demonstrations and two commemorative objects — kept in separate categories here, because collapsing them into one generic 'satellite' would misrepresent what flew."
            />

            <ul className="grid gap-px bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
              {payloads.map((p) => (
                <li key={p.id} className="bg-void">
                  <PayloadCard payload={p} />
                </li>
              ))}
            </ul>

            <div className="mt-16">
              <SectionHeading
                index="02.2 / The chain"
                title="Rocket, payload, company, problem."
                lede="A launch is the visible end of a much longer line. Follow any payload down to the organization behind it and the real-world problem their technology is aimed at."
              />
              <PayloadNetwork />
            </div>

            <div className="mt-16">
              <SectionHeading index="02.3 / The distinction" title="The rocket is not the point." />
              <RocketVsPayload />
            </div>
          </section>

          {/* ---- Mission ---- */}
          <section id="mission" className={`${shell} scroll-mt-16 border-t border-white/[0.07] py-20 md:py-28`}>
            <SectionHeading
              index="03 / Mission"
              title="Sixteen minutes from the pad to orbit."
              lede="Scrub through the flight. At each moment: what is physically happening, why it happens in that order, which systems are doing the work, and which payloads are still attached."
            />
            <MissionTimeline />

            <div className="mt-20">
              <SectionHeading
                index="03.2 / Orbit"
                title="Why doesn't it just fall back down?"
                lede="Reaching 450 km is not the hard part. Staying there is. This diagram is drawn to scale, which turns out to be the most surprising thing about it."
              />
              <OrbitVisualization />
            </div>
          </section>

          {/* ---- Supply chain ---- */}
          <section id="supply" className={`${shell} scroll-mt-16 border-t border-white/[0.07] py-20 md:py-28`}>
            <SectionHeading
              index="04 / Supply chain"
              title="Who builds a rocket?"
              lede="A modern launch vehicle is an ecosystem rather than one object. How much of that ecosystem is publicly documented varies enormously — and where nothing is disclosed, this section says so rather than guessing."
            />
            <SupplyChainGraph />
          </section>

          {/* ---- Learn ---- */}
          <section id="learn" className={`${shell} scroll-mt-16 border-t border-white/[0.07] py-20 md:py-28`}>
            <SectionHeading
              index="05 / Learn"
              title="What would happen if…"
              lede="Seven questions that get at why rocket design is so unforgiving. Each one is a conceptual demonstration with simplified physics, not a simulation of Vikram-1."
            />
            <WhatIfLab />

            <div className="mt-20">
              <SectionHeading
                index="05.2 / Scale"
                title="Put it in perspective."
                lede="Twenty metres sounds large until you stand something familiar next to it."
              />
              <ScaleComparison />
            </div>

            <div className="mt-20">
              <SectionHeading
                index="05.3 / Follow one thing"
                title="From a printed engine to an orbit."
                lede="Pick one component or one payload and follow it the whole way: design, manufacturing, integration, launch, operation, outcome."
              />
              <JourneyMode />
            </div>

            <div className="mt-20">
              <SectionHeading
                index="05.4 / Glossary"
                title="Every term, explained once."
                lede="Jargon is only a barrier until someone defines it. Twenty-four terms, each with a short answer and a longer one."
              />
              <Glossary />
            </div>
          </section>

          {/* ---- Finale ---- */}
          <section className={`${shell} border-t border-white/[0.07] py-24 md:py-36`}>
            <Finale />
          </section>

          {/* ---- Sources ---- */}
          <section id="sources" className={`${shell} scroll-mt-16 border-t border-white/[0.07] py-20 md:py-28`}>
            <SectionHeading
              index="06 / Evidence"
              title="Everything this site claims, and where it comes from."
              lede="This is an educational project about a real vehicle and a real flight, so nothing here is filled in with plausible-sounding guesses. Where a fact is not public, the site says it is not public. Where sources disagree, it shows the disagreement."
            />
            <SourcesIndex />
          </section>

          <footer className={`${shell} border-t border-white/[0.07] py-10`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
              <p className="max-w-2xl text-[12px] leading-relaxed text-smoke">
                An independent educational project about Skyroot Aerospace&rsquo;s Vikram-1 and Mission
                Aagaman. Not affiliated with Skyroot Aerospace, ISRO or any payload operator. The 3D
                vehicle is a representative visualization, not an engineering model.
              </p>
              <a href="#rocket" className="label-mono shrink-0 hover:text-ember">
                Back to the rocket &uarr;
              </a>
            </div>
          </footer>
        </div>
      </main>

      <ComponentDetailPanel />
      <PayloadDetailPanel />
      <SceneControls />
    </>
  );
}
