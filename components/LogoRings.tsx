// components/LogoRings.tsx — the three interlocking rings from the RPW logo, as live SVG
import type { SVGProps } from 'react'

/** Ring geometry traced from the logo artwork (same coordinate space as logo-transparent.png). */
export const RINGS = [
  { key: 'purple', cx: 64, cy: 107.5, color: '#6d3fe6' },
  { key: 'blue', cx: 143, cy: 107.5, color: '#5b8aa6' },
  { key: 'teal', cx: 103, cy: 177, color: '#3da99c' },
] as const
export const RING_R = 32
export const RINGS_VIEWBOX = '26 70 156 146'

interface LogoRingsProps extends Omit<SVGProps<SVGSVGElement>, 'stroke'> {
  strokeWidth?: number
  /** Keep stroke width constant regardless of rendered size (for large decorative use). */
  hairline?: boolean
  /** Add thin dashed orbit rings around each ring. */
  orbits?: boolean
  /** Render a single ring of the trio (same viewBox, so stacked layers stay aligned). */
  only?: (typeof RINGS)[number]['key']
}

export function LogoRings({
  strokeWidth = 4.5,
  hairline = false,
  orbits = false,
  only,
  ...props
}: LogoRingsProps) {
  const vector = hairline ? ('non-scaling-stroke' as const) : undefined
  return (
    <svg viewBox={RINGS_VIEWBOX} fill="none" aria-hidden="true" overflow="visible" {...props}>
      {RINGS.filter((ring) => !only || ring.key === only).map((ring) => (
        <g key={ring.key} data-ring-group={ring.key}>
          {orbits && (
            <circle
              data-orbit={ring.key}
              cx={ring.cx}
              cy={ring.cy}
              r={RING_R + 7}
              stroke={ring.color}
              strokeWidth={strokeWidth * 0.6}
              strokeDasharray="1 5"
              strokeLinecap="round"
              opacity={0.55}
              vectorEffect={vector}
            />
          )}
          <circle
            data-ring={ring.key}
            cx={ring.cx}
            cy={ring.cy}
            r={RING_R}
            stroke={ring.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            vectorEffect={vector}
          />
        </g>
      ))}
    </svg>
  )
}
