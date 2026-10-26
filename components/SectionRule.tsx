// components/SectionRule.tsx — hairline at the top of a section that draws from the centre
export function SectionRule() {
  return (
    <span
      aria-hidden="true"
      data-anim="rule"
      className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(109,59,239,0.45)] to-transparent"
    />
  )
}
