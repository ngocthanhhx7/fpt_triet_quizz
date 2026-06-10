import { Check, Lock, Pause, Play, RotateCcw, Shield, Shuffle, Swords } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GameProgress, GameResult } from '../../../data/learningTypes'
import { useGameLoop } from '../../../hooks/useGameLoop'
import { useInput, type GameInputAction } from '../../../hooks/useInput'
import { GameCompletionPanel } from '../GameCompletionPanel'
import { applyReward, createRuntime, updateRuntime } from './engine'
import { getReward } from './rewards'
import { drawScene } from './renderer'
import type { PlatformerRuntime, WorldDefinition } from './types'
import {
  canvasHeight,
  canvasWidth,
  createPlatformerSession,
  platformerTopicGroups,
  platformerWorlds,
  type PlatformerSession,
} from './worlds'

interface DialecticPlatformerProps {
  progress: GameProgress
  onAnswer: (questionId: string, correct: boolean) => void
  onComplete: (result: GameResult) => void
}

const mobileActions: GameInputAction[] = ['left', 'right', 'jump', 'interact', 'attack']
const allTopicModuleIds = platformerTopicGroups.flatMap((group) => group.modules.map((module) => module.id))

const cloneRuntimeForHud = (runtime: PlatformerRuntime): PlatformerRuntime => ({
  ...runtime,
  player: { ...runtime.player },
  camera: { ...runtime.camera },
  shield: { ...runtime.shield },
  enemies: runtime.enemies.map((enemy) => ({ ...enemy })),
  openedChestIds: [...runtime.openedChestIds],
  correctChestIds: [...runtime.correctChestIds],
})

const isWorldUnlocked = (progress: GameProgress, worlds: WorldDefinition[], worldIndex: number) => {
  if (worldIndex === 0) {
    return true
  }

  const world = worlds[worldIndex]
  return progress.unlockedStages.includes(world.unlockId)
}

const createResult = (runtime: PlatformerRuntime, worlds: WorldDefinition[], levelIndex: number): GameResult => {
  const world = worlds[levelIndex]
  const nextWorld = worlds[levelIndex + 1]
  const openedRewards = world.chests
    .filter((chest) => runtime.openedChestIds.includes(chest.id))
    .map((chest) => chest.rewardId)

  return {
    gameId: 'hanh-trinh-bien-chung',
    score:
      520
      + levelIndex * 240
      + runtime.hp * 90
      + runtime.shards * 55
      + runtime.correctChestIds.length * 120
      + runtime.enemies.filter((enemy) => !enemy.alive).length * 70,
    correctAnswers: runtime.correctChestIds.length,
    timeSpent: Math.max(1, Math.round(runtime.elapsed / 60)),
    rewards: ['triThucShard', ...openedRewards],
    newUnlocks: [world.clearUnlockId, nextWorld?.unlockId].filter((item): item is string => Boolean(item)),
  }
}

export function DialecticPlatformer({ progress, onAnswer, onComplete }: DialecticPlatformerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const lastHudUpdateRef = useRef(0)
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(allTopicModuleIds)
  const [session, setSession] = useState<PlatformerSession>(() =>
    createPlatformerSession({ seed: Date.now(), selectedModuleIds: allTopicModuleIds, answeredQuestionIds: progress.answeredQuestionIds }),
  )
  const worlds = session.worlds
  const [sessionStarted, setSessionStarted] = useState(false)
  const [levelIndex, setLevelIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [activeChestId, setActiveChestId] = useState<string | null>(null)
  const [hud, setHud] = useState(() => createRuntime(platformerWorlds[0]))
  const [completionResult, setCompletionResult] = useState<GameResult | null>(null)
  const selectedLevelIndex = useMemo(
    () => isWorldUnlocked(progress, worlds, levelIndex) ? levelIndex : 0,
    [levelIndex, progress, worlds],
  )
  const quizOpen = activeChestId !== null
  const activeInput = sessionStarted && running && !quizOpen
  const { inputRef, controls, scopeRef } = useInput(activeInput)
  const runtimeRef = useRef<PlatformerRuntime>(createRuntime(worlds[0]))
  const world = worlds[selectedLevelIndex]
  const nextWorld = worlds[selectedLevelIndex + 1]
  const activeChest = activeChestId ? world.chests.find((chest) => chest.id === activeChestId) : undefined
  const activeReward = activeChest ? getReward(activeChest.rewardId) : undefined
  const enemiesDown = hud.enemies.filter((enemy) => !enemy.alive).length
  const uniqueRewardLabels = [...new Set(world.chests.map((chest) => getReward(chest.rewardId).label))]

  const focusGame = useCallback(() => {
    window.requestAnimationFrame(() => {
      scopeRef.current?.focus()
    })
  }, [scopeRef])

  const resetLevel = useCallback(() => {
    runtimeRef.current = createRuntime(worlds[selectedLevelIndex])
    setHud(cloneRuntimeForHud(runtimeRef.current))
    setActiveChestId(null)
    setCompletionResult(null)
    setRunning(sessionStarted)
    controls.reset()
    focusGame()
  }, [controls, focusGame, selectedLevelIndex, sessionStarted, worlds])

  useEffect(() => {
    resetLevel()
  }, [resetLevel])

  const startNewSession = useCallback(() => {
    const moduleIds = selectedModuleIds.length > 0 ? selectedModuleIds : allTopicModuleIds
    const nextSession = createPlatformerSession({
      selectedModuleIds: moduleIds,
      answeredQuestionIds: progress.answeredQuestionIds,
    })

    setSession(nextSession)
    setLevelIndex(0)
    setSessionStarted(true)
    setActiveChestId(null)
    setCompletionResult(null)
    setRunning(true)
    controls.reset()
    focusGame()
  }, [controls, focusGame, progress.answeredQuestionIds, selectedModuleIds])

  const completeLevel = useCallback((runtime: PlatformerRuntime) => {
    if (runtime.completed) {
      return
    }

    runtime.completed = true
    runtime.message = nextWorld
      ? `Qua cổng thành công! ${nextWorld.title} đã được mở.`
      : 'Hoàn thành cả 3 world! Progress đã được lưu.'
    const result = createResult(runtime, worlds, selectedLevelIndex)
    onComplete(result)

    if (!nextWorld) {
      setCompletionResult(result)
      setRunning(false)
    }

    setHud(cloneRuntimeForHud(runtime))
  }, [nextWorld, onComplete, selectedLevelIndex, worlds])

  useGameLoop((deltaSeconds) => {
    if (!sessionStarted || quizOpen) {
      return
    }

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    const runtime = runtimeRef.current
    const result = updateRuntime(runtime, world, inputRef.current, deltaSeconds)

    if (result.quizChestId) {
      controls.reset()
      setActiveChestId(result.quizChestId)
    }

    if (result.shouldComplete) {
      completeLevel(runtime)
    }

    drawScene(context, world, runtime)

    lastHudUpdateRef.current += deltaSeconds
    if (lastHudUpdateRef.current > 0.1) {
      setHud(cloneRuntimeForHud(runtime))
      lastHudUpdateRef.current = 0
    }
  }, running)

  const answerChestQuiz = (choiceIndex: number) => {
    if (!activeChest) {
      return
    }

    const runtime = runtimeRef.current
    const correct = choiceIndex === activeChest.question.answer
    onAnswer(activeChest.question.id, correct)

    if (correct) {
      applyReward(runtime, world, activeChest)
      runtime.message = runtime.gateUnlocked
        ? `Đúng! Nhận ${getReward(activeChest.rewardId).label}. Cổng đã mở, hãy đến cuối world.`
        : `Đúng! Nhận ${getReward(activeChest.rewardId).label}. Cần mở ${world.requiredChests} rương để mở cổng.`
    } else {
      runtime.hp = Math.max(1, runtime.hp - 1)
      runtime.message = 'Chưa đúng. Mất 1 HP, rương vẫn còn đó để thử lại sau khi đọc hint.'
    }

    controls.reset()
    setHud(cloneRuntimeForHud(runtime))
    setActiveChestId(null)
    focusGame()
  }

  const switchWorld = (index: number) => {
    if (!isWorldUnlocked(progress, worlds, index)) {
      return
    }

    setLevelIndex(index)
  }

  const goNextWorld = () => {
    if (nextWorld && isWorldUnlocked(progress, worlds, selectedLevelIndex + 1)) {
      setLevelIndex(selectedLevelIndex + 1)
    }
  }

  const toggleModule = (moduleId: string) => {
    setSelectedModuleIds((current) =>
      current.includes(moduleId)
        ? current.filter((item) => item !== moduleId)
        : [...current, moduleId],
    )
  }

  const toggleChapter = (moduleIds: string[]) => {
    setSelectedModuleIds((current) => {
      const allSelected = moduleIds.every((moduleId) => current.includes(moduleId))

      if (allSelected) {
        return current.filter((moduleId) => !moduleIds.includes(moduleId))
      }

      return [...new Set([...current, ...moduleIds])]
    })
  }

  const toggleRun = () => {
    controls.reset()

    if (running) {
      setRunning(false)
      return
    }

    focusGame()
    setRunning(true)
  }

  return (
    <div
      ref={scopeRef}
      tabIndex={0}
      className="liquid-glass rounded-[34px] p-5 sm:p-7 lg:p-8 outline-none focus-visible:ring-2 focus-visible:ring-neon/70"
      aria-label="Hành Trình Biện Chứng platformer. Click vào khung này để dùng bàn phím điều khiển."
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-magenta">Mini game 01</span>
          <h3 className="font-grotesk text-4xl uppercase mt-2">Hành Trình Biện Chứng</h3>
          <p className="mt-3 text-sm text-cream/72 max-w-3xl leading-6">{hud.message}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-cream/40">Session seed {session.seed}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {worlds.map((item, index) => {
            const unlocked = isWorldUnlocked(progress, worlds, index)
            return (
              <button
                key={item.id}
                type="button"
                disabled={!unlocked || !sessionStarted}
                onClick={() => switchWorld(index)}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  selectedLevelIndex === index && sessionStarted
                    ? 'border-neon bg-neon text-[#010828]'
                    : unlocked && sessionStarted
                      ? 'border-white/10 text-cream/70 hover:border-neon hover:text-neon'
                      : 'border-white/5 text-cream/30 cursor-not-allowed'
                }`}
              >
                {!unlocked ? <Lock className="mr-2 inline-block h-3 w-3" /> : null}
                World {index + 1}
              </button>
            )
          })}
        </div>
      </div>

      {completionResult ? (
        <div className="mb-6">
          <GameCompletionPanel
            title="Chúc mừng, bạn đã hoàn thành Hành Trình Biện Chứng"
            description="Cả 3 world đã được vượt qua và phần thưởng đã được lưu vào tiến độ. Bạn có thể bắt đầu một lượt mới với bộ câu hỏi được chọn lại."
            score={completionResult.score}
            correctAnswers={completionResult.correctAnswers}
            rewards={completionResult.rewards}
            primaryActionLabel="Lượt mới"
            onPrimaryAction={startNewSession}
            secondaryActionLabel="Reset world"
            onSecondaryAction={resetLevel}
          />
        </div>
      ) : null}

      {!sessionStarted ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.28em] text-neon">Chọn chủ đề ôn luyện</div>
                <p className="mt-3 text-sm leading-6 text-cream/68">
                  Các rương trong world sẽ ưu tiên câu hỏi thuộc những module bạn chọn. Nếu kho câu hỏi bị cạn, game sẽ tự fallback để lượt chơi không bị kẹt.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModuleIds(allTopicModuleIds)}
                className="rounded-full border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream/70 hover:border-cyan hover:text-cyan"
              >
                Chọn tất cả
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {platformerTopicGroups.map((group) => {
                const moduleIds = group.modules.map((module) => module.id)
                const selectedCount = moduleIds.filter((moduleId) => selectedModuleIds.includes(moduleId)).length

                return (
                  <div key={group.chapter.id} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                    <button
                      type="button"
                      onClick={() => toggleChapter(moduleIds)}
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <span className="font-grotesk text-2xl uppercase">{group.chapter.theme.worldName}</span>
                      <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-neon">
                        {selectedCount}/{moduleIds.length}
                      </span>
                    </button>
                    <div className="mt-4 grid gap-2">
                      {group.modules.map((module) => {
                        const selected = selectedModuleIds.includes(module.id)

                        return (
                          <button
                            key={module.id}
                            type="button"
                            onClick={() => toggleModule(module.id)}
                            className={`flex items-center gap-3 rounded-[16px] border px-3 py-3 text-left text-xs leading-5 transition-colors ${
                              selected
                                ? 'border-neon/50 bg-neon/10 text-neon'
                                : 'border-white/10 bg-black/10 text-cream/62 hover:border-cyan hover:text-cream'
                            }`}
                          >
                            <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${selected ? 'border-neon bg-neon text-[#010828]' : 'border-white/20'}`}>
                              {selected ? <Check className="h-3 w-3" /> : null}
                            </span>
                            {module.title}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/10 bg-black/20 p-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cream/45">Session mới</div>
              <div className="mt-3 font-grotesk text-5xl text-neon">{selectedModuleIds.length || allTopicModuleIds.length}</div>
              <p className="mt-3 text-sm leading-6 text-cream/65">
                Lượt chơi sẽ sinh map ổn định theo seed mới: vị trí rương, câu hỏi và phần thưởng đổi theo từng lượt.
              </p>
            </div>
            <button
              type="button"
              onClick={startNewSession}
              className="mt-6 rounded-full bg-neon px-5 py-4 font-mono text-xs uppercase tracking-widest text-[#010828] hover:scale-[1.02] transition-transform"
            >
              <Shuffle className="mr-2 inline-block h-4 w-4" /> Bắt đầu lượt chơi
            </button>
          </aside>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-[1fr_300px] gap-5">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/30">
              <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="block w-full h-auto" />

              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-[#010828]/70 px-4 py-2 text-[11px] uppercase tracking-widest text-cream/60 backdrop-blur">
                Focus tự động sau quiz
              </div>

              {activeChest && activeReward ? (
                <div className="absolute inset-0 bg-[#010828]/90 backdrop-blur-md p-5 sm:p-8 flex items-center justify-center">
                  <div className="max-w-2xl w-full liquid-glass rounded-[28px] p-6">
                    <div className="font-mono text-xs uppercase tracking-[0.28em] text-neon mb-3">Chest quiz · {activeReward.label}</div>
                    <h4 className="font-sans text-xl sm:text-2xl font-bold leading-snug">{activeChest.question.stem}</h4>
                    <div className="mt-5 grid gap-3">
                      {activeChest.question.choices.map((choice, index) => (
                        <button
                          key={`${activeChest.id}-${choice}`}
                          type="button"
                          onClick={() => answerChestQuiz(index)}
                          className="rounded-[18px] border border-white/10 p-4 text-left text-sm text-cream/75 hover:border-neon hover:text-neon transition-colors"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                    <p className="mt-5 text-xs text-cream/55 leading-5">Hint: {activeChest.question.explanation}</p>
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-black/20 p-5 flex flex-col justify-between">
              <div className="grid gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-cream/45">World</div>
                  <div className="font-grotesk text-3xl uppercase mt-1">{world.title}</div>
                  <p className="mt-2 text-xs leading-5 text-cream/52">
                    Map dài {world.width}px · {world.enemies.length} quái · {world.chests.length} rương · cần mở {world.requiredChests}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-cream/45">Reward: {uniqueRewardLabels.join(', ')}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-[18px] bg-white/[0.04] p-3">
                    <div className="font-grotesk text-3xl text-neon">{hud.hp}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cream/45">HP</div>
                  </div>
                  <div className="rounded-[18px] bg-white/[0.04] p-3">
                    <div className="font-grotesk text-3xl text-cyan">{hud.shards}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cream/45">Shard</div>
                  </div>
                  <div className="rounded-[18px] bg-white/[0.04] p-3">
                    <div className="font-grotesk text-3xl text-magenta">{enemiesDown}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cream/45">KO</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-[18px] bg-white/[0.04] p-3">
                    <div className="font-grotesk text-3xl text-neon">{hud.openedChestIds.length}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cream/45">Rương</div>
                  </div>
                  <div className="rounded-[18px] bg-white/[0.04] p-3">
                    <div className="font-grotesk text-3xl text-cyan">{world.requiredChests}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cream/45">Mở cổng</div>
                  </div>
                </div>
                <div className="grid gap-2 text-xs text-cream/60">
                  <div className="flex items-center gap-2"><Swords className="h-4 w-4 text-cyan" /> Weapon: {hud.weapon ?? 'chưa có'}</div>
                  <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-neon" /> Shield: {hud.shield.charges} lượt chặn</div>
                  <p className="leading-6">Keyboard khi game focus: A/D hoặc ←/→ chạy, W/Space nhảy, E mở rương, J đánh.</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {hud.completed && nextWorld ? (
                  <button type="button" onClick={goNextWorld} className="rounded-full border border-neon/50 bg-neon/10 px-4 py-3 text-xs uppercase tracking-widest text-neon hover:bg-neon hover:text-[#010828]">
                    Tiếp tục world sau
                  </button>
                ) : null}
                <button type="button" onClick={startNewSession} className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-3 text-xs uppercase tracking-widest text-cyan hover:bg-cyan hover:text-[#010828]">
                  <Shuffle className="inline-block h-4 w-4 mr-2" /> Lượt mới
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={toggleRun} className="rounded-full border border-white/10 px-4 py-3 text-xs uppercase tracking-widest hover:border-neon hover:text-neon">
                    {running ? <Pause className="inline-block h-4 w-4 mr-2" /> : <Play className="inline-block h-4 w-4 mr-2" />}
                    {running ? 'Pause' : 'Play'}
                  </button>
                  <button type="button" onClick={resetLevel} className="rounded-full border border-white/10 px-4 py-3 text-xs uppercase tracking-widest hover:border-neon hover:text-neon">
                    <RotateCcw className="inline-block h-4 w-4 mr-2" /> Reset
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2 md:hidden">
            {mobileActions.map((action) => (
              <button
                key={action}
                type="button"
                onPointerDown={() => controls.press(action)}
                onPointerUp={() => controls.release(action)}
                onPointerCancel={() => controls.release(action)}
                onPointerLeave={() => controls.release(action)}
                className="rounded-[18px] border border-white/10 py-4 font-mono text-[10px] uppercase tracking-widest text-cream/70 touch-none"
              >
                {action}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
