// components/WhyRPW.tsx
import { FadeUp } from '@/components/FadeUp'
import { SectionRule } from '@/components/SectionRule'
import { SectionHeader } from '@/components/SectionHeader'

const DIFFERENTIATORS = [
  {
    heading: 'Truly independent',
    body: 'No vendor ties. Advice that serves your interests, not a product or contractor agenda.',
  },
  {
    heading: 'Safe systems & evidence',
    body: 'Prioritising safe systems of work, transparent compliance evidence, and confident decision-making.',
  },
  {
    heading: 'Healthcare & public sector depth',
    body: 'Decades of estates leadership across NHS, public sector, and complex infrastructure environments.',
  },
  {
    heading: 'Flexible delivery',
    body: 'Remote or on-site. Short advisory engagements to long-term governance improvement programmes.',
  },
]

export function WhyRPW() {
  return (
    <section id="why-rpw" aria-labelledby="why-title" className="relative bg-white py-24 md:py-32 px-6">
      <SectionRule />
      <div className="max-w-[1240px] mx-auto">
        <SectionHeader
          id="why-title"
          index="04"
          eyebrow="Why RPW"
          title={
            <>
              Independent. Pragmatic. <em className="text-brand">Data-led.</em>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, i) => (
            <FadeUp key={item.heading}>
              <div className="group relative h-full pt-8 pb-10 sm:pr-8 border-t border-ink/[0.12]">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-0.5 w-0 bg-brand group-hover:w-full transition-all duration-500"
                />
                <span className="block font-serif text-6xl text-ink/20 group-hover:text-[#5b36d6] transition-colors duration-300 leading-none mb-6">
                  0{i + 1}
                </span>
                <h3 className="text-ink text-lg font-semibold mb-2">{item.heading}</h3>
                <p className="text-ink/70 leading-relaxed">{item.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
