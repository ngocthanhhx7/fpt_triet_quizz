import { initialGameProgress } from '../data/learningContent'
import type { GameProgress, GameResult } from '../data/learningTypes'

export const PROGRESS_STORAGE_KEY = 'mln-triet-quest-progress-v1'

const cloneInitialProgress = (): GameProgress => ({
  saveVersion: initialGameProgress.saveVersion,
  unlockedStages: [...initialGameProgress.unlockedStages],
  bestScores: { ...initialGameProgress.bestScores },
  badges: [...initialGameProgress.badges],
  answeredQuestionIds: [...initialGameProgress.answeredQuestionIds],
  inventory: { ...initialGameProgress.inventory },
  lastPlayedAt: initialGameProgress.lastPlayedAt,
})

const isGameProgress = (value: unknown): value is GameProgress => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const progress = value as GameProgress

  return progress.saveVersion === 1
    && Array.isArray(progress.unlockedStages)
    && typeof progress.bestScores === 'object'
    && Array.isArray(progress.badges)
    && Array.isArray(progress.answeredQuestionIds)
    && typeof progress.inventory === 'object'
}

export const loadProgress = (): GameProgress => {
  if (typeof window === 'undefined') {
    return cloneInitialProgress()
  }

  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY)

    if (!raw) {
      return cloneInitialProgress()
    }

    const parsed: unknown = JSON.parse(raw)

    if (!isGameProgress(parsed)) {
      return cloneInitialProgress()
    }

    return {
      saveVersion: 1,
      unlockedStages: [...parsed.unlockedStages],
      bestScores: { ...parsed.bestScores },
      badges: [...parsed.badges],
      answeredQuestionIds: [...parsed.answeredQuestionIds],
      inventory: { ...parsed.inventory },
      lastPlayedAt: parsed.lastPlayedAt ?? null,
    }
  } catch {
    return cloneInitialProgress()
  }
}

export const saveProgress = (progress: GameProgress) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress))
}

export const createInitialProgress = cloneInitialProgress

export const hasUnlock = (progress: GameProgress, unlockId: string) =>
  progress.unlockedStages.includes(unlockId) || Boolean(progress.inventory[unlockId])

export const awardInventory = (progress: GameProgress, item: string, amount = 1): GameProgress => ({
  ...progress,
  inventory: {
    ...progress.inventory,
    [item]: (progress.inventory[item] ?? 0) + amount,
  },
})

export const unlockStage = (progress: GameProgress, stageId: string): GameProgress => ({
  ...progress,
  unlockedStages: progress.unlockedStages.includes(stageId)
    ? progress.unlockedStages
    : [...progress.unlockedStages, stageId],
})

export const registerBadge = (progress: GameProgress, badge: string): GameProgress => ({
  ...progress,
  badges: progress.badges.includes(badge) ? progress.badges : [...progress.badges, badge],
})

export const markQuestionAnswered = (progress: GameProgress, questionId: string): GameProgress => ({
  ...progress,
  answeredQuestionIds: progress.answeredQuestionIds.includes(questionId)
    ? progress.answeredQuestionIds
    : [...progress.answeredQuestionIds, questionId],
})

export const applyGameResult = (progress: GameProgress, result: GameResult): GameProgress => {
  let nextProgress: GameProgress = {
    ...progress,
    bestScores: {
      ...progress.bestScores,
      [result.gameId]: Math.max(progress.bestScores[result.gameId] ?? 0, result.score),
    },
    lastPlayedAt: new Date().toISOString(),
  }

  result.rewards.forEach((reward) => {
    nextProgress = awardInventory(nextProgress, reward)
  })

  result.newUnlocks.forEach((unlock) => {
    nextProgress = unlockStage(nextProgress, unlock)
  })

  return nextProgress
}
