// components/Footer.tsx
import { BrandLogo } from '@/components/BrandLogo'
import Link from 'next/link'
import { SectionRule } from '@/components/SectionRule'
import { NAV_LINKS, SITE } from '@/lib/site'

const SERVICE_LINKS = ['Technical Solutions', 'Asset Management', 'Compliance Management']

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#060810] border-t border-[rgba(255,255,255,0.05)]">
      <SectionRule />
      <div className="max-w-[1120px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-[minmax(0,2fr)_1fr_1fr_1.4fr] gap-10">
        <div className="col-span-2 md:col-span-1">
          <BrandLogo animated={false} className="h-12 w-auto mb-6" />
          <p className="text-white/45 text-sm leading-relaxed max-w-xs">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-white/30 text-[0.7rem] tracking-[0.2em] uppercase mb-4">Explore</p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={`/${l.href}`} className="text-white/55 text-sm hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-white/30 text-[0.7rem] tracking-[0.2em] uppercase mb-4">Services</p>
          <ul className="space-y-2.5">
            {SERVICE_LINKS.map((s) => (
              <li key={s}>
                <Link href="/#services" className="text-white/55 text-sm hover:text-white transition-colors">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="text-white/30 text-[0.7rem] tracking-[0.2em] uppercase mb-4">Contact</p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-white/70 text-sm hover:text-[#00c2a8] transition-colors break-all"
          >
            {SITE.email}
          </a>
          <p className="text-white/45 text-sm mt-2">{SITE.region}</p>
          <Link
            href="/#contact"
            className="inline-block mt-5 border border-[rgba(0,194,168,0.4)] text-[#00c2a8] px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[rgba(0,194,168,0.1)] transition-colors"
          >
            Send an Enquiry
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="max-w-[1120px] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            © {year} {SITE.legalName} · Registered in England &amp; Wales
          </p>
          <Link href="/privacy" className="text-white/30 text-xs hover:text-white transition-colors">
            Privacy notice
          </Link>
        </div>
      </div>
    </footer>
  )
}
