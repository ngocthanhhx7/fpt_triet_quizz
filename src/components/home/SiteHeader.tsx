import type { NavItem } from '../../data/homeContent'

interface SiteHeaderProps {
  brand: string
  navItems: NavItem[]
}

export function SiteHeader({ brand, navItems }: SiteHeaderProps) {
  return (
    <header className="relative z-30 py-5 lg:py-10">
      <div className="flex items-center justify-between gap-4 lg:gap-8">
        <a
          href="#home"
          className="font-grotesk text-[15px] sm:text-[16px] uppercase tracking-[0.24em] text-cream/95 drop-shadow-[0_1px_12px_rgba(1,8,40,0.55)]"
        >
          {brand}
        </a>

        <a
          href="#/games"
          className="inline-flex lg:hidden items-center rounded-full bg-neon/90 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#010828] shadow-[0_0_20px_rgba(111,255,0,0.14)] transition-colors hover:bg-neon"
        >
          Play
        </a>

        <nav className="hidden lg:block">
          <ul className="liquid-glass flex items-center gap-[30px] rounded-[28px] bg-[#041033]/70 px-[36px] py-[18px] ring-1 ring-white/[0.06]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-grotesk text-[12px] uppercase tracking-wider text-cream/86 hover:text-neon transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#/games"
          className="hidden lg:inline-flex items-center justify-end font-mono text-xs uppercase tracking-widest text-neon/90 hover:text-cream transition-colors"
        >
          Play
        </a>
      </div>

      <nav className="mt-4 lg:hidden">
        <ul className="liquid-glass flex items-center gap-1 overflow-x-auto whitespace-nowrap rounded-full bg-[#041033]/72 px-2 py-2 ring-1 ring-white/[0.06] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="inline-flex rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/78 transition-colors hover:bg-white/[0.06] hover:text-cream"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
