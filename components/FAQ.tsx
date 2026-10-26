// components/FAQ.tsx
import { Plus } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionRule } from '@/components/SectionRule'
import { Eyebrow } from '@/components/Eyebrow'
import { FAQS } from '@/lib/faq'

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-white py-24 md:py-32 px-6">
      <SectionRule />
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div data-anim="fade">
              <Eyebrow index="06">FAQ</Eyebrow>
            </div>
            <h2 id="faq-title" data-anim="split" className="font-serif text-ink text-[clamp(2.5rem,5vw,4rem)] leading-[1]">
              Questions, <em className="text-ink/55">answered.</em>
            </h2>
          </div>
        </div>

        <FadeUp className="lg:col-span-8">
          <div className="border-t border-ink/[0.12]">
            {FAQS.map((item, i) => (
              <details key={item.q} className="group border-b border-ink/[0.12]">
                <summary className="flex items-start gap-5 cursor-pointer list-none py-7 text-ink [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-sm text-[#5b36d6] pt-2 w-6 flex-shrink-0">0{i + 1}</span>
                  <span className="flex-1 font-serif text-[1.75rem] leading-tight group-hover:text-[#5b36d6] transition-colors">
                    {item.q}
                  </span>
                  <span className="mt-1 w-9 h-9 flex-shrink-0 rounded-full border border-ink/20 flex items-center justify-center group-open:bg-ink group-open:text-[#f7f4ee] transition-colors">
                    <Plus className="w-4 h-4 transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                  </span>
                </summary>
                <p className="text-ink/72 text-lg leading-relaxed pb-8 pl-11 pr-14">{item.a}</p>
              </details>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
