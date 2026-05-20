import Head from "next/head";
import Link from "next/link";
import { marked } from "marked";
import {
  getPublishedArticles,
  getAllArticleSlugs,
  getArticleMeta,
} from "../../data/insights";
import { getArticleMarkdown } from "../../data/insights-content";

// ─── DESIGN TOKENS (mirrors home page) ────────────────────────
const T = {
  bg: "#E0E0D0",
  bgAlt: "#F5F5EE",
  ink: "#1A1A1A",
  inkSoft: "#333333",
  inkMuted: "#4A4A40",
  inkFaint: "#707064",
  neon: "#DFFF00",
  neonDim: "rgba(223,255,0,0.35)",
  line: "rgba(26,26,26,0.08)",
  lineMed: "rgba(26,26,26,0.14)",
  white: "#FAFAF5",
};
const F = {
  serif: "'Bodoni Moda', 'Didot', 'Georgia', serif",
  sans: "'Outfit', 'Helvetica Neue', sans-serif",
  mono: "'IBM Plex Mono', 'Courier New', monospace",
};

function Mono({ children, style = {} }) {
  return <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase", color: T.inkMuted, ...style }}>{children}</span>;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ─── STATIC GENERATION ────────────────────────────────────────
export async function getStaticPaths() {
  return {
    paths: getAllArticleSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const meta = getArticleMeta(params.slug);
  if (!meta) return { notFound: true };

  const markdown = getArticleMarkdown(params.slug);
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  // "More articles" — up to 2 other published pieces
  const others = getPublishedArticles().filter(a => a.slug !== params.slug).slice(0, 2);

  return { props: { meta, html, others } };
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function ArticlePage({ meta, html, others }) {
  const gutter = "clamp(24px, 5vw, 64px)";
  const maxW = 1100;

  return (
    <>
      <Head>
        <title>{meta.title} — Henry Rosas</title>
        <meta name="description" content={meta.excerpt} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={meta.date} />
      </Head>

      {/* ─── Nav ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${gutter}`,
        background: "rgba(224,224,208,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${T.line}`,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
          <Link href="/insights" style={{
            fontFamily: F.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.ink, textDecoration: "none",
          }}>← All Insights</Link>
          <Link href="/#connect" style={{
            fontFamily: F.mono, fontSize: 10, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: T.ink, textDecoration: "none",
            padding: "7px 18px",
            border: `1.5px solid ${T.ink}`,
          }}>Let's Talk</Link>
        </div>
      </nav>

      {/* ═══════ ARTICLE HEADER ═══════ */}
      <header style={{ padding: `140px ${gutter} 50px` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{
              fontFamily: F.mono, fontSize: 10, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: T.ink, background: T.neon, padding: "6px 12px",
            }}>{meta.category}</span>
            <Mono style={{ color: T.inkFaint }}>{formatDate(meta.date)}</Mono>
            <Mono style={{ color: T.inkFaint }}>·</Mono>
            <Mono style={{ color: T.inkFaint }}>{meta.readingTime} read</Mono>
          </div>
          <h1 style={{
            fontFamily: F.serif,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 400, lineHeight: 1.12,
            color: T.ink, letterSpacing: "-0.02em",
          }}>
            {meta.title}
          </h1>
        </div>
      </header>

      {/* ═══════ ARTICLE BODY ═══════ */}
      <article style={{ padding: `0 ${gutter} 80px` }}>
        <div
          className="article-prose"
          style={{ maxWidth: 760, margin: "0 auto" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {/* ═══════ BYLINE ═══════ */}
      <section style={{ padding: `0 ${gutter} 80px` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", paddingTop: 32, borderTop: `1px solid ${T.lineMed}` }}>
          <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 8 }}>Written by</Mono>
          <div style={{ fontFamily: F.serif, fontSize: 20, color: T.ink, marginBottom: 6 }}>Henry Rosas</div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: T.inkMuted }}>
            Fractional CMO and commercial strategy advisor. 30 years across J&J, Unilever, Mundipharma, Strategy Tools, and FacePhi.
          </p>
        </div>
      </section>

      {/* ═══════ MORE ARTICLES ═══════ */}
      {others.length > 0 && (
        <section style={{ padding: `60px ${gutter}`, background: T.bgAlt, borderTop: `1px solid ${T.line}` }}>
          <div style={{ maxWidth: maxW, margin: "0 auto" }}>
            <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 28 }}>More Insights</Mono>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {others.map(a => (
                <Link key={a.slug} href={`/insights/${a.slug}`} style={{
                  display: "block", background: T.white, border: `1px solid ${T.lineMed}`,
                  padding: 24, textDecoration: "none", color: "inherit",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.lineMed; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Mono style={{ color: T.ink, display: "block", marginBottom: 12 }}>{a.category}</Mono>
                  <h3 style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 500, lineHeight: 1.3, color: T.ink, marginBottom: 10 }}>{a.title}</h3>
                  <Mono style={{ color: T.inkFaint }}>Read →</Mono>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ CTA BAND ═══════ */}
      <section style={{ padding: `80px ${gutter}`, background: T.bg, borderTop: `1px solid ${T.line}`, textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 400, lineHeight: 1.3, color: T.ink, marginBottom: 20 }}>
            Is the market choosing you?
          </h2>
          <p style={{ fontSize: 15, color: T.inkMuted, marginBottom: 28 }}>
            Book a 30-minute strategy diagnostic. No pitch. No pressure.
          </p>
          <Link href="/#connect" style={{
            fontFamily: F.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: T.ink, background: T.neon,
            padding: "15px 36px", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 10,
          }}>
            Book a Strategy Diagnostic <span style={{ fontSize: 14 }} aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer style={{ padding: `36px ${gutter}`, borderTop: `1px solid ${T.lineMed}`, textAlign: "center" }}>
        <Mono style={{ color: T.inkFaint, fontSize: 9 }}>
          © {new Date().getFullYear()} Henry Rosas · Market Preference Engineering™
        </Mono>
      </footer>
    </>
  );
}
