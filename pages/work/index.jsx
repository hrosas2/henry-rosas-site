import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getPublishedCaseStudies } from "../../data/case-studies";

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

export default function WorkIndexPage() {
  const all = getPublishedCaseStudies();

  // Filters
  const industries = ["All", ...new Set(all.map(c => c.industry))];
  const regions = ["All", ...new Set(all.map(c => c.region))];
  const [industry, setIndustry] = useState("All");
  const [region, setRegion] = useState("All");

  const filtered = all.filter(c =>
    (industry === "All" || c.industry === industry) &&
    (region === "All" || c.region === region)
  );

  const gutter = "clamp(24px, 5vw, 64px)";
  const maxW = 1240;

  return (
    <>
      <Head>
        <title>Selected Work — Henry Rosas | Market Preference Engineering</title>
        <meta name="description" content="Selected case studies of commercial strategy and market preference work across pharma, FMCG, and B2B technology in GCC, MEA, and LATAM markets." />
      </Head>

      {/* ─── Minimal nav (subset of home nav) ─── */}
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
      <header style={{
        padding: `140px ${gutter} 60px`,
        background: T.bg,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div aria-hidden="true" style={{ width: 6, height: 6, background: T.neon, borderRadius: "50%" }} />
            <Mono style={{ color: T.inkFaint }}>Selected Work</Mono>
          </div>
          <h1 style={{
            fontFamily: F.serif,
            fontSize: "clamp(40px, 6vw, 76px)",
            fontWeight: 400, lineHeight: 1.05,
            color: T.ink,
            maxWidth: 900,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}>
            Engagements where the market <em>chose</em>.
          </h1>
          <p style={{
            fontSize: 17, lineHeight: 1.7, color: T.inkMuted,
            maxWidth: 620,
          }}>
            A selection of commercial strategy work across pharma, FMCG, and B2B technology in the GCC, MEA, and Latin America. Client names are anonymized where confidentiality applies. Outcomes are real and measured.
          </p>
        </div>
      </header>

      {/* ═══════ FILTERS ═══════ */}
      <section aria-label="Filter case studies" style={{
        padding: `28px ${gutter}`,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
        background: T.bgAlt,
      }}>
        <div style={{
          maxWidth: maxW, margin: "0 auto",
          display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center",
        }}>
          <FilterGroup label="Industry" value={industry} options={industries} onChange={setIndustry} />
          <FilterGroup label="Region" value={region} options={regions} onChange={setRegion} />
          <div style={{ marginLeft: "auto" }}>
            <Mono style={{ color: T.inkFaint }}>{filtered.length} {filtered.length === 1 ? "result" : "results"}</Mono>
          </div>
        </div>
      </section>

      {/* ═══════ CARDS GRID ═══════ */}
      <section style={{ padding: `80px ${gutter} 120px` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{
              padding: 64, textAlign: "center",
              border: `1px dashed ${T.lineMed}`,
              fontFamily: F.serif, fontSize: 20, fontStyle: "italic", color: T.inkMuted,
            }}>
              No case studies match these filters. <button onClick={() => { setIndustry("All"); setRegion("All"); }} style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", color: T.ink, font: "inherit" }}>Clear filters</button>.
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: 24,
            }}>
              {filtered.map(c => <CaseCard key={c.slug} c={c} />)}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ CTA BAND ═══════ */}
      <section style={{
        padding: `80px ${gutter}`,
        background: T.bgAlt,
        borderTop: `1px solid ${T.line}`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: F.serif,
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 400, lineHeight: 1.3,
            color: T.ink, marginBottom: 20,
          }}>
            Could your next engagement be on this page?
          </h2>
          <p style={{ fontSize: 15, color: T.inkMuted, marginBottom: 28 }}>
            Most of the work starts with a 30-minute diagnostic conversation. No pitch.
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

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ padding: `36px ${gutter}`, borderTop: `1px solid ${T.lineMed}`, textAlign: "center" }}>
        <Mono style={{ color: T.inkFaint, fontSize: 9 }}>
          © {new Date().getFullYear()} Henry Rosas · Market Preference Engineering™
        </Mono>
      </footer>
    </>
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────

function FilterGroup({ label, value, options, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Mono style={{ color: T.inkFaint }}>{label}</Mono>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {options.map(opt => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              type="button"
              style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 500,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: active ? T.ink : T.inkMuted,
                background: active ? T.neon : "transparent",
                padding: "6px 14px",
                border: `1px solid ${active ? T.ink : T.lineMed}`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CaseCard({ c }) {
  return (
    <Link
      href={`/work/${c.slug}`}
      style={{
        display: "block",
        background: T.white,
        border: `1px solid ${T.lineMed}`,
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.boxShadow = `0 12px 30px rgba(26,26,26,0.08)`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = T.lineMed; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Hero strip */}
      <div style={{
        aspectRatio: "16 / 10",
        background: `linear-gradient(135deg, ${T.bgAlt}, ${T.bg})`,
        position: "relative",
        overflow: "hidden",
      }}>
        {c.hero && (
          <img
            src={c.hero}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "none" }}
            onLoad={(e) => { e.currentTarget.style.display = "block"; }}
          />
        )}
        {/* Big stat overlay */}
        <div style={{
          position: "absolute",
          bottom: 24, left: 24,
          color: T.ink,
        }}>
          <div style={{ fontFamily: F.serif, fontSize: 52, fontWeight: 400, lineHeight: 1 }}>{c.headlineStat}</div>
          <Mono style={{ color: T.inkMuted, marginTop: 6, display: "block" }}>{c.headlineLabel}</Mono>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <Mono style={{ color: T.inkFaint }}>{c.industry}</Mono>
          <Mono style={{ color: T.inkFaint }}>·</Mono>
          <Mono style={{ color: T.inkFaint }}>{c.region}</Mono>
          <Mono style={{ color: T.inkFaint }}>·</Mono>
          <Mono style={{ color: T.inkFaint }}>{c.year}</Mono>
        </div>
        <h3 style={{
          fontFamily: F.serif, fontSize: 22, fontWeight: 500,
          lineHeight: 1.3, color: T.ink, marginBottom: 12,
        }}>{c.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: T.inkMuted, marginBottom: 16 }}>{c.summary}</p>
        <Mono style={{ color: T.ink }}>Read case →</Mono>
      </div>
    </Link>
  );
}
