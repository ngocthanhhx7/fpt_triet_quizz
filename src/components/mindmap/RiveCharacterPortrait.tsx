import { lazy, Suspense } from 'react'
import { BookOpen, Frame, Sparkles } from 'lucide-react'
import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { accentTheme } from './mindmapTheme'

interface RiveCharacterPortraitProps {
  philosopher: PhilosopherTimelineItem
  reducedMotion: boolean
}

const LazyRiveCanvas = lazy(async () => {
  const { default: Rive, Alignment, Fit, Layout } = await import('@rive-app/react-canvas')
  const layout = Layout.new({
    fit: Fit.Cover,
    alignment: Alignment.Center,
  })

  return {
    default: function LazyRiveCanvas({ src }: { src: string }) {
      return <Rive src={src} layout={layout} shouldResizeCanvasToContainer className="h-full w-full" />
    },
  }
})

export function RiveCharacterPortrait({ philosopher, reducedMotion }: RiveCharacterPortraitProps) {
  const theme = accentTheme[philosopher.accent]
  const hasRiveAsset = Boolean(philosopher.riveSrc)

  return (
    <section
      className={[
        'relative overflow-hidden rounded-[34px] border bg-[#061032]/84 px-5 py-5 sm:px-6 sm:py-6',
        theme.border,
        theme.glow,
      ].join(' ')}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.aura}`} />
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_85%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cream/50">
            <Frame className={`h-4 w-4 ${theme.ink}`} />
            <span className="font-mono text-[11px] uppercase tracking-[0.26em]">2.5D archival portrait</span>
          </div>
          <h3 className="mt-3 max-w-2xl font-grotesk text-2xl uppercase leading-tight sm:text-3xl">
            {philosopher.name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-cream/70">{philosopher.sceneTitle}</p>
        </div>

        <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em] ${theme.chip}`}>
          {philosopher.era}
        </span>
      </div>

      <div className="relative mt-6 grid gap-4 xl:grid-cols-[0.55fr_0.45fr]">
        <div className="relative min-h-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-[#040b22]/70 p-4 sm:min-h-[340px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(111,255,0,0.08),transparent_28%),linear-gradient(140deg,rgba(7,19,52,0.94),rgba(2,8,27,0.84))]" />
          <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(120deg,transparent_42%,rgba(255,255,255,0.05)_44%,transparent_46%)]" />
          <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />

          {hasRiveAsset ? (
            <div className="absolute inset-0">
              <Suspense fallback={null}>
                <LazyRiveCanvas src={philosopher.riveSrc!} />
              </Suspense>
            </div>
          ) : null}

          <div className="relative flex h-full min-h-[248px] items-center justify-center">
            <div className="absolute inset-x-[16%] bottom-0 h-[26%] rounded-[36px] bg-black/20 blur-2xl" />
            <div className={`absolute left-[14%] top-[14%] h-24 w-24 rounded-[32px] border border-white/10 bg-white/6 ${reducedMotion ? '' : 'animate-float'}`} />
            <div className={`absolute right-[12%] top-[20%] h-32 w-20 rounded-[28px] border border-white/10 bg-white/6 ${reducedMotion ? '' : 'delay-1 animate-float'}`} />
            <div className={`absolute bottom-[16%] left-[18%] h-20 w-40 rounded-[28px] border border-white/10 bg-white/8 ${reducedMotion ? '' : 'delay-2 animate-float'}`} />

            <div className="relative z-10 flex w-full flex-col items-center justify-center gap-4">
              <div className="flex h-40 w-40 items-center justify-center rounded-[44px] border border-white/12 bg-[#020816]/85 shadow-[0_0_40px_rgba(0,0,0,0.45)]">
                <span className="font-grotesk text-6xl uppercase leading-none text-cream/90">
                  {philosopher.name.slice(0, 1)}
                </span>
              </div>
              <div className="max-w-[260px] text-center text-[11px] uppercase tracking-[0.28em] text-cream/50">
                {philosopher.deepLinkId}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-white/10 bg-black/18 p-4">
            <div className="flex items-center gap-2 text-neon">
              <Sparkles className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.26em]">Scene beat</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-cream/80">{philosopher.storyBeat}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/18 p-4">
            <div className="flex items-center gap-2 text-cyan">
              <BookOpen className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.26em]">Entry note</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-cream/78">{philosopher.summary}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
