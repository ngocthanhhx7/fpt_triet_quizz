import { AudioLines, Pause, Play, Settings2, Sparkles } from 'lucide-react'
import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { accentTheme } from './mindmapTheme'

interface NarrationPanelProps {
  philosopher: PhilosopherTimelineItem
  isSpeaking: boolean
  voiceAvailable: boolean
  rate: number
  onRateChange: (rate: number) => void
  onSpeak: (text: string) => void
  onStop: () => void
  onOpenDialog: () => void
}

export function NarrationPanel({
  philosopher,
  isSpeaking,
  voiceAvailable,
  rate,
  onRateChange,
  onSpeak,
  onStop,
  onOpenDialog,
}: NarrationPanelProps) {
  const theme = accentTheme[philosopher.accent]
  const rateLabel = `${rate.toFixed(2)}x`

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#050d24]/82 p-5 sm:p-6">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.aura}`} />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-cream/45">
              <Sparkles className={`h-4 w-4 ${theme.ink}`} />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em]">Narration</span>
            </div>
            <h3 className="mt-3 font-grotesk text-3xl uppercase leading-tight">{philosopher.name}</h3>
          </div>

          <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em] ${theme.chip}`}>
            {philosopher.era}
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-white/10 bg-black/18 p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/45">Story beat</div>
            <p className="mt-3 text-sm leading-7 text-cream/80">{philosopher.storyBeat}</p>
            <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/42">Thesis</div>
              <p className="mt-3 text-sm leading-7 text-cream/84">{philosopher.thesis}</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/18 p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/45">Voice script</div>
            <p className="mt-3 text-sm leading-7 text-cream/78">{philosopher.voiceScript}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={!voiceAvailable}
                onClick={() => (isSpeaking ? onStop() : onSpeak(philosopher.voiceScript))}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/82 transition-colors hover:border-neon hover:text-neon disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isSpeaking ? 'Dừng lời kể' : 'Nghe lời kể'}
              </button>

              <button
                type="button"
                onClick={onOpenDialog}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/70 transition-colors hover:border-cyan hover:text-cyan"
              >
                <AudioLines className="h-4 w-4" />
                Mở chi tiết
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-cream/42">Playback</div>
                <div className="mt-1 text-sm text-cream/78">{voiceAvailable ? 'Browser TTS sẵn sàng' : 'TTS không khả dụng'}</div>
              </div>
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-cream/45" />
                <label className="sr-only" htmlFor={`voice-rate-${philosopher.id}`}>
                  Voice rate
                </label>
                <select
                  id={`voice-rate-${philosopher.id}`}
                  value={rate}
                  onChange={(event) => onRateChange(Number(event.target.value))}
                  className="rounded-full border border-white/10 bg-[#020816] px-3 py-2 text-xs uppercase tracking-[0.16em] text-cream/78 outline-none"
                >
                  <option value={0.82}>0.82x</option>
                  <option value={0.95}>0.95x</option>
                  <option value={1.08}>1.08x</option>
                </select>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">{rateLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/48">
          <span className={`rounded-full border px-3 py-1 ${theme.chip}`}>{philosopher.visualMood}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
            {philosopher.connections.length} liên kết
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
            {philosopher.deepLinkId}
          </span>
        </div>
      </div>
    </section>
  )
}
