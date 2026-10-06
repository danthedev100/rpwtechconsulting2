import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 200,
  email: 320,
  organisation: 200,
  phone: 50,
  enquiry: 200,
  message: 5000,
} as const

// Best-effort, per-instance rate limit: 5 submissions per IP per 10 minutes
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > RATE_MAX
}

/** Collapse whitespace so user input can't break the subject line. */
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

export async function POST(req: Request) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const str = (key: string) => (typeof body?.[key] === 'string' ? (body[key] as string) : '')
  const name = str('name')
  const email = str('email')
  const organisation = str('organisation')
  const phone = str('phone')
  const enquiry = str('enquiry')
  const message = str('message')

  // Honeypot: real visitors never fill this in. Pretend success so bots move on.
  if (str('website').trim()) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  if (!name.trim() || !email.trim() || !enquiry.trim() || !message.trim()) {
    return NextResponse.json(
      { error: 'Required fields missing: name, email, enquiry, and message are required.' },
      { status: 400 }
    )
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const fields = { name, email, organisation, phone, enquiry, message }
  for (const [key, max] of Object.entries(LIMITS)) {
    if (fields[key as keyof typeof fields].length > max) {
      return NextResponse.json(
        { error: `The ${key} field is too long (maximum ${max} characters).` },
        { status: 400 }
      )
    }
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages sent. Please try again later or email us directly.' },
      { status: 429 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.CONTACT_EMAIL ?? 'richard@rpwtechnicalconsulting.co.uk'

  const emailBody = [
    `New enquiry from RPW Technical Consulting website`,
    ``,
    `Name:         ${name}`,
    `Email:        ${email}`,
    `Organisation: ${organisation || '—'}`,
    `Phone:        ${phone || '—'}`,
    `Enquiry type: ${enquiry}`,
    ``,
    `Message:`,
    message,
  ].join('\n')

  try {
    const { error } = await resend.emails.send({
      from: 'website@rpwtechnicalconsulting.co.uk',
      to,
      replyTo: email.trim(),
      subject: `Website enquiry from ${oneLine(name)} — ${oneLine(enquiry)}`,
      text: emailBody,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
