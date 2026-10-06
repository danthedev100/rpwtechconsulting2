// components/Hero.tsx
'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { CountUp } from '@/components/CountUp'
import { HeroRings } from '@/components/HeroRings'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/motion'

const STATS = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: null as null, label: 'NHS & Public Sector', display: 'NHS' },
  { value: null as null, label: 'No Vendor Ties', display: 'Independent' },
  { value: 3, suffix: '', label: 'Service Pillars' },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()

  // Respect reduced-motion preferences: hold the video on its poster frame
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reducedMotion) video.pause()
    else video.play().catch(() => {})
  }, [reducedMotion])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(sectionRef)
        const split = SplitText.create(q('[data-hero="headline"] > span'), {
          type: 'lines',
          mask: 'lines',
        })

        gsap
          .timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
          .fromTo(q('[data-hero="video"]'), { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
          .fromTo(q('[data-hero="tag"]'), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 1 }, 0.3)
          .set(q('[data-hero="headline"]'), { autoAlpha: 1 }, 0.4)
          .from(split.lines, { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.4)
          .add(() => q('[data-hero="accent"]')[0]?.classList.add('animate-glow-pulse'), 1.2)
          .fromTo(q('[data-hero="sub"]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.9)
          .fromTo(q('[data-hero="cta"] > *'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 1.05)
          .fromTo(q('[data-hero="stats"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.25)
          .from(q('[data-hero="stats-rule"]'), { scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'expo.inOut' }, 1.2)
          .from(q('[data-hero="stat"]'), { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 1.4)

        // Scroll away: video drifts slower than the page, content lifts and fades
        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
          .to(q('[data-hero="video-wrap"]'), { yPercent: 18, ease: 'none' }, 0)
          .to(q('[data-hero="content"]'), { y: -80, autoAlpha: 0.2, ease: 'none' }, 0)

        return () => split.revert()
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Background video */}
      <div data-hero="video-wrap" className="absolute inset-0">
        <video
          ref={videoRef}
          data-hero="video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/rpw-hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/rpw-hero.webm" type="video/webm" />
          <source src="/media/rpw-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays — preserve purple hue at top, ensure legibility at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,8,16,0.97)] via-[rgba(8,4,20,0.55)] to-[rgba(8,4,20,0.25)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,8,16,0.65)] to-transparent" />
      {/* Technical grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_top,black,transparent_70%)]"
      />

      <HeroRings />

      {/* Content */}
      <div data-hero="content" className="relative z-10 w-full max-w-[1120px] mx-auto px-6 pb-14 sm:pb-20 pt-40">
        {/* Location tag */}
        <div data-hero="tag" className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00c2a8] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00c2a8]" />
          </span>
          <span className="text-[#00c2a8] text-[0.7rem] sm:text-[0.75rem] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            North-East England · Remote &amp; On-Site
          </span>
        </div>

        {/* Headline */}
        <h1
          data-hero="headline"
          className="text-[clamp(2.5rem,6.5vw,4.75rem)] font-extrabold leading-[1.04] tracking-tight mb-6 max-w-4xl"
        >
          <span className="block text-white">Technical assurance</span>
          <span className="block text-white">that holds up under</span>
          <span data-hero="accent" className="block text-[#00c2a8]">
            inspection.
          </span>
        </h1>

        {/* Subline */}
        <p data-hero="sub" className="text-white/70 text-lg leading-relaxed max-w-xl mb-9">
          Independent FM consultancy led by Richard Warren. Decades of estates leadership
          across healthcare, public sector, and complex infrastructure — delivering
          pragmatic, data-led solutions.
        </p>

        {/* CTAs */}
        <div data-hero="cta" className="flex flex-wrap gap-3 mb-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-[#00c2a8] text-[#0a0e1c] px-6 py-3.5 text-sm font-bold tracking-[0.15em] uppercase rounded-sm hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,194,168,0.3)] transition-[transform,box-shadow] duration-200"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href="#services"
            className="border border-white/25 text-white/85 px-6 py-3.5 text-sm rounded-sm backdrop-blur-sm bg-white/[0.03] hover:border-white/50 hover:text-white transition-colors duration-200"
          >
            Explore Services
          </a>
        </div>

        {/* Stats bar */}
        <div data-hero="stats" className="relative pt-7">
          <span data-hero="stats-rule" aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-white/[0.12]" />
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                data-hero="stat"
                className={`flex flex-col-reverse ${i > 0 ? 'sm:border-l sm:border-white/[0.08] sm:pl-6' : ''}`}
              >
                <dt className="text-white/40 text-[0.7rem] tracking-[0.2em] uppercase">{stat.label}</dt>
                <dd className="text-[#00c2a8] text-2xl sm:text-3xl font-extrabold leading-none mb-1.5">
                  {stat.value !== null ? <CountUp end={stat.value} suffix={stat.suffix} /> : stat.display}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
