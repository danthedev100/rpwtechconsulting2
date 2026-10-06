// components/Services.tsx
import { ArrowRight, ClipboardCheck, Database, Wrench } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionHeader } from '@/components/SectionHeader'
import { EnquiryLink } from '@/components/EnquiryLink'
import type { EnquiryType } from '@/lib/site'

const PILLARS: {
  name: string
  enquiry: EnquiryType
  icon: typeof Wrench
  summary: string
  services: string[]
}[] = [
  {
    name: 'Technical Solutions',
    enquiry: 'Technical solutions',
    icon: Wrench,
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
  },
  {
    name: 'Asset Management',
    enquiry: 'Asset management',
    icon: Database,
    summary:
      'Know what you own, what condition it is in, and what it will cost — so investment decisions are defensible.',
    services: [
      'Asset validation & capture',
      'Asset surveys & strategy',
      'Condition surveys',
      'Lifecycle planning',
      'Mobilisation support',
    ],
  },
  {
    name: 'Compliance Management',
    enquiry: 'Compliance management',
    icon: ClipboardCheck,
    summary:
      'Turn statutory obligations into a clear, auditable position — with the evidence trail to prove it.',
    services: [
      'Compliance audits',
      'Gap analysis',
      'Compliance strategy',
      'CAFM compliance solutions',
      'Regulatory reporting',
    ],
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
    <section id="services" aria-labelledby="services-title" className="relative bg-[#0d1e30] py-24 sm:py-28 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(0,194,168,0.10),transparent)]"
      />
      <div className="relative max-w-[1120px] mx-auto">
        <SectionHeader
          id="services-title"
          eyebrow="What We Do"
          title="Three pillars. One specialist."
          intro="Senior, hands-on expertise across the full estates lifecycle — engaged as much or as little as you need."
        />

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <FadeUp key={pillar.name} delay={i * 80} className="h-full">
                <article className="relative bg-[#0f1c2e] border border-[rgba(0,194,168,0.12)] rounded-md p-7 h-full flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_-2px_12px_rgba(0,194,168,0.2)] hover:-translate-y-1.5 hover:border-[rgba(0,194,168,0.3)] transition-all duration-[250ms] group overflow-hidden">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#00c2a8] via-[#00c2a8] to-transparent" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-md bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.2)] flex items-center justify-center text-[#00c2a8] group-hover:bg-[rgba(0,194,168,0.16)] transition-colors">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-white/25">0{i + 1}</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{pillar.name}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">{pillar.summary}</p>
                  <ul className="space-y-2 mb-7 pt-5 border-t border-white/[0.06]">
                    {pillar.services.map((service) => (
                      <li key={service} className="flex items-start gap-2.5 text-white/70 text-sm leading-snug">
                        <span className="mt-[0.45rem] w-1 h-1 rounded-full bg-[#00c2a8] flex-shrink-0" aria-hidden="true" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <EnquiryLink
                    enquiry={pillar.enquiry}
                    className="mt-auto inline-flex items-center gap-2 text-[#00c2a8] text-sm font-semibold hover:gap-3 transition-all"
                  >
                    Discuss {pillar.name.toLowerCase()}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </EnquiryLink>
                </article>
              </FadeUp>
            )
          })}
        </div>

        {/* Working model strip */}
        <FadeUp delay={240}>
          <div className="bg-[#0a1628] border border-[rgba(0,194,168,0.10)] rounded-md px-6 py-5 flex flex-wrap items-center gap-4">
            <span className="text-[#00c2a8] text-[0.75rem] font-bold tracking-[0.2em] uppercase flex-shrink-0">
              Working Model
            </span>
            <ul className="flex flex-wrap gap-2">
              {WORKING_MODEL.map((tag) => (
                <li
                  key={tag}
                  className="bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.15)] text-white/65 text-sm px-3 py-1 rounded-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
