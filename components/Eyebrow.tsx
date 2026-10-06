// components/Eyebrow.tsx — small section label, prefixed with the logo rings drawing in
import { LogoRings } from '@/components/LogoRings'

export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[#00c2a8] text-[0.75rem] tracking-[0.3em] uppercase font-bold mb-4 inline-flex items-center gap-3 ${className}`}
    >
      <LogoRings data-anim="rings" strokeWidth={9} className="w-6 h-auto flex-shrink-0" />
      {children}
    </p>
  )
}
