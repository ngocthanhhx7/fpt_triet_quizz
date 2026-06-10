import { useEffect, useMemo, useState } from 'react'
import { GamesPage } from './pages/GamesPage'
import { HomeExperience } from './pages/HomeExperience'
import { MindmapPage } from './pages/MindmapPage'
import { useProgress } from './hooks/useProgress'

type AppRoute = 'home' | 'mindmap' | 'games'

interface AppLocationState {
  route: AppRoute
  philosopherSlug?: string
}

const getLocationFromHash = (): AppLocationState => {
  const hash = window.location.hash || '#home'

  if (hash === '#/games' || hash === '#games') {
    return { route: 'games' }
  }

  if (hash.startsWith('#/mindmap/')) {
    return {
      route: 'mindmap',
      philosopherSlug: decodeURIComponent(hash.slice('#/mindmap/'.length)),
    }
  }

  if (hash.startsWith('#/mindmap')) {
    return { route: 'mindmap' }
  }

  return { route: 'home' }
}

function App() {
  const { progress, answerQuestion, completeGame, addBadge, resetProgress } = useProgress()
  const [locationState, setLocationState] = useState<AppLocationState>(() => getLocationFromHash())

  useEffect(() => {
    const onHashChange = () => setLocationState(getLocationFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (locationState.route === 'home' && (window.location.hash.startsWith('#/mindmap') || window.location.hash.startsWith('#/games'))) {
      window.location.hash = '#home'
    }
  }, [locationState.route])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [locationState.philosopherSlug, locationState.route])

  const content = useMemo(() => {
    if (locationState.route === 'mindmap') {
      return (
        <MindmapPage
          key={locationState.philosopherSlug ?? 'mindmap-root'}
          initialPhilosopherId={locationState.philosopherSlug}
          onBackHref="#home"
          onChallengeComplete={addBadge}
        />
      )
    }

    if (locationState.route === 'games') {
      return (
        <GamesPage
          progress={progress}
          onAnswer={answerQuestion}
          onComplete={completeGame}
        />
      )
    }

    return (
      <HomeExperience
        progress={progress}
        onAnswer={answerQuestion}
        onBadge={addBadge}
        onReset={resetProgress}
      />
    )
  }, [addBadge, answerQuestion, completeGame, locationState.philosopherSlug, locationState.route, progress, resetProgress])

  return (
    <div className="bg-[#010828] text-cream min-h-screen relative overflow-x-hidden selection:bg-neon selection:text-[#010828]">
      {content}
    </div>
  )
}

export default App
