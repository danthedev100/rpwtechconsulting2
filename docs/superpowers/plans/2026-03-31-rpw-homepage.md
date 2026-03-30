# RPW Technical Consulting — Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page marketing website for RPW Technical Consulting (FM) Ltd — dark navy/teal design, video hero, contact form with Resend email delivery, deployed on Vercel.

**Architecture:** Next.js 16 App Router with Server Components throughout except for Nav, Hero, and ContactForm which need client-side interactivity. Shared FadeUp/CountUp animation components use Intersection Observer. Contact form POSTs to a Route Handler that calls Resend.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Geist font, Resend, Vercel

---

## File Map

```
app/
  layout.tsx              — root layout: Geist font, metadata, dark bg
  page.tsx                — assembles all section components
  globals.css             — @import tailwindcss, @theme tokens, keyframes
  api/
    contact/
      route.ts            — POST handler: validate → Resend → 200/400/500
      __tests__/
        route.test.ts     — Jest tests for validation + Resend mock

components/
  Nav.tsx                 — 'use client': sticky, scroll-aware, mobile hamburger
  Hero.tsx                — 'use client': video bg, staggered headline, stats counter
  Services.tsx            — Server: 3 pillar cards + working model strip
  WhyRPW.tsx              — Server: 4 differentiator blocks
  About.tsx               — Server: Richard Warren bio + portrait
  Contact.tsx             — Server: section wrapper (copy left, form right)
  ContactForm.tsx         — 'use client': form state, fetch, success/error
  Footer.tsx              — Server: copyright + location
  FadeUp.tsx              — 'use client': Intersection Observer fade-up wrapper
  CountUp.tsx             — 'use client': animated number counter

hooks/
  useScrolled.ts          — 'use client': window.scrollY > threshold

public/
  media/
    logo-light.jpeg       — white JPG logo (mix-blend-mode: screen in nav)
    logo-dark.jpg         — dark JPG logo (future use)
    rpw-hero.mp4          — hero background video
    richard-portrait.jpg  — Richard Warren headshot

next.config.ts            — minimal config
.env.local                — RESEND_API_KEY, CONTACT_EMAIL
jest.config.ts            — Jest config for API route tests
jest.setup.ts             — jest-dom setup
```

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json` (via create-next-app)

- [ ] **Step 1: Scaffold with create-next-app**

Run in `c:/dev/rpwtechconsulting2/`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```
Expected: project scaffolded with Next.js 16, TypeScript, Tailwind, App Router.

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```
Expected: server starts on http://localhost:3000. Open and confirm default Next.js page loads. Stop server (Ctrl+C).

- [ ] **Step 3: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 16 project"
```

---

## Task 2: Copy and rename media assets to public/

**Files:**
- Create: `public/media/logo-light.jpeg`
- Create: `public/media/logo-dark.jpg`
- Create: `public/media/rpw-hero.mp4`
- Create: `public/media/richard-portrait.jpg`

- [ ] **Step 1: Create the public/media directory and copy assets**

```bash
mkdir -p public/media
cp "media/RPW Technical Consulting (FM) LTD White Large.jpeg" public/media/logo-light.jpeg
cp "media/RPW Technical Consulting (FM) LTD Dark.JPG" public/media/logo-dark.jpg
cp "media/rpw-hero.mp4" public/media/rpw-hero.mp4
cp "media/Richard-portrait.jpg" public/media/richard-portrait.jpg
```

- [ ] **Step 2: Verify assets are accessible**

```bash
npm run dev
```
Open http://localhost:3000/media/logo-light.jpeg in the browser. Expected: logo image displays. Stop server.

- [ ] **Step 3: Commit**

```bash
git add public/media
git commit -m "chore: add media assets to public/"
```

---

## Task 3: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Geist font and Resend**

```bash
npm install geist resend
```

- [ ] **Step 2: Initialise shadcn/ui**

```bash
npx shadcn@latest init
```
When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

- [ ] **Step 3: Install shadcn Input, Textarea, Button, Label**

```bash
npx shadcn@latest add input textarea button label
```
Expected: components created in `components/ui/`.

- [ ] **Step 4: Install Jest and React Testing Library**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest
```

- [ ] **Step 5: Create jest.config.ts**

```ts
// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default config
```

- [ ] **Step 6: Create jest.setup.ts**

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Add test script to package.json**

Open `package.json` and add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: install deps — geist, resend, shadcn, jest"
```

---

## Task 4: Global styles and CSS design tokens

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Replace globals.css**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg-base: #060810;
  --color-bg-surface: #0a1628;
  --color-bg-elevated: #0d1e30;
  --color-bg-card: #0f1c2e;
  --color-accent: #00c2a8;
  --color-accent-dim: rgba(0, 194, 168, 0.10);
  --color-accent-border: rgba(0, 194, 168, 0.18);
  --color-text-primary: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.60);
  --color-text-muted: rgba(255, 255, 255, 0.35);
  --color-border-subtle: rgba(255, 255, 255, 0.08);

  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-bg-base);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 20px rgba(0, 194, 168, 0.5); }
  50% { text-shadow: none; }
}

.animate-fade-in {
  animation: fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-up {
  animation: fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-glow-pulse {
  animation: glowPulse 1s ease-out;
}
```

- [ ] **Step 2: Update app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'RPW Technical Consulting (FM) Ltd — Technical, Asset Management & Compliance',
  description:
    'Independent FM consultancy led by Richard Warren. Specialist services in technical compliance, asset management, and safe systems of work across healthcare and public sector.',
  openGraph: {
    title: 'RPW Technical Consulting',
    description: 'Independent FM consultancy. North-East England.',
    url: 'https://rpwtechnicalconsulting.co.uk',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Update next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {}

export default config
```

- [ ] **Step 4: Verify build has no errors**

```bash
npm run build
```
Expected: build completes with no TypeScript or Tailwind errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx next.config.ts
git commit -m "feat: add global styles, CSS tokens, Geist font"
```

---

## Task 5: FadeUp and CountUp animation components

**Files:**
- Create: `components/FadeUp.tsx`
- Create: `components/CountUp.tsx`
- Create: `hooks/useScrolled.ts`

- [ ] **Step 1: Create useScrolled hook**

```ts
// hooks/useScrolled.ts
'use client'

import { useEffect, useState } from 'react'

export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    // Check initial position
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}
```

- [ ] **Step 2: Create FadeUp component**

```tsx
// components/FadeUp.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition:
          'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Create CountUp component**

```tsx
// components/CountUp.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
}

export function CountUp({ end, suffix = '', duration = 1200 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/FadeUp.tsx components/CountUp.tsx hooks/useScrolled.ts
git commit -m "feat: add FadeUp, CountUp animation components and useScrolled hook"
```

---

## Task 6: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create Nav.tsx**

```tsx
// components/Nav.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useScrolled } from '@/hooks/useScrolled'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const scrolled = useScrolled(80)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0e1c]/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,194,168,0.1),0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" aria-label="RPW Technical Consulting home">
          <Image
            src="/media/logo-light.jpeg"
            alt="RPW Technical Consulting (FM) Ltd"
            width={160}
            height={36}
            className="h-8 w-auto"
            style={{ mixBlendMode: 'screen' }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.625rem] tracking-[0.15em] text-white/40 hover:text-white transition-colors duration-200 relative group uppercase"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00c2a8] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#00c2a8] text-[#0a0e1c] px-4 py-2 text-[0.625rem] font-bold tracking-[0.15em] uppercase rounded-sm hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,194,168,0.35)] transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-white/60 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-200 origin-center ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-200 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-200 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0a0e1c]/95 backdrop-blur-md border-t border-white/5`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#00c2a8] text-[#0a0e1c] px-4 py-3 text-xs font-bold tracking-widest uppercase rounded-sm text-center hover:brightness-110 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Nav to page.tsx temporarily to verify**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="h-screen bg-bg-base" />
    </main>
  )
}
```

- [ ] **Step 3: Run dev and visually verify**

```bash
npm run dev
```
Open http://localhost:3000. Check: Nav appears fixed at top, transparent. Scroll down → nav goes solid with blur. Resize to mobile → hamburger appears, menu opens/closes. Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add sticky Nav with scroll-aware background and mobile menu"
```

---

## Task 7: Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
// components/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import { CountUp } from '@/components/CountUp'

const STATS = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: null, label: 'NHS & Public Sector', display: 'NHS' },
  { value: null, label: 'No Vendor Ties', display: 'Independent' },
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
          <span className="text-[#00c2a8] text-[0.6rem] tracking-[0.3em] uppercase">
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
          className={`text-white/60 text-sm leading-relaxed max-w-lg mb-8 transition-all duration-700 ${
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
            className="bg-[#00c2a8] text-[#0a0e1c] px-6 py-3 text-[0.7rem] font-bold tracking-[0.15em] uppercase rounded-sm hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,194,168,0.3)] transition-all duration-200"
          >
            Get in Touch
          </a>
          <a
            href="#services"
            className="border border-white/25 text-white/80 px-6 py-3 text-[0.7rem] rounded-sm hover:border-white/50 hover:text-white transition-all duration-200"
          >
            View Services ↓
          </a>
        </div>

        {/* Stats bar */}
        <div
          className={`flex flex-wrap gap-6 pt-6 border-t border-white/8 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '860ms' }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && <div className="hidden sm:block w-px h-8 bg-white/8" />}
              <div>
                <div className="text-[#00c2a8] text-xl font-extrabold leading-none mb-0.5">
                  {stat.value !== null ? (
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.display
                  )}
                </div>
                <div className="text-white/35 text-[0.55rem] tracking-[0.2em] uppercase">
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
```

- [ ] **Step 2: Add Hero to page.tsx**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Run dev and visually verify**

```bash
npm run dev
```
Open http://localhost:3000. Check: video plays and fades in, headline staggers in line by line, "inspection." glows on entrance, stats count up when in view, both CTAs render, mobile layout looks correct. Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with video background and animated content"
```

---

## Task 8: Services section

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Create Services.tsx**

```tsx
// components/Services.tsx
import { FadeUp } from '@/components/FadeUp'

const PILLARS = [
  {
    name: 'Technical Solutions',
    services: [
      'Safe systems of work',
      'Authorising engineer',
      'CAFM leadership & implementation',
      'Water & ventilation systems',
      'Energy management',
      'Incident investigation',
      'Technical due diligence',
      'PFI hand-back support',
      'Business continuity planning',
    ],
  },
  {
    name: 'Asset Management',
    services: [
      'Asset validation & capture',
      'Asset surveys & strategy',
      'Condition surveys',
      'Lifecycle planning',
      'Mobilisation support',
    ],
  },
  {
    name: 'Compliance Management',
    services: [
      'Compliance audits',
      'Gap analysis',
      'Compliance strategy',
      'CAFM compliance solutions',
      'Regulatory reporting',
    ],
  },
]

const WORKING_MODEL = [
  'Short advisory engagements',
  'Mobilisation support',
  'Interim leadership',
  'Governance improvement programmes',
]

export function Services() {
  return (
    <section id="services" className="bg-[#0d1e30] py-20 px-6">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00c2a8] text-[0.6rem] tracking-[0.3em] uppercase font-bold mb-2">
            What We Do
          </p>
          <h2 className="text-white text-xl font-bold">Three pillars. One specialist.</h2>
        </FadeUp>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {PILLARS.map((pillar, i) => (
            <FadeUp key={pillar.name} delay={i * 80}>
              <div className="bg-[#0f1c2e] border border-[rgba(0,194,168,0.12)] border-t-2 border-t-[#00c2a8] rounded-md p-6 h-full shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_-2px_12px_rgba(0,194,168,0.2)] hover:-translate-y-1.5 hover:border-[rgba(0,194,168,0.3)] transition-all duration-[250ms] group">
                <h3 className="text-[#00c2a8] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4">
                  {pillar.name}
                </h3>
                <ul className="space-y-1.5">
                  {pillar.services.map((service) => (
                    <li key={service} className="flex items-start gap-2 text-white/50 text-[0.8rem] leading-snug">
                      <span className="text-[#00c2a8] mt-0.5 text-xs flex-shrink-0">·</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Working model strip */}
        <FadeUp delay={240}>
          <div className="bg-[#0a1628] border border-[rgba(0,194,168,0.10)] rounded-md px-6 py-4 flex flex-wrap items-center gap-4">
            <span className="text-[#00c2a8] text-[0.6rem] font-bold tracking-[0.2em] uppercase flex-shrink-0">
              Working Model
            </span>
            <div className="flex flex-wrap gap-2">
              {WORKING_MODEL.map((tag) => (
                <span
                  key={tag}
                  className="bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.15)] text-white/55 text-[0.7rem] px-3 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Services to page.tsx**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
    </main>
  )
}
```

- [ ] **Step 3: Run dev and verify**

```bash
npm run dev
```
Check: 3 cards render with teal top border, hover lifts card with shadow glow, service bullets display, working model tags show below. Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Services.tsx app/page.tsx
git commit -m "feat: add Services section with 3 pillar cards and working model strip"
```

---

## Task 9: Why RPW section

**Files:**
- Create: `components/WhyRPW.tsx`

- [ ] **Step 1: Create WhyRPW.tsx**

```tsx
// components/WhyRPW.tsx
import { FadeUp } from '@/components/FadeUp'

const DIFFERENTIATORS = [
  {
    icon: '⊙',
    heading: 'Truly Independent',
    body: 'No vendor ties. Advice that serves your interests, not a product or contractor agenda.',
  },
  {
    icon: '◈',
    heading: 'Safe Systems & Evidence',
    body: 'Prioritising safe systems of work, transparent compliance evidence, and confident decision-making.',
  },
  {
    icon: '⬡',
    heading: 'Healthcare & Public Sector Depth',
    body: 'Decades of estates leadership across NHS, public sector, and complex infrastructure environments.',
  },
  {
    icon: '◎',
    heading: 'Flexible Delivery',
    body: 'Remote or on-site. Short advisory engagements to long-term governance improvement programmes.',
  },
]

export function WhyRPW() {
  return (
    <section id="why-rpw" className="bg-[#0a1628] py-20 px-6">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00c2a8] text-[0.6rem] tracking-[0.3em] uppercase font-bold mb-2">
            Why RPW
          </p>
          <h2 className="text-white text-xl font-bold">Independent. Pragmatic. Data-led.</h2>
        </FadeUp>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {DIFFERENTIATORS.map((item, i) => (
            <FadeUp key={item.heading} delay={i * 80}>
              <div className="flex gap-4 group">
                <div className="w-9 h-9 flex-shrink-0 bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.20)] rounded-md flex items-center justify-center text-[#00c2a8] text-base group-hover:bg-[rgba(0,194,168,0.18)] group-hover:shadow-[0_0_16px_rgba(0,194,168,0.2)] transition-all duration-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold mb-1.5 group-hover:text-white transition-colors duration-150">
                    {item.heading}
                  </h3>
                  <p className="text-white/45 text-[0.8rem] leading-relaxed">{item.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add WhyRPW to page.tsx**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyRPW } from '@/components/WhyRPW'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <WhyRPW />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/WhyRPW.tsx app/page.tsx
git commit -m "feat: add Why RPW section with differentiator blocks"
```

---

## Task 10: About section

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create About.tsx**

```tsx
// components/About.tsx
import Image from 'next/image'
import { FadeUp } from '@/components/FadeUp'

const FOCUS_AREAS = [
  'Authorising Engineer',
  'Asset Strategy',
  'Statutory Compliance',
  'Incident Review',
  'Resilience Planning',
]

export function About() {
  return (
    <section id="about" className="bg-[#0d1e30] py-20 px-6 border-t border-[rgba(0,194,168,0.08)]">
      <div className="max-w-[1120px] mx-auto">
        <FadeUp>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Portrait */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#00c2a8] shadow-[0_0_0_2px_#00c2a8,0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(0,194,168,0.2)] hover:shadow-[0_0_0_2px_#00c2a8,0_8px_32px_rgba(0,0,0,0.4),0_0_48px_rgba(0,194,168,0.35)] transition-shadow duration-300">
                <Image
                  src="/media/richard-portrait.jpg"
                  alt="Richard Warren, Principal Consultant at RPW Technical Consulting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-[#00c2a8] text-[0.6rem] tracking-[0.3em] uppercase font-bold mb-1">
                About
              </p>
              <h2 className="text-white text-xl font-extrabold mb-1">Richard Warren</h2>
              <p className="text-white/35 text-[0.75rem] mb-5">
                Independent Lead Consultant · RPW Technical Consulting (FM) Ltd
              </p>

              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Led by Richard Warren, with an emphasis on technical assurance that holds up under
                inspection. Decades of estates leadership across healthcare, public sector, and
                complex infrastructure underpin a pragmatic, data-led approach — prioritising safe
                systems of work, transparent compliance evidence, and confident decision-making.
              </p>

              {/* Focus areas */}
              <div>
                <p className="text-white/30 text-[0.6rem] tracking-[0.15em] uppercase mb-3">
                  Focus Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {FOCUS_AREAS.map((area) => (
                    <span
                      key={area}
                      className="bg-[rgba(0,194,168,0.08)] border border-[rgba(0,194,168,0.20)] text-[#00c2a8] text-[0.65rem] font-mono px-3 py-1 rounded-sm hover:bg-[rgba(0,194,168,0.18)] hover:-translate-y-px transition-all duration-150 cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add About to page.tsx**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyRPW } from '@/components/WhyRPW'
import { About } from '@/components/About'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <WhyRPW />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Run dev and verify**

```bash
npm run dev
```
Check: portrait renders with circular crop and teal ring glow, hover intensifies glow, credential tags lift on hover, bio text is readable. Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: add About section with Richard Warren bio and portrait"
```

---

## Task 11: Contact API route (TDD)

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `app/api/contact/__tests__/route.test.ts`

- [ ] **Step 1: Write the failing tests first**

```ts
// app/api/contact/__tests__/route.test.ts
import { POST } from '../route'

// Mock Resend before importing the route
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}))

describe('POST /api/contact', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-resend-key'
    process.env.CONTACT_EMAIL = 'test@example.com'
  })

  it('returns 400 when name is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a@b.com', enquiry: 'Test', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/required/i)
  })

  it('returns 400 when email is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', enquiry: 'Test', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'a@b.com', enquiry: 'Test' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 200 with all required fields', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'jane@example.com',
        organisation: 'NHS Trust',
        enquiry: 'Compliance audit',
        message: 'We need help with our water compliance programme.',
      }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 400 when enquiry is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'a@b.com', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- --testPathPattern="route.test"
```
Expected: tests fail with "Cannot find module '../route'" or similar.

- [ ] **Step 3: Implement the route**

```ts
// app/api/contact/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  let body: Record<string, string>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, enquiry, message, organisation } = body

  if (!name?.trim() || !email?.trim() || !enquiry?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Required fields missing: name, email, enquiry, and message are required.' },
      { status: 400 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.CONTACT_EMAIL ?? 'richard@rpwtechnicalconsulting.co.uk'

  const emailBody = [
    `New enquiry from RPW Technical Consulting website`,
    ``,
    `Name:         ${name}`,
    `Email:        ${email}`,
    `Organisation: ${organisation || '—'}`,
    `Enquiry type: ${enquiry}`,
    ``,
    `Message:`,
    message,
  ].join('\n')

  try {
    const { error } = await resend.emails.send({
      from: 'website@rpwtechnicalconsulting.co.uk',
      to,
      replyTo: email,
      subject: `Website enquiry from ${name} — ${enquiry}`,
      text: emailBody,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern="route.test"
```
Expected: all 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add app/api/contact/route.ts "app/api/contact/__tests__/route.test.ts"
git commit -m "feat: add contact API route with Resend integration (TDD)"
```

---

## Task 12: ContactForm component

**Files:**
- Create: `components/ContactForm.tsx`

- [ ] **Step 1: Create ContactForm.tsx**

```tsx
// components/ContactForm.tsx
'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const INPUT_CLASS =
  'w-full bg-[#0f1c2e] border border-[rgba(255,255,255,0.08)] rounded-sm px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#00c2a8] focus:shadow-[0_0_0_3px_rgba(0,194,168,0.15)] transition-all duration-200'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value ?? ''

    const payload = {
      name: get('name'),
      email: get('email'),
      organisation: get('organisation'),
      enquiry: get('enquiry'),
      message: get('message'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setState('success')
      } else {
        const json = await res.json()
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-4 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-[rgba(0,194,168,0.1)] border border-[rgba(0,194,168,0.3)] flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#00c2a8]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg">Message sent</p>
        <p className="text-white/45 text-sm text-center max-w-xs">
          Thank you for getting in touch. Richard will respond within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="name"
          required
          placeholder="Full name"
          className={INPUT_CLASS}
          disabled={state === 'loading'}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className={INPUT_CLASS}
          disabled={state === 'loading'}
        />
      </div>

      <input
        name="organisation"
        placeholder="Organisation (optional)"
        className={INPUT_CLASS}
        disabled={state === 'loading'}
      />

      <input
        name="enquiry"
        required
        placeholder="Nature of enquiry"
        className={INPUT_CLASS}
        disabled={state === 'loading'}
      />

      <textarea
        name="message"
        required
        placeholder="Message"
        rows={5}
        className={`${INPUT_CLASS} resize-none`}
        disabled={state === 'loading'}
      />

      {state === 'error' && (
        <p className="text-red-400 text-xs" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-[#00c2a8] text-[#0a0e1c] py-3 text-[0.7rem] font-bold tracking-[0.15em] uppercase rounded-sm shadow-[0_4px_16px_rgba(0,194,168,0.2)] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(0,194,168,0.35)] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200"
      >
        {state === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
            Sending…
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ContactForm.tsx
git commit -m "feat: add ContactForm client component with loading/success/error states"
```

---

## Task 13: Contact section and Footer

**Files:**
- Create: `components/Contact.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Contact.tsx**

```tsx
// components/Contact.tsx
import { FadeUp } from '@/components/FadeUp'
import { ContactForm } from '@/components/ContactForm'

export function Contact() {
  return (
    <section id="contact" className="bg-[#0a1628] py-20 px-6 border-t border-[rgba(0,194,168,0.10)]">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: copy */}
          <FadeUp>
            <p className="text-[#00c2a8] text-[0.6rem] tracking-[0.3em] uppercase font-bold mb-2">
              Get in Touch
            </p>
            <h2 className="text-white text-xl font-bold mb-5 leading-snug">
              Ready to discuss<br />your project?
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm">
              Whether you need a compliance audit, asset strategy support, or specialist
              technical input — get in touch and Richard will respond within one business day.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00c2a8] flex-shrink-0" />
              <a
                href="mailto:richard@rpwtechnicalconsulting.co.uk"
                className="text-white/45 text-sm hover:text-white transition-colors duration-200"
              >
                richard@rpwtechnicalconsulting.co.uk
              </a>
            </div>
          </FadeUp>

          {/* Right: form */}
          <FadeUp delay={100}>
            <ContactForm />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Footer.tsx**

```tsx
// components/Footer.tsx
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060810] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1120px] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-white/20 text-[0.65rem]">
          © {year} RPW Technical Consulting (FM) Ltd · Registered in England &amp; Wales
        </p>
        <p className="text-white/20 text-[0.65rem]">North-East England</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx components/Footer.tsx
git commit -m "feat: add Contact section and Footer"
```

---

## Task 14: Assemble the full page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx with the full assembly**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyRPW } from '@/components/WhyRPW'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyRPW />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev and do a full visual walkthrough**

```bash
npm run dev
```
Walk through the full page checking each section:
- [ ] Nav: transparent on load, solid on scroll, mobile hamburger works
- [ ] Hero: video plays, headline staggers in, stats count up
- [ ] Services: 3 cards with hover lift + glow, working model strip
- [ ] Why RPW: icons glow on hover, blocks fade up on scroll
- [ ] About: portrait with teal ring glow, tags lift on hover
- [ ] Contact: split layout, form renders all fields
- [ ] Footer: renders, year is correct
- [ ] Smooth scroll: nav links jump to correct sections

- [ ] **Step 3: Run build to check for errors**

```bash
npm run build
```
Expected: build completes successfully, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full homepage — all sections wired together"
```

---

## Task 15: Environment variables and final checks

**Files:**
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Create .env.local**

```bash
# .env.local
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=richard@rpwtechnicalconsulting.co.uk
```

> **Note:** Richard needs to create a Resend account at resend.com, verify the domain `rpwtechnicalconsulting.co.uk`, and replace `your_resend_api_key_here` with the real key. Until then, the form will return a 500 error on submit.

- [ ] **Step 2: Ensure .env.local is in .gitignore**

Open `.gitignore` and confirm `.env*.local` is listed. If not, add it:
```
.env*.local
```

- [ ] **Step 3: Run all tests**

```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 4: Run final build**

```bash
npm run build
```
Expected: no errors, build completes.

- [ ] **Step 5: Check mobile layout at 375px**

```bash
npm run dev
```
Open http://localhost:3000 in browser. Open DevTools → device mode → iPhone SE (375px). Check:
- [ ] Nav collapses to hamburger, menu opens/closes
- [ ] Hero headline fits without overflow
- [ ] Service cards stack vertically
- [ ] About section stacks (portrait above bio)
- [ ] Contact form is full width, inputs are usable
- [ ] No horizontal scroll anywhere

- [ ] **Step 6: Final commit**

```bash
git add .gitignore .env.local
git commit -m "chore: add env vars config and final checks"
```

---

## Open Items Before Go-Live

| Item | Action |
|---|---|
| Resend account | Create at resend.com, verify domain, add API key to `.env.local` and Vercel env vars |
| Stats bar values | Update `STATS` array in `Hero.tsx` with Richard's confirmed figures |
| Company reg number | Add to `Footer.tsx` if required |
| Vercel deployment | Run `npx vercel` to link project and deploy |
| Phone number | Add to `Contact.tsx` if Richard wants to include it |
