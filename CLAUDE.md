# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + build to dist/
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

No test suite is configured.

## Architecture

This is a React + TypeScript + Vite single-page app. Styling uses Tailwind CSS v4 (imported via `@import "tailwindcss"` in `index.css`).

### State Management

All shared state lives in a single Zustand store: `src/stores/raceStore.ts`. The `Duck` interface and `Screen` type (`'setup' | 'racing' | 'victory'`) are defined there and imported throughout the app. The store is accessed via `useRaceStore`.

### Screen Flow

`App.tsx` conditionally renders one of three screens based on `store.screen`:
1. **SetupScreen** — configure duck count, race duration, optional custom names; triggers 3-2-1 countdown before switching to `'racing'`
2. **RaceScreen** — runs the race; uses `useRace` hook for the tick loop and `useTimer` for the countdown overlay
3. **VictoryScreen** — shows winner podium with confetti/fireworks

### Race Engine

`useRace` (in `src/hooks/`) drives the race via two `setInterval` loops:
- **Movement tick** (50ms): calls `calculateMovement()` from `src/utils/movement.ts` to compute each duck's position delta. Movement has randomized variance, burst/slowdown events, backward movement, and a catch-up mechanic for trailing ducks.
- **Timer tick** (1s): counts down `timeRemaining`; when it reaches 0, the furthest duck wins.

`getBaseSpeed(durationSeconds)` in `movement.ts` calibrates duck speed so a full race covers ~90% of the track in the given duration.

### Duck Rendering

Ducks are SVG-based, composed from layers in `src/components/duck/`:
- `DuckBody` — colored SVG duck shape
- `DuckAccessory` — exports `Hat`, `Eyewear`, `Neckwear`, `Cape` components rendered on top

Accessories are randomly assigned by `useDuckGenerator` using probability constants from `src/constants/accessories.ts`. Duck colors cycle from `DUCK_COLORS` in `src/constants/colors.ts`.

### Race Track

`RaceTrack.tsx` renders a virtual track 3× the viewport width. A camera system follows the leader (blended 80% leader / 20% pack average) by translating the track container. Duck positions (0–100) map to `left: ${position * 0.96 + 1}%` within the wide track.

### CSS Animations

Custom animations are defined in `src/index.css` (not Tailwind utilities): `duck-bob`, `river-wave`, `river-sparkle`, `river-lane-ripple`, `duck-paddle-left/right`, `duck-wake`, `position-badge`, `splash-particle`.
