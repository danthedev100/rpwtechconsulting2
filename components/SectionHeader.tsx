// components/SectionHeader.tsx — editorial header: label + large serif title, intro set to the right
import { Eyebrow } from '@/components/Eyebrow'

interface SectionHeaderProps {
  eyebrow: string
  index?: string
  title: React.ReactNode
  intro?: React.ReactNode
  id?: string
}

export function SectionHeader({ eyebrow, index, title, intro, id }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-14 md:mb-16 items-end">
      <div className="lg:col-span-7">
        <div data-anim="fade">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </div>
        <h2
          id={id}
          data-anim="split"
          className="font-serif text-ink text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.01em]"
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p data-anim="fade" className="lg:col-span-5 text-ink/70 text-lg leading-relaxed">
          {intro}
        </p>
      )}
    </div>
  )
}
