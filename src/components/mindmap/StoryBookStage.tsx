import { ArrowLeft, ArrowRight, BookOpen, Pause, Play, RotateCcw, Volume2 } from 'lucide-react'
import { useRef } from 'react'
import { philosophyTimeline, type PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { gsap, useGSAP } from '../../lib/gsap'
import { LayeredCharacterPortrait } from './LayeredCharacterPortrait'
import { SceneBackdrop } from './SceneBackdrop'

type LivingPhilosopher = PhilosopherTimelineItem & {
  audioSrc?: string
  chapterTitle?: string
  reflection?: string
  storyOpening?: string
}

type NavigationDirection = 'next' | 'prev' | 'jump'

interface AudioControls {
  currentTime: number
  duration: number
  error: boolean
  isLoading: boolean
  isPlaying: boolean
  rate: number
  onRateChange: (rate: number) => void
  onSeek: (time: number) => void
  onStop: () => void
  onToggle: () => void
}

interface BrowserVoiceFallback {
  isSpeaking: boolean
  isSupported: boolean
  onRateChange: (rate: number) => void
  onSpeak: (text: string) => boolean
  onStop: () => void
  rate: number
}

interface StoryBookStageProps {
  audio: AudioControls
  canGoNext: boolean
  canGoPrev: boolean
  navigationDirection: NavigationDirection
  philosopher: PhilosopherTimelineItem
  reducedMotion: boolean
  voiceFallback: BrowserVoiceFallback
  onNext: () => void
  onOpenDialog: () => void
  onPrev: () => void
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const getAudioLabel = (audio: AudioControls, voiceFallback: BrowserVoiceFallback) => {
  if (audio.error) {
    return voiceFallback.isSupported ? 'MP3 lỗi, dùng giọng đọc trình duyệt' : 'File voice chưa phát được'
  }

  if (audio.isLoading) {
    return 'Đang chuẩn bị voice'
  }

  return audio.isPlaying ? 'Đang kể chuyện' : 'Voice MP3 sẵn sàng'
}

const getSpeakerLabel = (speaker: PhilosopherTimelineItem['dialogue'][number]['speaker'], philosopherName: string) => {
  if (speaker === 'philosopher') {
    return philosopherName
  }

  return speaker === 'student' ? 'Người học' : 'Người kể'
}

const getPageTurnStart = (direction: NavigationDirection) => {
  if (direction === 'prev') {
    return { rotationY: 3, x: 10, transformOrigin: 'right center' }
  }

  if (direction === 'jump') {
    return { rotationY: 0, y: 12, transformOrigin: 'center center' }
  }

  return { rotationY: -4, x: -10, transformOrigin: 'left center' }
}

export function StoryBookStage({
  audio,
  canGoNext,
  canGoPrev,
  navigationDirection,
  philosopher,
  reducedMotion,
  voiceFallback,
  onNext,
  onOpenDialog,
  onPrev,
}: StoryBookStageProps) {
  const stageRef = useRef<HTMLElement>(null)
  const livingPhilosopher = philosopher as LivingPhilosopher
  const storyOpening = livingPhilosopher.storyOpening ?? philosopher.storyBeat
  const dialogueLines = philosopher.dialogue?.length
    ? philosopher.dialogue
    : [{ speaker: 'philosopher' as const, text: philosopher.voiceScript }]
  const activeDialogueIndex = Math.min(
    dialogueLines.length - 1,
    audio.duration > 0 ? Math.floor((audio.currentTime / audio.duration) * dialogueLines.length) : 0,
  )
  const nextPhilosopher = philosophyTimeline[philosophyTimeline.findIndex((item) => item.id === philosopher.id) + 1] ?? null
  const reflectionQuestion =
    livingPhilosopher.reflection ??
    'Điều gì trong tư tưởng này vẫn còn chạm đến cách ta học và sống hôm nay?'
  const progress = audio.duration > 0 ? Math.min(100, (audio.currentTime / audio.duration) * 100) : 0
  const fallbackScript = `${philosopher.quote}. ${philosopher.voiceScript}`
  const useBrowserVoice = audio.error && voiceFallback.isSupported
  const voiceIsPlaying = useBrowserVoice ? voiceFallback.isSpeaking : audio.isPlaying
  const displayedRate = useBrowserVoice ? voiceFallback.rate : audio.rate
  const turnStart = getPageTurnStart(navigationDirection)

  const handleVoiceToggle = () => {
    if (useBrowserVoice) {
      if (voiceFallback.isSpeaking) {
        voiceFallback.onStop()
        return
      }

      voiceFallback.onSpeak(fallbackScript)
      return
    }

    audio.onToggle()
  }

  const handleVoiceStop = () => {
    if (useBrowserVoice) {
      voiceFallback.onStop()
      return
    }

    audio.onStop()
  }

  const handleRateChange = (rate: number) => {
    audio.onRateChange(rate)
    voiceFallback.onRateChange(rate)
  }

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.fromTo('[data-stage-backdrop], [data-book-page]', { autoAlpha: 0.96 }, { autoAlpha: 1, duration: 0.2 })
        gsap.fromTo('[data-character-layer]', { autoAlpha: 0.95, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.2 })
        return
      }

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      timeline.fromTo(
        '[data-stage-backdrop]',
        { autoAlpha: 0.72, x: navigationDirection === 'prev' ? 12 : -12 },
        { autoAlpha: 1, x: 0, duration: 0.48 },
        0,
      )
      timeline.fromTo(
        '[data-character-layer]',
        { autoAlpha: 0, y: 36, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.62 },
        0.1,
      )
      timeline.fromTo(
        '[data-book-page]',
        { autoAlpha: 0, ...turnStart },
        { autoAlpha: 1, rotationY: 0, x: 0, y: 0, duration: 0.58 },
        0.18,
      )
      timeline.fromTo('[data-book-layer]', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.04 }, 0.3)
      timeline.fromTo('[data-parallax-layer="far"]', { x: -8, y: 4 }, { x: 0, y: 0, duration: 0.72 }, 0)
      timeline.fromTo('[data-parallax-layer="mid"]', { x: 9, y: -4 }, { x: 0, y: 0, duration: 0.72 }, 0.04)
    },
    { scope: stageRef, dependencies: [navigationDirection, philosopher.id, reducedMotion], revertOnUpdate: true },
  )

  return (
    <section
      ref={stageRef}
      className="storybook-stage relative overflow-hidden rounded-[24px] border border-white/10 bg-[#050d24] shadow-[0_22px_90px_rgba(0,0,0,0.36)] [perspective:1400px] sm:rounded-[32px]"
    >
      <div data-stage-backdrop className="absolute inset-0">
        <SceneBackdrop philosopher={philosopher} reducedMotion={reducedMotion} />
      </div>

      <div className="relative z-10 grid gap-0 xl:min-h-[690px] xl:grid-cols-[1.02fr_0.98fr]">
        <div className="relative flex min-h-[470px] items-center justify-center px-3 pb-2 pt-14 sm:min-h-[540px] sm:px-6 sm:pt-16 xl:min-h-[690px] xl:pb-0 xl:pt-14">
          <div data-book-layer className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/22 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/58 backdrop-blur-md sm:left-6 sm:top-6">
            {livingPhilosopher.chapterTitle ?? philosopher.era}
          </div>
          <LayeredCharacterPortrait
            philosopher={philosopher}
            isSpeaking={voiceIsPlaying}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="relative flex items-start px-3 pb-4 pt-0 [transform-style:preserve-3d] sm:px-6 sm:pb-6 xl:items-center xl:px-8 xl:py-8">
          <div data-book-page className="relative w-full rounded-[24px] border border-white/14 bg-[#f4ead2]/94 p-5 text-[#162031] shadow-[0_18px_54px_rgba(0,0,0,0.3)] [backface-visibility:hidden] sm:p-6 lg:p-7">
            <div className="pointer-events-none absolute inset-y-5 left-0 w-7 rounded-l-[24px] bg-[linear-gradient(90deg,rgba(22,32,49,0.16),transparent)]" />

            <div data-book-layer className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#6f5f44]">
                  {philosopher.era} / {philosopher.years}
                </div>
                <h2 className="mt-2 font-grotesk text-4xl uppercase leading-none text-[#111827] sm:text-5xl">
                  {philosopher.name}
                </h2>
              </div>
              <span className="basis-full rounded-full border border-[#162031]/12 bg-[#162031]/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#3e4d5e] sm:basis-auto">
                {philosopher.tag}
              </span>
            </div>

            <div data-book-layer className="mt-5 border-l-4 border-[#162031]/16 pl-4">
              <p className="text-lg font-semibold leading-8 text-[#162031]">
                {livingPhilosopher.sceneTitle ?? philosopher.sceneTitle}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#314052]">{storyOpening}</p>
            </div>

            <div data-book-layer className="mt-5 space-y-2 rounded-[18px] bg-[#162031]/6 p-4">
              {dialogueLines.map((line, index) => (
                <blockquote
                  key={`${line.speaker}-${index}`}
                  className={[
                    'rounded-[14px] border px-4 py-3 text-[15px] leading-7 transition-all',
                    index === activeDialogueIndex
                      ? 'border-[#162031]/18 bg-white/62 text-[#162031] shadow-[0_8px_20px_rgba(22,32,49,0.08)]'
                      : 'border-transparent bg-transparent text-[#1d2a3c]/70',
                  ].join(' ')}
                >
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#697483]">
                    {getSpeakerLabel(line.speaker, philosopher.name)}
                  </span>
                  "{line.text}"
                </blockquote>
              ))}
            </div>

            <div data-book-layer className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[#162031]/10 bg-white/38 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#697483]">Luận điểm</div>
                <p className="mt-2 text-sm leading-6 text-[#263448]">{philosopher.thesis}</p>
              </div>
              <div className="rounded-[16px] border border-[#162031]/10 bg-white/38 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#697483]">Câu hỏi mở</div>
                <p className="mt-2 text-sm leading-6 text-[#263448]">{reflectionQuestion}</p>
              </div>
            </div>

            <div data-book-layer className="mt-5 rounded-[18px] border border-[#162031]/10 bg-[#162031]/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#162031]">
                    {nextPhilosopher ? `Trang sau: ${nextPhilosopher.name}` : 'Hết cuốn sách'}
                  </div>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-[#263448]">
                    {nextPhilosopher
                      ? nextPhilosopher.summary
                      : 'Bạn đã đi qua hết dòng chảy này. Có thể quay lại để lật từng trang lần nữa.'}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!canGoNext}
                  onClick={onNext}
                  className="inline-flex items-center gap-2 rounded-full bg-[#162031] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f4ead2] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {nextPhilosopher ? nextPhilosopher.name : 'Kết thúc'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div data-book-layer className="mt-5 rounded-[18px] border border-[#162031]/10 bg-[#162031]/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[#263448]">
                  <Volume2 className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{getAudioLabel(audio, voiceFallback)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={audio.error && !voiceFallback.isSupported}
                    onClick={handleVoiceToggle}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#162031] text-[#f4ead2] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={voiceIsPlaying ? 'Tạm dừng voice' : 'Phát voice'}
                  >
                    {voiceIsPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleVoiceStop}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#162031]/15 text-[#263448] transition-colors hover:bg-[#162031]/8"
                    aria-label="Dừng voice"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#697483]">{formatTime(audio.currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={audio.duration || 0}
                  step={0.1}
                  value={Math.min(audio.currentTime, audio.duration || 0)}
                  onChange={(event) => audio.onSeek(Number(event.target.value))}
                  className="h-2 flex-1 accent-[#162031]"
                />
                <span className="font-mono text-[11px] text-[#697483]">{formatTime(audio.duration)}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#162031]/10">
                <div className="h-full rounded-full bg-[#162031]" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <select
                  value={displayedRate}
                  onChange={(event) => handleRateChange(Number(event.target.value))}
                  className="rounded-full border border-[#162031]/12 bg-white/55 px-3 py-2 text-xs font-semibold text-[#263448] outline-none"
                  aria-label="Tốc độ voice"
                >
                  <option value={0.9}>0.9x</option>
                  <option value={1}>1.0x</option>
                  <option value={1.1}>1.1x</option>
                </select>
                <button
                  type="button"
                  onClick={onOpenDialog}
                  className="inline-flex items-center gap-2 rounded-full border border-[#162031]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#263448] transition-colors hover:bg-[#162031]/8"
                >
                  <BookOpen className="h-4 w-4" />
                  Hồ sơ tư tưởng
                </button>
              </div>
            </div>

            <div data-book-layer className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={!canGoPrev}
                onClick={onPrev}
                className="inline-flex items-center gap-2 rounded-full border border-[#162031]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#263448] transition-colors hover:bg-[#162031]/8 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Trang trước
              </button>
              <button
                type="button"
                disabled={!canGoNext}
                onClick={onNext}
                className="inline-flex items-center gap-2 rounded-full bg-[#162031] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f4ead2] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Trang sau
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
