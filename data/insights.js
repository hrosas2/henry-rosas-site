/* ───────────────────────────────────────────────────────────────
 * INSIGHTS / BLOG — metadata (safe to import anywhere)
 * ───────────────────────────────────────────────────────────────
 *
 * To add a new article:
 *   1. Drop the .md file into /content/insights/ (filename = slug + ".md")
 *   2. Add an entry to the `articles` array below
 *   3. git add . && git commit -m "Add article: <title>" && git push
 *
 * The markdown file should start with a single `# Title` H1, then body.
 * NOTE: This file has NO Node `fs` import, so it is safe to import into
 * client components (e.g. the home-page teaser). The file-reading logic
 * lives in data/insights-content.js, which is only used in getStaticProps.
 * ─────────────────────────────────────────────────────────────── */

export const articles = [
  {
    slug: "why-gcc-brands-fail-at-commercial-execution",
    title: "Why Most GCC Brands Fail at Commercial Execution",
    excerpt: "Despite aggressive budgets and stunning launches, many GCC brands fail to gain traction. The failure is rarely the product — it's commercial execution.",
    date: "2026-05-19",
    category: "Commercial Execution",
    readingTime: "6 min",
    published: true,
  },
  {
    slug: "ai-will-not-replace-marketers",
    title: "AI Will Not Replace Marketers — But It Will Replace Weak Commercial Teams",
    excerpt: "The recurring panic of the past year has been the wrong question. AI won't take your job — but it will expose teams without commercial discipline.",
    date: "2026-05-15",
    category: "AI & Strategy",
    readingTime: "5 min",
    published: true,
  },
  {
    slug: "why-omnichannel-fails-in-healthcare",
    title: "Why Omnichannel Fails in Healthcare",
    excerpt: "Despite heavy investment and broad adoption, omnichannel strategy frequently falters across the GCC and MEA healthcare landscape. Here's why.",
    date: "2026-05-12",
    category: "Omnichannel",
    readingTime: "5 min",
    published: true,
  },
  {
    slug: "the-real-problem-with-most-brand-strategies",
    title: "The Real Problem With Most Brand Strategies",
    excerpt: "Most brand strategies don't fail because they're bad ideas. They fail because they never make it off the PowerPoint slide and into the market.",
    date: "2026-05-08",
    category: "Brand Strategy",
    readingTime: "5 min",
    published: true,
  },
  {
    slug: "how-to-build-market-preference-in-b2b",
    title: "How to Build Market Preference in B2B",
    excerpt: "In B2B healthcare and pharma, are you merely generating leads — or engineering a market that consistently prefers your brand?",
    date: "2026-05-05",
    category: "B2B Strategy",
    readingTime: "5 min",
    published: true,
  },
  {
    slug: "why-companies-confuse-marketing-with-growth",
    title: "Why Most Companies Confuse Marketing With Growth",
    excerpt: "Many businesses are busy with marketing — but are they actually growing? Confusing activity with growth wastes resources and stalls results.",
    date: "2026-05-01",
    category: "Commercial Growth",
    readingTime: "5 min",
    published: true,
  },
];

// ─── Pure helpers (no fs — safe on client and server) ───
export function getPublishedArticles() {
  return articles
    .filter(a => a.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleMeta(slug) {
  return articles.find(a => a.slug === slug);
}

export function getAllArticleSlugs() {
  return articles.filter(a => a.published).map(a => a.slug);
}
