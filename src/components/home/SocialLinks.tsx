import type { SocialLink } from '../../data/homeContent'

interface SocialLinksProps {
  links: SocialLink[]
  variant?: 'row' | 'stack' | 'panel'
}

export function SocialLinks({ links, variant = 'row' }: SocialLinksProps) {
  if (variant === 'panel') {
    return (
      <div className="liquid-glass rounded-[0.75rem] md:rounded-[1rem] lg:rounded-[1.25rem] flex flex-col w-[14vw] min-w-[72px] max-w-[220px]">
        {links.map(({ icon: Icon, label, href, external }, index) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className={`flex items-center justify-center text-cream hover:bg-white/5 transition-colors duration-300 aspect-square ${
              index < links.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <Icon className="w-[28%] h-[28%]" />
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex ${variant === 'stack' ? 'flex-col' : 'flex-row'} gap-4`}>
      {links.map(({ icon: Icon, label, href, external }) => (
        <a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-cream hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
        >
          <Icon className="w-[20px] h-[20px]" />
        </a>
      ))}
    </div>
  )
}
