import { CheckCircle2, Sparkles } from 'lucide-react'

interface GameCompletionPanelProps {
  title: string
  description: string
  score: number
  correctAnswers: number
  rewards: string[]
  primaryActionLabel: string
  onPrimaryAction: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
}

export function GameCompletionPanel({
  title,
  description,
  score,
  correctAnswers,
  rewards,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: GameCompletionPanelProps) {
  const uniqueRewards = [...new Set(rewards)]

  return (
    <div className="rounded-[28px] border border-neon/35 bg-neon/[0.08] p-5 sm:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neon">
            <CheckCircle2 className="h-4 w-4" /> Hoàn thành
          </div>
          <h4 className="mt-4 font-grotesk text-3xl uppercase leading-tight text-cream sm:text-4xl">{title}</h4>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/72">{description}</p>
        </div>

        <div className="grid min-w-[240px] grid-cols-2 gap-3 text-center">
          <div className="rounded-[18px] bg-white/[0.06] p-4">
            <div className="font-grotesk text-4xl text-neon">{score}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cream/45">Score</div>
          </div>
          <div className="rounded-[18px] bg-white/[0.06] p-4">
            <div className="font-grotesk text-4xl text-cyan">{correctAnswers}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cream/45">Đúng</div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {uniqueRewards.map((reward) => (
            <span key={reward} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-cream/68">
              <Sparkles className="h-3.5 w-3.5 text-neon" /> {reward}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {secondaryActionLabel && onSecondaryAction ? (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="rounded-full border border-white/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-cream/70 transition-colors hover:border-neon hover:text-neon"
            >
              {secondaryActionLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onPrimaryAction}
            className="rounded-full bg-neon px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#010828] transition-colors hover:bg-cyan"
          >
            {primaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
