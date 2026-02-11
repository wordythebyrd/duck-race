import { motion } from 'motion/react'
import { useMemo } from 'react'

function Burst({ x, y, delay }: { x: string; y: string; delay: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        angle: (i * 30 * Math.PI) / 180,
        color: ['#FFD700', '#FF6B6B', '#4ADE80', '#38BDF8', '#F472B6', '#C084FC'][i % 6],
      })),
    []
  )

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * 80,
            y: Math.sin(p.angle) * 80,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function Fireworks() {
  const bursts = useMemo(
    () => [
      { x: '20%', y: '20%', delay: 0.2 },
      { x: '70%', y: '15%', delay: 0.6 },
      { x: '40%', y: '25%', delay: 1.0 },
      { x: '80%', y: '30%', delay: 1.4 },
      { x: '15%', y: '35%', delay: 1.8 },
    ],
    []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {bursts.map((b, i) => (
        <Burst key={i} {...b} />
      ))}
    </div>
  )
}
