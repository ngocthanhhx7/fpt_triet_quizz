import { Check, Network, Sparkles } from 'lucide-react'
import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { accentTheme } from './mindmapTheme'
import { getSceneDesign } from './sceneDesigns'

interface ChapterRailProps {
  activeId: string
  items: PhilosopherTimelineItem[]
  visitedIds: string[]
  onSelect: (id: string) => void
}

export function ChapterRail({ activeId, items, visitedIds, onSelect }: ChapterRailProps) {
  return (
    <aside className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#050d24]/78 p-4 shadow-[0_18px_52px_rgba(0,0,0,0.22)] xl:sticky xl:top-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_38%)]" />
      <div className="relative">
        <div className="flex items-center gap-2 text-neon">
          <Network className="h-4 w-4" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em]">Mục lục</span>
        </div>
        <h2 className="mt-2 font-grotesk text-2xl uppercase leading-none text-cream">Các trang lịch sử</h2>

        <div className="mt-4 grid gap-2">
          {items.map((item, index) => {
            const active = item.id === activeId
            const visited = visitedIds.includes(item.id)
            const theme = accentTheme[item.accent]
            const design = getSceneDesign(item)

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                aria-pressed={active}
                className={[
                  'group flex w-full items-center gap-3 rounded-[16px] border px-3 py-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/70',
                  active
                    ? `bg-white/[0.075] ${theme.border} ${theme.glow}`
                    : 'border-white/8 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.045]',
                ].join(' ')}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-black/24 font-mono text-[11px] text-cream/64">
                  {visited ? <Check className="h-4 w-4 text-neon" /> : String(index + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-grotesk text-lg uppercase leading-none text-cream">{item.name}</span>
                    {active ? <Sparkles className="h-3.5 w-3.5 shrink-0 text-neon" /> : null}
                  </div>
                  <p className="mt-1 truncate text-xs text-cream/48">
                    {item.years} / {design.motif}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
