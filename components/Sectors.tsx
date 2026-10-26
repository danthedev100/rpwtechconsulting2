// components/Sectors.tsx
import { Building2, HardHat, Hospital, Landmark } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionHeader } from '@/components/SectionHeader'

const SECTORS = [
  {
    icon: Hospital,
    name: 'Healthcare & NHS Estates',
    body: 'Critical ventilation, water safety and engineering governance in environments where failure affects patients.',
  },
  {
    icon: Landmark,
    name: 'Public Sector',
    body: 'Local authority, education and civic estates needing robust compliance positions and value for money.',
  },
  {
    icon: Building2,
    name: 'PFI & Complex Infrastructure',
    body: 'Hand-back readiness, lifecycle obligations and technical due diligence on long-term contracts.',
  },
  {
    icon: HardHat,
    name: 'FM & M&E Contractors',
    body: 'Independent technical support for mobilisations, CAFM implementation and contract compliance.',
  },
]

export function Sectors() {
  return (
    <section id="sectors" aria-labelledby="sectors-title" className="relative py-24 md:py-32 px-6">
      <div className="max-w-[1240px] mx-auto">
        <SectionHeader
          id="sectors-title"
          index="03"
          eyebrow="Who we help"
          title={
            <>
              Built for estates where <em className="text-ink/55">the stakes are high.</em>
            </>
          }
          intro="Facilities managers, property owners and contractors who need answers they can stand behind."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-ink/[0.12]">
          {SECTORS.map((sector, i) => {
            const Icon = sector.icon
            return (
              <FadeUp key={sector.name}>
                <div
                  className={`group flex gap-6 py-10 border-b border-ink/[0.12] ${
                    i % 2 === 0 ? 'md:pr-10 md:border-r md:border-r-ink/[0.12]' : 'md:pl-10'
                  }`}
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-full border border-ink/15 flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-[#f7f4ee] transition-colors duration-300">
                    <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-ink text-[1.9rem] leading-tight mb-2">{sector.name}</h3>
                    <p className="text-ink/70 leading-relaxed max-w-md">{sector.body}</p>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
