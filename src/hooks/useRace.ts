import { useRef, useCallback, useEffect } from 'react'
import { useRaceStore } from '../stores/raceStore'
import { calculateMovement, getBaseSpeed } from '../utils/movement'

const TICK_INTERVAL = 50

export function useRace() {
  const intervalRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  const stopRace = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startRace = useCallback(() => {
    const store = useRaceStore.getState()
    const baseSpeed = getBaseSpeed(store.raceDuration)
    useRaceStore.setState({ timeRemaining: store.raceDuration })

    // Movement tick
    intervalRef.current = window.setInterval(() => {
      const { ducks, winnerId } = useRaceStore.getState()
      if (winnerId !== null) return

      const leaderPos = Math.max(...ducks.map((d) => d.position))

      const updatedDucks = ducks.map((duck) => {
        const delta = calculateMovement(duck.position, leaderPos, baseSpeed)
        const newPos = Math.max(0, Math.min(100, duck.position + delta))
        return { ...duck, position: newPos }
      })

      useRaceStore.setState({ ducks: updatedDucks })
    }, TICK_INTERVAL)

    // Countdown timer (1s interval)
    timerRef.current = window.setInterval(() => {
      const { timeRemaining, ducks, winnerId } = useRaceStore.getState()
      if (winnerId !== null) return

      const newTime = timeRemaining - 1
      useRaceStore.setState({ timeRemaining: newTime })

      if (newTime <= 0) {
        // Time's up — furthest duck wins
        const furthest = ducks.reduce((best, d) =>
          d.position > best.position ? d : best
        )
        useRaceStore.setState({ winnerId: furthest.id })
        stopRace()
        useRaceStore.setState({ screen: 'victory' })
      }
    }, 1000)
  }, [stopRace])

  useEffect(() => {
    return () => stopRace()
  }, [stopRace])

  return { startRace, stopRace }
}
