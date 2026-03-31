import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  let body: Record<string, string>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, enquiry, message, organisation } = body

  if (!name?.trim() || !email?.trim() || !enquiry?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Required fields missing: name, email, enquiry, and message are required.' },
      { status: 400 }
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
    `Enquiry type: ${enquiry}`,
    ``,
    `Message:`,
    message,
  ].join('\n')

  try {
    const { error } = await resend.emails.send({
      from: 'website@rpwtechnicalconsulting.co.uk',
      to,
      replyTo: email,
      subject: `Website enquiry from ${name} — ${enquiry}`,
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
