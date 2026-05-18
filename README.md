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
const CONTACT_EMAIL = "henry.rosas@rosashenry.com";
```

SEO meta tags (title, description, Open Graph, Twitter card) live in `pages/_document.jsx`. Update the `og:url` and `og:image` once you have a production URL and a social-share image.

## Form submissions

Contact form posts to Formspree (`mkoenzqw`). Submissions arrive at the email on file in your Formspree account. To change the destination, update the form settings in your Formspree dashboard — no code change required.

## Still to add before launch

- **Favicon** — drop a `favicon.ico` and `apple-touch-icon.png` (180×180) into the `public/` folder.
- **Open Graph image** — a 1200×630 PNG at `public/og-image.png`, then uncomment the `og:url` and `og:image` lines in `pages/_document.jsx`.
- **Analytics** — the code includes guarded PostHog tracking calls (`track()`). If you want analytics, add the PostHog snippet to `_document.jsx`. Otherwise the calls are harmless no-ops.
- **Production domain** — point `consumerhealth.me` DNS to Vercel.

## Dynamic assets — three optional uploads that level up the site

The site works fully without these. As soon as you drop a file in the right place, it activates.

### 1. Hero video background

**Location:** `public/hero-loop.mp4`
**Specs:** 1920×1080 or 1280×720, MP4 (H.264), 8–15 seconds, looping, no audio, under 5 MB if possible.
**Style:** abstract motion graphics (lines drawing, geometric shapes, paper textures, ink bleeds). Avoid stock people footage.

**Where to source (free):**
- [Pexels Videos](https://www.pexels.com/videos/) — search "abstract motion"
- [Mixkit](https://mixkit.co/free-stock-video/) — "minimal" or "abstract" categories
- [Coverr](https://coverr.co/) — minimalist loops

**Where to generate (AI):**
- [Runway ML](https://runwayml.com) — text-to-video, 5-second clips
- [Pika](https://pika.art) — abstract animation prompts

**Compression after download:**
- Drop the file at [handbrake.fr](https://handbrake.fr) or [video.online-convert.com](https://video.online-convert.com), target ~3 MB.

Once you have the file, save it as `public/hero-loop.mp4`, commit, push. Vercel auto-deploys, video activates.

### 2. Brand logos

**Location:** `public/logos/`
**Files needed (use these exact names):**
- `jj.svg` — Johnson & Johnson
- `unilever.svg`
- `mundipharma.svg`
- `strategy-tools.svg`
- `facephi.svg`

**Specs:** SVG (preferred) or PNG with transparent background, single color or grayscale. The site automatically applies a grayscale filter on rest, color on hover.

**Where to source:**
- [Brandfetch](https://brandfetch.com) — search company name, download logo SVG
- [Wikipedia](https://commons.wikimedia.org) — most companies have public-domain logo files
- Each company's press kit (search "[company] press kit logo download")

The marquee gracefully falls back to text brand names if a file is missing — so you can add logos one at a time.

### 3. Founder portrait

**Location:** `public/henry-portrait.jpg`
**Specs:** 4:5 aspect ratio (e.g. 800×1000 px or 1200×1500 px), high quality, professional. The site automatically applies a subtle grayscale tint that lifts to full color on hover.

**Tips:**
- Editorial look: solid neutral background, three-quarter pose, soft directional lighting
- Avoid hard corporate "executive headshot" — too much like a LinkedIn photo
- Reference style: bravebrand.com or any premium consulting site portrait

If no file is present, the slot shows a discreet dashed placeholder labeled "Add henry-portrait.jpg" — visible only to you locally, since you'll add the photo before going live.

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
