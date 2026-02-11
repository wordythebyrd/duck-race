import { motion } from 'motion/react'
import type { Duck as DuckType } from '../../stores/raceStore'
import Duck from '../duck/Duck'

interface WinnerPodiumProps {
  winner: DuckType
}

export default function WinnerPodium({ winner }: WinnerPodiumProps) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
    >
      {/* Trophy */}
      <motion.div
        className="text-7xl mb-10"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
      >
        🏆
      </motion.div>

      {/* Spotlight glow */}
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-yellow-300/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />

      {/* Winner duck (magnified) */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 150 }}
      >
        <Duck duck={winner} size={120} />
      </motion.div>

      {/* Podium */}
      <motion.div
        className="bg-yellow-400 px-14 py-4 mt-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        style={{ borderRadius: '8px 8px 0 0' }}
      >
        <span className="text-2xl font-bold text-yellow-900">#1</span>
      </motion.div>

      {/* Winner name */}
      <motion.h2
        className="text-3xl font-bold text-white mt-6 text-center drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        {winner.name}
      </motion.h2>

      <motion.p
        className="text-lg text-yellow-300 mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        Winner!
      </motion.p>
    </motion.div>
  )
}
