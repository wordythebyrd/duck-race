import { useMemo } from 'react'
import { useRaceStore } from '../../stores/raceStore'
import Duck from '../duck/Duck'

// The track is 3x the viewport width. Ducks travel across this virtual track.
// The camera follows the pack, keeping the action centered.
const TRACK_WIDTH_MULTIPLIER = 3

export default function RaceTrack() {
  const ducks = useRaceStore((s) => s.ducks)
  const laneHeight = Math.max(72, Math.min(100, 700 / ducks.length))
  const trackHeight = ducks.length * laneHeight
  const duckSize = Math.min(laneHeight - 12, 72)

  // Camera: follow the average position of the pack
  const avgPosition = ducks.length > 0
    ? ducks.reduce((sum, d) => sum + d.position, 0) / ducks.length
    : 0

  // Camera offset as a percentage of the extended track.
  // At 0% progress, camera shows the left edge (start).
  // As ducks progress, camera slides right, keeping them centered.
  // Near 100%, camera stops so the finish line is visible.
  const cameraProgress = Math.min(avgPosition / 100, 1)
  // How much of the track is visible (1/TRACK_WIDTH_MULTIPLIER)
  const viewFraction = 1 / TRACK_WIDTH_MULTIPLIER
  // Max offset so finish line is at right edge of viewport
  const maxOffset = 1 - viewFraction
  const cameraOffset = cameraProgress * maxOffset

  // River wave rows for background effect
  const waveRows = useMemo(() => {
    return Array.from({ length: Math.ceil(trackHeight / 30) + 1 }, (_, i) => i)
  }, [trackHeight])

  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ height: Math.min(trackHeight, 700) }}>
      {/* Scrollable container for many ducks */}
      <div className="relative w-full overflow-y-auto overflow-x-hidden" style={{ height: '100%' }}>

        {/* River background layer - flows opposite to camera to create movement feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ height: trackHeight }}
        >
          {/* Base water */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/40 via-blue-500/50 to-sky-600/40" />

          {/* Animated wave rows */}
          {waveRows.map((i) => (
            <div
              key={i}
              className="absolute w-full river-wave"
              style={{
                top: i * 30,
                height: 30,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${1.5 + (i % 3) * 0.3}s`,
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${0.1 + (i % 3) * 0.05}) 30%, transparent 50%, rgba(255,255,255,${0.08 + (i % 2) * 0.04}) 70%, transparent 100%)`,
                  backgroundSize: '200px 100%',
                }}
              />
            </div>
          ))}

          {/* Subtle foam/sparkle layer */}
          <div className="absolute inset-0 river-sparkle opacity-30" />
        </div>

        {/* Track content - shifts with camera */}
        <div
          className="relative"
          style={{
            width: `${TRACK_WIDTH_MULTIPLIER * 100}%`,
            height: trackHeight,
            transform: `translateX(-${cameraOffset * 100}%)`,
            transition: 'transform 80ms linear',
          }}
        >
          {/* Finish line */}
          <div
            className="absolute top-0 bottom-0"
            style={{ right: '1%', width: '6px' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(to bottom, #1a1a2e 0px, #1a1a2e 10px, white 10px, white 20px)',
              }}
            />
          </div>
          <div
            className="absolute top-0 bottom-0"
            style={{ right: 'calc(1% + 8px)', width: '6px' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(to bottom, white 0px, white 10px, #1a1a2e 10px, #1a1a2e 20px)',
              }}
            />
          </div>

          {/* "FINISH" label */}
          <div
            className="absolute text-white font-bold text-sm tracking-widest"
            style={{
              right: '0.5%',
              top: '4px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              opacity: 0.7,
            }}
          >
            FINISH
          </div>

          {/* Starting line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white/30"
            style={{ left: `${(2 / TRACK_WIDTH_MULTIPLIER)}%` }}
          />

          {/* Lanes */}
          {ducks.map((duck, i) => (
            <div
              key={duck.id}
              className="absolute flex items-center"
              style={{
                top: i * laneHeight,
                height: laneHeight,
                left: 0,
                right: 0,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Lane divider ripple */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px river-lane-ripple"
                style={{ animationDelay: `${i * 0.2}s` }}
              />

              {/* Duck name label - follows duck */}
              <div
                className="absolute text-white font-semibold z-10 truncate text-shadow"
                style={{
                  left: `${duck.position * 0.96 + 1}%`,
                  bottom: '2px',
                  fontSize: duckSize > 50 ? '12px' : '10px',
                  maxWidth: '140px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                }}
                title={duck.name}
              >
                {duck.name}
              </div>

              {/* Duck */}
              <div
                className="absolute duck-bob"
                style={{
                  left: `${duck.position * 0.96 + 1}%`,
                  top: '50%',
                  transform: 'translateY(-55%)',
                  animationDelay: `${(duck.id * 0.3) % 2}s`,
                  animationDuration: `${1.2 + (duck.id % 5) * 0.2}s`,
                }}
              >
                <Duck duck={duck} size={duckSize} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
