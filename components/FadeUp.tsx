// components/FadeUp.tsx — marks content to rise into view; animated by ScrollEffects
interface FadeUpProps {
  children: React.ReactNode
  className?: string
}

export function FadeUp({ children, className = '' }: FadeUpProps) {
  return (
    <div data-anim="fade" className={className}>
      {children}
    </div>
  )
}
