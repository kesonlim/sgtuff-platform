# sgtuff-web

The new www.sgtuff.org site: Astro (static HTML) with React islands, Tailwind v4 and shadcn-style components. It is hosted on Cloudflare Pages, and the forms run as Pages Functions.

## Develop
```bash
npm install            # from repo root
npm run dev -w sgtuff-web
npm run build -w sgtuff-web   # astro check + build → apps/web/dist
```

## Cloudflare Pages project
| Setting | Value |
|---|---|
| Root directory | `apps/web` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Env var `NODE_VERSION` | `22` |
| Env var `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key |
| Secret `TURNSTILE_SECRET_KEY` | Turnstile secret |
| Secret `RESEND_API_KEY` | Resend API key (verify the `sgtuff.org` sending domain in Resend) |
| Var `GITHUB_CLIENT_ID` / secret `GITHUB_CLIENT_SECRET` | GitHub OAuth app for the CMS (see below) |

`MAIL_TO` / `MAIL_FROM` live in `wrangler.toml`.

## Content
News posts are Markdown files in `src/content/news/`. Each file is one post, served at `/latest-news/<filename>`.

## Content manager (`/admin`)
Staff edit news, page headings, membership tiers and contact details at **https://www.sgtuff.org/admin**. The editor is Decap CMS.

- **Log in:** each editor needs a GitHub account with write access to this repo. Add them as collaborators in GitHub → Settings → Collaborators.
- **Drafts:** every save is a draft (a pull request), so Cloudflare builds a preview of it. Click **Publish** to merge it to `main`, and the live site updates in about a minute.
- **Images** are uploaded to `public/uploads/`.

### One-time setup: GitHub login
1. In GitHub, go to Settings → Developer settings → OAuth Apps → **New OAuth App**.
   - Homepage URL: `https://www.sgtuff.org`
   - Authorization callback URL: `https://www.sgtuff.org/api/callback`
2. In the Cloudflare Pages project, add `GITHUB_CLIENT_ID` (variable) and `GITHUB_CLIENT_SECRET` (secret).

The login flow lives in `functions/api/auth.ts` and `functions/api/callback.ts`. Editable copy lives in `src/data/site.json` and `src/data/pages.json`.
