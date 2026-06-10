import { ArrowLeft, Pause, Play, Sparkles, X } from 'lucide-react'
import { useEffect } from 'react'
import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'

interface PhilosopherDialogProps {
  philosopher: PhilosopherTimelineItem | null
  open: boolean
  speechAvailable?: boolean
  isSpeaking?: boolean
  onSpeak?: (text: string) => void
  onStop?: () => void
  onClose: () => void
}

export function PhilosopherDialog({
  philosopher,
  open,
  speechAvailable = false,
  isSpeaking = false,
  onSpeak,
  onStop,
  onClose,
}: PhilosopherDialogProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [open, onClose])

  if (!open || !philosopher) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#010828]/78 px-4 py-4 backdrop-blur-md sm:items-center sm:px-6 lg:px-8">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 cursor-default" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="philosopher-title"
        className="relative z-10 liquid-glass max-h-[calc(100vh-2rem)] w-full max-w-3xl !overflow-x-hidden !overflow-y-auto rounded-[32px] p-5 sm:max-h-[calc(100vh-3rem)] sm:p-7 lg:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-cream/45">
              {philosopher.era} / {philosopher.years}
            </div>
            <h3 id="philosopher-title" className="mt-3 font-grotesk text-4xl uppercase leading-tight">
              {philosopher.sceneTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-cream/70">{philosopher.storyBeat}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cream/70 transition-colors hover:border-neon hover:text-neon"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/40">Luận điểm</div>
            <p className="mt-3 text-sm leading-7 text-cream/78">{philosopher.thesis}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/40">Bối cảnh</div>
            <p className="mt-3 text-sm leading-7 text-cream/78">{philosopher.context}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/40">Ảnh hưởng</div>
            <p className="mt-3 text-sm leading-7 text-cream/78">{philosopher.influence}</p>
          </div>
        </div>

        <div className="mt-8 rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-neon">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.26em]">Ghi nhớ nhanh</span>
            </div>
            <button
              type="button"
              disabled={!speechAvailable}
              onClick={() => (isSpeaking ? onStop?.() : onSpeak?.(`${philosopher.quote}. ${philosopher.voiceScript}`))}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/76 transition-colors hover:border-neon hover:text-neon disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isSpeaking ? 'Dừng đọc' : 'Đọc lời nhân vật'}
            </button>
          </div>
          <p className="mt-4 text-lg leading-8 text-cream/85">“{philosopher.quote}”</p>
          <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-cyan">
              <Sparkles className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em]">Voice script</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-cream/78">{philosopher.voiceScript}</p>
          </div>
          <p className="mt-5 text-xs leading-6 text-cream/45">{philosopher.visualMood}</p>
        </div>
      </div>
    </div>
  )
}
