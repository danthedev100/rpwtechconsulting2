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
    <section id="approach" aria-labelledby="approach-title" className="relative bg-white py-24 md:py-32 px-6">
      <SectionRule />
      <div className="max-w-[1240px] mx-auto">
        <SectionHeader
          id="approach-title"
          index="02"
          eyebrow="How we work"
          title={
            <>
              A clear path from uncertainty <em className="text-ink/55">to evidence.</em>
            </>
          }
          intro="Every engagement follows the same disciplined arc — scaled to the size of the problem."
        />

        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-x-8">
          {/* Track along the top of the steps, filled with the brand gradient as you scroll */}
          <span aria-hidden="true" className="hidden md:block absolute top-0 inset-x-0 h-px bg-ink/[0.12]" />
          <span aria-hidden="true" data-anim="scrub-x" className="hidden md:block absolute top-0 inset-x-0 h-0.5 bg-brand" />
          <span aria-hidden="true" className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-ink/[0.12]" />
          <span aria-hidden="true" data-anim="scrub-y" className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-brand" />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative pl-8 md:pl-0 md:pt-10">
              <span data-anim="pop" className="block font-serif italic text-[#5b36d6] text-6xl leading-none mb-5">
                0{i + 1}
              </span>
              <div data-anim="fade">
                <h3 className="font-serif text-ink text-3xl mb-3">{step.title}</h3>
                <p className="text-ink/70 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
