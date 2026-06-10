import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { accentTheme } from './mindmapTheme'

interface PhilosopherNodeProps {
  philosopher: PhilosopherTimelineItem
  active: boolean
  visited?: boolean
  side: 'left' | 'right'
  onSelect: (id: string) => void
}

export function PhilosopherNode({ philosopher, active, visited = false, side, onSelect }: PhilosopherNodeProps) {
  const accent = accentTheme[philosopher.accent]

  return (
    <div className="grid grid-cols-[22px_1fr] gap-4 lg:grid-cols-[1fr_72px_1fr] lg:gap-0">
      <div className="flex justify-center pt-6 lg:col-start-2 lg:row-start-1">
        <span className={`h-3 w-3 rounded-full ${accent.ribbon} ${accent.glow} transition-transform ${active ? 'scale-125' : ''}`} />
      </div>

      <button
        type="button"
        onClick={() => onSelect(philosopher.id)}
        aria-pressed={active}
        className={[
          'group w-full text-left rounded-[28px] border px-5 py-5 sm:px-6 sm:py-6 transition-all outline-none focus-visible:ring-2 focus-visible:ring-neon/70',
          accent.border,
          accent.glow,
          active ? 'border-white/30 bg-white/[0.08] -translate-y-1' : visited ? 'bg-white/[0.045]' : 'bg-white/[0.025]',
          side === 'left'
            ? 'lg:col-start-1 lg:justify-self-end lg:max-w-[calc(100%-1.5rem)]'
            : 'lg:col-start-3 lg:justify-self-start lg:max-w-[calc(100%-1.5rem)]',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-cream/45">{philosopher.era} / {philosopher.years}</div>
            <h3 className="mt-3 font-grotesk text-3xl uppercase leading-tight text-cream">{philosopher.name}</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/48">{philosopher.sceneTitle}</p>
          </div>
          <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em] ${accent.chip}`}>
            {active ? 'Đang mở' : visited ? 'Đã ghé' : philosopher.tag}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-cream/72">{philosopher.storyBeat}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cream/65">
            {philosopher.visualMood}
          </span>
          <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cream/45">
            {philosopher.connections.length} liên kết
          </span>
        </div>
      </button>

      <div className={`hidden lg:block ${side === 'left' ? 'lg:col-start-3' : 'lg:col-start-1'}`} />
    </div>
  )
}
