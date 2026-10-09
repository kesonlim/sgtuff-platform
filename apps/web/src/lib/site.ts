export const SITE = {
  name: 'SGTUFF',
  legalName: 'Singapore Tenants United for Fairness Co-operative Ltd',
  regNo: 'CS000438',
  mission:
    'SGTUFF is an advocate for local SME frontline businesses in retail, F&B and services, focusing on fair tenancy and manpower issues.',
  email: 'info@sgtuff.org.sg',
  phone: '+65 8845 6623',
  trackerUrl: 'https://tracker.sgtuff.org',
  memberLoginUrl: 'https://sgtuff.eber.co/sign-in',
  mallsTracked: 22,
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/groups/SGtenantsUNITEDforFairness/' },
    { label: 'Instagram', href: 'https://www.instagram.com/sg.tenants.united.for.fairness/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sgtuff/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@sgtuff2020' },
  ],
} as const;

export const NAV = [
  { label: 'About', href: '/about-us' },
  { label: 'Fair Tenancy', href: '/fair-tenancy' },
  { label: 'Membership', href: '/membership' },
  { label: 'Network', href: '/business-network' },
  { label: 'News', href: '/latest-news' },
  { label: 'Collaborate', href: '/collaborate' },
] as const;
