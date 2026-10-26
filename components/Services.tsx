// components/Services.tsx
import { ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionHeader } from '@/components/SectionHeader'
import { EnquiryLink } from '@/components/EnquiryLink'
import type { EnquiryType } from '@/lib/site'

const PILLARS: {
  name: string
  enquiry: EnquiryType
  summary: string
  services: string[]
  tile: string
  layout: string
}[] = [
  {
    name: 'Technical Solutions',
    enquiry: 'Technical solutions',
    summary:
      'Specialist engineering input where safety, resilience and evidence matter most — from permit-to-work through to incident review.',
    services: [
      'Safe systems of work',
      'Authorising engineer',
      'CAFM leadership & implementation',
      'Water & ventilation systems',
      'Energy management',
      'Incident investigation',
      'Technical due diligence',
      'PFI hand-back support',
      'Business continuity planning',
    ],
    tile: 'bg-white border border-ink/[0.10]',
    layout: 'md:col-span-3 md:row-span-2',
  },
  {
    name: 'Asset Management',
    enquiry: 'Asset management',
    summary:
      'Know what you own, what condition it is in, and what it will cost — so investment decisions are defensible.',
    services: [
      'Asset validation & capture',
      'Asset surveys & strategy',
      'Condition surveys',
      'Lifecycle planning',
      'Mobilisation support',
    ],
    tile: 'bg-[#ece6fb]',
    layout: 'md:col-span-3',
  },
  {
    name: 'Compliance Management',
    enquiry: 'Compliance management',
    summary:
      'Turn statutory obligations into a clear, auditable position — with the evidence trail to prove it.',
    services: [
      'Compliance audits',
      'Gap analysis',
      'Compliance strategy',
      'CAFM compliance solutions',
      'Regulatory reporting',
    ],
    tile: 'bg-[#dff1ec]',
    layout: 'md:col-span-3',
  },
]

const WORKING_MODEL = [
  'Short advisory engagements',
  'Mobilisation support',
  'Interim leadership',
  'Governance improvement programmes',
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 md:py-32 px-6">
      <div className="max-w-[1240px] mx-auto">
        <SectionHeader
          id="services-title"
          index="01"
          eyebrow="What we do"
          title={
            <>
              Three pillars.
              <br />
              <em className="text-ink/55">One specialist.</em>
            </>
          }
          intro="Senior, hands-on expertise across the full estates lifecycle — engaged as much or as little as you need."
        />

        {/* Bento */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {PILLARS.map((pillar, i) => {
            const wide = i === 0
            return (
              <FadeUp key={pillar.name} className={pillar.layout}>
                <article className={`h-full flex flex-col rounded-[28px] p-8 md:p-10 ${pillar.tile}`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-serif text-ink text-[2.25rem] md:text-[2.5rem] leading-none">{pillar.name}</h3>
                    <span className="font-mono text-sm text-[#5b36d6] pt-1">0{i + 1}</span>
                  </div>
                  <p className="text-ink/70 leading-relaxed mb-6 max-w-md">{pillar.summary}</p>
                  <ul className={`mb-8 ${wide ? '' : 'sm:columns-2 gap-8'}`}>
                    {pillar.services.map((service) => (
                      <li
                        key={service}
                        className="break-inside-avoid py-2.5 border-b border-ink/[0.12] text-ink/85 text-[0.975rem]"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                  <EnquiryLink
                    enquiry={pillar.enquiry}
                    className="group mt-auto self-start inline-flex items-center gap-2 text-ink text-[0.95rem] border-b border-ink/30 pb-0.5 hover:border-ink transition-colors"
                  >
                    Discuss {pillar.name.toLowerCase()}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </EnquiryLink>
                </article>
              </FadeUp>
            )
          })}

          {/* Working model */}
          <FadeUp className="md:col-span-6">
            <div className="rounded-[28px] border border-dashed border-ink/25 px-8 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <span className="font-serif italic text-2xl text-ink flex-shrink-0">How engagements run</span>
              <ul className="flex flex-wrap gap-2">
                {WORKING_MODEL.map((tag) => (
                  <li key={tag} className="border border-ink/20 text-ink/80 text-sm px-4 py-1.5 rounded-full">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
