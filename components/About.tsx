// components/About.tsx
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionRule } from '@/components/SectionRule'
import { Eyebrow } from '@/components/Eyebrow'
import { LogoRings } from '@/components/LogoRings'

const FOCUS_AREAS = [
  'Authorising Engineer',
  'Asset Strategy',
  'Statutory Compliance',
  'Incident Review',
  'Resilience Planning',
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-[#f6f4ff] py-24 sm:py-28 px-6 border-t border-[rgba(109,59,239,0.08)]">
      <SectionRule />
      <div className="max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-center">
        {/* Portrait */}
        <FadeUp>
          <div className="relative max-w-sm mx-auto md:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-lg bg-[radial-gradient(closest-side,rgba(109,59,239,0.25),transparent)] blur-2xl"
            />
            <div aria-hidden="true" className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-[rgba(109,59,239,0.35)]" />
            <LogoRings
              data-anim="rings"
              hairline
              strokeWidth={1.5}
              className="absolute -top-16 -left-14 w-32 h-auto opacity-80"
            />
            <div data-anim="reveal" className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-ink/10 shadow-[0_24px_60px_rgba(15,18,34,0.125)]">
              <Image
                src="/media/richard-portrait.jpg"
                alt="Richard Warren, Principal Consultant at RPW Technical Consulting"
                fill
                sizes="(min-width: 768px) 384px, 90vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(255,255,255,0.95)] to-transparent p-5 pt-16">
                <p className="text-ink font-bold">Richard Warren</p>
                <p className="text-[#6d3bef] text-xs tracking-[0.2em] uppercase">Principal Consultant</p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Content */}
        <FadeUp>
          <Eyebrow>About</Eyebrow>
          <h2 id="about-title" data-anim="split" className="text-ink text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight mb-2">
            Richard Warren
          </h2>
          <p className="text-ink/58 text-sm mb-7">
            Independent Lead Consultant · RPW Technical Consulting (FM) Ltd
          </p>

          <p className="border-l-2 border-[#6d3bef] pl-5 mb-7 text-ink/88 text-lg sm:text-xl leading-relaxed font-medium">
            Senior estates experience, applied independently — so the evidence stands up when it
            matters.
          </p>

          <p className="text-ink/72 text-base leading-relaxed mb-8">
            Led by Richard Warren, with an emphasis on technical assurance that holds up under
            inspection. Decades of estates leadership across healthcare, public sector, and
            complex infrastructure underpin a pragmatic, data-led approach — prioritising safe
            systems of work, transparent compliance evidence, and confident decision-making.
          </p>

          {/* Focus areas */}
          <div className="mb-9">
            <p className="text-ink/55 text-[0.75rem] tracking-[0.15em] uppercase mb-3">Focus Areas</p>
            <ul className="flex flex-wrap gap-2">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area}
                  className="bg-[rgba(109,59,239,0.08)] border border-[rgba(109,59,239,0.20)] text-[#6d3bef] text-[0.8rem] font-mono px-3 py-1 rounded-full hover:bg-[rgba(109,59,239,0.18)] hover:-translate-y-px transition-all duration-150"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-ink font-semibold border-b border-[#6d3bef] pb-1 hover:text-[#6d3bef] transition-colors"
          >
            Talk to Richard directly
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
