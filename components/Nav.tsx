// components/Nav.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useScrolled } from '@/hooks/useScrolled'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const scrolled = useScrolled(80)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0e1c]/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,194,168,0.1),0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" aria-label="RPW Technical Consulting home">
          <Image
            src="/media/logo-transparent.png"
            alt="RPW Technical Consulting (FM) Ltd"
            width={220}
            height={50}
            className="h-11 w-auto"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8rem] tracking-[0.15em] text-white/40 hover:text-white transition-colors duration-200 relative group uppercase"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00c2a8] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#00c2a8] text-[#0a0e1c] px-4 py-2 text-[0.8rem] font-bold tracking-[0.15em] uppercase rounded-sm hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,194,168,0.35)] transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-white/60 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
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
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0a0e1c]/95 backdrop-blur-md border-t border-white/5`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
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
    </nav>
  )
}
