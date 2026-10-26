// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="min-h-[100svh] flex items-center justify-center px-6 bg-[#ece9e2]">
      <div className="text-center max-w-md">
        <p className="font-mono text-[#0b7f71] text-sm tracking-[0.3em] mb-4">404</p>
        <h1 className="text-ink text-3xl font-extrabold mb-4">This page couldn’t be found.</h1>
        <p className="text-ink/68 mb-8">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#0b7f71] text-white px-6 py-3 text-sm font-bold tracking-[0.15em] uppercase rounded-sm hover:brightness-110 transition-all"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
