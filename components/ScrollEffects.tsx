// components/ScrollEffects.tsx — wires up declarative [data-anim] scroll animations site-wide.
// Rendered once, after all content, so every target exists when it runs.
//
//   data-anim="fade"     rise + fade in (batched, so neighbours stagger naturally)
//   data-anim="split"    heading lines slide up from a mask
//   data-anim="rings"    SVG rings inside draw themselves
//   data-anim="line"     scaleX from the left
//   data-anim="rule"     scaleX from the centre (section dividers)
//   data-anim="reveal"   image unmasks upward with a slow settle
//   data-anim="pop"      scale up with a little overshoot
//   data-anim="scrub-x"  scaleX tied to scroll position through its section
//   data-anim="scrub-y"  scaleY tied to scroll position through its section
'use client'

import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from '@/lib/motion'

const ENTER = 'top 88%'

export function ScrollEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const all = (sel: string) => gsap.utils.toArray<HTMLElement>(`[data-anim="${sel}"]`)

      gsap.set(all('fade'), { autoAlpha: 0, y: 36 })
      ScrollTrigger.batch(all('fade'), {
        start: ENTER,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', overwrite: true }),
      })

      all('split').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.1,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: ENTER, once: true },
            }),
        })
      })

      all('rings').forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll('[data-ring]'),
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 1.2, stagger: 0.15, ease: 'power2.inOut', scrollTrigger: { trigger: el, start: ENTER, once: true } }
        )
      })

      all('line').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: ENTER, once: true },
        })
      })

      all('rule').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        })
      })

      all('reveal').forEach((el) => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
          .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
          .from(el.querySelector('img'), { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0)
      })

      gsap.set(all('pop'), { autoAlpha: 0, scale: 0.4 })
      ScrollTrigger.batch(all('pop'), {
        start: ENTER,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.18, ease: 'back.out(2.2)', overwrite: true }),
      })

      ;(['x', 'y'] as const).forEach((axis) => {
        all(`scrub-${axis}`).forEach((el) => {
          gsap.fromTo(
            el,
            axis === 'x' ? { scaleX: 0 } : { scaleY: 0 },
            {
              ...(axis === 'x' ? { scaleX: 1 } : { scaleY: 1 }),
              transformOrigin: axis === 'x' ? 'left center' : 'center top',
              ease: 'none',
              scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top 60%', end: 'bottom 70%', scrub: 0.8 },
            }
          )
        })
      })
    })

    // Initial states are now in place: lift the pre-hydration CSS gate
    document.documentElement.classList.add('motion-ready')
    ScrollTrigger.refresh()
  })

  return null
}
