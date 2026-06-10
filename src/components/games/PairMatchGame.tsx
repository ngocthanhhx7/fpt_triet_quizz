import { RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { pairMatchItems } from '../../data/learningContent'
import type { GameResult, PairMatchItem } from '../../data/learningTypes'
import { GameCompletionPanel } from './GameCompletionPanel'

interface PairMatchGameProps {
  onComplete: (result: GameResult) => void
}

interface MatchCard {
  id: string
  pairId: string
  text: string
  explanation: string
  kind: 'term' | 'meaning'
}

interface PairMatchRound {
  roundItems: PairMatchItem[]
  deck: MatchCard[]
}

const roundSize = 6
const introMessage = 'Ghép thuật ngữ với ý nghĩa tương ứng. Cặp đúng sẽ biến mất khỏi bàn chơi.'

const shuffle = <T,>(items: T[]) => {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = next[index]
    next[index] = next[swapIndex]
    next[swapIndex] = current
  }

  return next
}

const buildRoundItems = (pool: PairMatchItem[], size: number, recentPairIds: string[]) => {
  const freshItems = pool.filter((item) => !recentPairIds.includes(item.pairId))
  const candidates = freshItems.length >= size ? freshItems : pool

  return shuffle(candidates).slice(0, Math.min(size, candidates.length))
}

const buildDeck = (roundItems: PairMatchItem[]): MatchCard[] =>
  shuffle(
    roundItems.flatMap<MatchCard>((item) => [
      {
        id: `${item.id}-term`,
        pairId: item.pairId,
        text: item.label,
        explanation: item.explanation,
        kind: 'term',
      },
      {
        id: `${item.id}-meaning`,
        pairId: item.pairId,
        text: item.match,
        explanation: item.explanation,
        kind: 'meaning',
      },
    ]),
  )

const createRound = (recentPairIds: string[]): PairMatchRound => {
  const roundItems = buildRoundItems(pairMatchItems, roundSize, recentPairIds)

  return {
    roundItems,
    deck: buildDeck(roundItems),
  }
}

export function PairMatchGame({ onComplete }: PairMatchGameProps) {
  const [round, setRound] = useState<PairMatchRound>(() => createRound([]))
  const [recentPairIds, setRecentPairIds] = useState<string[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [message, setMessage] = useState(introMessage)
  const [completionResult, setCompletionResult] = useState<GameResult | null>(null)
  const completedRef = useRef(false)
  const mismatchTimeoutRef = useRef<number | null>(null)

  const selectedCards = useMemo(
    () => selectedIds.map((id) => round.deck.find((card) => card.id === id)).filter((card): card is MatchCard => Boolean(card)),
    [round.deck, selectedIds],
  )
  const visibleDeck = useMemo(
    () => round.deck.filter((card) => !matchedPairIds.includes(card.pairId)),
    [matchedPairIds, round.deck],
  )

  useEffect(() => () => {
    if (mismatchTimeoutRef.current !== null) {
      window.clearTimeout(mismatchTimeoutRef.current)
    }
  }, [])

  const clearPendingMismatch = () => {
    if (mismatchTimeoutRef.current === null) {
      return
    }

    window.clearTimeout(mismatchTimeoutRef.current)
    mismatchTimeoutRef.current = null
  }

  const clearRoundState = () => {
    clearPendingMismatch()
    setSelectedIds([])
    setMatchedPairIds([])
    setMoves(0)
    setMessage(introMessage)
    setCompletionResult(null)
    completedRef.current = false
  }

  const reset = () => {
    setRound({
      roundItems: round.roundItems,
      deck: buildDeck(round.roundItems),
    })
    clearRoundState()
  }

  const startNextRound = () => {
    const nextRecentPairIds = round.roundItems.map((item) => item.pairId)
    setRecentPairIds(nextRecentPairIds)
    setRound(createRound(nextRecentPairIds))
    clearRoundState()
  }

  const completeIfNeeded = (nextMatchedPairIds: string[], nextMoves: number) => {
    if (completedRef.current || nextMatchedPairIds.length < round.roundItems.length) {
      return
    }

    const result: GameResult = {
      gameId: 'ghep-cap-pham-tru',
      score: Math.max(120, 1000 - nextMoves * 35 + round.roundItems.length * 35),
      correctAnswers: nextMatchedPairIds.length,
      timeSpent: nextMoves,
      rewards: ['triThucShard', 'triThucShard', 'loreFragment'],
      newUnlocks: ['ghep-cap-pham-tru-mastered'],
    }

    completedRef.current = true
    setCompletionResult(result)
    setMessage('Bạn đã ghép đúng toàn bộ thuật ngữ trong lượt này.')
    onComplete(result)
  }

  const chooseCard = (card: MatchCard) => {
    if (completionResult || selectedIds.includes(card.id) || matchedPairIds.includes(card.pairId)) {
      return
    }

    if (selectedCards.length === 2) {
      clearPendingMismatch()
      setSelectedIds([card.id])
      return
    }

    const nextSelectedIds = [...selectedIds, card.id]
    setSelectedIds(nextSelectedIds)

    if (nextSelectedIds.length < 2) {
      return
    }

    const [firstCard, secondCard] = nextSelectedIds
      .map((id) => round.deck.find((item) => item.id === id))
      .filter((item): item is MatchCard => Boolean(item))
    const nextMoves = moves + 1
    setMoves(nextMoves)

    if (firstCard.pairId === secondCard.pairId && firstCard.kind !== secondCard.kind) {
      const nextMatchedPairIds = [...matchedPairIds, firstCard.pairId]
      setMatchedPairIds(nextMatchedPairIds)
      setMessage(firstCard.explanation)
      setSelectedIds([])
      completeIfNeeded(nextMatchedPairIds, nextMoves)
      return
    }

    setMessage('Chưa khớp. Hãy nhìn lại quan hệ giữa thuật ngữ và ý nghĩa, đừng chỉ đoán theo cảm giác.')
    clearPendingMismatch()
    mismatchTimeoutRef.current = window.setTimeout(() => {
      setSelectedIds([])
      mismatchTimeoutRef.current = null
    }, 650)
  }

  return (
    <div className="liquid-glass rounded-[34px] p-5 sm:p-7 lg:p-8">
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-neon">Mini game 02</span>
          <h3 className="mt-2 font-grotesk text-4xl uppercase">Ghép Cặp Phạm Trù</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/68">{message}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-cream/60">Moves: {moves}</span>
          <span className="font-mono text-xs text-cream/60">Còn lại: {visibleDeck.length / 2}</span>
          <button type="button" onClick={reset} className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:border-neon hover:text-neon">
            <RotateCcw className="mr-2 inline-block h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      {completionResult ? (
        <GameCompletionPanel
          title="Chúc mừng, bạn đã hoàn thành lượt ghép cặp"
          description="Các cặp thuật ngữ và ý nghĩa trong lượt này đã được nối đúng. Bấm chơi lượt mới để nhận một bộ câu hỏi khác từ kho kiến thức."
          score={completionResult.score}
          correctAnswers={completionResult.correctAnswers}
          rewards={completionResult.rewards}
          primaryActionLabel="Chơi lượt mới"
          onPrimaryAction={startNextRound}
          secondaryActionLabel="Xáo lại lượt này"
          onSecondaryAction={reset}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {visibleDeck.map((card) => {
            const active = selectedIds.includes(card.id)

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => chooseCard(card)}
                className={`min-h-[112px] rounded-[22px] border p-4 text-left transition-all duration-300 ${
                  active
                    ? 'scale-[1.02] border-cyan bg-cyan/10 text-cream'
                    : 'border-white/10 bg-white/[0.025] text-cream/74 hover:border-white/30 hover:text-cream'
                }`}
              >
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-cream/40">
                  {card.kind === 'term' ? 'Term' : 'Meaning'}
                </span>
                <span className="text-sm font-semibold leading-snug sm:text-base">{card.text}</span>
              </button>
            )
          })}
        </div>
      )}

      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-cream/42">
        Pool hiện có {pairMatchItems.length} cặp. Lượt trước tránh lặp {recentPairIds.length} cặp gần nhất.
      </p>
    </div>
  )
}
