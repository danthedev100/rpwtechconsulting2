// components/Approach.tsx
import { SectionRule } from '@/components/SectionRule'
import { SectionHeader } from '@/components/SectionHeader'

const STEPS = [
  {
    title: 'Discover',
    body: 'A focused conversation to understand your estate, your obligations and what is keeping you up at night.',
  },
  {
    title: 'Assess',
    body: 'On-site and desk-based review of systems, records and governance — establishing an honest baseline.',
  },
  {
    title: 'Advise',
    body: 'Clear, prioritised recommendations with the reasoning behind them. No jargon, no product to sell.',
  },
  {
    title: 'Assure',
    body: 'Support through implementation and into business-as-usual, so improvements stick and evidence stands up.',
  },
]

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="relative bg-[#0a1628] py-24 sm:py-28 px-6 border-t border-white/[0.04]">
      <SectionRule />
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          id="approach-title"
          eyebrow="How We Work"
          title="A clear path from uncertainty to evidence."
          intro="Every engagement follows the same disciplined arc — scaled to the size of the problem."
        />

        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Connector: faint track, with a bright line that fills as you scroll */}
          <span aria-hidden="true" className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-white/[0.08]" />
          <span
            aria-hidden="true"
            data-anim="scrub-x"
            className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#00c2a8] via-[rgba(0,194,168,0.6)] to-[#00c2a8] shadow-[0_0_12px_rgba(0,194,168,0.6)]"
          />
          <span aria-hidden="true" className="md:hidden absolute left-5 top-5 bottom-5 w-px bg-white/[0.08]" />
          <span
            aria-hidden="true"
            data-anim="scrub-y"
            className="md:hidden absolute left-5 top-5 bottom-5 w-px bg-[#00c2a8] shadow-[0_0_12px_rgba(0,194,168,0.6)]"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex md:flex-col md:items-center md:text-center gap-5 md:gap-0">
              <span
                data-anim="pop"
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#0a1628] border border-[#00c2a8] text-[#00c2a8] font-mono text-sm flex items-center justify-center shadow-[0_0_24px_rgba(0,194,168,0.25)] md:mb-6"
              >
                {i + 1}
              </span>
              <div data-anim="fade">
                <h3 className="text-white text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed md:max-w-[15rem] md:mx-auto">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
