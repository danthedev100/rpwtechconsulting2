// components/Sectors.tsx
import { Building2, HardHat, Hospital, Landmark } from 'lucide-react'
import { FadeUp } from '@/components/FadeUp'
import { SectionRule } from '@/components/SectionRule'
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
    <section id="sectors" aria-labelledby="sectors-title" className="relative bg-[#f6f4ff] py-24 sm:py-28 px-6">
      <SectionRule />
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          id="sectors-title"
          eyebrow="Who We Help"
          title="Built for estates where the stakes are high."
          intro="Facilities managers, property owners and contractors who need answers they can stand behind."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTORS.map((sector) => {
            const Icon = sector.icon
            return (
              <FadeUp key={sector.name} className="h-full">
                <div className="group h-full bg-white rounded-3xl p-7 shadow-[0_8px_30px_rgba(15,18,34,0.05)] hover:shadow-[0_16px_40px_rgba(109,59,239,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <Icon
                    className="w-12 h-12 p-3 rounded-2xl bg-violet-soft text-[#6d3bef] mb-6 group-hover:scale-110 transition-transform duration-200"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="text-ink text-base font-bold mb-2">{sector.name}</h3>
                  <p className="text-ink/68 text-sm leading-relaxed">{sector.body}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
