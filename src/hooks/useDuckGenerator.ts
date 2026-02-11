import { useCallback } from 'react'
import { DUCK_COLORS } from '../constants/colors'
import { HATS, EYEWEAR, NECKWEAR, HAT_CHANCE, EYEWEAR_CHANCE, NECKWEAR_CHANCE, CAPE_CHANCE } from '../constants/accessories'
import { pick, chance } from '../utils/random'
import { generateDuckName } from '../utils/nameGenerator'
import type { Duck } from '../stores/raceStore'

export function useDuckGenerator() {
  const generate = useCallback((count: number): Duck[] => {
    const ducks: Duck[] = []
    const usedNames = new Set<string>()

    for (let i = 0; i < count; i++) {
      let name: string
      do {
        name = generateDuckName()
      } while (usedNames.has(name))
      usedNames.add(name)

      ducks.push({
        id: i,
        name,
        color: DUCK_COLORS[i % DUCK_COLORS.length],
        hat: chance(HAT_CHANCE) ? pick(HATS) : null,
        eyewear: chance(EYEWEAR_CHANCE) ? pick(EYEWEAR) : null,
        neckwear: chance(NECKWEAR_CHANCE) ? pick(NECKWEAR) : null,
        hasCape: chance(CAPE_CHANCE),
        position: 0,
      })
    }

    return ducks
  }, [])

  return generate
}
