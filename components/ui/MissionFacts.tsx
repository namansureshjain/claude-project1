import { mission, rocket } from '@/data/rocket';
import ClaimLine, { DisputeNote } from './ClaimLine';
import SourceList from './SourceList';

/** The vehicle and mission at a glance, every line carrying its own evidence. */
export default function MissionFacts() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="label-mono mb-3">Vehicle</h3>
        <ClaimLine label="Operator" claim={{ value: rocket.operator, confidence: 'confirmed', sources: ['skyroot-site'] }} />
        <ClaimLine label="Height" claim={rocket.height} />
        <ClaimLine label="Diameter" claim={rocket.diameter} />
        <ClaimLine label="Stages" claim={rocket.stageCount} />
        <ClaimLine label="Structure" claim={rocket.structure} />
        <ClaimLine label="Payload capability" claim={rocket.payloadCapacity} />
        <DisputeNote claim={rocket.payloadCapacity} />
        <ClaimLine label="Liftoff mass" claim={rocket.liftoffMass} />
        <div className="mt-4">
          <SourceList ids={['skyroot-site', 'wikipedia-vikram-i', 'gunter-vikram-1', 'ieee-spectrum-vikram1']} />
        </div>
      </div>

      <div>
        <h3 className="label-mono mb-3">Mission Aagaman</h3>
        <ClaimLine label="Date" claim={mission.date} />
        <ClaimLine label="Liftoff" claim={mission.liftoffTime} />
        <ClaimLine label="Launch site" claim={mission.site} />
        <ClaimLine label="Orbit" claim={mission.orbit} />
        <ClaimLine label="Time to injection" claim={mission.duration} />
        <ClaimLine label="Outcome" claim={mission.outcome} />
        <p className="mt-4 text-[13px] leading-relaxed text-bone/85">{mission.significance.value}</p>
        <div className="mt-4">
          <SourceList ids={[...mission.significance.sources]} />
        </div>
      </div>
    </div>
  );
}
