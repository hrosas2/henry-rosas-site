/* ───────────────────────────────────────────────────────────────
 * CASE STUDIES — the single source of truth
 * ───────────────────────────────────────────────────────────────
 *
 * To add or edit a case study, edit this file directly.
 * Each entry follows the schema below.
 *
 * After editing this file:
 *   git add . && git commit -m "Add case study: <name>" && git push
 *
 * SCHEMA:
 *   slug             URL fragment — keep lowercase, hyphenated, unique
 *   title            Headline shown on card + detail page
 *   client           "Anonymized — Top-10 Global Pharma" or named with permission
 *   industry         "Pharmaceuticals" | "FMCG" | "B2B Technology" | etc.
 *   region           "GCC" | "MEA" | "LATAM" | etc.
 *   duration         How long the engagement lasted (e.g. "18 months")
 *   year             Closing year (numeric)
 *   summary          One-sentence card description (max ~140 chars)
 *   headlineStat     Big number for hero — "+38%" | "4x" | "$12M"
 *   headlineLabel    What the stat refers to
 *   hero             Optional. Path to image in /public/case-images/
 *   sections         Array of { heading, body } long-form content blocks
 *   metrics          Array of 3-4 { value, label } stat cards
 *   testimonial      Optional. { quote, name, title }
 *   published        true to show on /work — false to hide as draft
 * ─────────────────────────────────────────────────────────────── */

export const caseStudies = [
  {
    slug: "gcc-pharma-launch",
    title: "Scaling a Top-3 Pain Brand Across 4 GCC Markets",
    client: "Anonymized — Top-10 Global Pharma",
    industry: "Pharmaceuticals",
    region: "GCC",
    duration: "18 months",
    year: 2024,
    summary: "Repositioning a mature pain franchise to capture +38% category share in Saudi Arabia, UAE, Kuwait, and Qatar.",
    headlineStat: "+38%",
    headlineLabel: "category share gain",
    hero: "/case-images/case-1.jpg", // optional — falls back to gradient if missing
    sections: [
      {
        heading: "Context",
        body: "A top-3 global pain brand was losing share to local generics across the GCC despite higher clinical efficacy. The product was clinically superior — but the commercial system around it was fragmented across four markets, each with different distributors, regulatory pathways, and HCP engagement norms.",
      },
      {
        heading: "The Challenge",
        body: "Senior leadership had two competing diagnoses. Marketing said the issue was awareness. Sales said the issue was pricing. Neither was right. The actual problem was that HCPs in the region weren't differentiating between the brand and generic alternatives at the moment of prescription — and the brand wasn't engineered to be remembered at that moment.",
      },
      {
        heading: "Approach",
        body: "Three interventions, sequenced over 18 months. First, a market-preference diagnostic across 200+ HCPs and 50+ pharmacists to identify the actual decision triggers. Second, a regional brand framework that translated clinical superiority into emotional preference signals — the brand became associated with a specific patient archetype, not just a molecule. Third, a unified KAM playbook that gave 80+ commercial staff a single way to engage HCPs across the four markets.",
      },
      {
        heading: "Outcome",
        body: "Category share grew from 19% to 26% across the four markets within 18 months. Prescription velocity in tier-1 HCP segments doubled. The framework continues to drive commercial decisions three years later — the test of whether a system was actually built, or just a campaign.",
      },
    ],
    metrics: [
      { value: "+38%", label: "Category share" },
      { value: "4", label: "GCC markets" },
      { value: "200+", label: "HCPs surveyed" },
      { value: "2×", label: "Rx velocity" },
    ],
    testimonial: {
      quote: "Henry didn't give us a strategy document. He built a commercial operating system that survived two leadership changes and a portfolio reshuffle. That's rare.",
      name: "Regional Commercial Director",
      title: "Top-10 Global Pharma — MENA",
    },
    published: true,
  },

  {
    slug: "fmcg-east-africa-entry",
    title: "Market Entry for a European FMCG Group in East Africa",
    client: "Anonymized — European FMCG conglomerate",
    industry: "FMCG",
    region: "East Africa",
    duration: "12 months",
    year: 2023,
    summary: "Designing the go-to-market for a personal care portfolio entering Kenya, Tanzania, and Uganda from scratch.",
    headlineStat: "$12M",
    headlineLabel: "year-one revenue",
    sections: [
      {
        heading: "Context",
        body: "A European personal care group wanted to enter East Africa but had no commercial footprint, no distributor relationships, and no consumer insight beyond what their global research suggested. The default playbook — appoint a master distributor, run TV — would have lost them three years and most of the launch budget.",
      },
      {
        heading: "The Challenge",
        body: "The board had committed to a $30M three-year investment. The CFO needed a credible year-one revenue plan within 90 days. The CMO needed a positioning that didn't import European norms into a market where 70% of personal care purchases happen in informal retail.",
      },
      {
        heading: "Approach",
        body: "Built a market-entry framework that started with consumer truth, not product. 60+ in-home interviews across three income bands. Trade visits to 400+ informal outlets to understand how product moves at the shopper level. Then a positioning that anchored the brand to a specific moment in the consumer's day, distributed via a hybrid model — modern trade for premium SKUs, sub-distributor networks for mainstream.",
      },
      {
        heading: "Outcome",
        body: "Year-one revenue hit $12M against a $9M plan. The hybrid distribution model was retained for subsequent country launches. The framework became the group's standard market-entry playbook for emerging markets.",
      },
    ],
    metrics: [
      { value: "$12M", label: "Year-one revenue" },
      { value: "133%", label: "of plan" },
      { value: "3", label: "Countries launched" },
      { value: "400+", label: "Retail visits" },
    ],
    testimonial: null,
    published: true,
  },

  {
    slug: "b2b-tech-positioning",
    title: "Repositioning a B2B Health-Tech for Series B",
    client: "Anonymized — UAE-based identity-verification SaaS",
    industry: "B2B Technology",
    region: "MEA",
    duration: "6 months",
    year: 2025,
    summary: "Sharpening positioning, pricing, and commercial narrative ahead of a Series B raise.",
    headlineStat: "3.4×",
    headlineLabel: "average deal size",
    sections: [
      {
        heading: "Context",
        body: "A health-tech company had product-market fit in three GCC countries but was being out-positioned by better-funded US competitors entering the region. Their commercial pitch sounded like a feature list. Their pricing was reactive. Their pipeline was full of small deals, not strategic accounts.",
      },
      {
        heading: "The Challenge",
        body: "Six months to sharpen the commercial story ahead of a Series B raise. The board wanted to see deal velocity, average contract value, and a defensible category position — not just revenue growth.",
      },
      {
        heading: "Approach",
        body: "Rewrote the positioning around a single buyer outcome instead of product capabilities. Built a three-tier pricing architecture that anchored enterprise pricing at 3× the previous default. Created a commercial playbook for the sales team to lead with strategic discovery, not demo. Trained the founder-led sales motion to position the company as a category, not a vendor.",
      },
      {
        heading: "Outcome",
        body: "Average deal size grew 3.4× in six months. Enterprise win rate doubled. Series B closed at a 2.1× valuation step-up. The positioning still anchors the company's commercial work two years later.",
      },
    ],
    metrics: [
      { value: "3.4×", label: "Avg deal size" },
      { value: "2×", label: "Enterprise win rate" },
      { value: "2.1×", label: "Valuation step-up" },
      { value: "6mo", label: "Time to outcome" },
    ],
    testimonial: {
      quote: "Henry treated commercial strategy like an engineering problem. We stopped winning deals by accident and started winning them by design.",
      name: "Co-founder & CEO",
      title: "UAE-based health-tech",
    },
    published: true,
  },
];

// Helper exports for consumers
export function getPublishedCaseStudies() {
  return caseStudies.filter(c => c.published);
}

export function getCaseStudyBySlug(slug) {
  return caseStudies.find(c => c.slug === slug);
}

export function getAllSlugs() {
  return caseStudies.filter(c => c.published).map(c => c.slug);
}
