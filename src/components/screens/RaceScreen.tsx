import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRaceStore } from '../../stores/raceStore'
import { useRace } from '../../hooks/useRace'
import { useTimer } from '../../hooks/useTimer'
import RaceTrack from '../race/RaceTrack'

export default function RaceScreen() {
  const isCountingDown = useRaceStore((s) => s.isCountingDown)
  const countdownValue = useRaceStore((s) => s.countdownValue)
  const setIsCountingDown = useRaceStore((s) => s.setIsCountingDown)
  const setCountdownValue = useRaceStore((s) => s.setCountdownValue)
  const reset = useRaceStore((s) => s.reset)
  const { display } = useTimer()
  const { startRace, stopRace } = useRace()
  const started = useRef(false)

  useEffect(() => {
    if (!isCountingDown) return

    if (countdownValue <= 0) {
      setIsCountingDown(false)
      if (!started.current) {
        started.current = true
        startRace()
      }
      return
    }

    const timer = setTimeout(() => {
      setCountdownValue(countdownValue - 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [isCountingDown, countdownValue, setIsCountingDown, setCountdownValue, startRace])

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold text-white">Duck Race!</h2>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-mono font-bold text-yellow-300 bg-black/30 px-4 py-2 rounded-lg">
            {display}
          </div>
          <button
            onClick={() => { stopRace(); reset() }}
            className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Race Track */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl">
        <RaceTrack />
      </div>

      {/* Countdown Overlay */}
      <AnimatePresence>
        {isCountingDown && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={countdownValue}
              className="text-9xl font-bold text-yellow-300 drop-shadow-2xl"
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {countdownValue > 0 ? countdownValue : 'GO!'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
