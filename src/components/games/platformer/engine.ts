import type { ChestDefinition, FrameResult, GameInputState, PlatformerRuntime, Rect, WorldDefinition } from './types'
import { canvasWidth } from './worlds'

const playerWidth = 34
const playerHeight = 42
const speed = 260
const gravity = 1120
const jumpVelocity = -540
const attackDuration = 0.18
const invulnerabilityDuration = 1

export const intersects = (left: Rect, right: Rect) =>
  left.x < right.x + right.w && left.x + left.w > right.x && left.y < right.y + right.h && left.y + left.h > right.y

const cloneEnemies = (world: WorldDefinition) => world.enemies.map((enemy) => ({ ...enemy, alive: true, direction: 1 as const }))

export const createRuntime = (world: WorldDefinition): PlatformerRuntime => ({
  player: {
    x: world.start.x,
    y: world.start.y,
    w: playerWidth,
    h: playerHeight,
    vx: 0,
    vy: 0,
    grounded: false,
    facing: 1,
    invulnerableUntil: 0,
    attackUntil: 0,
  },
  enemies: cloneEnemies(world),
  camera: { x: 0 },
  hp: 3,
  shards: 0,
  weapon: null,
  shield: { charges: 0, activeUntil: 0 },
  openedChestIds: [],
  correctChestIds: [],
  gateUnlocked: false,
  completed: false,
  message: 'Click vào khung game, dùng A/D hoặc ←/→ để chạy. Tìm rương và bấm E để mở quiz.',
  elapsed: 0,
})

const resetToCheckpoint = (runtime: PlatformerRuntime, world: WorldDefinition) => {
  runtime.player.x = world.checkpoint.x
  runtime.player.y = world.checkpoint.y
  runtime.player.vx = 0
  runtime.player.vy = 0
  runtime.player.grounded = false
}

const takeHit = (runtime: PlatformerRuntime, world: WorldDefinition, knockback = 105) => {
  if (runtime.elapsed < runtime.player.invulnerableUntil) {
    return
  }

  if (runtime.shield.charges > 0) {
    runtime.shield.charges -= 1
    runtime.shield.activeUntil = runtime.elapsed + 0.45
    runtime.player.invulnerableUntil = runtime.elapsed + 0.55
    runtime.message = runtime.shield.charges > 0
      ? `Khiên phương pháp đỡ đòn. Còn ${runtime.shield.charges} lượt chặn.`
      : 'Khiên phương pháp đã vỡ, hãy cẩn thận hơn.'
    return
  }

  runtime.hp -= 1
  runtime.player.invulnerableUntil = runtime.elapsed + invulnerabilityDuration
  runtime.player.x = Math.max(12, runtime.player.x - knockback * runtime.player.facing)
  runtime.player.vy = -220

  if (runtime.hp <= 0) {
    runtime.hp = 3
    runtime.message = 'HP về 0: quay lại checkpoint để thử lại với nhịp chậm hơn.'
    resetToCheckpoint(runtime, world)
    return
  }

  runtime.message = `Bị va chạm: mất 1 HP, còn ${runtime.hp}. Dùng J để phản công.`
}

const attackRect = (runtime: PlatformerRuntime): Rect => ({
  x: runtime.player.facing === 1 ? runtime.player.x + runtime.player.w - 4 : runtime.player.x - (runtime.weapon === 'historyPulse' ? 86 : 54),
  y: runtime.player.y + 8,
  w: runtime.weapon === 'historyPulse' ? 90 : 58,
  h: 28,
})

const resolvePlatforms = (runtime: PlatformerRuntime, world: WorldDefinition, deltaSeconds: number) => {
  const player = runtime.player
  player.grounded = false

  world.platforms.forEach((platform) => {
    const wasAbove = player.y + player.h - player.vy * deltaSeconds <= platform.y
    const fallingOntoPlatform = player.vy >= 0 && player.y + player.h >= platform.y && wasAbove

    if (fallingOntoPlatform && player.x + player.w > platform.x && player.x < platform.x + platform.w) {
      player.y = platform.y - player.h
      player.vy = 0
      player.grounded = true
    }
  })
}

const updateEnemies = (runtime: PlatformerRuntime, deltaSeconds: number) => {
  runtime.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return
    }

    enemy.x += enemy.speed * enemy.direction * deltaSeconds

    if (enemy.x < enemy.minX) {
      enemy.x = enemy.minX
      enemy.direction = 1
    }

    if (enemy.x + enemy.w > enemy.maxX) {
      enemy.x = enemy.maxX - enemy.w
      enemy.direction = -1
    }

    if (enemy.kind === 'flying' && enemy.baseY !== undefined) {
      enemy.y = enemy.baseY + Math.sin(runtime.elapsed * 2.8 + enemy.x * 0.01) * (enemy.amplitude ?? 24)
    }
  })
}

const resolveCombat = (runtime: PlatformerRuntime, world: WorldDefinition, input: GameInputState) => {
  if (input.attack && runtime.weapon && runtime.elapsed > runtime.player.attackUntil - attackDuration + 0.08) {
    runtime.player.attackUntil = runtime.elapsed + attackDuration
  }

  const isAttacking = runtime.elapsed < runtime.player.attackUntil
  const hitBox = isAttacking ? attackRect(runtime) : null

  runtime.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return
    }

    if (hitBox && intersects(hitBox, enemy)) {
      enemy.alive = false
      runtime.shards += enemy.kind === 'flying' ? 2 : 1
      runtime.message = enemy.kind === 'flying'
        ? 'Đòn đánh trúng quái bay: nhận thêm 2 shard.'
        : 'Đánh bại quái tuần tra: nhận 1 shard.'
      return
    }

    if (intersects(runtime.player, enemy)) {
      runtime.player.facing = runtime.player.x < enemy.x ? -1 : 1
      takeHit(runtime, world)
    }
  })
}

export const applyReward = (runtime: PlatformerRuntime, world: WorldDefinition, chest: ChestDefinition) => {
  if (runtime.openedChestIds.includes(chest.id)) {
    return
  }

  runtime.openedChestIds = [...runtime.openedChestIds, chest.id]
  runtime.correctChestIds = [...runtime.correctChestIds, chest.id]
  runtime.gateUnlocked = runtime.openedChestIds.length >= world.requiredChests
  runtime.shards += 2

  if (chest.rewardId === 'logicBlade') {
    runtime.weapon = 'logicBlade'
  }

  if (chest.rewardId === 'methodShield') {
    runtime.shield.charges = Math.max(runtime.shield.charges, 2)
  }

  if (chest.rewardId === 'historyPulse') {
    runtime.weapon = 'historyPulse'
  }
}

export const updateRuntime = (
  runtime: PlatformerRuntime,
  world: WorldDefinition,
  input: GameInputState,
  deltaSeconds: number,
): FrameResult => {
  runtime.elapsed += deltaSeconds

  const player = runtime.player
  player.vx = input.left ? -speed : input.right ? speed : 0

  if (player.vx !== 0) {
    player.facing = player.vx > 0 ? 1 : -1
  }

  if (input.jump && player.grounded) {
    player.vy = jumpVelocity
    player.grounded = false
  }

  player.vy += gravity * deltaSeconds
  player.x += player.vx * deltaSeconds
  player.y += player.vy * deltaSeconds
  player.x = Math.max(0, Math.min(world.width - player.w, player.x))

  resolvePlatforms(runtime, world, deltaSeconds)

  if (player.y > 560) {
    runtime.hp = Math.max(1, runtime.hp - 1)
    runtime.player.invulnerableUntil = runtime.elapsed + invulnerabilityDuration
    resetToCheckpoint(runtime, world)
    runtime.message = 'Rơi khỏi map: quay về checkpoint. Các khoảng trống cần canh nhịp nhảy.'
  }

  if (world.hazards.some((hazard) => intersects(player, hazard))) {
    takeHit(runtime, world, 80)
  }

  updateEnemies(runtime, deltaSeconds)
  resolveCombat(runtime, world, input)

  const quizChest = input.interact
    ? world.chests.find((chest) => !runtime.openedChestIds.includes(chest.id) && intersects(player, chest.interactZone))
    : undefined

  if (quizChest) {
    runtime.message = 'Rương mở quiz: trả lời đúng để nhận vật phẩm có tác dụng ngay.'
  }

  const shouldComplete = runtime.gateUnlocked && intersects(player, world.gate)

  runtime.camera.x = Math.max(0, Math.min(world.width - canvasWidth, player.x - canvasWidth * 0.42))

  return { quizChestId: quizChest?.id, shouldComplete }
}

export const getAttackRect = (runtime: PlatformerRuntime) => runtime.elapsed < runtime.player.attackUntil ? attackRect(runtime) : null
