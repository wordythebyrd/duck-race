const VARIANCE_RATIO = 1.2
const BACKWARD_CHANCE = 0.12
const BACKWARD_RATIO = 0.5
const BURST_CHANCE = 0.08
const BURST_MULTIPLIER = 3.5
const SLOWDOWN_CHANCE = 0.06
const SLOWDOWN_MULTIPLIER = 0.2
const CATCHUP_FACTOR = 0.2

const TICK_INTERVAL = 50

export function getBaseSpeed(durationSeconds: number): number {
  const totalTicks = (durationSeconds * 1000) / TICK_INTERVAL
  return 90 / totalTicks
}

export function calculateMovement(
  currentPosition: number,
  leaderPosition: number,
  baseSpeed: number,
): number {
  const variance = baseSpeed * VARIANCE_RATIO
  let speed = baseSpeed + (Math.random() * 2 - 1) * variance

  // Backward chance
  if (Math.random() < BACKWARD_CHANCE) {
    speed = -Math.abs(speed) * BACKWARD_RATIO
  }

  // Speed burst
  if (Math.random() < BURST_CHANCE) {
    speed = Math.abs(speed) * BURST_MULTIPLIER
  }

  // Sudden slowdown
  if (Math.random() < SLOWDOWN_CHANCE) {
    speed = Math.abs(speed) * SLOWDOWN_MULTIPLIER
  }

  // Catch-up bonus for trailing ducks
  const gap = leaderPosition - currentPosition
  if (gap > 8) {
    speed += gap * CATCHUP_FACTOR * baseSpeed
  }

  return speed
}
