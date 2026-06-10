import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { useGSAP, gsap } from '../../lib/gsap'
import { useRef } from 'react'
import { NarrationPanel } from './NarrationPanel'
import { RiveCharacterPortrait } from './RiveCharacterPortrait'

interface StorySceneProps {
  philosopher: PhilosopherTimelineItem
  voiceAvailable: boolean
  isSpeaking: boolean
  rate: number
  reducedMotion: boolean
  onRateChange: (rate: number) => void
  onSpeak: (text: string) => void
  onStop: () => void
  onOpenDialog: () => void
}

export function StoryScene({
  philosopher,
  voiceAvailable,
  isSpeaking,
  rate,
  reducedMotion,
  onRateChange,
  onSpeak,
  onStop,
  onOpenDialog,
}: StorySceneProps) {
  const sceneRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) {
        return
      }

      const layers = gsap.utils.toArray<HTMLElement>('[data-story-layer]')
      gsap.fromTo(
        layers,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
        },
      )
    },
    { scope: sceneRef, dependencies: [philosopher.id, reducedMotion], revertOnUpdate: true },
  )

  return (
    <section ref={sceneRef} className="relative" data-story-shell>
      <div className="grid gap-6 2xl:grid-cols-[1.02fr_0.98fr]">
        <div data-story-layer>
          <RiveCharacterPortrait philosopher={philosopher} reducedMotion={reducedMotion} />
        </div>
        <div data-story-layer>
          <NarrationPanel
            philosopher={philosopher}
            isSpeaking={isSpeaking}
            voiceAvailable={voiceAvailable}
            rate={rate}
            onRateChange={onRateChange}
            onSpeak={onSpeak}
            onStop={onStop}
            onOpenDialog={onOpenDialog}
          />
        </div>
      </div>
    </section>
  )
}
