// components/Contact.tsx
import { Clock, Mail, MapPin } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { ContactForm } from '@/components/ContactForm'
import { SITE } from '@/lib/site'

const DETAILS = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  { icon: Clock, label: 'Response time', value: 'Within one business day' },
  { icon: MapPin, label: 'Based in', value: `${SITE.region} · Remote & on-site` },
]

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-[#0d1e30] py-24 sm:py-28 px-6 border-t border-[rgba(0,194,168,0.10)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(0,194,168,0.10),transparent)]"
      />
      <div className="relative max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          {/* Left: copy */}
          <FadeUp>
            <p className="text-[#00c2a8] text-[0.75rem] tracking-[0.3em] uppercase font-bold mb-3 inline-flex items-center gap-3">
              <span className="w-5 h-px bg-[#00c2a8]" aria-hidden="true" />
              Get in Touch
            </p>
            <h2
              id="contact-title"
              className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold mb-5 leading-[1.15] tracking-tight"
            >
              Ready to discuss
              <br />
              your project?
            </h2>
            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
              Whether you need a compliance audit, asset strategy support, or specialist
              technical input — get in touch and Richard will respond within one business day.
            </p>

            <dl className="space-y-5">
              {DETAILS.map((d) => {
                const Icon = d.icon
                return (
                  <div key={d.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 rounded-md bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.2)] flex items-center justify-center text-[#00c2a8]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <dt className="text-white/35 text-[0.7rem] tracking-[0.2em] uppercase mb-0.5">{d.label}</dt>
                      <dd className="text-white/80 text-base break-words">
                        {d.href ? (
                          <a href={d.href} className="hover:text-[#00c2a8] transition-colors duration-200">
                            {d.value}
                          </a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </FadeUp>

          {/* Right: form */}
          <FadeUp delay={100}>
            <ContactForm />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
