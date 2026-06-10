import { Award, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { philosophyBadge } from '../../data/philosophyTimeline'

interface ChallengePanelProps {
  onComplete?: (badge: string) => void
}

type ChallengeAnswer = number | null

interface ChallengeItem {
  id: string
  prompt: string
  options: string[]
  answer: number
  hint: string
}

const challengeItems: ChallengeItem[] = [
  {
    id: 'socrates',
    prompt: 'Ai nói: "Tôi chỉ biết rằng tôi không biết gì"?',
    options: ['Socrates', 'Plato', 'Aristotle'],
    answer: 0,
    hint: 'Đây là người mở đầu bằng đối thoại và tự phản tỉnh.',
  },
  {
    id: 'plato',
    prompt: 'Ai đặt thế giới ý niệm cao hơn thế giới cảm giác?',
    options: ['Feuerbach', 'Plato', 'Engels'],
    answer: 1,
    hint: 'Người nói về hang động và những hình bóng.',
  },
  {
    id: 'marx',
    prompt: 'Ai nhấn mạnh thực tiễn là thước đo của chân lý?',
    options: ['Hegel', 'Marx', 'Lenin'],
    answer: 1,
    hint: 'Người gắn triết học với cải biến xã hội.',
  },
  {
    id: 'lenin',
    prompt: 'Ai nhấn mạnh lý luận phải đi vào hành động cách mạng?',
    options: ['Aristotle', 'Engels', 'Lenin'],
    answer: 2,
    hint: 'Người phát triển vai trò tổ chức và chiến lược cách mạng.',
  },
]

export function ChallengePanel({ onComplete }: ChallengePanelProps) {
  const [answers, setAnswers] = useState<Record<string, ChallengeAnswer>>({})
  const [completed, setCompleted] = useState(false)
  const firedRef = useRef(false)

  const correctCount = useMemo(
    () => challengeItems.reduce((count, item) => count + (answers[item.id] === item.answer ? 1 : 0), 0),
    [answers],
  )

  const allCorrect = correctCount === challengeItems.length

  useEffect(() => {
    if (!allCorrect || firedRef.current) {
      return
    }

    firedRef.current = true
    setCompleted(true)
    onComplete?.(philosophyBadge)
  }, [allCorrect, onComplete])

  const chooseAnswer = (itemId: string, optionIndex: number) => {
    if (completed) {
      return
    }

    setAnswers((current) => ({
      ...current,
      [itemId]: optionIndex,
    }))
  }

  const resetChallenge = () => {
    firedRef.current = false
    setCompleted(false)
    setAnswers({})
  }

  return (
    <section className="liquid-glass rounded-[22px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-neon">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em]">Challenge</span>
          </div>
          <h3 className="mt-3 font-grotesk text-2xl uppercase leading-tight">Mở badge tư tưởng</h3>
          <p className="mt-3 text-sm leading-7 text-cream/68">
            Trả lời đủ bốn mốc để mở badge. Câu sai vẫn có thể sửa ngay tại chỗ.
          </p>
        </div>

        <div className="rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-3 text-right">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">Tiến độ</div>
          <div className="mt-2 font-grotesk text-2xl text-cyan">
            {correctCount}
            <span className="text-cream/45">/{challengeItems.length}</span>
          </div>
        </div>
      </div>

      {completed ? (
        <div className="mt-6 rounded-[20px] border border-neon/25 bg-neon/10 p-5">
          <div className="flex items-center gap-2 text-neon">
            <Award className="h-5 w-5" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em]">Hoàn thành</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-cream/82">
            Bạn đã ghép xong đường dây từ đối thoại cổ điển đến duy vật biện chứng. Badge đã mở trong phiên này.
          </p>
          <button
            type="button"
            onClick={resetChallenge}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cream/78 transition-colors hover:border-neon hover:text-neon"
          >
            <RotateCcw className="h-4 w-4" />
            Làm lại
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {challengeItems.map((item) => {
            const selected = answers[item.id]
            const isCorrect = selected === item.answer
            const isAnswered = selected !== null && selected !== undefined

            return (
              <article key={item.id} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold leading-7 text-cream">{item.prompt}</h4>
                  {isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0 text-neon" /> : null}
                </div>

                <div className="mt-4 grid gap-2">
                  {item.options.map((option, optionIndex) => {
                    const active = selected === optionIndex
                    const correctOption = optionIndex === item.answer

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => chooseAnswer(item.id, optionIndex)}
                        className={[
                          'rounded-[16px] border px-4 py-3 text-left text-sm transition-colors',
                          active && correctOption
                            ? 'border-neon bg-neon/10 text-neon'
                            : active
                              ? 'border-magenta bg-magenta/10 text-cream'
                              : 'border-white/10 bg-black/15 text-cream/78 hover:border-cyan/50 hover:text-cream',
                        ].join(' ')}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>

                <p className={`mt-3 text-xs leading-6 ${isAnswered ? (isCorrect ? 'text-neon' : 'text-cream/50') : 'text-cream/38'}`}>
                  {isAnswered ? (isCorrect ? 'Đúng rồi.' : item.hint) : 'Chọn một đáp án để kiểm tra.'}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
