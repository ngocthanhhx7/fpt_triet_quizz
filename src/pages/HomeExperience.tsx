import { RotateCcw, ShieldCheck, Sparkles } from 'lucide-react'
import { FinalCtaSection } from '../components/home/FinalCtaSection'
import { HomePage } from '../components/home/HomePage'
import { PracticeQuiz } from '../components/practice/PracticeQuiz'
import { chapters, flashcards, modules } from '../data/learningContent'
import { homeContent } from '../data/homeContent'
import type { GameProgress } from '../data/learningTypes'

interface HomeExperienceProps {
  progress: GameProgress
  onAnswer: (questionId: string, correct: boolean) => void
  onBadge: (badge: string) => void
  onReset: () => void
}

function LearningAtlas() {
  return (
    <section id="learn" className="relative z-10 bg-[#010828] py-20 lg:py-28 px-4 sm:px-8 lg:px-[86px] border-t border-white/5">
      <div className="max-w-[1831px] mx-auto">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="block font-condiment text-neon text-5xl mb-2 sm:mb-3 select-none">Knowledge map</span>
            <h2 className="font-grotesk text-4xl sm:text-5xl lg:text-7xl uppercase leading-[1.2] mt-2">
              Bản đồ 3 chương
            </h2>
            <p className="mt-5 max-w-3xl text-cream/72 leading-7">
              Nội dung PDF được paraphrase thành 18 module ngắn. Mỗi module có ý chính, thuật ngữ và lỗi hay gặp để học nhanh trước khi vào game.
            </p>
          </div>
          <div className="liquid-glass rounded-[28px] p-6 min-w-[260px]">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-cream/55">Content MVP</div>
            <div className="mt-3 font-grotesk text-5xl text-neon">{flashcards.length}</div>
            <div className="text-sm text-cream/65">flashcards từ 18 module</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {chapters.map((chapter) => {
            const chapterModules = modules.filter((module) => module.chapterId === chapter.id)

            return (
              <article key={chapter.id} className="liquid-glass rounded-[34px] p-6 lg:p-7 flex flex-col">
                <div className={`h-2 rounded-full bg-gradient-to-r ${chapter.theme.gradient}`} />
                <span className="mt-6 font-mono text-xs uppercase tracking-[0.28em] text-cream/45">{chapter.theme.worldName}</span>
                <h3 className="mt-3 font-grotesk text-3xl uppercase leading-tight">{chapter.title}</h3>
                <p className="mt-4 text-sm text-cream/70 leading-6">{chapter.summary}</p>

                <div className="mt-6 grid gap-3">
                  {chapterModules.map((module) => (
                    <details key={module.id} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 open:border-neon/35">
                      <summary className="cursor-pointer font-semibold text-cream">{module.title}</summary>
                      <div className="mt-4 space-y-3 text-sm text-cream/68 leading-6">
                        <p>{module.coreIdeas[0]}</p>
                        <p className="text-cream/45">Sai hay gặp: {module.commonMistakes[0]}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {module.keyTerms.slice(0, 2).map((term) => (
                            <span key={term.term} className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wider text-neon">
                              {term.term}
                            </span>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface ProgressSummaryProps {
  progress: GameProgress
  onReset: () => void
}

function ProgressSummary({ progress, onReset }: ProgressSummaryProps) {
  const inventoryEntries = Object.entries(progress.inventory).filter(([, amount]) => amount > 0)
  const scoreEntries = Object.entries(progress.bestScores)

  return (
    <section id="progress" className="relative z-10 bg-[#010828] py-20 lg:py-28 px-4 sm:px-8 lg:px-[86px] border-t border-white/5">
      <div className="max-w-[1831px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <span className="block font-condiment text-neon text-5xl mb-2 sm:mb-3 select-none">Saved locally</span>
            <h2 className="font-grotesk text-4xl sm:text-5xl lg:text-7xl uppercase leading-[1.2] mt-2">
              Tiến độ của bạn
            </h2>
            <p className="mt-5 max-w-3xl text-cream/72 leading-7">
              Dữ liệu nằm trong trình duyệt bằng localStorage. Không có server, không đăng nhập, phù hợp GitHub Pages.
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream/70 hover:border-magenta hover:text-magenta transition-colors"
          >
            <RotateCcw className="inline-block h-4 w-4 mr-2" /> Reset progress
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="liquid-glass rounded-[28px] p-6">
            <Sparkles className="h-8 w-8 text-neon" />
            <div className="mt-6 font-grotesk text-5xl text-neon">{progress.answeredQuestionIds.length}</div>
            <p className="mt-2 text-sm text-cream/60">câu hỏi đã tương tác</p>
          </div>
          <div className="liquid-glass rounded-[28px] p-6">
            <ShieldCheck className="h-8 w-8 text-cyan" />
            <div className="mt-6 font-grotesk text-5xl text-cyan">{progress.badges.length}</div>
            <p className="mt-2 text-sm text-cream/60">badge đã mở</p>
          </div>
          <div className="liquid-glass rounded-[28px] p-6 xl:col-span-2">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-cream/45">Inventory</div>
            <div className="mt-5 flex flex-wrap gap-3">
              {inventoryEntries.length === 0 ? (
                <span className="text-sm text-cream/50">Chưa có vật phẩm. Hãy làm quiz hoặc chơi game.</span>
              ) : (
                inventoryEntries.map(([item, amount]) => (
                  <span key={item} className="rounded-full bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon">
                    {item}: {amount}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 liquid-glass rounded-[28px] p-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-cream/45 mb-4">Best scores</div>
          <div className="grid md:grid-cols-3 gap-3">
            {scoreEntries.length === 0 ? (
              <p className="text-sm text-cream/52">Chưa có điểm game. Hoàn thành một mini game để ghi điểm.</p>
            ) : (
              scoreEntries.map(([gameId, score]) => (
                <div key={gameId} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                  <span className="font-mono text-xs text-cream/45">{gameId}</span>
                  <div className="mt-2 font-grotesk text-4xl text-neon">{score}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeExperience({ progress, onAnswer, onBadge, onReset }: HomeExperienceProps) {
  return (
    <>
      <HomePage />
      <LearningAtlas />
      <PracticeQuiz progress={progress} onAnswer={onAnswer} onBadge={onBadge} />
      <ProgressSummary progress={progress} onReset={onReset} />
      <FinalCtaSection finalCta={homeContent.finalCta} socialLinks={homeContent.socialLinks} />
    </>
  )
}
