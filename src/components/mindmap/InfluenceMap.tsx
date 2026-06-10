import { ArrowRightLeft, BookOpen, Orbit } from 'lucide-react'
import { philosophyTimeline, type PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { accentTheme } from './mindmapTheme'
import { getSceneDesign } from './sceneDesigns'

interface InfluenceMapProps {
  philosopher: PhilosopherTimelineItem
  onJumpTo: (id: string) => void
}

export function InfluenceMap({ philosopher, onJumpTo }: InfluenceMapProps) {
  const theme = accentTheme[philosopher.accent]
  const design = getSceneDesign(philosopher)
  const linkedPhilosophers = philosophyTimeline.filter((item) => philosopher.connections.includes(item.deepLinkId))

  return (
    <section className={`relative overflow-hidden rounded-[22px] border bg-[#050d24]/84 p-5 ${theme.border} ${theme.glow}`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.aura}`} />
      <div className="relative">
        <div className="flex items-center gap-2 text-cyan">
          <Orbit className="h-4 w-4" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em]">Bản đồ ảnh hưởng</span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[18px] border border-white/10 bg-black/18 p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/42">
              <BookOpen className="h-4 w-4 text-cyan" />
              Ảnh hưởng tư tưởng
            </div>
            <p className="mt-3 text-sm leading-7 text-cream/78">{philosopher.influence}</p>
          </div>

          <div className="rounded-[18px] border border-white/10 bg-black/18 p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/42">Bối cảnh lúc này</div>
            <p className="mt-3 text-sm leading-7 text-cream/76">{philosopher.context}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-white/10 bg-black/18 p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">Những trang nối tiếp</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {linkedPhilosophers.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onJumpTo(link.id)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.16em] text-cream/76 transition-colors hover:border-neon hover:text-neon"
              >
                {link.name}
                <ArrowRightLeft className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/40">{design.motif} / visual mood</div>
          <p className="mt-3 text-xs leading-6 text-cream/52">{philosopher.visualMood}</p>
        </div>
      </div>
    </section>
  )
}
