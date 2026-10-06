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
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#0a1628]/90 backdrop-blur border border-[rgba(0,194,168,0.35)] text-[#00c2a8] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:bg-[#00c2a8] hover:text-[#0a0e1c] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </a>
  )
}
