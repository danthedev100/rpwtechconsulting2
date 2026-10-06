// components/StandardsStrip.tsx
// Guidance and regulatory frameworks commonly encountered in the services offered.
const STANDARDS = [
  'HTM 00',
  'HTM 03-01',
  'HTM 04-01',
  'HTM 05',
  'HTM 06',
  'ACoP L8',
  'HSG274',
  'SFG20',
  'BS 8210',
  'CDM 2015',
  'ISO 55001',
  'ISO 19650',
]

export function StandardsStrip() {
  return (
    <section
      aria-label="Standards and guidance we work with"
      className="bg-[#060810] border-y border-white/[0.06] py-6 overflow-hidden"
    >
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="text-white/35 text-[0.7rem] tracking-[0.25em] uppercase flex-shrink-0">
          Working to
        </p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex w-max gap-10 motion-safe:animate-marquee hover:[animation-play-state:paused]">
            {[...STANDARDS, ...STANDARDS].map((s, i) => (
              <li
                key={`${s}-${i}`}
                aria-hidden={i >= STANDARDS.length ? 'true' : undefined}
                className="font-mono text-sm text-white/55 whitespace-nowrap"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
