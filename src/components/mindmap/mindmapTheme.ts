import type { PhilosopherAccent } from '../../data/philosophyTimeline'

export const accentTheme: Record<
  PhilosopherAccent,
  {
    aura: string
    border: string
    chip: string
    glow: string
    ink: string
    ribbon: string
  }
> = {
  cyan: {
    aura: 'from-cyan-500/35 via-cyan-400/12 to-transparent',
    border: 'border-cyan/20',
    chip: 'border-cyan/20 bg-cyan/10 text-cyan',
    glow: 'shadow-[0_0_26px_rgba(0,240,255,0.16)]',
    ink: 'text-cyan',
    ribbon: 'bg-cyan',
  },
  magenta: {
    aura: 'from-magenta/30 via-fuchsia-400/12 to-transparent',
    border: 'border-magenta/20',
    chip: 'border-magenta/20 bg-magenta/10 text-magenta',
    glow: 'shadow-[0_0_26px_rgba(255,0,245,0.16)]',
    ink: 'text-magenta',
    ribbon: 'bg-magenta',
  },
  neon: {
    aura: 'from-neon/26 via-lime-300/12 to-transparent',
    border: 'border-neon/20',
    chip: 'border-neon/20 bg-neon/10 text-neon',
    glow: 'shadow-[0_0_26px_rgba(111,255,0,0.16)]',
    ink: 'text-neon',
    ribbon: 'bg-neon',
  },
  violet: {
    aura: 'from-[#b69cff]/26 via-[#b69cff]/12 to-transparent',
    border: 'border-[#b69cff]/20',
    chip: 'border-[#b69cff]/20 bg-[#b69cff]/10 text-[#d8caff]',
    glow: 'shadow-[0_0_26px_rgba(182,156,255,0.16)]',
    ink: 'text-[#d8caff]',
    ribbon: 'bg-[#b69cff]',
  },
  sky: {
    aura: 'from-sky-400/26 via-sky-300/12 to-transparent',
    border: 'border-sky-400/20',
    chip: 'border-sky-400/20 bg-sky-400/10 text-sky-300',
    glow: 'shadow-[0_0_26px_rgba(56,189,248,0.16)]',
    ink: 'text-sky-300',
    ribbon: 'bg-sky-400',
  },
  amber: {
    aura: 'from-amber-300/28 via-amber-200/12 to-transparent',
    border: 'border-amber-300/20',
    chip: 'border-amber-300/20 bg-amber-300/10 text-amber-200',
    glow: 'shadow-[0_0_26px_rgba(252,211,77,0.16)]',
    ink: 'text-amber-200',
    ribbon: 'bg-amber-300',
  },
  emerald: {
    aura: 'from-emerald-400/26 via-emerald-300/12 to-transparent',
    border: 'border-emerald-400/20',
    chip: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    glow: 'shadow-[0_0_26px_rgba(74,222,128,0.16)]',
    ink: 'text-emerald-300',
    ribbon: 'bg-emerald-400',
  },
  rose: {
    aura: 'from-rose-400/26 via-rose-300/12 to-transparent',
    border: 'border-rose-400/20',
    chip: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
    glow: 'shadow-[0_0_26px_rgba(251,113,133,0.16)]',
    ink: 'text-rose-300',
    ribbon: 'bg-rose-400',
  },
}
