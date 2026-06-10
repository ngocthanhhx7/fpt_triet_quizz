import { useEffect, useMemo, useRef, useState } from 'react'

export interface GameInputState {
  left: boolean
  right: boolean
  jump: boolean
  interact: boolean
  attack: boolean
}

export type GameInputAction = keyof GameInputState

const initialInput: GameInputState = {
  left: false,
  right: false,
  jump: false,
  interact: false,
  attack: false,
}

const keyMap: Record<string, GameInputAction> = {
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  ArrowUp: 'jump',
  Space: 'jump',
  KeyW: 'jump',
  KeyE: 'interact',
  KeyJ: 'attack',
}

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return target.isContentEditable
    || target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLSelectElement
}

export function useInput(active = true) {
  const [input, setInput] = useState<GameInputState>(initialInput)
  const scopeRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef(input)
  const activeRef = useRef(active)

  useEffect(() => {
    inputRef.current = input
  }, [input])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const scope = scopeRef.current
    const isScopedEvent = (event: KeyboardEvent) => {
      const scope = scopeRef.current

      if (!scope || isEditableTarget(event.target)) {
        return false
      }

      const focusedElement = document.activeElement
      return Boolean(focusedElement && scope.contains(focusedElement))
    }

    const setKey = (event: KeyboardEvent, pressed: boolean) => {
      const action = keyMap[event.code]

      if (!action) {
        return
      }

      if (!pressed) {
        setInput((current) => ({ ...current, [action]: false }))
        return
      }

      if (!activeRef.current || !isScopedEvent(event)) {
        return
      }

      event.preventDefault()
      setInput((current) => ({ ...current, [action]: true }))
    }

    const onKeyDown = (event: KeyboardEvent) => setKey(event, true)
    const onKeyUp = (event: KeyboardEvent) => setKey(event, false)
    const onWindowBlur = () => setInput(initialInput)
    const onFocusOut = (event: FocusEvent) => {
      const scope = scopeRef.current
      const nextFocus = event.relatedTarget

      if (scope && (!nextFocus || !(nextFocus instanceof Node) || !scope.contains(nextFocus))) {
        setInput(initialInput)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onWindowBlur)
    scope?.addEventListener('focusout', onFocusOut)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onWindowBlur)
      scope?.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  const controls = useMemo(
    () => ({
      press: (action: GameInputAction) => setInput((current) => ({ ...current, [action]: true })),
      release: (action: GameInputAction) => setInput((current) => ({ ...current, [action]: false })),
      reset: () => setInput(initialInput),
    }),
    [],
  )

  return { input, inputRef, controls, scopeRef }
}
