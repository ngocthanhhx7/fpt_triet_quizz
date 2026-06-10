import { gameDefinitions } from '../../data/learningContent'
import type { GameProgress, GameResult } from '../../data/learningTypes'
import { HistoryFlowGame } from './HistoryFlowGame'
import { PairMatchGame } from './PairMatchGame'
import { DialecticPlatformer } from './platformer/DialecticPlatformer'

interface GamesSectionProps {
  progress: GameProgress
  onAnswer: (questionId: string, correct: boolean) => void
  onComplete: (result: GameResult) => void
}

export function GamesSection({ progress, onAnswer, onComplete }: GamesSectionProps) {
  return (
    <section id="games" className="relative z-10 bg-[#010828] py-20 lg:py-28 px-4 sm:px-8 lg:px-[86px] border-t border-white/5">
      <div className="max-w-[1831px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <span className="block font-condiment text-neon text-5xl mb-2 sm:mb-3 select-none">Mini games</span>
            <h2 className="font-grotesk text-4xl sm:text-5xl lg:text-7xl uppercase leading-[1.2] mt-2">
              Học bằng cách chơi
            </h2>
            <p className="mt-5 max-w-3xl text-cream/72 leading-7">
              Các game dùng chung kho câu hỏi và cùng ghi reward vào localStorage. Hoàn thành game để mở badge, shard và shortcut ôn tập.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 min-w-[300px]">
            {gameDefinitions.map((game) => (
              <div key={game.id} className="liquid-glass rounded-[20px] p-4 text-center">
                <div className="font-grotesk text-3xl text-neon">{progress.bestScores[game.id] ?? 0}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-cream/50">{game.title.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          <DialecticPlatformer progress={progress} onAnswer={onAnswer} onComplete={onComplete} />
          <PairMatchGame onComplete={onComplete} />
          <HistoryFlowGame onComplete={onComplete} />
        </div>
      </div>
    </section>
  )
}
