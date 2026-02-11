import { useRaceStore } from '../stores/raceStore'

export function useTimer() {
  const timeRemaining = useRaceStore((s) => s.timeRemaining)

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`

  return { timeRemaining, display }
}
