import { POST } from '../route'

// Mock Resend before importing the route
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}))

describe('POST /api/contact', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-resend-key'
    process.env.CONTACT_EMAIL = 'test@example.com'
  })

  it('returns 400 when name is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a@b.com', enquiry: 'Test', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/required/i)
  })

  it('returns 400 when email is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', enquiry: 'Test', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'a@b.com', enquiry: 'Test' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 200 with all required fields', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'jane@example.com',
        organisation: 'NHS Trust',
        enquiry: 'Compliance audit',
        message: 'We need help with our water compliance programme.',
      }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 400 when enquiry is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'a@b.com', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
  const post = (body: unknown, ip = '10.0.0.1') =>
    POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
        body: JSON.stringify(body),
      })
    )

  const valid = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    enquiry: 'Compliance management',
    message: 'Hello',
  }

  it('returns 400 for an invalid email address', async () => {
    const res = await post({ ...valid, email: 'not-an-email' }, '10.0.0.2')
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/valid email/i)
  })

  it('returns 400 when the message is too long', async () => {
    const res = await post({ ...valid, message: 'x'.repeat(5001) }, '10.0.0.3')
    expect(res.status).toBe(400)
  })

  it('silently accepts honeypot submissions without sending', async () => {
    const { Resend } = jest.requireMock('resend') as { Resend: jest.Mock }
    Resend.mockClear()
    const res = await post({ ...valid, website: 'http://spam.example' }, '10.0.0.4')
    expect(res.status).toBe(200)
    expect(Resend).not.toHaveBeenCalled()
  })

  it('rate limits repeated submissions from the same IP', async () => {
    const statuses: number[] = []
    for (let i = 0; i < 6; i++) statuses.push((await post(valid, '10.0.0.5')).status)
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200])
    expect(statuses[5]).toBe(429)
  })
})
