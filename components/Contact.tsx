// components/Contact.tsx
import { FadeUp } from '@/components/FadeUp'
import { ContactForm } from '@/components/ContactForm'

export function Contact() {
  return (
    <section id="contact" className="bg-[#0a1628] py-20 px-6 border-t border-[rgba(0,194,168,0.10)]">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: copy */}
          <FadeUp>
            <p className="text-[#00c2a8] text-[0.6rem] tracking-[0.3em] uppercase font-bold mb-2">
              Get in Touch
            </p>
            <h2 className="text-white text-xl font-bold mb-5 leading-snug">
              Ready to discuss<br />your project?
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm">
              Whether you need a compliance audit, asset strategy support, or specialist
              technical input — get in touch and Richard will respond within one business day.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00c2a8] flex-shrink-0" />
              <a
                href="mailto:richard@rpwtechnicalconsulting.co.uk"
                className="text-white/45 text-sm hover:text-white transition-colors duration-200"
              >
                richard@rpwtechnicalconsulting.co.uk
              </a>
            </div>
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
