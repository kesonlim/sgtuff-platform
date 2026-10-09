import { handler } from '../_lib/submit';

export const onRequestPost = handler({
  subject: (d) => `Website enquiry: ${d.subject}`,
  required: ['name', 'email', 'subject', 'message'],
});
