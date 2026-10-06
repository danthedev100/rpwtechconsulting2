// components/EnquiryLink.tsx
'use client'

import type { EnquiryType } from '@/lib/site'

export const ENQUIRY_EVENT = 'rpw:enquiry'

interface EnquiryLinkProps {
  enquiry: EnquiryType
  className?: string
  children: React.ReactNode
}

/** Jumps to the contact form and pre-selects the matching enquiry type. */
export function EnquiryLink({ enquiry, className, children }: EnquiryLinkProps) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: enquiry }))}
    >
      {children}
    </a>
  )
}
