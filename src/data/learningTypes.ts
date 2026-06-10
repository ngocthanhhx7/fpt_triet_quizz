export type ChapterId = 'chapter-1' | 'chapter-2' | 'chapter-3'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuizType = 'single' | 'true-false' | 'pair' | 'sequence' | 'scenario'

export interface ChapterTheme {
  accent: string
  gradient: string
  worldName: string
}

export interface Chapter {
  id: ChapterId
  title: string
  summary: string
  learningOutcomes: string[]
  moduleIds: string[]
  theme: ChapterTheme
}

export interface KeyTerm {
  term: string
  meaning: string
}

export interface LearningModule {
  id: string
  chapterId: ChapterId
  title: string
  coreIdeas: string[]
  keyTerms: KeyTerm[]
  commonMistakes: string[]
  sourcePages: string
}

export interface SourceRef {
  document: string
  pages: string
  note?: string
}

export interface Flashcard {
  id: string
  moduleId: string
  front: string
  back: string
  type: 'term' | 'idea' | 'example' | 'method'
  difficulty: Difficulty
  tags: string[]
  sourceRef: SourceRef
}

export interface QuizQuestion {
  id: string
  moduleId: string
  type: QuizType
  stem: string
  choices: string[]
  answer: number
  explanation: string
  difficulty: Difficulty
  tags: string[]
  sourceRef: SourceRef
}

export interface UnlockRule {
  requiresAll?: string[]
  requiresAny?: string[]
}

export interface GameDefinition {
  id: 'hanh-trinh-bien-chung' | 'ghep-cap-pham-tru' | 'dong-chay-lich-su'
  title: string
  description: string
  chapterIds: ChapterId[]
  difficulty: Difficulty
  estimatedMinutes: number
  unlockRule?: UnlockRule
}

export interface GameProgress {
  saveVersion: 1
  unlockedStages: string[]
  bestScores: Record<string, number>
  badges: string[]
  answeredQuestionIds: string[]
  inventory: Record<string, number>
  lastPlayedAt: string | null
}

export interface GameResult {
  gameId: GameDefinition['id'] | 'practice'
  score: number
  correctAnswers: number
  timeSpent: number
  rewards: string[]
  newUnlocks: string[]
}

export interface PairMatchItem {
  id: string
  pairId: string
  label: string
  match: string
  moduleId: string
  explanation: string
}

export interface HistoryFlowStep {
  id: string
  title: string
  description: string
  moduleId: string
}
