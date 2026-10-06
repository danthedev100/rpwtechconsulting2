// components/SectionHeader.tsx
import { Eyebrow } from '@/components/Eyebrow'

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
    <div className={`mb-14 ${centred ? 'text-center mx-auto' : ''} max-w-2xl`}>
      <div data-anim="fade">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        id={id}
        data-anim="split"
        className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight"
      >
        {title}
      </h2>
      {intro && (
        <p data-anim="fade" className="text-white/55 text-base sm:text-lg leading-relaxed mt-4">
          {intro}
        </p>
      )}
    </div>
  )
}
