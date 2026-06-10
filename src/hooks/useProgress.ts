import { useCallback, useEffect, useState } from 'react'
import type { GameProgress, GameResult } from '../data/learningTypes'
import {
  applyGameResult,
  awardInventory,
  createInitialProgress,
  loadProgress,
  markQuestionAnswered,
  registerBadge,
  saveProgress,
  unlockStage,
} from '../stores/progressStore'

export function useProgress() {
  const [progress, setProgress] = useState<GameProgress>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const resetProgress = useCallback(() => {
    setProgress(createInitialProgress())
  }, [])

  const answerQuestion = useCallback((questionId: string, correct: boolean) => {
    setProgress((current) => {
      let nextProgress = markQuestionAnswered(current, questionId)

      if (correct) {
        nextProgress = awardInventory(nextProgress, 'triThucShard')
      }

      return {
        ...nextProgress,
        lastPlayedAt: new Date().toISOString(),
      }
    })
  }, [])

  const completeGame = useCallback((result: GameResult) => {
    setProgress((current) => applyGameResult(current, result))
  }, [])

  const unlock = useCallback((stageId: string) => {
    setProgress((current) => unlockStage(current, stageId))
  }, [])

  const addBadge = useCallback((badge: string) => {
    setProgress((current) => registerBadge(current, badge))
  }, [])

  return {
    progress,
    resetProgress,
    answerQuestion,
    completeGame,
    unlock,
    addBadge,
  }
}
