// components/ContactForm.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ENQUIRY_TYPES } from '@/lib/site'
import { ENQUIRY_EVENT } from '@/components/EnquiryLink'

type FormState = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'enquiry' | 'message', string>>

const MESSAGE_MAX = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INPUT_CLASS =
  'w-full bg-[#ffffff] border border-[rgba(20,24,43,0.1)] rounded-sm px-3.5 py-3 text-base text-ink placeholder:text-ink/45 focus:outline-none focus:border-[#0b7f71] focus:shadow-[0_0_0_3px_rgba(11,127,113,0.15)] aria-[invalid=true]:border-red-400/70 disabled:opacity-60 transition-all duration-200'

const LABEL_CLASS = 'block text-ink/68 text-xs tracking-[0.12em] uppercase mb-1.5'

function validate(data: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {}
  if (!data.name.trim()) errors.name = 'Please enter your name.'
  if (!data.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!data.enquiry.trim()) errors.enquiry = 'Please choose an enquiry type.'
  if (!data.message.trim()) errors.message = 'Please tell us a little about what you need.'
  return errors
}

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [enquiry, setEnquiry] = useState('')
  const [messageLength, setMessageLength] = useState(0)

  // Pre-select the enquiry type when a "Discuss…" link elsewhere on the page is clicked
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail) setEnquiry(detail)
    }
    window.addEventListener(ENQUIRY_EVENT, handler)
    return () => window.removeEventListener(ENQUIRY_EVENT, handler)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? ''

    const payload = {
      name: get('name'),
      email: get('email'),
      organisation: get('organisation'),
      phone: get('phone'),
      enquiry: get('enquiry'),
      message: get('message'),
      website: get('website'), // honeypot
    }

    const errors = validate(payload)
    setFieldErrors(errors)
    const firstInvalid = Object.keys(errors)[0]
    if (firstInvalid) {
      ;(form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
      return
    }

    setState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setState('success')
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center py-16 gap-4 bg-[#ffffff] border border-[rgba(11,127,113,0.15)] rounded-md"
      >
        <div className="w-14 h-14 rounded-full bg-[rgba(11,127,113,0.1)] border border-[rgba(11,127,113,0.3)] flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#0b7f71]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-ink font-semibold text-xl">Message sent</p>
        <p className="text-ink/68 text-base text-center max-w-xs">
          Thank you for getting in touch. Richard will respond within one business day.
        </p>
      </div>
    )
  }

  const loading = state === 'loading'
  const fieldProps = (name: keyof FieldErrors) => ({
    id: `contact-${name}`,
    name,
    'aria-invalid': fieldErrors[name] ? true : undefined,
    'aria-describedby': fieldErrors[name] ? `contact-${name}-error` : undefined,
    disabled: loading,
    onInput: () => fieldErrors[name] && setFieldErrors((prev) => ({ ...prev, [name]: undefined })),
  })
  const fieldError = (name: keyof FieldErrors) =>
    fieldErrors[name] && (
      <p id={`contact-${name}-error`} className="text-red-600 text-xs mt-1.5">
        {fieldErrors[name]}
      </p>
    )

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-4 bg-[#ffffff]/60 border border-ink/[0.06] rounded-md p-6 sm:p-8 shadow-[0_24px_60px_rgba(20,24,43,0.087)]"
      noValidate
      aria-label="Contact form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASS}>
            Full name <span className="text-[#0b7f71]">*</span>
          </label>
          <input {...fieldProps('name')} autoComplete="name" required className={INPUT_CLASS} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL_CLASS}>
            Email <span className="text-[#0b7f71]">*</span>
          </label>
          <input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            required
            className={INPUT_CLASS}
          />
          {fieldError('email')}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-organisation" className={LABEL_CLASS}>
            Organisation
          </label>
          <input
            id="contact-organisation"
            name="organisation"
            autoComplete="organization"
            className={INPUT_CLASS}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={LABEL_CLASS}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={INPUT_CLASS}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-enquiry" className={LABEL_CLASS}>
          Nature of enquiry <span className="text-[#0b7f71]">*</span>
        </label>
        <select
          {...fieldProps('enquiry')}
          required
          value={enquiry}
          onChange={(e) => {
            setEnquiry(e.target.value)
            setFieldErrors((prev) => ({ ...prev, enquiry: undefined }))
          }}
          className={`${INPUT_CLASS} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%230b7f71' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_0.9rem_center] pr-10 ${enquiry ? '' : 'text-ink/58'}`}
        >
          <option value="" disabled>
            Select a topic…
          </option>
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type} className="text-ink bg-[#ffffff]">
              {type}
            </option>
          ))}
        </select>
        {fieldError('enquiry')}
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="contact-message" className={LABEL_CLASS}>
            Message <span className="text-[#0b7f71]">*</span>
          </label>
          <span className="text-ink/50 text-xs font-mono" aria-hidden="true">
            {messageLength}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          {...fieldProps('message')}
          required
          rows={5}
          maxLength={MESSAGE_MAX}
          placeholder="A brief outline of your estate, the challenge, and any timescales."
          onChange={(e) => setMessageLength(e.target.value.length)}
          className={`${INPUT_CLASS} resize-y min-h-32`}
        />
        {fieldError('message')}
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {state === 'error' && (
          <p className="text-red-600 text-sm" role="alert">
            {errorMsg}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0b7f71] text-white py-3.5 text-sm font-bold tracking-[0.15em] uppercase rounded-sm shadow-[0_4px_16px_rgba(11,127,113,0.2)] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(11,127,113,0.35)] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
            Sending…
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-ink/55 text-xs leading-relaxed">
        Your details are used only to respond to your enquiry. See our{' '}
        <Link href="/privacy" className="underline hover:text-ink">
          privacy notice
        </Link>
        .
      </p>
    </form>
  )
}
