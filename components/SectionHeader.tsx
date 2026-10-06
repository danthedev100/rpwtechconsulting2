// components/SectionHeader.tsx
import { FadeUp } from '@/components/FadeUp'

interface SectionHeaderProps {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: 'center' | 'left'
  id?: string
}

export function SectionHeader({ eyebrow, title, intro, align = 'center', id }: SectionHeaderProps) {
  const centred = align === 'center'
  return (
    <FadeUp className={`mb-14 ${centred ? 'text-center mx-auto' : ''} max-w-2xl`}>
      <p className="text-[#00c2a8] text-[0.75rem] tracking-[0.3em] uppercase font-bold mb-3 inline-flex items-center gap-3">
        <span className="w-5 h-px bg-[#00c2a8]" aria-hidden="true" />
        {eyebrow}
        {centred && <span className="w-5 h-px bg-[#00c2a8]" aria-hidden="true" />}
      </p>
      <h2 id={id} className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
        {title}
      </h2>
      {intro && <p className="text-white/55 text-base sm:text-lg leading-relaxed mt-4">{intro}</p>}
    </FadeUp>
  )
}
