import type { EnemyState, PlatformerRuntime, Rect, WorldDefinition } from './types'
import { canvasHeight, canvasWidth, groundY } from './worlds'
import { getAttackRect } from './engine'
import { getReward } from './rewards'

const drawRect = (context: CanvasRenderingContext2D, rect: Rect, fill: string) => {
  context.fillStyle = fill
  context.fillRect(rect.x, rect.y, rect.w, rect.h)
}

const drawStarfield = (context: CanvasRenderingContext2D, tint: string) => {
  context.fillStyle = tint
  for (let starIndex = 0; starIndex < 42; starIndex += 1) {
    const x = (starIndex * 79) % canvasWidth
    const y = (starIndex * 37) % 210
    context.fillRect(x, y, 2, 2)
  }
}

const drawEnemy = (context: CanvasRenderingContext2D, enemy: EnemyState, accent: string) => {
  context.fillStyle = enemy.kind === 'flying' ? accent : '#f7f2d4'
  context.beginPath()
  context.roundRect(enemy.x, enemy.y, enemy.w, enemy.h, 10)
  context.fill()
  context.fillStyle = '#010828'
  context.fillRect(enemy.x + 9, enemy.y + 8, 6, 6)
  context.fillRect(enemy.x + enemy.w - 15, enemy.y + 8, 6, 6)
}

export const drawScene = (context: CanvasRenderingContext2D, world: WorldDefinition, runtime: PlatformerRuntime) => {
  context.clearRect(0, 0, canvasWidth, canvasHeight)

  const gradient = context.createLinearGradient(0, 0, canvasWidth, canvasHeight)
  if (world.background === 'worldview') {
    gradient.addColorStop(0, 'rgba(2,8,31,1)')
    gradient.addColorStop(1, 'rgba(8,16,57,1)')
  } else if (world.background === 'dialectic') {
    gradient.addColorStop(0, 'rgba(1,8,40,1)')
    gradient.addColorStop(1, 'rgba(20,12,62,1)')
  } else {
    gradient.addColorStop(0, 'rgba(18,9,3,1)')
    gradient.addColorStop(1, 'rgba(40,12,16,1)')
  }
  context.fillStyle = gradient
  context.fillRect(0, 0, canvasWidth, canvasHeight)

  drawStarfield(context, 'rgba(255,255,255,0.07)')

  const cameraX = runtime.camera.x

  context.save()
  context.translate(-cameraX, 0)

  drawRect(context, { x: 0, y: 0, w: world.width, h: 24 }, 'rgba(255,255,255,0.03)')

  world.platforms.forEach((platform) => {
    drawRect(context, platform, 'rgba(239,244,255,0.08)')
    drawRect(context, { x: platform.x, y: platform.y, w: platform.w, h: 3 }, world.accent)
  })

  world.hazards.forEach((hazard) => {
    context.fillStyle = '#ff4f82'
    context.beginPath()
    context.moveTo(hazard.x, hazard.y + hazard.h)
    context.lineTo(hazard.x + hazard.w / 2, hazard.y)
    context.lineTo(hazard.x + hazard.w, hazard.y + hazard.h)
    context.closePath()
    context.fill()
  })

  world.chests.forEach((chest) => {
    const isOpened = runtime.openedChestIds.includes(chest.id)
    context.fillStyle = isOpened ? 'rgba(111,255,0,0.22)' : '#f0a400'
    context.fillRect(chest.x, chest.y, chest.w, chest.h)
    context.fillStyle = '#010828'
    context.fillRect(chest.x + 8, chest.y + 17, chest.w - 16, 6)
  })

  drawRect(context, world.gate, runtime.gateUnlocked ? 'rgba(111,255,0,0.08)' : 'rgba(255,255,255,0.06)')
  context.strokeStyle = runtime.gateUnlocked ? world.accent : 'rgba(255,255,255,0.24)'
  context.lineWidth = 4
  context.strokeRect(world.gate.x, world.gate.y, world.gate.w, world.gate.h)

  runtime.enemies.forEach((enemy) => {
    if (enemy.alive) {
      drawEnemy(context, enemy, world.accent)
    }
  })

  const attackRect = getAttackRect(runtime)
  if (attackRect) {
    context.fillStyle = runtime.weapon === 'historyPulse' ? 'rgba(111,255,0,0.28)' : 'rgba(0,240,255,0.24)'
    context.fillRect(attackRect.x, attackRect.y, attackRect.w, attackRect.h)
  }

  context.fillStyle = runtime.shield.charges > 0 ? 'rgba(0,240,255,0.8)' : '#eff4ff'
  context.fillRect(runtime.player.x, runtime.player.y, runtime.player.w, runtime.player.h)
  context.fillStyle = '#010828'
  context.fillRect(runtime.player.x + 8, runtime.player.y + 12, 6, 6)
  context.fillRect(runtime.player.x + 22, runtime.player.y + 12, 6, 6)

  context.restore()

  context.fillStyle = world.accent
  context.font = '22px Anton, sans-serif'
  context.fillText(world.title.toUpperCase(), 28, 42)

  if (runtime.shield.charges > 0) {
    context.fillStyle = 'rgba(0,240,255,0.12)'
    context.fillRect(16, canvasHeight - 40, 140, 16)
    context.fillStyle = '#00f0ff'
    context.fillText(`Shield ${runtime.shield.charges}`, 28, canvasHeight - 26)
  }

  const nearestChest = world.chests
    .map((chest) => ({ chest, distance: Math.abs(chest.x - runtime.player.x) }))
    .sort((left, right) => left.distance - right.distance)[0]?.chest

  if (nearestChest) {
    context.fillStyle = 'rgba(255,255,255,0.72)'
    context.font = '13px Inter, sans-serif'
    context.fillText(getReward(nearestChest.rewardId).label, nearestChest.x - cameraX - 8, nearestChest.y - 10)
  }

  context.fillText(`Map ${Math.round(world.width)}px`, 28, 66)
  context.fillText(`Rương ${runtime.openedChestIds.length}/${world.chests.length}`, 28, 84)
  context.fillText(`Cần mở ${world.requiredChests}`, 28, 102)
}

export const drawGroundLabel = groundY
