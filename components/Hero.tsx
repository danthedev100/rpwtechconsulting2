// components/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CountUp } from '@/components/CountUp'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STATS = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: null as null, label: 'NHS & Public Sector', display: 'NHS' },
  { value: null as null, label: 'No Vendor Ties', display: 'Independent' },
  { value: 3, suffix: '', label: 'Service Pillars' },
]

export function Hero() {
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Respect reduced-motion preferences: hold the video on its poster frame
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reducedMotion) video.pause()
    else video.play().catch(() => {})
  }, [reducedMotion])

  return (
    <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
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

      {/* Gradient overlays — preserve purple hue at top, ensure legibility at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,8,16,0.97)] via-[rgba(8,4,20,0.55)] to-[rgba(8,4,20,0.2)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,8,16,0.6)] to-transparent" />
      {/* Technical grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_top,black,transparent_70%)]"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 pb-14 sm:pb-20 pt-36">
        {/* Location tag */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00c2a8] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00c2a8]" />
          </span>
          <span className="text-[#00c2a8] text-[0.7rem] sm:text-[0.75rem] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            North-East England · Remote &amp; On-Site
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.5rem,6.5vw,4.75rem)] font-extrabold leading-[1.02] tracking-tight mb-6 max-w-4xl">
          {['Technical assurance', 'that holds up under'].map((line, i) => (
            <span
              key={line}
              className={`block transition-all duration-700 text-white ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${300 + i * 120}ms` }}
            >
              {line}
            </span>
          ))}
          <span
            className={`block text-[#00c2a8] transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0 animate-glow-pulse' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '540ms' }}
          >
            inspection.
          </span>
        </h1>

        {/* Subline */}
        <p
          className={`text-white/70 text-lg leading-relaxed max-w-xl mb-9 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '660ms' }}
        >
          Independent FM consultancy led by Richard Warren. Decades of estates leadership
          across healthcare, public sector, and complex infrastructure — delivering
          pragmatic, data-led solutions.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap gap-3 mb-12 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '760ms' }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-[#00c2a8] text-[#0a0e1c] px-6 py-3.5 text-sm font-bold tracking-[0.15em] uppercase rounded-sm hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,194,168,0.3)] transition-all duration-200"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href="#services"
            className="border border-white/25 text-white/85 px-6 py-3.5 text-sm rounded-sm backdrop-blur-sm bg-white/[0.03] hover:border-white/50 hover:text-white transition-all duration-200"
          >
            Explore Services
          </a>
        </div>

        {/* Stats bar */}
        <dl
          className={`grid grid-cols-2 sm:grid-cols-4 gap-y-6 pt-7 border-t border-white/[0.1] transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '860ms' }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse ${i > 0 ? 'sm:border-l sm:border-white/[0.08] sm:pl-6' : ''}`}
            >
              <dt className="text-white/40 text-[0.7rem] tracking-[0.2em] uppercase">{stat.label}</dt>
              <dd className="text-[#00c2a8] text-2xl sm:text-3xl font-extrabold leading-none mb-1.5">
                {stat.value !== null ? (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
