import type { ChapterId, QuizQuestion } from '../../../data/learningTypes'
import type { GameInputAction, GameInputState } from '../../../hooks/useInput'

export type { GameInputAction, GameInputState }

export type EnemyKind = 'patrol' | 'flying'
export type WeaponId = 'logicBlade' | 'historyPulse' | null
export type RewardId = 'logicBlade' | 'methodShield' | 'historyPulse'

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface PlayerState extends Rect {
  vx: number
  vy: number
  grounded: boolean
  facing: 1 | -1
  invulnerableUntil: number
  attackUntil: number
}

export interface EnemyDefinition extends Rect {
  id: string
  kind: EnemyKind
  minX: number
  maxX: number
  speed: number
  baseY?: number
  amplitude?: number
}

export interface EnemyState extends EnemyDefinition {
  alive: boolean
  direction: 1 | -1
}

export interface RewardDefinition {
  id: RewardId
  label: string
  description: string
  inventoryLabel: string
}

export interface ChestDefinition extends Rect {
  id: string
  rewardId: RewardId
  question: QuizQuestion
  interactZone: Rect
}

export interface WorldDefinition {
  id: ChapterId
  unlockId: ChapterId
  clearUnlockId: string
  title: string
  accent: string
  width: number
  start: { x: number; y: number }
  checkpoint: { x: number; y: number }
  background: string
  platforms: Rect[]
  hazards: Rect[]
  enemies: EnemyDefinition[]
  chests: ChestDefinition[]
  requiredChests: number
  gate: Rect
}

export interface ShieldState {
  charges: number
  activeUntil: number
}

export interface CameraState {
  x: number
}

export interface PlatformerRuntime {
  player: PlayerState
  enemies: EnemyState[]
  camera: CameraState
  hp: number
  shards: number
  weapon: WeaponId
  shield: ShieldState
  openedChestIds: string[]
  correctChestIds: string[]
  gateUnlocked: boolean
  completed: boolean
  message: string
  elapsed: number
}

export interface FrameResult {
  quizChestId?: string
  shouldComplete: boolean
}
