// components/About.tsx
import Image from 'next/image'
import { FadeUp } from '@/components/FadeUp'

const FOCUS_AREAS = [
  'Authorising Engineer',
  'Asset Strategy',
  'Statutory Compliance',
  'Incident Review',
  'Resilience Planning',
]

export function About() {
  return (
    <section id="about" className="bg-[#0d1e30] py-20 px-6 border-t border-[rgba(0,194,168,0.08)]">
      <div className="max-w-[1120px] mx-auto">
        <FadeUp>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Portrait */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#00c2a8] shadow-[0_0_0_2px_#00c2a8,0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(0,194,168,0.2)] hover:shadow-[0_0_0_2px_#00c2a8,0_8px_32px_rgba(0,0,0,0.4),0_0_48px_rgba(0,194,168,0.35)] transition-shadow duration-300">
                <Image
                  src="/media/richard-portrait.jpg"
                  alt="Richard Warren, Principal Consultant at RPW Technical Consulting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-[#00c2a8] text-[0.6rem] tracking-[0.3em] uppercase font-bold mb-1">
                About
              </p>
              <h2 className="text-white text-xl font-extrabold mb-1">Richard Warren</h2>
              <p className="text-white/35 text-[0.75rem] mb-5">
                Independent Lead Consultant · RPW Technical Consulting (FM) Ltd
              </p>

              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Led by Richard Warren, with an emphasis on technical assurance that holds up under
                inspection. Decades of estates leadership across healthcare, public sector, and
                complex infrastructure underpin a pragmatic, data-led approach — prioritising safe
                systems of work, transparent compliance evidence, and confident decision-making.
              </p>

              {/* Focus areas */}
              <div>
                <p className="text-white/30 text-[0.6rem] tracking-[0.15em] uppercase mb-3">
                  Focus Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {FOCUS_AREAS.map((area) => (
                    <span
                      key={area}
                      className="bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.20)] text-[#00c2a8] text-[0.65rem] font-mono px-3 py-1 rounded-sm hover:bg-[rgba(0,194,168,0.18)] hover:-translate-y-px transition-all duration-150 cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
