// components/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import { CountUp } from '@/components/CountUp'

const STATS = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: null as null, label: 'NHS & Public Sector', display: 'NHS' },
  { value: null as null, label: 'No Vendor Ties', display: 'Independent' },
  { value: 3, suffix: '', label: 'Service Pillars' },
]

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onCanPlay={() => setLoaded(true)}
      >
        <source src="/media/rpw-hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — preserves purple hue at top, ensures legibility at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,4,20,0.92)] via-[rgba(8,4,20,0.45)] to-[rgba(8,4,20,0.18)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 pb-16 pt-32">
        {/* Location tag */}
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-700 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-5 h-px bg-[#00c2a8]" />
          <span className="text-[#00c2a8] text-[0.75rem] tracking-[0.3em] uppercase">
            North-East England · Remote &amp; On-Site
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.1] mb-5 max-w-2xl">
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
          className={`text-white/60 text-base leading-relaxed max-w-lg mb-8 transition-all duration-700 ${
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
          className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '760ms' }}
        >
          <a
            href="#contact"
            className="bg-[#00c2a8] text-[#0a0e1c] px-6 py-3 text-sm font-bold tracking-[0.15em] uppercase rounded-sm hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,194,168,0.3)] transition-all duration-200"
          >
            Get in Touch
          </a>
          <a
            href="#services"
            className="border border-white/25 text-white/80 px-6 py-3 text-sm rounded-sm hover:border-white/50 hover:text-white transition-all duration-200"
          >
            View Services ↓
          </a>
        </div>

        {/* Stats bar */}
        <div
          className={`flex flex-wrap gap-6 pt-6 border-t border-white/[0.08] transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '860ms' }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />}
              <div>
                <div className="text-[#00c2a8] text-2xl font-extrabold leading-none mb-0.5">
                  {stat.value !== null ? (
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.display
                  )}
                </div>
                <div className="text-white/35 text-[0.7rem] tracking-[0.2em] uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
