import { useRaceStore } from '../../stores/raceStore'
import Duck from '../duck/Duck'

export default function RaceTrack() {
  const ducks = useRaceStore((s) => s.ducks)
  const laneHeight = Math.max(48, Math.min(64, 600 / ducks.length))
  const trackHeight = ducks.length * laneHeight

  return (
    <div className="relative w-full overflow-y-auto" style={{ maxHeight: '70vh' }}>
      <div className="relative" style={{ height: trackHeight }}>
        {/* Finish line */}
        <div
          className="absolute top-0 bottom-0 w-1"
          style={{
            right: '2%',
            background: 'repeating-linear-gradient(to bottom, #1a1a2e 0px, #1a1a2e 8px, white 8px, white 16px)',
          }}
        />
        <div
          className="absolute top-0 bottom-0 w-1"
          style={{
            right: 'calc(2% + 4px)',
            background: 'repeating-linear-gradient(to bottom, white 0px, white 8px, #1a1a2e 8px, #1a1a2e 16px)',
          }}
        />

        {/* Lanes */}
        {ducks.map((duck, i) => (
          <div
            key={duck.id}
            className="absolute w-full flex items-center"
            style={{
              top: i * laneHeight,
              height: laneHeight,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Duck name label */}
            <div
              className="absolute left-1 text-white/70 text-xs font-semibold z-10 truncate"
              style={{ maxWidth: '120px', top: '2px' }}
              title={duck.name}
            >
              {duck.name}
            </div>

            {/* Duck */}
            <div
              className="absolute transition-none"
              style={{
                left: `calc(${duck.position * 0.94 + 3}%)`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <Duck duck={duck} size={Math.min(laneHeight - 8, 48)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
