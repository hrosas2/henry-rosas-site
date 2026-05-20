import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getPublishedArticles } from "../../data/insights";

// ─── DESIGN TOKENS (mirrors home page) ────────────────────────
const T = {
  bg: "#E0E0D0",
  bgAlt: "#F5F5EE",
  bgDark: "#D4D4C4",
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
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export async function getStaticProps() {
  return { props: { articles: getPublishedArticles() } };
}

export default function InsightsIndexPage({ articles }) {
  const categories = ["All", ...new Set(articles.map(a => a.category))];
  const [category, setCategory] = useState("All");
  const filtered = articles.filter(a => category === "All" || a.category === category);

  const gutter = "clamp(24px, 5vw, 64px)";
  const maxW = 1240;

  return (
    <>
      <Head>
        <title>Insights — Henry Rosas | Market Preference Engineering</title>
        <meta name="description" content="Essays on commercial strategy, market preference, brand, and growth across pharma, FMCG, biometrics, and B2B technology in GCC, MEA, and LATAM." />
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
          <Link href="/" style={{
            fontFamily: F.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.ink, textDecoration: "none",
          }}>← Henry Rosas</Link>
          <Link href="/#connect" style={{
            fontFamily: F.mono, fontSize: 10, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: T.ink, textDecoration: "none",
            padding: "7px 18px",
            border: `1.5px solid ${T.ink}`,
          }}>Let's Talk</Link>
        </div>
      </nav>

      {/* ═══════ HEADER ═══════ */}
      <header style={{ padding: `140px ${gutter} 60px`, background: T.bg }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div aria-hidden="true" style={{ width: 6, height: 6, background: T.neon, borderRadius: "50%" }} />
            <Mono style={{ color: T.inkFaint }}>Insights</Mono>
          </div>
          <h1 style={{
            fontFamily: F.serif,
            fontSize: "clamp(40px, 6vw, 76px)",
            fontWeight: 400, lineHeight: 1.05,
            color: T.ink, maxWidth: 900, marginBottom: 24,
            letterSpacing: "-0.02em",
          }}>
            Notes on making the market <em>choose you</em>.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: T.inkMuted, maxWidth: 620 }}>
            Essays on commercial strategy, brand, and growth — drawn from 30 years across pharma, FMCG, biometrics, and B2B technology in the GCC, MEA, and Latin America.
          </p>
        </div>
      </header>

      {/* ═══════ FILTERS ═══════ */}
      <section aria-label="Filter articles" style={{
        padding: `28px ${gutter}`,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
        background: T.bgAlt,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {categories.map(opt => {
            const active = opt === category;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setCategory(opt)}
                style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: active ? T.ink : T.inkMuted,
                  background: active ? T.neon : "transparent",
                  padding: "6px 14px",
                  border: `1px solid ${active ? T.ink : T.lineMed}`,
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >{opt}</button>
            );
          })}
          <div style={{ marginLeft: "auto" }}>
            <Mono style={{ color: T.inkFaint }}>{filtered.length} {filtered.length === 1 ? "article" : "articles"}</Mono>
          </div>
        </div>
      </section>

      {/* ═══════ ARTICLE GRID ═══════ */}
      <section style={{ padding: `80px ${gutter} 120px` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
          }}>
            {filtered.map(a => (
              <Link key={a.slug} href={`/insights/${a.slug}`} style={{
                display: "flex", flexDirection: "column",
                background: T.white, border: `1px solid ${T.lineMed}`,
                textDecoration: "none", color: "inherit", height: "100%",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.boxShadow = "0 12px 30px rgba(26,26,26,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = T.lineMed; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
                    <Mono style={{ color: T.ink }}>{a.category}</Mono>
                    <Mono style={{ color: T.inkFaint }}>·</Mono>
                    <Mono style={{ color: T.inkFaint }}>{a.readingTime}</Mono>
                  </div>
                  <h2 style={{
                    fontFamily: F.serif, fontSize: 24, fontWeight: 500,
                    lineHeight: 1.25, color: T.ink, marginBottom: 14,
                  }}>{a.title}</h2>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: T.inkMuted, marginBottom: 24, flex: 1 }}>{a.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <Mono style={{ color: T.inkFaint }}>{formatDate(a.date)}</Mono>
                    <Mono style={{ color: T.ink }}>Read →</Mono>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA BAND ═══════ */}
      <section style={{
        padding: `80px ${gutter}`, background: T.bgAlt,
        borderTop: `1px solid ${T.line}`, textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 400, lineHeight: 1.3, color: T.ink, marginBottom: 20 }}>
            Want to apply this to your business?
          </h2>
          <p style={{ fontSize: 15, color: T.inkMuted, marginBottom: 28 }}>
            A 30-minute strategy diagnostic. No pitch. We'll find where preference is breaking down.
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
