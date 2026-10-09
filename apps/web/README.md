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

`MAIL_TO` / `MAIL_FROM` live in `wrangler.toml`.

## Content
News posts are Markdown files in `src/content/news/`. Each file is one post, served at `/latest-news/<filename>`.
