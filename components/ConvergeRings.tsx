// components/ConvergeRings.tsx — rings start scattered and lock into the logo formation as
// the contact section scrolls into view: a quiet visual for "bringing it together".
'use client'

import { useRef } from 'react'
import { LogoRings, RINGS } from '@/components/LogoRings'
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion'

const SCATTER = {
  purple: { x: -160, y: -90, rotation: -60 },
  blue: { x: 170, y: -70, rotation: 50 },
  teal: { x: 30, y: 170, rotation: 90 },
} as const

export function ConvergeRings({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom 92%', scrub: 1 },
        })
        RINGS.forEach((ring) => {
          tl.fromTo(
            q(`[data-layer="${ring.key}"]`),
            { ...SCATTER[ring.key], autoAlpha: 0.15, transformOrigin: '50% 50%' },
            { x: 0, y: 0, rotation: 0, autoAlpha: 1, ease: 'power2.out' },
            0
          )
        })
        tl.fromTo(q('[data-ring]'), { drawSVG: '0% 30%' }, { drawSVG: '0% 100%', ease: 'power1.inOut' }, 0)

        // Orbits keep turning once formed
        q('[data-orbit]').forEach((o, i) =>
          gsap.to(o, { rotation: i % 2 ? -360 : 360, transformOrigin: '50% 50%', duration: 50 + i * 10, repeat: -1, ease: 'none' })
        )
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className="relative">
        {RINGS.map((ring, i) => (
          <div key={ring.key} data-layer={ring.key} className={i === 0 ? 'relative' : 'absolute inset-0'}>
            <LogoRings only={ring.key} hairline orbits strokeWidth={1.5} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
