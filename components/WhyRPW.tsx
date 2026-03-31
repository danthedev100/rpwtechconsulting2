// components/WhyRPW.tsx
import { FadeUp } from '@/components/FadeUp'

const DIFFERENTIATORS = [
  {
    icon: '⊙',
    heading: 'Truly Independent',
    body: 'No vendor ties. Advice that serves your interests, not a product or contractor agenda.',
  },
  {
    icon: '◈',
    heading: 'Safe Systems & Evidence',
    body: 'Prioritising safe systems of work, transparent compliance evidence, and confident decision-making.',
  },
  {
    icon: '⬡',
    heading: 'Healthcare & Public Sector Depth',
    body: 'Decades of estates leadership across NHS, public sector, and complex infrastructure environments.',
  },
  {
    icon: '◎',
    heading: 'Flexible Delivery',
    body: 'Remote or on-site. Short advisory engagements to long-term governance improvement programmes.',
  },
]

export function WhyRPW() {
  return (
    <section id="why-rpw" className="bg-[#0a1628] py-20 px-6">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00c2a8] text-[0.75rem] tracking-[0.3em] uppercase font-bold mb-2">
            Why RPW
          </p>
          <h2 className="text-white text-2xl font-bold">Independent. Pragmatic. Data-led.</h2>
        </FadeUp>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {DIFFERENTIATORS.map((item, i) => (
            <FadeUp key={item.heading} delay={i * 80}>
              <div className="flex gap-4 group">
                <div className="w-9 h-9 flex-shrink-0 bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.20)] rounded-md flex items-center justify-center text-[#00c2a8] text-base group-hover:bg-[rgba(0,194,168,0.18)] group-hover:shadow-[0_0_16px_rgba(0,194,168,0.2)] transition-all duration-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white text-base font-semibold mb-1.5 group-hover:text-white transition-colors duration-150">
                    {item.heading}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
