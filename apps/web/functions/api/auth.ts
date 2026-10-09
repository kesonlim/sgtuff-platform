// Step 1 of the Decap CMS GitHub login: send the editor to GitHub to approve access.
interface Env {
  GITHUB_CLIENT_ID: string;
}

export const onRequestGet: PagesFunction<Env> = ({ request, env }) => {
  const state = crypto.randomUUID();
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  url.searchParams.set('redirect_uri', new URL('/api/callback', request.url).toString());
  url.searchParams.set('scope', 'repo,user');
  url.searchParams.set('state', state);
  return new Response(null, {
    status: 302,
    headers: {
      location: url.toString(),
      'set-cookie': `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
};
