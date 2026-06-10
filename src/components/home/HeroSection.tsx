import { ArrowRight, Play } from 'lucide-react'
import type { homeContent } from '../../data/homeContent'
import { SiteHeader } from './SiteHeader'
import { SocialLinks } from './SocialLinks'

interface HeroSectionProps {
  content: typeof homeContent
}

export function HeroSection({ content }: HeroSectionProps) {
  const { hero, navItems, socialLinks, brand } = content

  return (
    <section id="home" className="relative overflow-hidden rounded-b-[32px] w-full min-h-screen bg-[#010828] flex flex-col z-10">
      <video src={hero.media.src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.85] saturate-[0.85]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(111,255,0,0.1),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(0,240,255,0.08),transparent_28%),linear-gradient(120deg,rgba(1,8,40,0.78),rgba(1,8,40,0.93)_66%,rgba(0,2,18,0.96))] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,8,40,0.16),transparent_42%,rgba(1,8,40,0.32))] z-0" />

      <div className="max-w-[1831px] w-full mx-auto flex-grow flex flex-col px-4 sm:px-8 lg:px-[86px] relative z-10">
        <SiteHeader brand={brand} navItems={navItems} />

        <div className="hidden lg:flex absolute top-32 right-12 lg:right-[86px] z-20">
          <SocialLinks links={socialLinks} variant="stack" />
        </div>

        <div className="flex-grow flex flex-col justify-center py-12">
          <div className="relative max-w-[920px] w-full lg:ml-24">
            <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.34em] text-neon/[0.85] mb-8 sm:mb-10">{hero.eyebrow}</p>
            <h1 className="font-grotesk text-[46px] sm:text-[70px] md:text-[92px] lg:text-[112px] uppercase leading-[1.3] text-cream">
              {hero.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="absolute top-[36%] right-[-10px] sm:right-[-20px] md:right-[-50px] lg:right-[-74px] -rotate-2 font-condiment text-[36px] sm:text-[52px] md:text-[70px] lg:text-[88px] text-neon/80 opacity-90 normal-case whitespace-nowrap select-none [text-shadow:0_0_18px_rgba(111,255,0,0.18)]">
              {hero.accentText}
            </div>

            <p className="mt-8 max-w-[620px] font-sans text-sm sm:text-base text-cream/78 leading-7">{hero.body}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-neon/90 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#010828] shadow-[0_0_22px_rgba(111,255,0,0.16)] hover:bg-neon hover:scale-105 transition-all duration-300"
              >
                <Play className="h-4 w-4 fill-current" /> {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream/[0.88] hover:border-neon/60 hover:bg-white/[0.06] hover:text-neon/90 transition-colors duration-300"
              >
                {hero.secondaryCta.label} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex lg:hidden justify-center mt-16">
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </section>
  )
}
