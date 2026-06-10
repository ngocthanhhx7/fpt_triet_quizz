import { useEffect, useRef } from 'react'

export function useGameLoop(onFrame: (deltaSeconds: number) => void, running: boolean) {
  const frameRef = useRef(onFrame)

  useEffect(() => {
    frameRef.current = onFrame
  }, [onFrame])

  useEffect(() => {
    if (!running) {
      return undefined
    }

    let rafId = 0
    let lastTime = performance.now()

    const tick = (time: number) => {
      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      frameRef.current(deltaSeconds)
      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(rafId)
  }, [running])
}
