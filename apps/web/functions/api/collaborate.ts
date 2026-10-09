import { handler } from '../_lib/submit';

export const onRequestPost = handler({
  subject: (d) => `Collaboration proposal: ${d.organisation}`,
  required: ['organisation', 'name', 'email', 'area', 'message'],
});
