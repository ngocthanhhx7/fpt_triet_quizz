import { ArrowRight, Clock3, Orbit } from 'lucide-react'
import { useRef } from 'react'
import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { useGSAP, gsap } from '../../lib/gsap'
import { PhilosopherNode } from './PhilosopherNode'

interface TimelineSpineProps {
  items: PhilosopherTimelineItem[]
  activeId: string
  visitedIds: string[]
  onSelect: (id: string) => void
}

export function TimelineSpine({ items, activeId, visitedIds, onSelect }: TimelineSpineProps) {
  const timelineRef = useRef<HTMLElement>(null)
  const activePhilosopher = items.find((item) => item.id === activeId) ?? items[0]

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>('[data-timeline-layer]')
      gsap.fromTo(
        nodes,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
        },
      )
    },
    { scope: timelineRef, dependencies: [], revertOnUpdate: true },
  )

  return (
    <section
      ref={timelineRef}
      className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#050d24]/82 p-5 sm:p-6 lg:p-7 xl:sticky xl:top-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(0,240,255,0.08),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(111,255,0,0.08),transparent_24%),linear-gradient(180deg,rgba(4,11,34,0.86),rgba(5,13,36,0.94))]" />
      <div className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-neon">
              <Orbit className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em]">Timeline spine</span>
            </div>
            <h2 className="mt-3 font-grotesk text-4xl uppercase leading-none sm:text-5xl">Dòng triết học</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/70 sm:text-base">
              Mỗi mốc là một trang. Chạm vào nhân vật để bước tiếp, mở dialog, và kéo câu chuyện qua từng thời kỳ.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/45">Số mốc</div>
              <div className="mt-2 font-grotesk text-3xl text-neon">{items.length}</div>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/45">Đã mở</div>
              <div className="mt-2 font-grotesk text-3xl text-cyan">{visitedIds.length}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/10 bg-black/18 p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/45">Trang đang sáng</div>
          <div className="mt-2 text-base text-cream/84">{activePhilosopher.sceneTitle}</div>
        </div>

        <div className="relative mt-8 space-y-5">
          <div className="pointer-events-none absolute left-[10px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan/0 via-white/14 to-magenta/0 lg:left-1/2 lg:-translate-x-px" />
          {items.map((philosopher, index) => (
            <div key={philosopher.id} data-timeline-layer>
              <PhilosopherNode
                philosopher={philosopher}
                active={philosopher.id === activeId}
                visited={visitedIds.includes(philosopher.id)}
                side={index % 2 === 0 ? 'left' : 'right'}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-cream/45">
          <Clock3 className="h-4 w-4 text-cyan" />
          <span>Đối thoại, ý niệm, biện chứng, thực tiễn.</span>
          <ArrowRight className="h-4 w-4 text-magenta" />
        </div>
      </div>
    </section>
  )
}
