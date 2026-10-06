// components/Nav.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
          ? 'bg-[#0a0e1c]/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,194,168,0.1),0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`max-w-[1120px] mx-auto px-6 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Logo */}
        <a href="#top" aria-label="RPW Technical Consulting — back to top">
          <Image
            src="/media/logo-transparent.png"
            alt="RPW Technical Consulting (FM) Ltd"
            width={440}
            height={161}
            className={`w-auto transition-[height] duration-300 ${scrolled ? 'h-14' : 'h-20'}`}
            priority
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
                className={`text-[0.8rem] tracking-[0.15em] hover:text-white transition-colors duration-200 relative group uppercase ${
                  isActive ? 'text-white' : 'text-white/45'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#00c2a8] transition-all duration-200 group-hover:w-full ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            )
          })}
          <a
            href="#contact"
            className="bg-[#00c2a8] text-[#0a0e1c] px-4 py-2 text-[0.8rem] font-bold tracking-[0.15em] uppercase rounded-sm hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,194,168,0.35)] transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 text-white/70 hover:text-white transition-colors"
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
        } border-t border-white/5`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-white/60 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#00c2a8] text-[#0a0e1c] px-4 py-3 text-sm font-bold tracking-widest uppercase rounded-sm text-center hover:brightness-110 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll progress */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-[#00c2a8] origin-left"
        style={{ width: '100%', transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
      />
    </header>
  )
}
