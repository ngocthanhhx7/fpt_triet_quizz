import type { homeContent } from '../../data/homeContent'

interface IntroSectionProps {
  intro: typeof homeContent.intro
}

export function IntroSection({ intro }: IntroSectionProps) {
  return (
    <section id="learn" className="relative overflow-hidden w-full min-h-screen bg-[#010828] flex flex-col z-10">
      <video src={intro.media.src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.78] saturate-[0.82]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(0,240,255,0.08),transparent_30%),linear-gradient(145deg,rgba(0,2,18,0.86),rgba(1,8,40,0.72)_44%,rgba(1,8,40,0.92))] z-0" />

      <div className="max-w-[1831px] w-full mx-auto flex-grow flex flex-col justify-between py-16 lg:py-24 px-4 sm:px-8 lg:px-[86px] relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start w-full gap-10">
          <div className="relative inline-block self-start">
            <h2 className="font-grotesk text-[34px] sm:text-[48px] md:text-[58px] lg:text-[70px] uppercase leading-[1.6] text-cream">
              {intro.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div className="absolute -bottom-[40px] sm:-bottom-[60px] lg:-bottom-[80px] -right-[24px] sm:-right-[48px] lg:-right-[72px] -rotate-2 font-condiment text-[42px] sm:text-[60px] lg:text-[82px] text-neon/75 normal-case select-none [text-shadow:0_0_18px_rgba(111,255,0,0.16)]">
              {intro.accentText}
            </div>
          </div>

          <div className="max-w-[420px] mt-10 lg:mt-0 lg:self-end liquid-glass rounded-[28px] p-6 ring-1 ring-white/[0.05]">
            <p className="font-sans text-[15px] sm:text-[16px] text-cream/80 leading-7">{intro.body}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 lg:mt-32">
          {intro.ghostBody.map((text, index) => (
            <div key={text} className="liquid-glass rounded-[28px] p-6 lg:p-8 text-cream/70 hover:bg-white/[0.045] hover:text-cream transition-colors">
              <span className="font-condiment text-neon/75 text-[34px]">0{index + 1}</span>
              <p className="mt-3 font-mono text-[13px] sm:text-[14px] uppercase leading-relaxed tracking-wide">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
