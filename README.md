# Henry Rosas — Market Preference Engineering

Personal services site for Henry Rosas. Built with Next.js 14, deployed on Vercel.

## Local development

Requires Node.js 18.17+ installed.

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Deploy to Vercel (recommended)

The fastest path to a live site at your custom domain.

1. Push this folder to a GitHub repository (e.g. `henry-rosas/website`).
2. Go to [vercel.com](https://vercel.com) and click "Add New → Project".
3. Import your GitHub repo. Vercel auto-detects Next.js — no configuration needed.
4. Click "Deploy". You'll have a live URL like `henry-rosas.vercel.app` in ~60 seconds.
5. In Vercel project settings → Domains, add `consumerhealth.me` and follow the DNS instructions.

## Production build (locally)

```bash
npm run build
npm start
```

## Configuration

All site-wide values live at the top of `pages/index.jsx`:

```js
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkoenzqw";
const LINKEDIN_URL = "https://www.linkedin.com/in/henry-rosas/";
const CONTACT_EMAIL = "henry@consumerhealth.me";
```

SEO meta tags (title, description, Open Graph, Twitter card) live in `pages/_document.jsx`. Update the `og:url` and `og:image` once you have a production URL and a social-share image.

## Form submissions

Contact form posts to Formspree (`mkoenzqw`). Submissions arrive at the email on file in your Formspree account. To change the destination, update the form settings in your Formspree dashboard — no code change required.

## Still to add before launch

- **Favicon** — drop a `favicon.ico` and `apple-touch-icon.png` (180×180) into a new `public/` folder.
- **Open Graph image** — a 1200×630 PNG at `public/og-image.png`, then uncomment the `og:url` and `og:image` lines in `pages/_document.jsx`.
- **Analytics** — the code includes guarded PostHog tracking calls (`track()`). If you want analytics, add the PostHog snippet to `_document.jsx`. Otherwise the calls are harmless no-ops.
- **Production domain** — point `consumerhealth.me` DNS to Vercel.

## File structure

```
.
├── package.json
├── next.config.js
├── jsconfig.json
├── .gitignore
├── README.md
├── pages/
│   ├── _app.jsx          # Next.js app wrapper + viewport
│   ├── _document.jsx     # <head> SEO meta, Open Graph, fonts
│   └── index.jsx         # The page itself
└── market-preference-editorial.jsx   # original draft (kept for reference)
```

## What's fixed vs. the original draft

- Single `<h1>` in the hero (was two — bad for SEO)
- Mobile hamburger menu (mobile users previously had no navigation)
- Accordion pillars are real `<button>` elements with `aria-expanded` (was clickable `<div>`)
- Form labels properly linked to inputs via `htmlFor`/`id`
- Form validation (required fields, email format, inline errors)
- Form submissions wired to Formspree (previously fake)
- WCAG-AA contrast on muted text colors
- Visible focus rings on all interactive elements
- Real LinkedIn URL wired in (was a placeholder)
- Full `<head>` SEO + Open Graph + Twitter card meta
- Font loading via `<link>` preconnect (faster than `@import`)
- Copyright year auto-updates each year
```
# henry-rosas-site
