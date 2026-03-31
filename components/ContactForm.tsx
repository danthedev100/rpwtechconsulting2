// components/ContactForm.tsx
'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const INPUT_CLASS =
  'w-full bg-[#0f1c2e] border border-[rgba(255,255,255,0.08)] rounded-sm px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#00c2a8] focus:shadow-[0_0_0_3px_rgba(0,194,168,0.15)] transition-all duration-200'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value ?? ''

    const payload = {
      name: get('name'),
      email: get('email'),
      organisation: get('organisation'),
      enquiry: get('enquiry'),
      message: get('message'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setState('success')
      } else {
        const json = await res.json()
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
      <div className="flex flex-col items-center justify-center py-14 gap-4">
        <div className="w-14 h-14 rounded-full bg-[rgba(0,194,168,0.1)] border border-[rgba(0,194,168,0.3)] flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#00c2a8]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-semibold text-xl">Message sent</p>
        <p className="text-white/45 text-base text-center max-w-xs">
          Thank you for getting in touch. Richard will respond within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="name"
          required
          placeholder="Full name"
          className={INPUT_CLASS}
          disabled={state === 'loading'}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className={INPUT_CLASS}
          disabled={state === 'loading'}
        />
      </div>

      <input
        name="organisation"
        placeholder="Organisation (optional)"
        className={INPUT_CLASS}
        disabled={state === 'loading'}
      />

      <input
        name="enquiry"
        required
        placeholder="Nature of enquiry"
        className={INPUT_CLASS}
        disabled={state === 'loading'}
      />

      <textarea
        name="message"
        required
        placeholder="Message"
        rows={5}
        className={`${INPUT_CLASS} resize-none`}
        disabled={state === 'loading'}
      />

      {state === 'error' && (
        <p className="text-red-400 text-sm" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-[#00c2a8] text-[#0a0e1c] py-3 text-sm font-bold tracking-[0.15em] uppercase rounded-sm shadow-[0_4px_16px_rgba(0,194,168,0.2)] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(0,194,168,0.35)] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200"
      >
        {state === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
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
    </form>
  )
}
