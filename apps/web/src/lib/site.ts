import site from '@/data/site.json';
import pages from '@/data/pages.json';

/** Editable in the CMS: src/data/site.json */
export const SITE = {
  ...site,
  name: 'SGTUFF',
  legalName: 'Singapore Tenants United for Fairness Co-operative Ltd',
  regNo: 'CS000438',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
};

/** Editable in the CMS: src/data/pages.json */
export const PAGES = pages;

export const NAV = [
  { label: 'About', href: '/about-us' },
  { label: 'Fair Tenancy', href: '/fair-tenancy' },
  { label: 'Membership', href: '/membership' },
  { label: 'Network', href: '/business-network' },
  { label: 'News', href: '/latest-news' },
  { label: 'Collaborate', href: '/collaborate' },
] as const;
