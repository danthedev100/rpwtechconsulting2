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
      className="bg-[#efe9df] border-y border-ink/[0.12] py-6 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="px-6 md:pl-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))] text-ink/60 text-[0.75rem] tracking-[0.18em] uppercase flex-shrink-0">
          Working to
        </p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul className="flex w-max items-center motion-safe:animate-marquee hover:[animation-play-state:paused]">
            {[...STANDARDS, ...STANDARDS].map((s, i) => (
              <li
                key={`${s}-${i}`}
                aria-hidden={i >= STANDARDS.length ? 'true' : undefined}
                className="flex items-center font-serif italic text-2xl md:text-[1.75rem] text-ink/80 whitespace-nowrap"
              >
                {s}
                <span aria-hidden="true" className="mx-7 w-1.5 h-1.5 rounded-full bg-[#5b36d6]/60" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
