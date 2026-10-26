// components/About.tsx
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
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
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32 px-6">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
        {/* Portrait */}
        <FadeUp className="lg:col-span-5">
          <div className="relative max-w-md mx-auto lg:mx-0">
            <div data-anim="reveal" className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#efe9df]">
              <Image
                src="/media/richard-portrait.jpg"
                alt="Richard Warren, Principal Consultant at RPW Technical Consulting"
                fill
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover object-top"
              />
            </div>
            <LogoRings
              data-anim="rings"
              hairline
              strokeWidth={2}
              className="absolute -bottom-10 -right-8 w-32 h-auto"
            />
          </div>
        </FadeUp>

        {/* Content */}
        <FadeUp className="lg:col-span-7">
          <Eyebrow index="05">About</Eyebrow>
          <p className="font-serif text-ink text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.08] mb-10">
            Senior estates experience, applied independently —{' '}
            <em className="text-ink/55">so the evidence stands up when it matters.</em>
          </p>

          <div className="mb-6">
            <h2 id="about-title" className="text-ink text-xl font-semibold">
              Richard Warren
            </h2>
            <p className="text-ink/60 text-sm">Independent Lead Consultant · RPW Technical Consulting (FM) Ltd</p>
          </div>

          <p className="text-ink/75 text-lg leading-relaxed mb-10 max-w-2xl">
            Led by Richard Warren, with an emphasis on technical assurance that holds up under
            inspection. Decades of estates leadership across healthcare, public sector, and
            complex infrastructure underpin a pragmatic, data-led approach — prioritising safe
            systems of work, transparent compliance evidence, and confident decision-making.
          </p>

          <p className="text-[0.8rem] tracking-[0.18em] uppercase text-ink/55 mb-4">Focus areas</p>
          <ul className="flex flex-wrap gap-2 mb-10">
            {FOCUS_AREAS.map((area) => (
              <li
                key={area}
                className="border border-ink/20 text-ink/85 text-sm px-4 py-2 rounded-full hover:bg-ink hover:text-[#f7f4ee] transition-colors duration-200"
              >
                {area}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-ink text-[#f7f4ee] pl-6 pr-5 py-3.5 rounded-full hover:bg-[#5b36d6] transition-colors duration-300"
          >
            Talk to Richard directly
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
