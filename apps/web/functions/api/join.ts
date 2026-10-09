import { handler } from '../_lib/submit';

export const onRequestPost = handler({
  subject: (d) => `New member application: ${d.business || d.name}`,
  required: ['name', 'business', 'phone', 'email', 'industry'],
});
