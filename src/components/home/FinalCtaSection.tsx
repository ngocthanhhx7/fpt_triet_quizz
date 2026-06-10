import type { homeContent } from '../../data/homeContent'
import { SocialLinks } from './SocialLinks'

interface FinalCtaSectionProps {
  finalCta: typeof homeContent.finalCta
  socialLinks: typeof homeContent.socialLinks
}

export function FinalCtaSection({ finalCta, socialLinks }: FinalCtaSectionProps) {
  const BadgeIcon = finalCta.badge.icon

  return (
    <section id="final" className="relative w-full overflow-hidden bg-[#010828] z-10">
      <video
        src={finalCta.media.src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto block z-0"
      />

      <div className="absolute inset-0 flex items-center justify-end z-10 px-4 sm:px-8 lg:px-[86px]">
        <div className="relative text-right max-w-[90%] md:max-w-[80%] lg:pr-[18%] lg:pl-[15%]">
          <span className="absolute -top-[2rem] sm:-top-[3.5rem] lg:-top-[5.5rem] left-[-0.5rem] sm:left-[-2.5rem] lg:left-[-4.5rem] -rotate-3 font-condiment text-neon text-[18px] sm:text-[34px] md:text-[50px] lg:text-[68px] mix-blend-exclusion normal-case select-none">
            {finalCta.accentText}
          </span>
          <h2 className="font-grotesk text-[16px] sm:text-[30px] md:text-[45px] lg:text-[60px] uppercase leading-[1.6] text-cream">
            {finalCta.headlineLines.map((line) => (
              <div key={line} className="mb-4 sm:mb-8 lg:mb-12 last:mb-0">
                {line}
              </div>
            ))}
          </h2>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cream/80 backdrop-blur-sm">
            <BadgeIcon className="h-4 w-4 text-neon" /> {finalCta.badge.label}
          </div>
        </div>
      </div>

      <div className="absolute left-[8%] bottom-[12%] md:bottom-[15%] lg:bottom-[20%] z-20">
        <SocialLinks links={socialLinks} variant="panel" />
      </div>
    </section>
  )
}
