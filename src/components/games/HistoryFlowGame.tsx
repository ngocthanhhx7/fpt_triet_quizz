import { ArrowDown, CheckCircle2, RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { historyFlowSteps } from '../../data/learningContent'
import type { GameResult } from '../../data/learningTypes'
import { GameCompletionPanel } from './GameCompletionPanel'

interface HistoryFlowGameProps {
  onComplete: (result: GameResult) => void
}

const shuffledStepIds = ['flow-3', 'flow-1', 'flow-5', 'flow-2', 'flow-4']

const scenarioChoices = [
  {
    label: 'Nhìn thay đổi công cụ học tập, cách tổ chức nhóm và điều kiện thực tế trước khi kết luận.',
    correct: true,
  },
  {
    label: 'Chỉ nhìn thái độ từng cá nhân, bỏ qua nền tảng tổ chức và điều kiện học tập.',
    correct: false,
  },
  {
    label: 'Kết luận điểm thấp chỉ vì "môn khó", không phân tích quan hệ giữa cách học và kết quả.',
    correct: false,
  },
]

const introMessage = 'Sắp xếp dòng chảy: từ nền tảng sản xuất đến vai trò con người.'

export function HistoryFlowGame({ onComplete }: HistoryFlowGameProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [scenarioIndex, setScenarioIndex] = useState<number | null>(null)
  const [message, setMessage] = useState(introMessage)
  const [completionResult, setCompletionResult] = useState<GameResult | null>(null)
  const completedRef = useRef(false)

  const candidates = shuffledStepIds
    .map((id) => historyFlowSteps.find((step) => step.id === id))
    .filter((step): step is (typeof historyFlowSteps)[number] => Boolean(step))
  const orderedSteps = selectedIds
    .map((id) => historyFlowSteps.find((step) => step.id === id))
    .filter((step): step is (typeof historyFlowSteps)[number] => Boolean(step))
  const remainingCandidates = candidates.filter((step) => !selectedIds.includes(step.id))
  const sequenceCorrect = selectedIds.join('|') === historyFlowSteps.map((step) => step.id).join('|')
  const scenarioCorrect = scenarioIndex !== null && scenarioChoices[scenarioIndex].correct
  const readyToFinish = selectedIds.length === historyFlowSteps.length && scenarioIndex !== null

  const reset = () => {
    setSelectedIds([])
    setScenarioIndex(null)
    setMessage(introMessage)
    setCompletionResult(null)
    completedRef.current = false
  }

  const submit = () => {
    if (!readyToFinish || completedRef.current) {
      return
    }

    const correctParts = (sequenceCorrect ? 4 : 0) + (scenarioCorrect ? 1 : 0)
    const score = correctParts * 220
    const result: GameResult = {
      gameId: 'dong-chay-lich-su',
      score,
      correctAnswers: correctParts,
      timeSpent: selectedIds.length,
      rewards: ['triThucShard', sequenceCorrect ? 'historyCompass' : 'loreFragment'],
      newUnlocks: ['dong-chay-lich-su-played'],
    }

    setMessage(
      sequenceCorrect && scenarioCorrect
        ? 'Chuẩn biện chứng lịch sử: bạn đã nối nền tảng vật chất với hành động của con người.'
        : 'Chưa hoàn hảo, nhưng bạn đã thấy xã hội là một dòng quan hệ chứ không phải các mảnh rời.',
    )
    completedRef.current = true
    setCompletionResult(result)
    onComplete(result)
  }

  return (
    <div className="liquid-glass rounded-[34px] p-5 sm:p-7 lg:p-8">
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">Mini game 03</span>
          <h3 className="mt-2 font-grotesk text-4xl uppercase">Dòng Chảy Lịch Sử</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/68">{message}</p>
        </div>
        <button type="button" onClick={reset} className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:border-neon hover:text-neon">
          <RotateCcw className="mr-2 inline-block h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {completionResult ? (
        <GameCompletionPanel
          title="Chúc mừng, bạn đã hoàn thành Dòng Chảy Lịch Sử"
          description="Lượt chơi đã được ghi nhận vào tiến độ. Bạn có thể chơi lại để thử thứ tự và tình huống với mục tiêu điểm cao hơn."
          score={completionResult.score}
          correctAnswers={completionResult.correctAnswers}
          rewards={completionResult.rewards}
          primaryActionLabel="Chơi lại"
          onPrimaryAction={reset}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-black/15 p-5">
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cream/50">Kho sự kiện</div>
            <div className="grid gap-3">
              {remainingCandidates.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setSelectedIds((current) => [...current, step.id])}
                  className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-cyan hover:text-cream"
                >
                  <span className="font-semibold text-cream">{step.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-cream/58">{step.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/15 p-5">
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cream/50">Timeline bạn xây</div>
            <div className="grid min-h-[260px] gap-3">
              {orderedSteps.length === 0 ? (
                <div className="rounded-[20px] border border-dashed border-white/10 p-6 text-cream/42">Chọn các thẻ bên trái để tạo dòng chảy.</div>
              ) : (
                orderedSteps.map((step, index) => (
                  <div key={step.id} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
                    <span className="font-mono text-xs text-neon">0{index + 1}</span>
                    <span className="ml-3 font-semibold">{step.title}</span>
                    {index < orderedSteps.length - 1 ? <ArrowDown className="mt-3 h-4 w-4 text-cream/40" /> : null}
                  </div>
                ))
              )}
            </div>

            {selectedIds.length === historyFlowSteps.length ? (
              <div className="mt-6">
                <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cream/50">Boss tình huống</div>
                <p className="mb-4 text-sm leading-6 text-cream/72">
                  Một team project tụt điểm dù ai cũng cố gắng. Cách phân tích nào đúng tinh thần duy vật lịch sử hơn?
                </p>
                <div className="grid gap-3">
                  {scenarioChoices.map((choice, index) => (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => setScenarioIndex(index)}
                      className={`rounded-[18px] border p-4 text-left text-sm transition-colors ${
                        scenarioIndex === index
                          ? 'border-neon bg-neon/12 text-neon'
                          : 'border-white/10 text-cream/68 hover:border-neon hover:text-cream'
                      }`}
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!readyToFinish}
                  onClick={submit}
                  className="mt-5 rounded-full bg-neon px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#010828] disabled:opacity-40"
                >
                  <CheckCircle2 className="mr-2 inline-block h-4 w-4" /> Chốt dòng chảy
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
