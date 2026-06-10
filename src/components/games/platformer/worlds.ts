import { chapters, modules, quizQuestions } from '../../../data/learningContent'
import type { Chapter, ChapterId, QuizQuestion } from '../../../data/learningTypes'
import type { ChestDefinition, EnemyDefinition, Rect, RewardId, WorldDefinition } from './types'

export const canvasWidth = 960
export const canvasHeight = 480
export const groundY = 410

export interface PlatformerSessionOptions {
  seed?: number
  selectedModuleIds?: string[]
  answeredQuestionIds?: string[]
}

export interface PlatformerSession {
  seed: number
  selectedModuleIds: string[]
  worlds: WorldDefinition[]
}

interface EnemyPreset extends EnemyDefinition {
  speedJitter?: number
}

interface WorldTemplate {
  id: ChapterId
  unlockId: ChapterId
  clearUnlockId: string
  title: string
  accent: string
  width: number
  start: { x: number; y: number }
  checkpoint: { x: number; y: number }
  background: string
  basePlatforms: Rect[]
  optionalPlatforms: Rect[]
  optionalPlatformCount: number
  hazardSlots: Rect[]
  hazardCount: number
  enemySlots: EnemyPreset[]
  enemyCount: number
  chestSlots: Array<{ x: number; y: number }>
  chestCount: number
  requiredChests: number
  gate: Rect
}

const chapterById = new Map<ChapterId, Chapter>(chapters.map((chapter) => [chapter.id, chapter]))
const allModuleIds = modules.map((module) => module.id)
const rewardCycle: RewardId[] = ['logicBlade', 'methodShield', 'historyPulse']

const getChapter = (id: ChapterId) => {
  const chapter = chapterById.get(id)

  if (!chapter) {
    throw new Error(`Missing chapter ${id}`)
  }

  return chapter
}

const clearUnlockId = (id: ChapterId) => `platformer:${id}:clear`

const makeSeed = () => {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1)
    crypto.getRandomValues(values)
    return values[0]
  }

  return Date.now()
}

const createRng = (seed: number) => {
  let value = seed >>> 0

  return () => {
    value += 0x6D2B79F5
    let next = value
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

const shuffle = <T,>(items: T[], rng: () => number) => {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1))
    const current = copy[index]
    copy[index] = copy[swapIndex]
    copy[swapIndex] = current
  }

  return copy
}

const selectMany = <T,>(items: T[], count: number, rng: () => number) => shuffle(items, rng).slice(0, count)

const makeChest = (
  id: string,
  x: number,
  y: number,
  rewardId: RewardId,
  question: QuizQuestion,
): ChestDefinition => ({
  id,
  x,
  y,
  w: 58,
  h: 44,
  rewardId,
  question,
  interactZone: { x: x - 38, y: y - 26, w: 134, h: 96 },
})

const patrol = (id: string, x: number, y: number, minX: number, maxX: number, speed: number, speedJitter = 0): EnemyPreset => ({
  id,
  kind: 'patrol',
  x,
  y,
  w: 38,
  h: 34,
  minX,
  maxX,
  speed,
  speedJitter,
})

const flying = (
  id: string,
  x: number,
  y: number,
  minX: number,
  maxX: number,
  speed: number,
  amplitude: number,
  speedJitter = 0,
): EnemyPreset => ({
  id,
  kind: 'flying',
  x,
  y,
  w: 40,
  h: 28,
  minX,
  maxX,
  speed,
  baseY: y,
  amplitude,
  speedJitter,
})

const chapterModuleIds = (chapterId: ChapterId) =>
  modules.filter((module) => module.chapterId === chapterId).map((module) => module.id)

const moduleChapterId = (moduleId: string) => modules.find((module) => module.id === moduleId)?.chapterId

const pickQuestion = (
  chapterId: ChapterId,
  selectedModuleIds: string[],
  answeredQuestionIds: string[],
  usedQuestionIds: Set<string>,
  rng: () => number,
) => {
  const selectedModules = new Set(selectedModuleIds.length > 0 ? selectedModuleIds : allModuleIds)
  const answered = new Set(answeredQuestionIds)
  const isWorldQuestion = (question: QuizQuestion) => moduleChapterId(question.moduleId) === chapterId
  const isSelectedQuestion = (question: QuizQuestion) => selectedModules.has(question.moduleId)
  const isFresh = (question: QuizQuestion) => !answered.has(question.id)
  const group = (predicate: (question: QuizQuestion) => boolean) =>
    quizQuestions.filter((question) => !usedQuestionIds.has(question.id) && predicate(question))

  const priorityGroups = [
    group((question) => isSelectedQuestion(question) && isWorldQuestion(question) && isFresh(question)),
    group((question) => isSelectedQuestion(question) && isFresh(question)),
    group((question) => isWorldQuestion(question) && isFresh(question)),
    group((question) => isFresh(question)),
    group((question) => isSelectedQuestion(question) && isWorldQuestion(question)),
    group((question) => isSelectedQuestion(question)),
    group((question) => isWorldQuestion(question)),
    group(() => true),
  ]

  const question = priorityGroups.map((questions) => shuffle(questions, rng)[0]).find(Boolean)

  if (!question) {
    throw new Error(`No quiz questions available for ${chapterId}`)
  }

  usedQuestionIds.add(question.id)
  return question
}

const materializeEnemy = (enemy: EnemyPreset, rng: () => number): EnemyDefinition => {
  const { speedJitter = 0, ...definition } = enemy
  const jitter = speedJitter === 0 ? 0 : Math.round((rng() * 2 - 1) * speedJitter)

  return {
    ...definition,
    speed: Math.max(45, definition.speed + jitter),
  }
}

const createWorld = (
  template: WorldTemplate,
  selectedModuleIds: string[],
  answeredQuestionIds: string[],
  usedQuestionIds: Set<string>,
  rng: () => number,
): WorldDefinition => {
  const chestSlots = selectMany(template.chestSlots, template.chestCount, rng)
  const rewards = shuffle(rewardCycle, rng)
  const optionalPlatforms = selectMany(template.optionalPlatforms, template.optionalPlatformCount, rng)
  const hazards = selectMany(template.hazardSlots, template.hazardCount, rng)
  const enemies = selectMany(template.enemySlots, template.enemyCount, rng).map((enemy) => materializeEnemy(enemy, rng))

  return {
    id: template.id,
    unlockId: template.unlockId,
    clearUnlockId: template.clearUnlockId,
    title: template.title,
    accent: template.accent,
    width: template.width,
    start: template.start,
    checkpoint: template.checkpoint,
    background: template.background,
    platforms: [...template.basePlatforms, ...optionalPlatforms].sort((left, right) => left.x - right.x),
    hazards,
    enemies,
    chests: chestSlots.map((slot, index) =>
      makeChest(
        `${template.id}-chest-${index + 1}`,
        slot.x,
        slot.y,
        rewards[index % rewards.length],
        pickQuestion(template.id, selectedModuleIds, answeredQuestionIds, usedQuestionIds, rng),
      ),
    ),
    requiredChests: template.requiredChests,
    gate: template.gate,
  }
}

const worldTemplates: WorldTemplate[] = [
  {
    id: 'chapter-1',
    unlockId: 'chapter-1',
    clearUnlockId: clearUnlockId('chapter-1'),
    title: getChapter('chapter-1').theme.worldName,
    accent: getChapter('chapter-1').theme.accent,
    width: 2480,
    start: { x: 42, y: 340 },
    checkpoint: { x: 42, y: 340 },
    background: 'worldview',
    basePlatforms: [
      { x: 0, y: groundY, w: 320, h: 42 },
      { x: 420, y: groundY, w: 320, h: 42 },
      { x: 850, y: groundY, w: 300, h: 42 },
      { x: 1260, y: groundY, w: 330, h: 42 },
      { x: 1700, y: groundY, w: 330, h: 42 },
      { x: 2140, y: groundY, w: 320, h: 42 },
    ],
    optionalPlatforms: [
      { x: 185, y: 330, w: 140, h: 18 },
      { x: 500, y: 304, w: 150, h: 18 },
      { x: 760, y: 278, w: 145, h: 18 },
      { x: 1035, y: 330, w: 150, h: 18 },
      { x: 1320, y: 286, w: 160, h: 18 },
      { x: 1590, y: 332, w: 150, h: 18 },
      { x: 1880, y: 286, w: 150, h: 18 },
      { x: 2070, y: 340, w: 160, h: 18 },
    ],
    optionalPlatformCount: 6,
    hazardSlots: [
      { x: 330, y: 392, w: 58, h: 18 },
      { x: 752, y: 392, w: 58, h: 18 },
      { x: 1165, y: 392, w: 60, h: 18 },
      { x: 1605, y: 392, w: 64, h: 18 },
      { x: 2040, y: 392, w: 64, h: 18 },
    ],
    hazardCount: 2,
    enemySlots: [
      patrol('w1-dogma-a', 520, 376, 440, 700, 80, 14),
      patrol('w1-dogma-b', 1340, 376, 1280, 1550, 86, 16),
      flying('w1-doubt-a', 980, 252, 880, 1170, 62, 26, 12),
      flying('w1-doubt-b', 1860, 246, 1720, 2020, 72, 26, 10),
    ],
    enemyCount: 3,
    chestSlots: [
      { x: 520, y: 260 },
      { x: 770, y: 234 },
      { x: 1335, y: 242 },
      { x: 1892, y: 242 },
      { x: 2145, y: 296 },
    ],
    chestCount: 2,
    requiredChests: 1,
    gate: { x: 2340, y: 310, w: 82, h: 100 },
  },
  {
    id: 'chapter-2',
    unlockId: 'chapter-2',
    clearUnlockId: clearUnlockId('chapter-2'),
    title: getChapter('chapter-2').theme.worldName,
    accent: getChapter('chapter-2').theme.accent,
    width: 2920,
    start: { x: 42, y: 340 },
    checkpoint: { x: 42, y: 340 },
    background: 'dialectic',
    basePlatforms: [
      { x: 0, y: groundY, w: 280, h: 42 },
      { x: 380, y: groundY, w: 310, h: 42 },
      { x: 810, y: groundY, w: 280, h: 42 },
      { x: 1210, y: groundY, w: 300, h: 42 },
      { x: 1640, y: groundY, w: 300, h: 42 },
      { x: 2060, y: groundY, w: 300, h: 42 },
      { x: 2480, y: groundY, w: 400, h: 42 },
    ],
    optionalPlatforms: [
      { x: 180, y: 328, w: 150, h: 18 },
      { x: 470, y: 282, w: 150, h: 18 },
      { x: 720, y: 338, w: 160, h: 18 },
      { x: 990, y: 280, w: 150, h: 18 },
      { x: 1280, y: 326, w: 180, h: 18 },
      { x: 1540, y: 276, w: 150, h: 18 },
      { x: 1830, y: 326, w: 170, h: 18 },
      { x: 2130, y: 262, w: 160, h: 18 },
      { x: 2385, y: 332, w: 170, h: 18 },
      { x: 2630, y: 288, w: 170, h: 18 },
    ],
    optionalPlatformCount: 8,
    hazardSlots: [
      { x: 300, y: 392, w: 58, h: 18 },
      { x: 710, y: 392, w: 70, h: 18 },
      { x: 1110, y: 392, w: 74, h: 18 },
      { x: 1525, y: 392, w: 78, h: 18 },
      { x: 1950, y: 392, w: 86, h: 18 },
      { x: 2375, y: 392, w: 80, h: 18 },
    ],
    hazardCount: 3,
    enemySlots: [
      patrol('w2-static-a', 455, 376, 390, 660, 96, 18),
      flying('w2-abstract-a', 1010, 242, 900, 1180, 78, 34, 14),
      patrol('w2-fetish-a', 1290, 376, 1230, 1490, 108, 20),
      flying('w2-abstract-b', 1710, 250, 1600, 1940, 88, 38, 16),
      patrol('w2-static-b', 2150, 376, 2080, 2350, 116, 22),
    ],
    enemyCount: 4,
    chestSlots: [
      { x: 485, y: 238 },
      { x: 1010, y: 236 },
      { x: 1300, y: 282 },
      { x: 1550, y: 232 },
      { x: 2140, y: 218 },
      { x: 2645, y: 244 },
    ],
    chestCount: 3,
    requiredChests: 2,
    gate: { x: 2770, y: 310, w: 82, h: 100 },
  },
  {
    id: 'chapter-3',
    unlockId: 'chapter-3',
    clearUnlockId: clearUnlockId('chapter-3'),
    title: getChapter('chapter-3').theme.worldName,
    accent: getChapter('chapter-3').theme.accent,
    width: 3360,
    start: { x: 42, y: 340 },
    checkpoint: { x: 42, y: 340 },
    background: 'history',
    basePlatforms: [
      { x: 0, y: groundY, w: 260, h: 42 },
      { x: 370, y: groundY, w: 280, h: 42 },
      { x: 770, y: groundY, w: 260, h: 42 },
      { x: 1150, y: groundY, w: 290, h: 42 },
      { x: 1580, y: groundY, w: 270, h: 42 },
      { x: 1980, y: groundY, w: 260, h: 42 },
      { x: 2380, y: groundY, w: 280, h: 42 },
      { x: 2780, y: groundY, w: 540, h: 42 },
    ],
    optionalPlatforms: [
      { x: 150, y: 330, w: 145, h: 18 },
      { x: 440, y: 282, w: 150, h: 18 },
      { x: 710, y: 330, w: 150, h: 18 },
      { x: 965, y: 270, w: 160, h: 18 },
      { x: 1240, y: 326, w: 155, h: 18 },
      { x: 1510, y: 262, w: 145, h: 18 },
      { x: 1790, y: 320, w: 150, h: 18 },
      { x: 2070, y: 264, w: 150, h: 18 },
      { x: 2330, y: 318, w: 160, h: 18 },
      { x: 2580, y: 252, w: 150, h: 18 },
      { x: 2850, y: 318, w: 165, h: 18 },
      { x: 3055, y: 270, w: 170, h: 18 },
    ],
    optionalPlatformCount: 10,
    hazardSlots: [
      { x: 280, y: 392, w: 62, h: 18 },
      { x: 670, y: 392, w: 68, h: 18 },
      { x: 1050, y: 392, w: 78, h: 18 },
      { x: 1460, y: 392, w: 82, h: 18 },
      { x: 1870, y: 392, w: 80, h: 18 },
      { x: 2260, y: 392, w: 88, h: 18 },
      { x: 2670, y: 392, w: 78, h: 18 },
    ],
    hazardCount: 4,
    enemySlots: [
      patrol('w3-alienation-a', 455, 376, 380, 635, 106, 18),
      flying('w3-ideology-a', 1010, 236, 900, 1170, 90, 40, 16),
      patrol('w3-bureaucracy-a', 1255, 376, 1170, 1430, 118, 22),
      flying('w3-crisis-a', 1720, 246, 1600, 1900, 98, 42, 18),
      patrol('w3-bureaucracy-b', 2050, 376, 1990, 2220, 126, 20),
      flying('w3-crisis-b', 2520, 246, 2400, 2680, 112, 44, 18),
    ],
    enemyCount: 5,
    chestSlots: [
      { x: 450, y: 238 },
      { x: 980, y: 226 },
      { x: 1260, y: 282 },
      { x: 1800, y: 276 },
      { x: 2080, y: 220 },
      { x: 2590, y: 208 },
      { x: 3065, y: 226 },
    ],
    chestCount: 4,
    requiredChests: 3,
    gate: { x: 3200, y: 310, w: 82, h: 100 },
  },
]

export const createPlatformerSession = (options: PlatformerSessionOptions = {}): PlatformerSession => {
  const seed = options.seed ?? makeSeed()
  const rng = createRng(seed)
  const selectedModuleIds = (options.selectedModuleIds?.length ? options.selectedModuleIds : allModuleIds)
    .filter((moduleId) => allModuleIds.includes(moduleId))
  const answeredQuestionIds = options.answeredQuestionIds ?? []
  const usedQuestionIds = new Set<string>()

  return {
    seed,
    selectedModuleIds,
    worlds: worldTemplates.map((template) => createWorld(template, selectedModuleIds, answeredQuestionIds, usedQuestionIds, rng)),
  }
}

export const platformerWorlds = createPlatformerSession({ seed: 10101 }).worlds
export const firstWorldId = platformerWorlds[0].id

export const platformerTopicGroups = chapters.map((chapter) => ({
  chapter,
  modules: modules.filter((module) => module.chapterId === chapter.id),
}))

export const getDefaultPlatformerModuleIds = (chapterId?: ChapterId) =>
  chapterId ? chapterModuleIds(chapterId) : allModuleIds
