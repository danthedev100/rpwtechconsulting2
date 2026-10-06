// components/HeroRings.tsx — oversized logo rings behind the hero: drawn on load, slowly
// orbiting, following the pointer slightly, and drifting apart as the hero scrolls away.
'use client'

import { useRef } from 'react'
import { LogoRings, RINGS } from '@/components/LogoRings'
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion'

const SCROLL_SPREAD = {
  purple: { x: -90, y: -40 },
  blue: { x: 90, y: -40 },
  teal: { x: 0, y: 110 },
} as const

export function HeroRings() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref)
        const rings = q('[data-ring]')
        const orbits = q('[data-orbit]')

        gsap
          .timeline({ delay: 0.4 })
          .fromTo(rings, { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.2, stagger: 0.3, ease: 'power2.inOut' })
          .fromTo(orbits, { autoAlpha: 0, scale: 0.85, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 1.6, stagger: 0.2, ease: 'power2.out' }, '-=1.2')

        // Dashed orbits turn continuously, alternating direction
        orbits.forEach((o, i) =>
          gsap.to(o, { rotation: i % 2 ? -360 : 360, transformOrigin: '50% 50%', duration: 70 + i * 15, repeat: -1, ease: 'none' })
        )

        // Each ring floats on its own slow cycle
        q('[data-ring-group]').forEach((g, i) => {
          gsap.to(g, { x: '+=' + (6 + i * 2), y: '-=' + (8 - i * 2), duration: 6 + i * 1.7, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        })

        // Scroll: rings separate and fade as the hero leaves
        const scrollTl = gsap.timeline({
          scrollTrigger: { trigger: ref.current?.closest('section'), start: 'top top', end: 'bottom top', scrub: 1 },
        })
        Object.entries(SCROLL_SPREAD).forEach(([key, to]) => {
          scrollTl.to(q(`[data-ring-scroll="${key}"]`), { ...to, ease: 'none' }, 0)
        })
        scrollTl.to(ref.current, { autoAlpha: 0, scale: 1.15, ease: 'none' }, 0)

        // Gentle pointer parallax
        const xTo = gsap.quickTo(q('[data-parallax]'), 'x', { duration: 1.2, ease: 'power3.out' })
        const yTo = gsap.quickTo(q('[data-parallax]'), 'y', { duration: 1.2, ease: 'power3.out' })
        const onMove = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * -30)
          yTo((e.clientY / window.innerHeight - 0.5) * -20)
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })
    },
    { scope: ref }
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute z-[1] right-[-35%] top-[4%] w-[105vw] sm:right-[-14%] sm:top-[4%] sm:w-[70vw] lg:right-[-4%] lg:top-[3%] lg:w-[min(48vw,720px)] opacity-50 sm:opacity-75 mix-blend-screen"
    >
      <div data-parallax>
        <LogoRingsSplit />
      </div>
    </div>
  )
}

/** One layer per ring so the scroll timeline can move each independently. */
function LogoRingsSplit() {
  return (
    <div className="relative">
      {RINGS.map((ring, i) => (
        <div key={ring.key} data-ring-scroll={ring.key} className={i === 0 ? 'relative' : 'absolute inset-0'}>
          <LogoRings only={ring.key} hairline orbits strokeWidth={1.5} className="w-full h-auto" />
        </div>
      ))}
    </div>
  )
}
