import { useRaceStore } from './stores/raceStore'
import SetupScreen from './components/screens/SetupScreen'
import RaceScreen from './components/screens/RaceScreen'
import VictoryScreen from './components/screens/VictoryScreen'

function App() {
  const screen = useRaceStore((s) => s.screen)

  return (
    <div className="min-h-screen">
      {screen === 'setup' && <SetupScreen />}
      {screen === 'racing' && <RaceScreen />}
      {screen === 'victory' && <VictoryScreen />}
    </div>
  )
}

export default App
