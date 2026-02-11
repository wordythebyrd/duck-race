const VARIANCE_RATIO = 0.5
const BACKWARD_CHANCE = 0.15
const BACKWARD_RATIO = 0.3
const BURST_CHANCE = 0.05
const BURST_MULTIPLIER = 2.5
const CATCHUP_FACTOR = 0.15

const TICK_INTERVAL = 50

/**
 * Calculate base speed so that a duck moving at base speed
 * would reach ~90% of the track right around when the timer expires.
 * The remaining 10% comes from variance/bursts, creating a photo-finish feel.
 */
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

  // Catch-up bonus for trailing ducks
  const gap = leaderPosition - currentPosition
  if (gap > 10) {
    speed += gap * CATCHUP_FACTOR * baseSpeed
  }

  return speed
}
