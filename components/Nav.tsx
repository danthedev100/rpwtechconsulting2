// components/Nav.tsx
'use client'

import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { NAV_LINKS } from '@/lib/site'

const SECTION_IDS = [...NAV_LINKS.map((l) => l.href.slice(1)), 'contact']

export function Nav() {
  const scrolled = useScrolled(80)
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    handler()
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-[#ffffff]/90 backdrop-blur-md shadow-[0_1px_0_rgba(109,59,239,0.1),0_4px_20px_rgba(15,18,34,0.075)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`max-w-[1120px] mx-auto px-6 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-16 md:h-[4.5rem]' : 'h-20 md:h-24'
        }`}
      >
        {/* Logo */}
        <a href="#top" aria-label="RPW Technical Consulting — back to top" className="block">
          <BrandLogo
            className={`w-auto transition-[height] duration-300 ${
              scrolled ? 'h-10 md:h-11' : 'h-12 md:h-16'
            }`}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`text-[0.95rem] font-medium hover:text-[#6d3bef] transition-colors duration-200 relative group ${
                  isActive ? 'text-[#6d3bef]' : 'text-ink/65'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#6d3bef] transition-all duration-200 group-hover:w-full ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            )
          })}
          <a
            href="#contact"
            className="bg-brand text-white px-4 py-2 text-[0.8rem] font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(109,59,239,0.35)] transition-all duration-200"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 text-ink/78 hover:text-ink transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-200 origin-center ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-200 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-200 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } border-t border-ink/5`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-ink/72 hover:text-ink transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-brand text-white px-4 py-3 text-sm font-semibold rounded-full text-center hover:brightness-110 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll progress */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-[#6d3bef] origin-left"
        style={{ width: '100%', transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
      />
    </header>
  )
}
