// components/Footer.tsx
import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import { NAV_LINKS, SITE } from '@/lib/site'

const SERVICE_LINKS = ['Technical Solutions', 'Asset Management', 'Compliance Management']

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative px-6 pt-20 pb-8">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[minmax(0,2fr)_1fr_1fr_1.4fr] gap-10 pb-14 border-b border-ink/[0.12]">
          <div className="col-span-2 md:col-span-1">
            <BrandLogo animated={false} className="h-14 w-auto mb-6" />
            <p className="font-serif italic text-ink/70 text-2xl leading-snug max-w-xs">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-ink/55 text-[0.75rem] tracking-[0.18em] uppercase mb-4">Explore</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={`/${l.href}`} className="text-ink/75 hover:text-ink transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-ink/55 text-[0.75rem] tracking-[0.18em] uppercase mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <Link href="/#services" className="text-ink/75 hover:text-ink transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-ink/55 text-[0.75rem] tracking-[0.18em] uppercase mb-4">Contact</p>
            <a href={`mailto:${SITE.email}`} className="text-ink/80 hover:text-ink transition-colors break-all">
              {SITE.email}
            </a>
            <p className="text-ink/60 mt-2">{SITE.region}</p>
            <Link
              href="/#contact"
              className="inline-block mt-6 bg-ink text-[#f7f4ee] px-5 py-2.5 text-sm rounded-full hover:bg-[#5b36d6] transition-colors"
            >
              Send an enquiry
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-2 text-ink/55 text-sm">
          <p>
            © {year} {SITE.legalName} · Registered in England &amp; Wales
          </p>
          <Link href="/privacy" className="hover:text-ink transition-colors">
            Privacy notice
          </Link>
        </div>
      </div>
    </footer>
  )
}
