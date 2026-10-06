// lib/site.ts — single source of truth for business details used across the site
export const SITE = {
  name: 'RPW Technical Consulting',
  legalName: 'RPW Technical Consulting (FM) Ltd',
  url: 'https://rpwtechnicalconsulting.co.uk',
  email: 'richard@rpwtechnicalconsulting.co.uk',
  principal: 'Richard Warren',
  region: 'North-East England',
  tagline: 'Technical assurance that holds up under inspection.',
  description:
    'Independent FM consultancy led by Richard Warren. Specialist services in technical compliance, asset management, and safe systems of work across healthcare and public sector.',
} as const

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
] as const

export const ENQUIRY_TYPES = [
  'Technical solutions',
  'Asset management',
  'Compliance management',
  'Authorising Engineer services',
  'Interim leadership',
  'Something else',
] as const

export type EnquiryType = (typeof ENQUIRY_TYPES)[number]
