// components/Services.tsx
import { FadeUp } from '@/components/FadeUp'

const PILLARS = [
  {
    name: 'Technical Solutions',
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
    <section id="services" className="bg-[#0d1e30] py-20 px-6">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00c2a8] text-[0.75rem] tracking-[0.3em] uppercase font-bold mb-2">
            What We Do
          </p>
          <h2 className="text-white text-2xl font-bold">Three pillars. One specialist.</h2>
        </FadeUp>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {PILLARS.map((pillar, i) => (
            <FadeUp key={pillar.name} delay={i * 80}>
              <div className="bg-[#0f1c2e] border border-[rgba(0,194,168,0.12)] border-t-2 border-t-[#00c2a8] rounded-md p-6 h-full shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_-2px_12px_rgba(0,194,168,0.2)] hover:-translate-y-1.5 hover:border-[rgba(0,194,168,0.3)] transition-all duration-[250ms] group">
                <h3 className="text-[#00c2a8] text-[0.8rem] font-bold tracking-[0.2em] uppercase mb-4">
                  {pillar.name}
                </h3>
                <ul className="space-y-1.5">
                  {pillar.services.map((service) => (
                    <li key={service} className="flex items-start gap-2 text-white/50 text-sm leading-snug">
                      <span className="text-[#00c2a8] mt-0.5 text-xs flex-shrink-0">·</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Working model strip */}
        <FadeUp delay={240}>
          <div className="bg-[#0a1628] border border-[rgba(0,194,168,0.10)] rounded-md px-6 py-4 flex flex-wrap items-center gap-4">
            <span className="text-[#00c2a8] text-[0.75rem] font-bold tracking-[0.2em] uppercase flex-shrink-0">
              Working Model
            </span>
            <div className="flex flex-wrap gap-2">
              {WORKING_MODEL.map((tag) => (
                <span
                  key={tag}
                  className="bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.15)] text-white/55 text-sm px-3 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
