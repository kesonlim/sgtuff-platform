import type { Field } from './LeadForm';

export const joinFields: Field[] = [
  { name: 'name', label: 'Your name', autoComplete: 'name', placeholder: 'Tan Mei Ling' },
  { name: 'business', label: 'Business name', autoComplete: 'organization', placeholder: 'Shop or brand' },
  { name: 'phone', label: 'Mobile', type: 'tel', autoComplete: 'tel', placeholder: '+65' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@business.sg' },
  { name: 'industry', label: 'Industry', type: 'select', options: ['Retail', 'F&B', 'Services', 'Other'] },
  { name: 'location', label: 'Mall or location', placeholder: 'e.g. Tampines Mall', required: false },
];

export const contactFields: Field[] = [
  { name: 'name', label: 'Name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Contact number', type: 'tel', autoComplete: 'tel', required: false },
  { name: 'subject', label: 'Subject' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'How can SGTUFF help your business?' },
];

export const collaborateFields: Field[] = [
  { name: 'organisation', label: 'Organisation', autoComplete: 'organization' },
  { name: 'name', label: 'Contact person', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'area', label: 'Area', type: 'select', options: ['Fair tenancy', 'Manpower', 'Retail tech', 'Sponsorship', 'Media', 'Other'] },
  { name: 'message', label: 'Proposal', type: 'textarea', placeholder: 'What would you like to do together?' },
];
