// components/BrandLogo.tsx — logo with live rings: they draw in on load, redraw on hover,
// and drift apart while the page is scrolling, settling back together when it stops.
'use client'

import { useRef } from 'react'
import { RINGS, RING_R } from '@/components/LogoRings'
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/motion'

// Direction each ring drifts from the trio's centre
const CENTRE = { x: 103, y: 131 }
const DRIFT = RINGS.map((r) => {
  const dx = r.cx - CENTRE.x
  const dy = r.cy - CENTRE.y
  const len = Math.hypot(dx, dy)
  return { x: dx / len, y: dy / len }
})

interface BrandLogoProps {
  className?: string
  animated?: boolean
}

export function BrandLogo({ className, animated = true }: BrandLogoProps) {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (!animated) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const rings = gsap.utils.toArray<SVGCircleElement>('[data-ring]', ref.current)
        const groups = gsap.utils.toArray<SVGGElement>('[data-ring-group]', ref.current)

        gsap.fromTo(
          rings,
          { drawSVG: '0%', rotation: -90, transformOrigin: '50% 50%' },
          { drawSVG: '100%', rotation: 0, duration: 1.4, stagger: 0.18, ease: 'power3.inOut', delay: 0.2 }
        )

        // Spread with scroll velocity, then ease back together
        const spread = groups.map((g, i) => ({
          x: gsap.quickTo(g, 'x', { duration: 0.6, ease: 'power3.out' }),
          y: gsap.quickTo(g, 'y', { duration: 0.6, ease: 'power3.out' }),
          d: DRIFT[i],
        }))
        let settle: gsap.core.Tween | undefined
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const amount = gsap.utils.clamp(0, 9, Math.abs(self.getVelocity()) / 300)
            spread.forEach((s) => {
              s.x(s.d.x * amount)
              s.y(s.d.y * amount)
            })
            settle?.kill()
            settle = gsap.delayedCall(0.15, () => spread.forEach((s) => (s.x(0), s.y(0))))
          },
        })

        const svg = ref.current
        const onEnter = () =>
          gsap.fromTo(
            rings,
            { drawSVG: '50% 50%' },
            { drawSVG: '0% 100%', duration: 0.8, stagger: 0.08, ease: 'power2.out', overwrite: true }
          )
        svg?.parentElement?.addEventListener('mouseenter', onEnter)
        return () => {
          st.kill()
          settle?.kill()
          svg?.parentElement?.removeEventListener('mouseenter', onEnter)
        }
      })
    },
    { scope: ref, dependencies: [animated] }
  )

  return (
    <svg
      ref={ref}
      viewBox="26 64 778 172"
      role="img"
      aria-label="RPW Technical Consulting (FM) Ltd"
      className={className}
      overflow="visible"
    >
      {RINGS.map((ring) => (
        <g key={ring.key} data-ring-group={ring.key}>
          <circle
            data-ring={ring.key}
            cx={ring.cx}
            cy={ring.cy}
            r={RING_R}
            fill="none"
            stroke={ring.color}
            strokeWidth={4.5}
            strokeLinecap="round"
          />
        </g>
      ))}
      <image href="/media/logo-wordmark.webp" x={183} y={68} width={617} height={166} />
    </svg>
  )
}
