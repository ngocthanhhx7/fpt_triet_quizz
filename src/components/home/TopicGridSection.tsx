import { ArrowRight } from 'lucide-react'
import type { homeContent } from '../../data/homeContent'

interface TopicGridSectionProps {
  topics: typeof homeContent.topics
}

export function TopicGridSection({ topics }: TopicGridSectionProps) {
  return (
    <section id="game-preview" className="relative overflow-hidden bg-[#010828] py-20 lg:py-32 z-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_12%,rgba(111,255,0,0.08),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(0,240,255,0.08),transparent_26%),linear-gradient(180deg,rgba(1,8,40,0.2),transparent_18%,rgba(1,8,40,0.25))]" />
      <div className="relative max-w-[1831px] w-full mx-auto px-4 sm:px-8 lg:px-[86px]">
        <div className="flex flex-row items-center justify-between gap-6 mb-16 lg:mb-24">
          <h2 className="font-grotesk text-[32px] sm:text-[45px] lg:text-[64px] uppercase leading-[1.3] text-cream">
            {topics.heading[0]} <br />
            <span className="flex items-center ml-10 sm:ml-24 lg:ml-32 gap-4 sm:gap-6 lg:gap-8">
              <span className="font-condiment text-neon/80 text-[42px] sm:text-[58px] lg:text-[78px] normal-case select-none leading-none mr-2 sm:mr-3 lg:mr-4 [text-shadow:0_0_16px_rgba(111,255,0,0.16)]">
                {topics.accentWord}
              </span>
              <span className="font-grotesk">{topics.heading[1]}</span>
            </span>
          </h2>

          <a href={topics.cta.href} className="flex flex-col items-start group focus:outline-none transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-grotesk text-[28px] sm:text-[42px] lg:text-[56px] text-cream leading-none">GO</span>
              <div className="flex flex-col items-start leading-[0.9]">
                <span className="font-grotesk text-[13px] sm:text-[20px] lg:text-[26px] text-cream">TO</span>
                <span className="font-grotesk text-[13px] sm:text-[20px] lg:text-[26px] text-cream">PRACTICE</span>
              </div>
            </div>
            <div className="w-full bg-neon/80 h-[5px] sm:h-[7px] lg:h-[8px] mt-2 rounded-full transition-all duration-300 group-hover:opacity-75" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {topics.cards.map((card) => {
            const Icon = card.icon

            return (
              <a
                href={card.href}
                key={card.title}
                className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/[0.055] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden bg-white/5">
                  <video
                    src={card.media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.92] saturate-[0.88] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010828]/88 via-[#010828]/18 to-transparent" />
                  <div className="absolute left-5 bottom-5 right-5">
                    <Icon className="w-9 h-9 text-neon/80 mb-4" />
                    <h3 className="font-grotesk text-3xl uppercase leading-none">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-cream/74 font-sans">{card.description}</p>
                  </div>
                </div>

                <div className="mt-[18px] liquid-glass rounded-[20px] px-5 py-4 flex items-center justify-between ring-1 ring-white/[0.04]">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-cream/66 font-mono tracking-wider">{card.metaLabel}</span>
                    <span className="text-[16px] text-cream/92 font-mono font-bold mt-1">{card.metaValue}</span>
                  </div>
                  <span className="w-12 h-12 rounded-full bg-gradient-to-br from-neon/90 to-cyan/80 flex items-center justify-center text-[#010828] shadow-[0_0_18px_rgba(111,255,0,0.12)] group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
