// components/AmbientRings.tsx — faint logo rings fixed at the edge of the viewport between the
// hero and the contact section. Scroll turns them and breathes them apart and back together.
'use client'

import { useRef } from 'react'
import { LogoRings, RINGS } from '@/components/LogoRings'
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion'

const APART = {
  purple: { x: -70, y: -35 },
  blue: { x: 70, y: -35 },
  teal: { x: 0, y: 80 },
} as const

export function AmbientRings() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const q = gsap.utils.selector(ref)
        // Page-level triggers (string selectors would be scoped to this component)
        const start = document.getElementById('services')
        const end = document.getElementById('contact')
        if (!start || !end) return
        gsap.set(ref.current, { autoAlpha: 0 })

        // Visible only between the end of the hero and the contact section
        gsap.timeline({
          scrollTrigger: { trigger: start, endTrigger: end, start: 'top 80%', end: 'top 70%', scrub: true },
        })
          .to(ref.current, { autoAlpha: 1, duration: 0.08, ease: 'none' })
          .to(ref.current, { autoAlpha: 1, duration: 0.84 })
          .to(ref.current, { autoAlpha: 0, duration: 0.08, ease: 'none' })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: start, endTrigger: end, start: 'top bottom', end: 'top top', scrub: 1.5 },
        })
        tl.to(q('[data-spin]'), { rotation: 160, ease: 'none', duration: 4 }, 0)
        // Two breaths: apart → together → apart → together
        RINGS.forEach((ring) => {
          const layer = q(`[data-layer="${ring.key}"]`)
          tl.to(layer, { ...APART[ring.key], ease: 'sine.inOut', duration: 1 }, 0)
            .to(layer, { x: 0, y: 0, ease: 'sine.inOut', duration: 1 }, 1)
            .to(layer, { ...APART[ring.key], ease: 'sine.inOut', duration: 1 }, 2)
            .to(layer, { x: 0, y: 0, ease: 'sine.inOut', duration: 1 }, 3)
        })
      })
    },
    { scope: ref }
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:block pointer-events-none fixed z-30 top-1/2 right-0 w-[min(70vh,620px)] translate-x-[38%] -translate-y-1/2 opacity-0 mix-blend-screen"
    >
      <div data-spin className="relative opacity-[0.22]">
        {RINGS.map((ring, i) => (
          <div key={ring.key} data-layer={ring.key} className={i === 0 ? 'relative' : 'absolute inset-0'}>
            <LogoRings only={ring.key} hairline orbits strokeWidth={1.25} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
