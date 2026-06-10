import { ArrowRight, Clock3, Orbit, Sparkles } from 'lucide-react'
import { philosophyTimeline } from '../../data/philosophyTimeline'
import { PhilosopherNode } from './PhilosopherNode'

interface PhilosophyTimelineProps {
  activeId: string | null
  onSelect: (id: string) => void
}

export function PhilosophyTimeline({ activeId, onSelect }: PhilosophyTimelineProps) {
  const activePhilosopher = philosophyTimeline.find((item) => item.id === activeId) ?? philosophyTimeline[0]

  return (
    <section className="liquid-glass rounded-[36px] p-5 sm:p-7 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-neon">
            <Orbit className="h-4 w-4" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em]">Mindmap</span>
          </div>
          <h2 className="mt-3 font-grotesk text-4xl uppercase leading-none sm:text-5xl">Dòng triết học</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/70 sm:text-base">
            Đường dây đi từ đối thoại của Socrates đến thực tiễn cách mạng của Lenin, mỗi mốc giữ một ý tưởng then chốt.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/45">Số mốc</div>
            <div className="mt-2 font-grotesk text-3xl text-neon">{philosophyTimeline.length}</div>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/45">Đang chọn</div>
            <div className="mt-2 text-sm text-cream/78">{activePhilosopher.name}</div>
          </div>
        </div>
      </div>

      <div className="relative mt-10 space-y-5">
        <div className="pointer-events-none absolute left-[10px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan/0 via-white/12 to-magenta/0 lg:left-1/2 lg:-translate-x-px" />
        {philosophyTimeline.map((philosopher, index) => (
          <PhilosopherNode
            key={philosopher.id}
            philosopher={philosopher}
            active={philosopher.id === activeId}
            side={index % 2 === 0 ? 'left' : 'right'}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-cream/45">
        <Clock3 className="h-4 w-4 text-cyan" />
        <span>Đối thoại, ý niệm, biện chứng, thực tiễn.</span>
        <ArrowRight className="h-4 w-4 text-magenta" />
        <Sparkles className="h-4 w-4 text-neon" />
      </div>
    </section>
  )
}
