import { useCallback, useEffect, useMemo, useState } from 'react'

const DEFAULT_RATE = 0.95

export function useSpeechNarration() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [rate, setRate] = useState(DEFAULT_RATE)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    const synth = window.speechSynthesis

    const updateVoices = () => {
      setVoices(synth.getVoices())
      setIsSupported(true)
    }

    updateVoices()
    synth.onvoiceschanged = updateVoices

    return () => {
      synth.onvoiceschanged = null
    }
  }, [])

  const preferredVoice = useMemo(() => {
    if (voices.length === 0) {
      return null
    }

    return (
      voices.find((voice) => voice.lang.toLowerCase().startsWith('vi')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) ??
      voices[0]
    )
  }, [voices])

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) {
        return false
      }

      const synth = window.speechSynthesis
      synth.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      if (preferredVoice) {
        utterance.voice = preferredVoice
        utterance.lang = preferredVoice.lang
      } else {
        utterance.lang = 'vi-VN'
      }

      utterance.rate = rate
      utterance.pitch = 1
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synth.speak(utterance)
      return true
    },
    [isSupported, preferredVoice, rate],
  )

  useEffect(() => stop, [stop])

  return {
    isSpeaking,
    isSupported,
    preferredVoice,
    rate,
    setRate,
    speak,
    stop,
  }
}
