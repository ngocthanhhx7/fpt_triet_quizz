import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { ChallengePanel } from '../components/mindmap/ChallengePanel'
import { ChapterRail } from '../components/mindmap/ChapterRail'
import { InfluenceMap } from '../components/mindmap/InfluenceMap'
import { PhilosopherDialog } from '../components/mindmap/PhilosopherDialog'
import { StoryBookStage } from '../components/mindmap/StoryBookStage'
import { philosophyTimeline, type PhilosopherTimelineItem } from '../data/philosophyTimeline'
import { useCharacterAudio } from '../hooks/useCharacterAudio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSpeechNarration } from '../hooks/useSpeechNarration'

interface MindmapPageProps {
  initialPhilosopherId?: string
  onBackHref?: string
  onChallengeComplete?: (badge: string) => void
}

type LivingPhilosopher = PhilosopherTimelineItem & {
  audioSrc?: string
}

export type NavigationDirection = 'next' | 'prev' | 'jump'

const resolvePhilosopher = (idOrSlug?: string | null) =>
  philosophyTimeline.find((item) => item.id === idOrSlug || item.deepLinkId === idOrSlug) ?? philosophyTimeline[0]

const setMindmapHash = (deepLinkId: string) => {
  const nextHash = `#/mindmap/${encodeURIComponent(deepLinkId)}`
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash
  }
}

const getAudioSrc = (philosopher: PhilosopherTimelineItem) => {
  const livingPhilosopher = philosopher as LivingPhilosopher
  const src = livingPhilosopher.audioSrc ?? `audio/${philosopher.name}.mp3`
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src
  return `${import.meta.env.BASE_URL}${normalizedSrc}`
}

export function MindmapPage({ initialPhilosopherId, onBackHref = '#home', onChallengeComplete }: MindmapPageProps) {
  const reducedMotion = usePrefersReducedMotion()
  const initialPhilosopher = useMemo(() => resolvePhilosopher(initialPhilosopherId), [initialPhilosopherId])
  const [activeId, setActiveId] = useState<string>(initialPhilosopher.id)
  const [dialogId, setDialogId] = useState<string | null>(null)
  const [navigationDirection, setNavigationDirection] = useState<NavigationDirection>('jump')
  const [visitedIds, setVisitedIds] = useState<string[]>([initialPhilosopher.id])

  const activePhilosopher = useMemo(
    () => philosophyTimeline.find((item) => item.id === activeId) ?? philosophyTimeline[0],
    [activeId],
  )
  const activeIndex = philosophyTimeline.findIndex((item) => item.id === activePhilosopher.id)
  const audio = useCharacterAudio(getAudioSrc(activePhilosopher))
  const speech = useSpeechNarration()
  const dialogPhilosopher = philosophyTimeline.find((item) => item.id === dialogId) ?? null
  const { stop: stopAudio } = audio

  const handleSelect = useCallback(
    (id: string, direction: NavigationDirection = 'jump') => {
      const nextPhilosopher = resolvePhilosopher(id)
      setNavigationDirection(direction)
      stopAudio()
      speech.stop()
      setActiveId(nextPhilosopher.id)
      setVisitedIds((current) => (current.includes(nextPhilosopher.id) ? current : [...current, nextPhilosopher.id]))
      setMindmapHash(nextPhilosopher.deepLinkId)
    },
    [speech, stopAudio],
  )

  const handleOpenDialog = useCallback(() => {
    setDialogId(activePhilosopher.id)
    setMindmapHash(activePhilosopher.deepLinkId)
  }, [activePhilosopher.deepLinkId, activePhilosopher.id])

  const handlePrev = useCallback(() => {
    const previous = philosophyTimeline[activeIndex - 1]
    if (previous) {
      handleSelect(previous.id, 'prev')
    }
  }, [activeIndex, handleSelect])

  const handleNext = useCallback(() => {
    const next = philosophyTimeline[activeIndex + 1]
    if (next) {
      handleSelect(next.id, 'next')
    }
  }, [activeIndex, handleSelect])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#010828] px-4 py-4 text-cream sm:px-6 lg:px-8 lg:py-5">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(1,8,40,0.96),rgba(3,12,35,0.99))]" />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.11] mix-blend-soft-light"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}texture.png)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1680px]">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-neon">
              <Sparkles className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em]">Sách sống lịch sử</span>
            </div>
            <h1 className="mt-2 max-w-[14ch] break-words font-grotesk text-[1.7rem] uppercase leading-[1.02] sm:max-w-3xl sm:text-4xl lg:text-5xl">
              Cây tư duy như một cuốn sách sống
            </h1>
            <p className="mt-2 max-w-[46rem] text-sm leading-6 text-cream/68 sm:text-[15px]">
              Mở cuốn biên niên từ Agora Athens đến phòng chiến lược cách mạng, nơi mỗi nhân vật trở thành một cảnh
              lịch sử có bối cảnh, tiếng nói và luận điểm riêng.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-cream/70">
              <BookOpen className="h-4 w-4 text-cyan" />
              <span className="font-mono uppercase tracking-[0.18em]">Đã mở</span>
              <span className="font-semibold text-cyan">
                {visitedIds.length}/{philosophyTimeline.length}
              </span>
            </div>
            <a
              href={onBackHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs uppercase tracking-[0.18em] text-cream/72 transition-colors hover:border-neon hover:text-neon"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </a>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
          <StoryBookStage
            key={activePhilosopher.id}
            audio={{
              currentTime: audio.currentTime,
              duration: audio.duration,
              error: audio.error,
              isLoading: audio.isLoading,
              isPlaying: audio.isPlaying,
              onRateChange: audio.setRate,
              onSeek: audio.seek,
              onStop: audio.stop,
              onToggle: audio.toggle,
              rate: audio.rate,
            }}
            canGoNext={activeIndex < philosophyTimeline.length - 1}
            canGoPrev={activeIndex > 0}
            navigationDirection={navigationDirection}
            philosopher={activePhilosopher}
            reducedMotion={reducedMotion}
            voiceFallback={{
              isSpeaking: speech.isSpeaking,
              isSupported: speech.isSupported,
              onRateChange: speech.setRate,
              onSpeak: speech.speak,
              onStop: speech.stop,
              rate: speech.rate,
            }}
            onNext={handleNext}
            onOpenDialog={handleOpenDialog}
            onPrev={handlePrev}
          />

          <ChapterRail
            items={philosophyTimeline}
            activeId={activeId}
            visitedIds={visitedIds}
            onSelect={(id) => handleSelect(id, 'jump')}
          />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-full border border-white/10 bg-[#050d24]/66 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cream/68 transition-colors hover:border-white/18 hover:bg-[#050d24]/82">
              Mạch ảnh hưởng
              <span className="text-cyan transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4">
              <InfluenceMap philosopher={activePhilosopher} onJumpTo={(id) => handleSelect(id, 'jump')} />
            </div>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-full border border-white/10 bg-[#050d24]/66 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cream/68 transition-colors hover:border-white/18 hover:bg-[#050d24]/82">
              Challenge tư tưởng
              <span className="text-neon transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4">
              <ChallengePanel onComplete={onChallengeComplete} />
            </div>
          </details>
        </div>
      </div>

      <PhilosopherDialog
        philosopher={dialogPhilosopher}
        open={dialogPhilosopher !== null}
        speechAvailable={speech.isSupported}
        isSpeaking={speech.isSpeaking}
        onSpeak={speech.speak}
        onStop={speech.stop}
        onClose={() => setDialogId(null)}
      />
    </main>
  )
}
