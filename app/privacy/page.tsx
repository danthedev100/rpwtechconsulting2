// app/privacy/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: `How ${SITE.legalName} handles personal data submitted through this website.`,
  alternates: { canonical: '/privacy' },
}

const SECTIONS = [
  {
    heading: 'Who we are',
    body: `${SITE.legalName} ("RPW", "we") is the controller of personal data submitted through this website. You can contact us at ${SITE.email}.`,
  },
  {
    heading: 'What we collect',
    body: 'When you use the contact form we collect the details you choose to provide: your name, email address, and optionally your organisation and phone number, together with your enquiry. We do not use advertising or tracking cookies.',
  },
  {
    heading: 'Why we use it',
    body: 'We use your details solely to respond to your enquiry and, where relevant, to discuss and deliver services you have asked about. Our lawful basis is our legitimate interest in responding to enquiries, or taking steps at your request before entering into a contract.',
  },
  {
    heading: 'Who we share it with',
    body: 'Contact form submissions are delivered to us by email using a third-party email delivery provider acting as our processor. We do not sell your data or share it for marketing purposes.',
  },
  {
    heading: 'How long we keep it',
    body: 'We keep enquiry correspondence only for as long as needed to deal with your enquiry and any resulting engagement, and to meet legal or accounting obligations.',
  },
  {
    heading: 'Your rights',
    body: 'Under UK data protection law you have the right to access, correct or erase your personal data, to object to or restrict its processing, and to complain to the Information Commissioner’s Office (ico.org.uk). To exercise any of these rights, email us.',
  },
]

export default function PrivacyPage() {
  return (
    <main id="main" className="min-h-[100svh] bg-[#060810] px-6 py-24">
      <article className="max-w-[720px] mx-auto">
        <Link href="/" className="text-[#00c2a8] text-sm hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-white text-4xl font-extrabold mt-8 mb-3">Privacy notice</h1>
        <p className="text-white/40 text-sm mb-12">{SITE.legalName}</p>
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="text-white text-xl font-bold mb-3">{s.heading}</h2>
              <p className="text-white/65 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
