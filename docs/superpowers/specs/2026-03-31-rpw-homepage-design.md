# RPW Technical Consulting — Homepage Design Spec

**Date:** 2026-03-31
**Status:** Approved
**Scope:** Single-page marketing website for RPW Technical Consulting (FM) Ltd

---

## 1. Project Overview

### Business
RPW Technical Consulting (FM) Ltd is an independent FM consultancy based in the North-East of England, led by Richard Warren. The business offers specialist services across three pillars: Technical Solutions, Asset Management, and Compliance Management, primarily serving building/facilities managers, property owners, and contractors in the healthcare, public sector, and complex infrastructure sectors.

### Goals
- Establish credibility and authority for Richard Warren as an independent specialist
- Convert visitors to enquiries via a contact form
- Serve a mixed audience (FM professionals, property owners, M&E contractors) without requiring separate pathways

### Scope
Single scrolling page (Layout A — Classic Consultancy). Layout C (Problem-First) is a future option once full copy is available. All sections are on one URL with smooth-scroll anchor navigation.

### Future-proofing note
The architecture should make it trivial to add inner pages (e.g. `/services/technical`) later without restructuring the codebase.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static-optimised, Vercel-native, App Router for future extensibility |
| Styling | Tailwind CSS v4 | Utility-first, co-located styles, easy dark theme |
| Components | shadcn/ui | Form inputs, accessible primitives |
| Language | TypeScript | Type safety throughout |
| Contact form backend | Next.js Route Handler + Resend | Simple email delivery via Vercel Marketplace |
| Deployment | Vercel | Zero-config, edge CDN, preview deployments |
| Font | Geist Sans (display) + Geist Mono (accents/tags) | Vercel native, clean, technical |

The entire homepage is a Server Component page. The contact form is the only interactive island — extracted as a `'use client'` component.

---

## 3. Visual Design System

### Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#060810` | Page background, footer |
| `--bg-surface` | `#0a1628` | Section backgrounds (alt) |
| `--bg-elevated` | `#0d1e30` | Section backgrounds (primary) |
| `--bg-card` | `#0f1c2e` | Cards, form inputs |
| `--accent` | `#00c2a8` | Primary accent — teal |
| `--accent-dim` | `rgba(0,194,168,0.10)` | Accent backgrounds |
| `--accent-border` | `rgba(0,194,168,0.18)` | Accent borders |
| `--text-primary` | `#ffffff` | Headings |
| `--text-secondary` | `rgba(255,255,255,0.60)` | Body copy |
| `--text-muted` | `rgba(255,255,255,0.35)` | Labels, metadata |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Dividers, card borders |

### Typography

| Element | Size | Weight | Notes |
|---|---|---|---|
| H1 (hero) | `clamp(2rem, 5vw, 3rem)` | 800 | Three lines, last word teal |
| H2 (section title) | `1.125rem` | 700 | White |
| Section label | `0.625rem` | 700 | Teal, 3px letter-spacing, uppercase |
| Body | `0.875rem` | 400 | text-secondary |
| Tags/badges | `0.6875rem` | 500 | Geist Mono, accent bordered |
| Nav links | `0.625rem` | 400 | text-muted, hover → white |

### Spacing
Base unit: `4px`. Section padding: `py-16 px-6` (desktop), `py-12 px-4` (mobile). Max content width: `1120px`, centred.

### Motion
- `transition-colors duration-200` on all interactive elements
- Hero video fade-in on load: `opacity-0 → opacity-100`, 800ms, ease-out
- Section entrance: `translate-y-6 opacity-0 → translate-y-0 opacity-100`, 600ms ease-out, triggered by Intersection Observer (once, 20% threshold). Children stagger 80ms apart.
- Stats bar numbers: count-up animation on first viewport entry (0 → final value over 1200ms)

---

## 4. Assets

| File | Path | Usage |
|---|---|---|
| Light logo | `media/RPW Technical Consulting (FM) LTD White Large.jpeg` | Nav bar (dark surfaces) — `mix-blend-mode: screen` to eliminate white JPG background |
| Dark logo | `media/RPW Technical Consulting (FM) LTD Dark.JPG` | Footer or any future light-background context |
| Hero video | `media/rpw-hero.mp4` | Hero section background — autoplay, muted, loop, playsInline |
| Richard headshot | `media/Richard-portrait.jpg` | About section — circular crop, `object-cover`, teal ring + glow |

### Logo JPG transparency workaround
Since the logos are JPEGs (no alpha channel), apply `mix-blend-mode: screen` in CSS to the white logo on dark backgrounds. This renders the white background transparent. The dark logo can be used with `mix-blend-mode: multiply` on any future light sections.

Place assets in `public/media/` so Next.js serves them statically. Use `next/image` for the logo (optimised). The hero video is served as a raw `<video>` element (not `next/image`) since it is not a static image.

---

## 5. Page Structure

The page is one scrolling document. Each section has an `id` for anchor navigation.

```
<html>
  <body>
    <Nav />           — sticky, transparent → solid on scroll
    <Hero />          — full-viewport, video background
    <Services />      — 3 pillar cards + working model strip     id="services"
    <WhyRPW />        — 4 differentiator blocks                  id="why-rpw"
    <About />         — Richard Warren bio + credential tags      id="about"
    <Contact />       — split layout: copy left, form right      id="contact"
    <Footer />
  </body>
</html>
```

---

## 6. Section Specifications

### 6.1 Nav
- **Sticky** — `position: sticky; top: 0; z-index: 50`
- **`'use client'`** — needs scroll listener for background transition
- **Transparent** on load → `bg-[#0a0e1c]/90 backdrop-blur-md` once `window.scrollY > 80px`
- **Left:** Light logo JPG, `mix-blend-mode: screen`, max-height `32px`
- **Right:** Anchor links (Services, About, Contact) + teal "GET IN TOUCH" button (scrolls to `#contact`)
- **Mobile:** Hamburger menu → full-screen overlay with links (toggle with `useState`)

### 6.2 Hero
- **Full viewport height** (`min-h-screen`)
- **Video:** `<video autoPlay muted loop playsInline>` with `src="/media/rpw-hero.mp4"`. Absolute positioned, `object-fit: cover`, full bleed.
- **Overlay:** `linear-gradient(to top, rgba(8,4,20,0.90) 0%, rgba(8,4,20,0.45) 50%, rgba(8,4,20,0.20) 100%)` — preserves purple hue at top while ensuring text legibility at bottom.
- **Content** (bottom-anchored, `pb-16`):
  - Location tag: teal line + "NORTH-EAST ENGLAND · REMOTE & ON-SITE"
  - H1: "Technical assurance / that holds up under / **inspection.**" (last word teal)
  - Subline: Richard Warren positioning statement
  - Dual CTA: "GET IN TOUCH" (teal filled) + "View Services ↓" (ghost)
  - Stats bar: `20+ Years Experience` / `NHS & Public Sector` / `Independent` / `3 Service Pillars` — separated by hairline dividers

### 6.3 Services
- **Background:** `--bg-elevated`
- **Header:** Section label + "Three pillars. One specialist."
- **3 Cards** side by side (desktop) / stacked (mobile), each with:
  - Teal top border (`border-t-2 border-accent`)
  - Pillar name (teal, uppercase, tracked)
  - Bullet list of sub-services
- **Working Model strip** below cards — horizontal pill tags: "Short advisory engagements" / "Mobilisation support" / "Interim leadership" / "Governance improvement programmes"

### 6.4 Why RPW
- **Background:** `--bg-surface`
- **4 differentiator blocks** in a 2×2 grid:
  1. Truly Independent — no vendor ties
  2. Safe Systems & Evidence — transparent compliance, confident decision-making
  3. Healthcare & Public Sector Depth — NHS, complex infrastructure
  4. Flexible Delivery — remote/on-site, short engagements to governance programmes
- Each block: small icon square (accent bg + border) + heading + 1–2 line description

### 6.5 About Richard Warren
- **Background:** `--bg-elevated`
- **Layout:** Photo left (90px circle, placeholder until headshot supplied) + content right
- **Content:**
  - Label: "About"
  - Name: "Richard Warren" (H2 weight)
  - Role: "Independent Lead Consultant · RPW Technical Consulting (FM) Ltd" (muted)
  - Bio paragraph (as supplied)
  - Focus area tags: Authorising Engineer / Asset Strategy / Statutory Compliance / Incident Review / Resilience Planning

### 6.6 Contact
- **Background:** `--bg-surface`
- **Layout:** 2-column (desktop) — copy left, form right / stacked (mobile)
- **Left copy:** Section label + "Ready to discuss your project?" + short paragraph + email address
- **Form fields:** Full name, Email address, Organisation, Nature of enquiry, Message (textarea)
- **Submit button:** Full-width teal, "SEND MESSAGE"
- **Backend:** `POST /api/contact` → Next.js Route Handler → Resend (`resend.emails.send`) → delivers to `richard@rpwtechnicalconsulting.co.uk`
- **Form state:** Loading spinner on submit, success message inline (no page reload), error message on failure
- **Validation:** Client-side required fields; server-side re-validation before sending

### 6.7 Footer
- **Background:** `--bg-base` (`#060810`)
- Single row: "© 2026 RPW Technical Consulting (FM) Ltd · Registered in England & Wales" (left) + "North-East England" (right)
- Both in `text-muted`

---

## 7. Responsiveness

| Breakpoint | Key changes |
|---|---|
| `< 640px` (mobile) | Single column throughout; nav collapses to hamburger; hero content full-width; service cards stack; about section stacks vertically |
| `640–1024px` (tablet) | Services 2+1 grid; contact stacked; nav links visible |
| `> 1024px` (desktop) | Full layout as designed |

---

## 8. Contact Form — Backend

**Route:** `app/api/contact/route.ts`

**Request body:**
```ts
{
  name: string
  email: string
  organisation?: string
  enquiry: string
  message: string
}
```

**Flow:**
1. Validate all required fields server-side (return 400 on failure)
2. Call `resend.emails.send()` with the form data formatted into a plain-text email body
3. Send to `richard@rpwtechnicalconsulting.co.uk`
4. Return `{ success: true }` (200) or `{ error: string }` (500)

**Environment variables required:**
- `RESEND_API_KEY` — from Vercel Marketplace (Resend integration)
- `CONTACT_EMAIL` — `richard@rpwtechnicalconsulting.co.uk`

---

## 9. SEO & Metadata

```ts
export const metadata = {
  title: "RPW Technical Consulting (FM) Ltd — Technical, Asset Management & Compliance",
  description: "Independent FM consultancy led by Richard Warren. Specialist services in technical compliance, asset management, and safe systems of work across healthcare and public sector.",
  openGraph: {
    title: "RPW Technical Consulting",
    description: "Independent FM consultancy. North-East England.",
    url: "https://rpwtechnicalconsulting.co.uk",
  }
}
```

---

## 10. File Structure

```
c:/dev/rpwtechconsulting2/
├── public/
│   └── media/
│       ├── RPW Technical Consulting (FM) LTD White Large.jpeg
│       ├── RPW Technical Consulting (FM) LTD Dark.JPG
│       ├── rpw-hero.mp4
│       └── Richard-portrait.jpg
├── app/
│   ├── layout.tsx          — root layout, Geist font, metadata
│   ├── page.tsx            — assembles all sections
│   ├── globals.css         — CSS variables, Tailwind base
│   └── api/
│       └── contact/
│           └── route.ts    — contact form handler
├── components/
│   ├── Nav.tsx             — sticky nav with scroll behaviour
│   ├── Hero.tsx            — video background hero
│   ├── Services.tsx        — 3 pillar cards
│   ├── WhyRPW.tsx          — 4 differentiators
│   ├── About.tsx           — Richard Warren bio
│   ├── ContactForm.tsx     — 'use client' form island
│   ├── Contact.tsx         — section wrapper (server)
│   └── Footer.tsx
├── media/                  — original source assets (copied to public/media/ at build or manually)
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-03-31-rpw-homepage-design.md
└── package.json
```

---

## 11. Polish & Micro-interactions

### Scroll-triggered Entrance Animations
A shared `useFadeUp` hook (or Tailwind + Intersection Observer) triggers once per section as it enters the viewport. Each section's children animate in with a staggered delay (80ms per child).

```
opacity: 0, transform: translateY(24px)
→ opacity: 1, transform: translateY(0)
duration: 600ms, easing: cubic-bezier(0.16, 1, 0.3, 1)
```

Applied to: section headers, service cards, differentiator blocks, about content, contact section.

### Hero
- **Video** fades in over 800ms on load (`opacity-0 → opacity-100`)
- **Headline words** stagger in left-to-right on load (150ms per line)
- **Teal accent word** ("inspection.") has a brief glow pulse on entrance: `text-shadow: 0 0 20px rgba(0,194,168,0.5) → none`, 1s ease-out
- **Stats bar** numbers count up from 0 on first scroll-into-view (1200ms, easeOut)
- **CTA buttons** — hover: `scale(1.02)` + subtle `box-shadow: 0 8px 24px rgba(0,194,168,0.25)` on the teal button

### Nav
- Background transition: `transition: background-color 300ms, backdrop-filter 300ms` — smooth solid fade on scroll
- Nav links: underline grows from left on hover (`::after` pseudo, width 0 → 100%, 200ms)
- "GET IN TOUCH" button: hover `box-shadow: 0 4px 16px rgba(0,194,168,0.35)` + `scale(1.02)`

### Service Cards
- **Hover lift:** `transform: translateY(-6px)`, 250ms ease
- **Shadow:** `box-shadow: 0 16px 40px rgba(0,0,0,0.4)` on hover
- **Teal top border glow:** `box-shadow: 0 -2px 12px rgba(0,194,168,0.3)` on hover
- **Border brightens:** `border-color` transitions from `accent-border` to `rgba(0,194,168,0.4)`

### Why RPW Blocks
- **Icon square:** hover `background: rgba(0,194,168,0.18)` + `box-shadow: 0 0 16px rgba(0,194,168,0.2)`, 200ms
- **Heading:** hover `color: #ffffff` (from text-secondary), 150ms

### About Section
- **Portrait:** `box-shadow: 0 0 0 2px #00c2a8, 0 0 32px rgba(0,194,168,0.2)` always-on ring glow
- On hover: ring glow intensifies to `0 0 48px rgba(0,194,168,0.35)`
- **Credential tags:** hover `background: rgba(0,194,168,0.18)` + `transform: translateY(-1px)`, 150ms

### Contact Form
- **Input focus:** `border-color: #00c2a8` + `box-shadow: 0 0 0 3px rgba(0,194,168,0.15)`, 200ms
- **Submit button:** idle teal → hover `brightness(1.1)` + `box-shadow: 0 8px 24px rgba(0,194,168,0.35)` + `scale(1.01)`
- **Success state:** form fades out, success message fades in with checkmark icon — `opacity-0 scale-95 → opacity-100 scale-100`, 400ms
- **Loading state:** button shows spinner, disabled, slight opacity reduction

### Drop Shadows (always-on depth)
- Service cards: `box-shadow: 0 4px 24px rgba(0,0,0,0.3)` at rest
- About portrait: `box-shadow: 0 0 0 2px #00c2a8, 0 8px 32px rgba(0,0,0,0.4)`
- Nav (once solid): `box-shadow: 0 1px 0 rgba(0,194,168,0.1), 0 4px 20px rgba(0,0,0,0.3)`
- Contact form submit button: `box-shadow: 0 4px 16px rgba(0,194,168,0.2)` at rest

### Reduced Motion
All animations must respect `prefers-reduced-motion: reduce` — when set, disable transforms and opacity transitions, keep only colour transitions.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 13. Out of Scope (this phase)

- Case studies / project portfolio pages
- Blog or news section
- Layout C (Problem-First) — deferred until copy is ready
- Testimonials section — deferred until content is available
- LinkedIn or social links — none confirmed
- Cookie banner / GDPR compliance beyond basic form consent
- CMS integration

---

## 14. Open Items

| Item | Owner | Notes |
|---|---|---|
| Stats bar values (years experience etc.) | Richard Warren | Currently using 20+ as placeholder — confirm values |
| Company registration number | Richard Warren | For footer if required |
| Resend account / domain verification | Richard Warren | Required before contact form goes live |
| Phone number | Richard Warren | Not included — email + form only for now |
