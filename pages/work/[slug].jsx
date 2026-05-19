import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { caseStudies, getCaseStudyBySlug, getAllSlugs } from "../../data/case-studies";

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

// ─── STATIC GENERATION ────────────────────────────────────────
// Pre-render every case study at build time for fastest loads + SEO.
export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return { notFound: true };

  // Compute next case for "Next case" link
  const published = caseStudies.filter(c => c.published);
  const idx = published.findIndex(c => c.slug === study.slug);
  const next = published[(idx + 1) % published.length];

  return { props: { study, next: { slug: next.slug, title: next.title, headlineStat: next.headlineStat, industry: next.industry, region: next.region } } };
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function CaseStudyPage({ study, next }) {
  const router = useRouter();
  const gutter = "clamp(24px, 5vw, 64px)";
  const maxW = 1100;

  if (router.isFallback) return null;

  return (
    <>
      <Head>
        <title>{study.title} — Henry Rosas | Case Study</title>
        <meta name="description" content={study.summary} />
        <meta property="og:title" content={study.title} />
        <meta property="og:description" content={study.summary} />
        <meta property="og:type" content="article" />
      </Head>

      {/* ─── Minimal nav ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${gutter}`,
        background: "rgba(224,224,208,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${T.line}`,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
          <Link href="/work" style={{
            fontFamily: F.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.ink, textDecoration: "none",
          }}>← All Work</Link>
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
      <header style={{ padding: `140px ${gutter} 80px` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          {/* Tags row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            <Tag>{study.industry}</Tag>
            <Tag>{study.region}</Tag>
            <Tag>{study.duration}</Tag>
            <Tag>{study.year}</Tag>
          </div>

          <h1 style={{
            fontFamily: F.serif,
            fontSize: "clamp(34px, 5vw, 64px)",
            fontWeight: 400, lineHeight: 1.1,
            color: T.ink,
            marginBottom: 32,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}>
            {study.title}
          </h1>

          <Mono style={{ color: T.inkFaint }}>Client</Mono>
          <p style={{ fontFamily: F.serif, fontSize: 18, fontStyle: "italic", color: T.inkSoft, marginTop: 6 }}>
            {study.client}
          </p>
        </div>
      </header>

      {/* ═══════ HEADLINE STAT BAND ═══════ */}
      <section style={{
        padding: `60px ${gutter}`,
        background: T.bgAlt,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
        position: "relative",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: 30, right: "8%",
          width: 120, height: 120, borderRadius: "50%",
          border: `1.5px solid ${T.neonDim}`,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: maxW, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: F.serif,
            fontSize: "clamp(80px, 14vw, 180px)",
            fontWeight: 400, lineHeight: 0.95,
            color: T.ink, letterSpacing: "-0.04em",
          }}>{study.headlineStat}</div>
          <Mono style={{ color: T.inkMuted, marginTop: 16, display: "block", fontSize: 12 }}>{study.headlineLabel}</Mono>
        </div>
      </section>

      {/* ═══════ BODY SECTIONS ═══════ */}
      <article style={{ padding: `80px ${gutter} 60px` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {study.sections.map((sec, i) => (
            <section key={i} style={{ marginBottom: 56 }}>
              <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>0{i + 1}</Mono>
              <h2 style={{
                fontFamily: F.serif, fontSize: 28, fontWeight: 500,
                lineHeight: 1.2, color: T.ink, marginBottom: 18,
              }}>{sec.heading}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: T.inkSoft }}>{sec.body}</p>
            </section>
          ))}
        </div>
      </article>

      {/* ═══════ METRICS GRID ═══════ */}
      {study.metrics && study.metrics.length > 0 && (
        <section aria-label="Outcome metrics" style={{
          padding: `60px ${gutter}`,
          background: T.bgAlt,
          borderTop: `1px solid ${T.line}`,
          borderBottom: `1px solid ${T.line}`,
        }}>
          <div style={{ maxWidth: maxW, margin: "0 auto" }}>
            <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 32 }}>Outcomes</Mono>
            <dl style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(study.metrics.length, 4)}, 1fr)`,
              gap: 32,
            }}>
              {study.metrics.map((m, i) => (
                <div key={i}>
                  <dt style={{
                    fontFamily: F.serif, fontSize: 44, fontWeight: 400,
                    color: T.ink, lineHeight: 1,
                  }}>{m.value}</dt>
                  <dd>
                    <Mono style={{ color: T.inkFaint, marginTop: 10, display: "block" }}>{m.label}</Mono>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ═══════ TESTIMONIAL ═══════ */}
      {study.testimonial && (
        <section style={{ padding: `80px ${gutter}` }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div aria-hidden="true" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36, borderRadius: "50%",
              background: T.neon, marginBottom: 24,
            }}>
              <span style={{ fontFamily: F.serif, fontSize: 24, color: T.ink, lineHeight: 1 }}>"</span>
            </div>
            <blockquote>
              <p style={{
                fontFamily: F.serif, fontSize: 22, fontStyle: "italic",
                lineHeight: 1.55, color: T.ink, marginBottom: 20,
              }}>{study.testimonial.quote}</p>
              <footer>
                <Mono style={{ color: T.ink, display: "block", marginBottom: 4 }}>{study.testimonial.name}</Mono>
                <Mono style={{ color: T.inkFaint }}>{study.testimonial.title}</Mono>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* ═══════ NEXT CASE ═══════ */}
      <section style={{
        padding: `80px ${gutter}`,
        background: T.bg,
        borderTop: `1px solid ${T.line}`,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 20 }}>Next Case</Mono>
          <Link href={`/work/${next.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, paddingBottom: 24, borderBottom: `1px solid ${T.lineMed}` }}>
              <h3 style={{ fontFamily: F.serif, fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 400, color: T.ink, flex: 1, lineHeight: 1.2 }}>
                {next.title}
              </h3>
              <span style={{ fontFamily: F.mono, fontSize: 14, color: T.ink, flexShrink: 0 }} aria-hidden="true">→</span>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <Mono style={{ color: T.inkFaint }}>{next.industry} · {next.region}</Mono>
            </div>
          </Link>
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
            fontFamily: F.serif, fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 400, lineHeight: 1.3,
            color: T.ink, marginBottom: 20,
          }}>
            Have a similar problem?
          </h2>
          <p style={{ fontSize: 15, color: T.inkMuted, marginBottom: 28 }}>
            30-minute conversation, no pitch. We'll diagnose where commercial preference is breaking down.
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

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: F.mono, fontSize: 10, fontWeight: 500,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: T.inkSoft,
      padding: "6px 14px",
      border: `1px solid ${T.lineMed}`,
      background: T.white,
    }}>{children}</span>
  );
}
