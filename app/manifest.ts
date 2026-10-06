// app/manifest.ts
import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.legalName,
    short_name: 'RPW Consulting',
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#060810',
    theme_color: '#060810',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  }
}
