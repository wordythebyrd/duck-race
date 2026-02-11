import { useState, useMemo } from 'react'
import { useRaceStore } from '../../stores/raceStore'
import { useDuckGenerator } from '../../hooks/useDuckGenerator'
import Duck from '../duck/Duck'

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

export default function SetupScreen() {
  const duckCount = useRaceStore((s) => s.duckCount)
  const raceDuration = useRaceStore((s) => s.raceDuration)
  const setDuckCount = useRaceStore((s) => s.setDuckCount)
  const setRaceDuration = useRaceStore((s) => s.setRaceDuration)
  const setDucks = useRaceStore((s) => s.setDucks)
  const setScreen = useRaceStore((s) => s.setScreen)
  const setIsCountingDown = useRaceStore((s) => s.setIsCountingDown)
  const setCountdownValue = useRaceStore((s) => s.setCountdownValue)
  const setTimeRemaining = useRaceStore((s) => s.setTimeRemaining)
  const generateDucks = useDuckGenerator()

  const [namingEnabled, setNamingEnabled] = useState(false)
  const [customNames, setCustomNames] = useState<Record<number, string>>({})

  const previewDucks = useMemo(() => generateDucks(duckCount), [duckCount, generateDucks])

  const handleNameChange = (id: number, name: string) => {
    setCustomNames((prev) => ({ ...prev, [id]: name }))
  }

  const handleStart = () => {
    const ducks = generateDucks(duckCount)
    if (namingEnabled) {
      ducks.forEach((duck) => {
        const custom = customNames[duck.id]?.trim()
        if (custom) duck.name = custom
      })
    }
    setDucks(ducks)
    setTimeRemaining(raceDuration)
    setIsCountingDown(true)
    setCountdownValue(3)
    setScreen('racing')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
        Duck Race!
      </h1>
      <p className="text-xl text-white/80 mb-10">Set up your race and let the ducks fly!</p>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-lg space-y-8">
        {/* Duck Count */}
        <div>
          <label className="text-white font-semibold text-lg flex justify-between">
            <span>Number of Ducks</span>
            <span className="text-yellow-300 font-bold">{duckCount}</span>
          </label>
          <input
            type="range"
            min={2}
            max={100}
            value={duckCount}
            onChange={(e) => {
              setDuckCount(Number(e.target.value))
              setCustomNames({})
            }}
            className="w-full mt-2 accent-yellow-400"
          />
          <div className="flex justify-between text-white/50 text-sm mt-1">
            <span>2</span>
            <span>100</span>
          </div>
        </div>

        {/* Race Duration */}
        <div>
          <label className="text-white font-semibold text-lg flex justify-between">
            <span>Race Duration</span>
            <span className="text-yellow-300 font-bold">{formatDuration(raceDuration)}</span>
          </label>
          <input
            type="range"
            min={1}
            max={300}
            step={1}
            value={raceDuration}
            onChange={(e) => setRaceDuration(Number(e.target.value))}
            className="w-full mt-2 accent-yellow-400"
          />
          <div className="flex justify-between text-white/50 text-sm mt-1">
            <span>1s</span>
            <span>5m</span>
          </div>
        </div>

        {/* Name Your Ducks Toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={namingEnabled}
              onChange={(e) => setNamingEnabled(e.target.checked)}
              className="w-5 h-5 accent-yellow-400 rounded"
            />
            <span className="text-white font-semibold text-lg">Name your ducks</span>
          </label>
          <p className="text-white/50 text-sm mt-1 ml-8">
            {namingEnabled ? 'Leave blank for a random name' : 'Ducks will get random funny names'}
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl rounded-xl transition-colors cursor-pointer shadow-lg"
        >
          Start Race!
        </button>
      </div>

      {/* Duck Preview / Naming */}
      {namingEnabled ? (
        <div className="mt-8 w-full max-w-lg max-h-80 overflow-y-auto space-y-2 bg-white/5 rounded-xl p-4">
          {previewDucks.map((duck) => (
            <div key={duck.id} className="flex items-center gap-3">
              <Duck duck={duck} size={32} />
              <input
                type="text"
                placeholder={duck.name}
                value={customNames[duck.id] || ''}
                onChange={(e) => handleNameChange(duck.id, e.target.value)}
                className="flex-1 bg-white/10 text-white placeholder-white/30 px-3 py-1.5 rounded-lg text-sm outline-none focus:bg-white/20 transition-colors"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl">
          {previewDucks.slice(0, 24).map((duck) => (
            <div key={duck.id} className="flex flex-col items-center" title={duck.name}>
              <Duck duck={duck} size={36} />
            </div>
          ))}
          {duckCount > 24 && (
            <div className="flex items-center text-white/60 text-sm ml-2">
              +{duckCount - 24} more
            </div>
          )}
        </div>
      )}
    </div>
  )
}
