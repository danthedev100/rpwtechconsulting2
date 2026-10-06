// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'RPW Technical Consulting — Technical assurance that holds up under inspection.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/media/logo-transparent.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`
  const geistDir = join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans')
  const [regular, bold] = await Promise.all([
    readFile(join(geistDir, 'Geist-Regular.ttf')),
    readFile(join(geistDir, 'Geist-Bold.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #060810 0%, #0a1628 55%, #0d1e30 100%)',
          color: 'white',
          fontFamily: 'Geist',
        }}
      >
        <img src={logoSrc} width={330} height={121} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Technical assurance that
          </div>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
            holds up under&nbsp;<span style={{ color: '#00c2a8' }}>inspection.</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#00c2a8',
          }}
        >
          <div style={{ width: 40, height: 2, background: '#00c2a8' }} />
          Technical · Asset Management · Compliance
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist', data: bold, weight: 700, style: 'normal' },
      ],
    }
  )
}
