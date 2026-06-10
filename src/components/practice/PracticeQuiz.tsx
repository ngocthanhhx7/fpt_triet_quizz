import { RotateCcw, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { chapters, getModuleById, getQuestionsByChapter, quizQuestions } from '../../data/learningContent'
import type { ChapterId, GameProgress, QuizQuestion } from '../../data/learningTypes'

interface PracticeQuizProps {
  progress: GameProgress
  onAnswer: (questionId: string, correct: boolean) => void
  onBadge: (badge: string) => void
}

type PracticeFilter = ChapterId | 'random'

const chapterOptions: Array<{ id: PracticeFilter; label: string }> = [
  { id: 'random', label: 'Ngẫu nhiên' },
  { id: 'chapter-1', label: 'Chương 1' },
  { id: 'chapter-2', label: 'Chương 2' },
  { id: 'chapter-3', label: 'Chương 3' },
]

const getSessionQuestions = (filter: PracticeFilter): QuizQuestion[] => {
  if (filter === 'random') {
    return quizQuestions.filter((_, index) => index % 4 === 0).slice(0, 9)
  }

  return getQuestionsByChapter(filter).slice(0, 9)
}

export function PracticeQuiz({ progress, onAnswer, onBadge }: PracticeQuizProps) {
  const [filter, setFilter] = useState<PracticeFilter>('random')
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [completed, setCompleted] = useState(false)

  const questions = useMemo(() => getSessionQuestions(filter), [filter])
  const currentQuestion = questions[step]
  const currentModule = currentQuestion ? getModuleById(currentQuestion.moduleId) : null

  const answeredTotal = progress.answeredQuestionIds.length

  const resetSession = (nextFilter = filter) => {
    setFilter(nextFilter)
    setStep(0)
    setSelected(null)
    setCorrectCount(0)
    setCompleted(false)
  }

  const chooseAnswer = (choiceIndex: number) => {
    if (selected !== null || !currentQuestion) {
      return
    }

    const correct = choiceIndex === currentQuestion.answer
    setSelected(choiceIndex)
    setCorrectCount((value) => value + (correct ? 1 : 0))
    onAnswer(currentQuestion.id, correct)
  }

  const nextQuestion = () => {
    if (step >= questions.length - 1) {
      setCompleted(true)
      onBadge(`practice-${filter}`)
      return
    }

    setStep((value) => value + 1)
    setSelected(null)
  }

  return (
    <section id="practice" className="relative z-10 bg-[#010828] py-20 lg:py-28 px-4 sm:px-8 lg:px-[86px]">
      <div className="max-w-[1831px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <span className="block font-condiment text-neon text-5xl mb-2 sm:mb-3 select-none">Practice</span>
            <h2 className="font-grotesk text-4xl sm:text-5xl lg:text-7xl uppercase leading-[1.2] mt-2">
              Luyện tập có giải thích
            </h2>
            <p className="mt-5 max-w-3xl text-cream/72 leading-7">
              Chọn chương, trả lời quiz và nhận “Sai ở đâu?” ngay sau mỗi câu. Tiến độ được lưu bằng localStorage, không cần backend.
            </p>
          </div>

          <div className="liquid-glass rounded-[24px] p-5 min-w-[260px]">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-cream/60">Progress</div>
            <div className="mt-3 flex items-end gap-3">
              <span className="font-grotesk text-5xl text-neon">{answeredTotal}</span>
              <span className="pb-2 text-sm text-cream/70">câu đã chạm</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {chapterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => resetSession(option.id)}
              className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
                filter === option.id
                  ? 'border-neon bg-neon text-[#010828]'
                  : 'border-white/10 text-cream/70 hover:border-neon hover:text-neon'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="liquid-glass rounded-[36px] p-5 sm:p-8 lg:p-10 min-h-[420px]">
          {completed ? (
            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-center">
              <div>
                <Sparkles className="w-12 h-12 text-neon mb-5" />
                <h3 className="font-grotesk text-4xl sm:text-5xl uppercase">Hoàn thành lượt luyện</h3>
                <p className="mt-5 text-cream/75 leading-7">
                  Bạn đúng {correctCount}/{questions.length} câu. Badge đã được ghi vào tiến độ nếu đây là lượt đầu của nhóm này.
                </p>
              </div>
              <button
                type="button"
                onClick={() => resetSession()}
                className="rounded-[28px] bg-neon px-6 py-5 font-mono text-sm uppercase tracking-widest text-[#010828] hover:scale-[1.02] transition-transform"
              >
                <RotateCcw className="inline-block w-4 h-4 mr-2" /> Làm lượt mới
              </button>
            </div>
          ) : currentQuestion ? (
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-neon">
                    Câu {step + 1}/{questions.length}
                  </span>
                  <span className="font-mono text-xs text-cream/50">{currentModule?.title}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold leading-snug text-cream">
                  {currentQuestion.stem}
                </h3>

                <div className="mt-8 grid gap-3">
                  {currentQuestion.choices.map((choice, index) => {
                    const isChosen = selected === index
                    const isCorrect = selected !== null && index === currentQuestion.answer

                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => chooseAnswer(index)}
                        className={`text-left rounded-[22px] border px-5 py-4 transition-all ${
                          isCorrect
                            ? 'border-neon bg-neon/15 text-neon'
                            : isChosen
                              ? 'border-magenta bg-magenta/10 text-cream'
                              : 'border-white/10 bg-white/[0.03] text-cream/76 hover:border-cyan hover:text-cream'
                        }`}
                      >
                        <span className="font-mono text-xs text-cream/45 mr-3">0{index + 1}</span>
                        {choice}
                      </button>
                    )
                  })}
                </div>
              </div>

              <aside className="rounded-[28px] border border-white/10 bg-black/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.28em] text-cream/55">Giải thích</div>
                  <p className="mt-4 text-cream/75 leading-7">
                    {selected === null ? 'Chọn một đáp án để mở giải thích và nhận triThucShard nếu đúng.' : currentQuestion.explanation}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-widest text-cream/40">
                    Nguồn: {currentQuestion.sourceRef.pages}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={selected === null}
                  onClick={nextQuestion}
                  className="mt-8 rounded-full bg-cream px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#010828] disabled:opacity-35 disabled:cursor-not-allowed hover:bg-neon transition-colors"
                >
                  {step >= questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                </button>
              </aside>
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="rounded-[24px] border border-white/10 p-5 bg-white/[0.025]">
              <div className="font-grotesk text-2xl uppercase">{chapter.theme.worldName}</div>
              <p className="mt-3 text-sm text-cream/65 leading-6">{chapter.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
