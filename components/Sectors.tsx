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
    <section id="sectors" aria-labelledby="sectors-title" className="bg-[#0d1e30] py-24 sm:py-28 px-6">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          id="sectors-title"
          eyebrow="Who We Help"
          title="Built for estates where the stakes are high."
          intro="Facilities managers, property owners and contractors who need answers they can stand behind."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-md overflow-hidden">
          {SECTORS.map((sector, i) => {
            const Icon = sector.icon
            return (
              <FadeUp key={sector.name} delay={i * 80} className="h-full">
                <div className="group h-full bg-[#0d1e30] p-7 hover:bg-[#0f2236] transition-colors duration-200">
                  <Icon
                    className="w-7 h-7 text-[#00c2a8] mb-6 group-hover:scale-110 transition-transform duration-200"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="text-white text-base font-bold mb-2">{sector.name}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{sector.body}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
