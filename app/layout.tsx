// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { JsonLd } from '@/components/JsonLd'
import { SITE } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.legalName} — Technical, Asset Management & Compliance`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.principal }],
  keywords: [
    'FM consultancy',
    'facilities management consultant',
    'Authorising Engineer',
    'estates compliance',
    'healthcare estates',
    'NHS estates consultant',
    'asset management',
    'statutory compliance audit',
    'safe systems of work',
    'water safety',
    'ventilation',
    'CAFM',
    'PFI hand-back',
    'North-East England',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: SITE.name,
    title: SITE.name,
    description: `Independent FM consultancy. ${SITE.region}.`,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: `Independent FM consultancy. ${SITE.region}.`,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#060810',
  colorScheme: 'dark',
}

const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organisation`,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/media/logo-transparent.png`,
  image: `${SITE.url}/opengraph-image`,
  email: SITE.email,
  description: SITE.description,
  areaServed: { '@type': 'AdministrativeArea', name: SITE.region },
  address: { '@type': 'PostalAddress', addressRegion: SITE.region, addressCountry: 'GB' },
  founder: {
    '@type': 'Person',
    name: SITE.principal,
    jobTitle: 'Principal Consultant',
    image: `${SITE.url}/media/richard-portrait.jpg`,
  },
  knowsAbout: [
    'Technical compliance',
    'Asset management',
    'Safe systems of work',
    'Authorising Engineer services',
    'Healthcare estates',
    'CAFM',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <noscript>
          <style>{'.fade-up{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#00c2a8] focus:text-[#0a0e1c] focus:px-4 focus:py-2 focus:rounded-sm focus:font-bold"
        >
          Skip to content
        </a>
        <JsonLd data={organisationJsonLd} />
        {children}
      </body>
    </html>
  )
}
