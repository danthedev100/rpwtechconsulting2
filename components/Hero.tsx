// components/Hero.tsx
'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { CountUp } from '@/components/CountUp'
import { LogoRings } from '@/components/LogoRings'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/motion'

const STATS = [
  { value: 20, suffix: '+', label: 'Years experience' },
  { value: null as null, label: 'NHS & public sector', display: 'NHS' },
  { value: null as null, label: 'No vendor ties', display: 'Independent' },
  { value: 3, suffix: '', label: 'Service pillars' },
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
          .fromTo(q('[data-hero="frame"]'), { clipPath: 'inset(100% 0% 0% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.6, ease: 'expo.inOut' }, 0.2)
          .fromTo(q('[data-hero="tag"]'), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 1 }, 0.3)
          .set(q('[data-hero="headline"]'), { autoAlpha: 1 }, 0.4)
          .from(split.lines, { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.4)
          .fromTo(q('[data-hero="sub"]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.9)
          .fromTo(q('[data-hero="cta"] > *'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 1.05)
          .fromTo(q('[data-hero="caption"]'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.2)
          .fromTo(q('[data-hero="stats"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.25)
          .from(q('[data-hero="stats-rule"]'), { scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'expo.inOut' }, 1.2)
          .from(q('[data-hero="stat"]'), { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 1.4)
          .fromTo(q('[data-hero="rings"] [data-ring]'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, stagger: 0.2, ease: 'power2.inOut' }, 0.8)

        // Scroll away: the framed video drifts slower than the page
        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
          .to(q('[data-hero="video-wrap"]'), { yPercent: 12, ease: 'none' }, 0)

        return () => split.revert()
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="top" className="relative pt-32 md:pt-40 pb-14 px-6 overflow-hidden">
      <div data-hero="content" className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-end">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div data-hero="tag" className="flex items-center gap-3 mb-8 text-[0.8rem] tracking-[0.18em] uppercase text-ink/60">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#0f8f7e] opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0f8f7e]" />
              </span>
              North-East England · Remote &amp; on-site
            </div>

            <h1
              data-hero="headline"
              className="font-serif text-ink text-[clamp(3rem,8vw,6.75rem)] leading-[0.95] tracking-[-0.02em] mb-8"
            >
              <span className="block">Technical assurance that holds up under</span>
              <span data-hero="accent" className="block italic text-[#5b36d6]">
                inspection.
              </span>
            </h1>

            <p data-hero="sub" className="text-ink/72 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
              Independent FM consultancy led by Richard Warren. Decades of estates leadership
              across healthcare, public sector, and complex infrastructure — delivering
              pragmatic, data-led solutions.
            </p>

            <div data-hero="cta" className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-ink text-[#f7f4ee] pl-7 pr-6 py-4 text-base rounded-full hover:bg-[#5b36d6] transition-colors duration-300"
              >
                Start a conversation
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 text-ink py-2 text-base border-b border-ink/30 hover:border-ink transition-colors"
              >
                Explore services
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Framed video */}
          <div className="lg:col-span-5 relative">
            <div data-hero="rings" className="hidden lg:block absolute -top-16 -left-20 w-40 z-10" aria-hidden="true">
              <LogoRings hairline strokeWidth={2} className="w-full h-auto" />
            </div>
            <div
              data-hero="frame"
              className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-[#ece6fb] shadow-[0_30px_80px_-20px_rgba(74,52,160,0.35)]"
            >
              <div data-hero="video-wrap" className="absolute -inset-y-[8%] inset-x-0">
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
              {/* Lift the purple footage towards daylight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/0 to-[rgba(23,22,28,0.35)]" />
              <div
                data-hero="caption"
                className="absolute left-4 right-4 bottom-4 sm:left-5 sm:bottom-5 sm:right-auto bg-[#f7f4ee]/90 backdrop-blur-md rounded-2xl px-5 py-4 max-w-[19rem]"
              >
                <p className="font-serif text-2xl leading-tight text-ink">Independent &amp; vendor-neutral</p>
                <p className="text-ink/60 text-sm mt-1">Healthcare, public sector and complex infrastructure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div data-hero="stats" className="relative mt-16 md:mt-20 pt-6">
          <span data-hero="stats-rule" aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-ink/[0.14]" />
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                data-hero="stat"
                className={`flex flex-col-reverse pr-4 ${i % 2 === 1 ? 'pl-4 lg:pl-6 border-l border-ink/[0.12]' : ''} ${
                  i === 2 ? 'lg:pl-6 lg:border-l lg:border-ink/[0.12]' : ''
                }`}
              >
                <dt className="text-ink/60 text-sm">{stat.label}</dt>
                <dd className="font-serif text-ink text-[clamp(2.25rem,4.2vw,3.5rem)] leading-none mb-2">
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
