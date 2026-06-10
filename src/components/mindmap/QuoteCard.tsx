import { Quote, Volume2 } from 'lucide-react'
import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { accentTheme } from './mindmapTheme'

interface QuoteCardProps {
  philosopher: PhilosopherTimelineItem
  voiceAvailable: boolean
  isSpeaking: boolean
  onSpeak: (text: string) => void
  onStop: () => void
}

export function QuoteCard({ philosopher, voiceAvailable, isSpeaking, onSpeak, onStop }: QuoteCardProps) {
  const theme = accentTheme[philosopher.accent]

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050d24]/82 p-5 sm:p-6">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.aura}`} />
      <div className="relative">
        <div className="flex items-center gap-2 text-neon">
          <Quote className="h-4 w-4" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em]">Quote card</span>
        </div>
        <blockquote className="mt-4 text-xl leading-9 text-cream/90">
          “{philosopher.quote}”
        </blockquote>
        <p className="mt-3 text-sm leading-7 text-cream/68">{philosopher.thesis}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!voiceAvailable}
            onClick={() => (isSpeaking ? onStop() : onSpeak(`${philosopher.quote}. ${philosopher.voiceScript}`))}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/80 transition-colors hover:border-neon hover:text-neon disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Volume2 className="h-4 w-4" />
            {isSpeaking ? 'Dừng đọc' : 'Nghe trích dẫn'}
          </button>
          <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${theme.chip}`}>
            {philosopher.sceneTitle}
          </span>
        </div>
      </div>
    </section>
  )
}
