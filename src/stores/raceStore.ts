import { create } from 'zustand'
import type { HatType, EyewearType, NeckwearType } from '../constants/accessories'
import type { DuckColor } from '../constants/colors'

export interface Duck {
  id: number
  name: string
  color: DuckColor
  hat: HatType | null
  eyewear: EyewearType | null
  neckwear: NeckwearType | null
  hasCape: boolean
  position: number
}

export type Screen = 'setup' | 'racing' | 'victory'

interface RaceState {
  screen: Screen
  duckCount: number
  raceDuration: number
  ducks: Duck[]
  winnerId: number | null
  timeRemaining: number
  isCountingDown: boolean
  countdownValue: number

  setScreen: (screen: Screen) => void
  setDuckCount: (count: number) => void
  setRaceDuration: (duration: number) => void
  setDucks: (ducks: Duck[]) => void
  updateDuckPosition: (id: number, position: number) => void
  setWinner: (id: number) => void
  setTimeRemaining: (time: number) => void
  setIsCountingDown: (val: boolean) => void
  setCountdownValue: (val: number) => void
  reset: () => void
}

const initialState = {
  screen: 'setup' as Screen,
  duckCount: 6,
  raceDuration: 30,
  ducks: [] as Duck[],
  winnerId: null as number | null,
  timeRemaining: 30,
  isCountingDown: false,
  countdownValue: 3,
}

export const useRaceStore = create<RaceState>((set) => ({
  ...initialState,

  setScreen: (screen) => set({ screen }),
  setDuckCount: (duckCount) => set({ duckCount }),
  setRaceDuration: (raceDuration) => set({ raceDuration }),
  setDucks: (ducks) => set({ ducks }),
  updateDuckPosition: (id, position) =>
    set((state) => ({
      ducks: state.ducks.map((d) =>
        d.id === id ? { ...d, position: Math.max(0, Math.min(100, position)) } : d
      ),
    })),
  setWinner: (winnerId) => set({ winnerId }),
  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),
  setIsCountingDown: (isCountingDown) => set({ isCountingDown }),
  setCountdownValue: (countdownValue) => set({ countdownValue }),
  reset: () => set({ ...initialState }),
}))
