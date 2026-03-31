// components/Footer.tsx
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060810] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1120px] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-white/20 text-xs">
          © {year} RPW Technical Consulting (FM) Ltd · Registered in England &amp; Wales
        </p>
        <p className="text-white/20 text-xs">North-East England</p>
      </div>
    </footer>
  )
}
