// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { JsonLd } from '@/components/JsonLd'
import { SITE } from '@/lib/site'
import './globals.css'

const sans = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

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
  themeColor: '#fbfaf7',
  colorScheme: 'light',
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
    <html lang="en-GB" className={`${sans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('motion-ready')},4000)",
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#0b7f71] focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-bold"
        >
          Skip to content
        </a>
        <JsonLd data={organisationJsonLd} />
        {children}
      </body>
    </html>
  )
}
