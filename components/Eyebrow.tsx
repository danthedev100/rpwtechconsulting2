// components/Eyebrow.tsx — small section label, prefixed with the logo rings drawing in
import { LogoRings } from '@/components/LogoRings'

interface EyebrowProps {
  children: React.ReactNode
  /** Editorial section number, shown as (01) */
  index?: string
  className?: string
}

export function Eyebrow({ children, index, className = '' }: EyebrowProps) {
  return (
    <p className={`flex items-center gap-3 text-[0.8rem] tracking-[0.18em] uppercase text-ink/60 mb-6 ${className}`}>
      <LogoRings data-anim="rings" strokeWidth={9} className="w-6 h-auto flex-shrink-0" />
      {index && <span className="font-mono text-[#5b36d6]">({index})</span>}
      <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
      {children}
    </p>
  )
}
