import { ArrowLeft } from 'lucide-react'
import { GamesSection } from '../components/games/GamesSection'
import { PageTexture } from '../components/home/PageTexture'
import type { GameProgress, GameResult } from '../data/learningTypes'

interface GamesPageProps {
  progress: GameProgress
  onAnswer: (questionId: string, correct: boolean) => void
  onComplete: (result: GameResult) => void
}

export function GamesPage({ progress, onAnswer, onComplete }: GamesPageProps) {
  return (
    <>
      <PageTexture />
      <main className="relative z-10 min-h-screen bg-[#010828]">
        <div className="px-4 pt-6 sm:px-8 lg:px-[86px] lg:pt-10">
          <div className="mx-auto flex max-w-[1831px] items-center justify-between gap-4">
            <a
              href="#home"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream/75 transition-colors hover:border-neon hover:text-neon"
            >
              <ArrowLeft className="h-4 w-4" /> Về trang chủ
            </a>
            <span className="font-grotesk text-sm uppercase tracking-[0.24em] text-cream/70">FPT Triết Quest</span>
          </div>
        </div>
        <GamesSection progress={progress} onAnswer={onAnswer} onComplete={onComplete} />
      </main>
    </>
  )
}
