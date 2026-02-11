import { motion } from 'motion/react'
import { useRaceStore } from '../../stores/raceStore'
import Confetti from '../celebration/Confetti'
import Fireworks from '../celebration/Fireworks'
import WinnerPodium from '../celebration/WinnerPodium'

export default function VictoryScreen() {
  const ducks = useRaceStore((s) => s.ducks)
  const winnerId = useRaceStore((s) => s.winnerId)
  const reset = useRaceStore((s) => s.reset)

  const winner = ducks.find((d) => d.id === winnerId)

  if (!winner) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Confetti />
      <Fireworks />

      {/* Spotlight background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      />

      <WinnerPodium winner={winner} />

      {/* Race Again button */}
      <motion.button
        onClick={reset}
        className="mt-10 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl rounded-xl transition-colors cursor-pointer shadow-lg z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        Race Again!
      </motion.button>
    </div>
  )
}
