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
