// components/WhyRPW.tsx
import { Handshake, Hospital, Route, ShieldCheck } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionRule } from '@/components/SectionRule'
import { SectionHeader } from '@/components/SectionHeader'

const DIFFERENTIATORS = [
  {
    icon: Handshake,
    heading: 'Truly Independent',
    body: 'No vendor ties. Advice that serves your interests, not a product or contractor agenda.',
  },
  {
    icon: ShieldCheck,
    heading: 'Safe Systems & Evidence',
    body: 'Prioritising safe systems of work, transparent compliance evidence, and confident decision-making.',
  },
  {
    icon: Hospital,
    heading: 'Healthcare & Public Sector Depth',
    body: 'Decades of estates leadership across NHS, public sector, and complex infrastructure environments.',
  },
  {
    icon: Route,
    heading: 'Flexible Delivery',
    body: 'Remote or on-site. Short advisory engagements to long-term governance improvement programmes.',
  },
]

export function WhyRPW() {
  return (
    <section id="why-rpw" aria-labelledby="why-title" className="relative bg-[#ffffff] py-24 sm:py-28 px-6 border-t border-ink/[0.04]">
      <SectionRule />
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader id="why-title" eyebrow="Why RPW" title="Independent. Pragmatic. Data-led." />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon
            return (
              <FadeUp key={item.heading} className="h-full">
                <div className="flex gap-5 group h-full p-7 rounded-3xl bg-[#f6f4ff] hover:bg-white hover:shadow-[0_16px_40px_rgba(109,59,239,0.12)] transition-all duration-300">
                  <div className="w-12 h-12 flex-shrink-0 bg-brand rounded-2xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(109,59,239,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(109,59,239,0.2)] transition-all duration-200">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-ink text-lg font-semibold mb-1.5">{item.heading}</h3>
                    <p className="text-ink/68 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
