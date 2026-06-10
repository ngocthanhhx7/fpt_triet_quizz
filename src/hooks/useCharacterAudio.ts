import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_RATE = 1

interface CharacterAudioState {
  currentTime: number
  duration: number
  error: boolean
  isLoading: boolean
  isPlaying: boolean
  rate: number
}

export function useCharacterAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<CharacterAudioState>({
    currentTime: 0,
    duration: 0,
    error: false,
    isLoading: true,
    isPlaying: false,
    rate: DEFAULT_RATE,
  })

  useEffect(() => {
    const audio = new Audio(src)
    audio.preload = 'metadata'
    audio.playbackRate = DEFAULT_RATE
    audioRef.current = audio

    const resetTimer = window.setTimeout(() => {
      setState((current) => ({
        ...current,
        currentTime: 0,
        duration: 0,
        error: false,
        isLoading: true,
        isPlaying: false,
      }))
    }, 0)

    const updateProgress = () => {
      setState((current) => ({
        ...current,
        currentTime: audio.currentTime,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      }))
    }

    const markReady = () => {
      setState((current) => ({
        ...current,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
        isLoading: false,
      }))
    }

    const markPlaying = () => {
      setState((current) => ({ ...current, isPlaying: true, isLoading: false, error: false }))
    }

    const markPaused = () => {
      setState((current) => ({ ...current, isPlaying: false }))
    }

    const markError = () => {
      setState((current) => ({ ...current, error: true, isLoading: false, isPlaying: false }))
    }

    audio.addEventListener('loadedmetadata', markReady)
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('play', markPlaying)
    audio.addEventListener('pause', markPaused)
    audio.addEventListener('ended', markPaused)
    audio.addEventListener('error', markError)

    return () => {
      window.clearTimeout(resetTimer)
      audio.pause()
      audio.removeEventListener('loadedmetadata', markReady)
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('play', markPlaying)
      audio.removeEventListener('pause', markPaused)
      audio.removeEventListener('ended', markPaused)
      audio.removeEventListener('error', markError)
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = state.rate
    }
  }, [state.rate])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) {
      return false
    }

    try {
      await audio.play()
      return true
    } catch {
      setState((current) => ({ ...current, error: true, isPlaying: false, isLoading: false }))
      return false
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    audio.pause()
    audio.currentTime = 0
    setState((current) => ({ ...current, currentTime: 0, isPlaying: false }))
  }, [])

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause()
      return
    }

    void play()
  }, [pause, play, state.isPlaying])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const nextTime = Math.max(0, Math.min(time, Number.isFinite(audio.duration) ? audio.duration : 0))
    audio.currentTime = nextTime
    setState((current) => ({ ...current, currentTime: nextTime }))
  }, [])

  const setRate = useCallback((rate: number) => {
    setState((current) => ({ ...current, rate }))
  }, [])

  return {
    ...state,
    pause,
    play,
    seek,
    setRate,
    stop,
    toggle,
  }
}
