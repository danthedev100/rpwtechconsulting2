// components/Eyebrow.tsx — small section label, prefixed with the logo rings drawing in
import { LogoRings } from '@/components/LogoRings'

export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[#6d3bef] bg-violet-soft rounded-full pl-2.5 pr-4 py-1.5 text-[0.8rem] font-semibold mb-5 inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoRings data-anim="rings" strokeWidth={9} className="w-5 h-auto flex-shrink-0" />
      {children}
    </p>
  )
}
