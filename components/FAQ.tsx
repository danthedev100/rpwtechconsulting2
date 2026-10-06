// components/FAQ.tsx
import { Plus } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionRule } from '@/components/SectionRule'
import { SectionHeader } from '@/components/SectionHeader'
import { FAQS } from '@/lib/faq'

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-[#0a1628] py-24 sm:py-28 px-6 border-t border-white/[0.04]">
      <SectionRule />
      <div className="max-w-[820px] mx-auto">
        <SectionHeader id="faq-title" eyebrow="FAQ" title="Questions, answered." />

        <FadeUp>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none py-5 text-white text-base sm:text-lg font-semibold hover:text-[#00c2a8] transition-colors [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    className="w-5 h-5 flex-shrink-0 text-[#00c2a8] transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-white/60 text-base leading-relaxed pb-6 pr-10">{item.a}</p>
              </details>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
