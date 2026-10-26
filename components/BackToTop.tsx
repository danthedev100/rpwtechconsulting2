// components/BackToTop.tsx
'use client'

import { ArrowUp } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

export function BackToTop() {
  const visible = useScrolled(900)

  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#fbfaf7]/90 backdrop-blur border border-[rgba(11,127,113,0.35)] text-[#0b7f71] flex items-center justify-center shadow-[0_8px_24px_rgba(20,24,43,0.1)] hover:bg-[#0b7f71] hover:text-white transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </a>
  )
}
