import site from '@/data/site.json';
import pages from '@/data/pages.json';

/** Editable in the CMS: src/data/site.json */
export const SITE = {
  ...site,
  name: 'SGTUFF',
  legalName: 'SGTUFF Co-operative Limited',
  uen: 'T21CS0006H',
  address: '178 Paya Lebar Road #02-11, Singapore 409030',
  regNo: 'CS000438',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
};

/** Editable in the CMS: src/data/pages.json */
export const PAGES = pages;

export const NAV = [
  { label: 'Our Story', href: '/about-us' },
  { label: 'Fair Tenancy', href: '/fair-tenancy' },
  { label: 'Membership', href: '/membership' },
  { label: 'Partners', href: '/collaborate' },
  { label: 'News', href: '/latest-news' },
] as const;
