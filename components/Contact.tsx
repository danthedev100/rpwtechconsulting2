// components/Contact.tsx
import { ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { Eyebrow } from '@/components/Eyebrow'
import { ConvergeRings } from '@/components/ConvergeRings'
import { ContactForm } from '@/components/ContactForm'
import { SITE } from '@/lib/site'

const DETAILS = [
  { label: 'Response time', value: 'Within one business day' },
  { label: 'Based in', value: `${SITE.region} · Remote & on-site` },
]

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-[#efe9df] py-24 md:py-32 px-6 overflow-hidden">
      <ConvergeRings className="hidden lg:block absolute left-[max(2rem,calc(50%-600px))] bottom-12 w-[260px] opacity-60" />
      <div className="relative max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: copy */}
        <FadeUp className="lg:col-span-5">
          <Eyebrow index="07">Get in touch</Eyebrow>
          <h2
            id="contact-title"
            data-anim="split"
            className="font-serif text-ink text-[clamp(2.75rem,6vw,5rem)] leading-[0.98] tracking-[-0.01em] mb-8"
          >
            Ready to discuss your <em className="text-[#5b36d6]">project?</em>
          </h2>
          <p className="text-ink/72 text-lg leading-relaxed mb-10 max-w-md">
            Whether you need a compliance audit, asset strategy support, or specialist technical
            input — get in touch and Richard will respond within one business day.
          </p>

          <a
            href={`mailto:${SITE.email}`}
            className="group inline-flex items-center gap-2 text-ink text-base sm:text-lg border-b border-ink/30 pb-1 hover:border-ink transition-colors break-all mb-10"
          >
            {SITE.email}
            <ArrowUpRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>

          <dl className="grid grid-cols-2 gap-6 max-w-md lg:mb-56">
            {DETAILS.map((d) => (
              <div key={d.label} className="border-t border-ink/[0.15] pt-4">
                <dt className="text-ink/55 text-[0.75rem] tracking-[0.18em] uppercase mb-1">{d.label}</dt>
                <dd className="text-ink/85">{d.value}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>

        {/* Right: form */}
        <FadeUp className="lg:col-span-7">
          <ContactForm />
        </FadeUp>
      </div>
    </section>
  )
}
