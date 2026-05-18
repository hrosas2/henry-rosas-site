import { useState, useEffect, useRef } from "react";

/*
 * ═══════════════════════════════════════════════════════════════
 * CREATIVE DIRECTION: Strategic Avant-Garde / Commercial Intelligence
 * ═══════════════════════════════════════════════════════════════
 * 
 * Aesthetic: Constructivist editorial × Architectural blueprint × Luxury strategy
 * Background: Warm gray-beige (#E0E0D0) — matte paper
 * Typography: Bodoni Moda (editorial serif) + Outfit (architectural sans) + IBM Plex Mono (data)
 * Accent: Neon Yellow (#DFFF00) — used sparingly for strategic emphasis
 * Grid: Swiss modular, intentional asymmetry, large whitespace
 * Lines: Ultra-thin, technical drafting, blueprint-inspired
 * Feel: "Reading a premium strategy journal"
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// ─── DESIGN TOKENS ────────────────────────────────────────────
const T = {
  bg:        "#E0E0D0",
  bgAlt:     "#F5F5EE",
  bgDark:    "#D4D4C4",
  ink:       "#1A1A1A",
  inkSoft:   "#333333",
  inkMuted:  "#6B6B60",
  inkFaint:  "#9E9E90",
  neon:      "#DFFF00",
  neonDim:   "rgba(223,255,0,0.35)",
  neonGhost: "rgba(223,255,0,0.08)",
  line:      "rgba(26,26,26,0.08)",
  lineMed:   "rgba(26,26,26,0.14)",
  white:     "#FAFAF5",
};

const F = {
  serif:  "'Bodoni Moda', 'Didot', 'Georgia', serif",
  sans:   "'Outfit', 'Helvetica Neue', sans-serif",
  mono:   "'IBM Plex Mono', 'Courier New', monospace",
};

// ─── HOOKS ────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

function useScroll() {
  const [data, setData] = useState({ y: 0, progress: 0 });
  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setData({ y, progress: total > 0 ? Math.min(y / total, 1) : 0 });
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  return data;
}

// ─── PRIMITIVES ───────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function Mono({ children, style = {} }) {
  return <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase", color: T.inkMuted, ...style }}>{children}</span>;
}

function track(name, props = {}) {
  if (typeof window !== "undefined" && window.posthog) window.posthog.capture(name, props);
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function MarketPreferencePage() {
  const { y: scrollY, progress: scrollProgress } = useScroll();
  const [form, setForm] = useState({ name: "", email: "", company: "", challenge: "" });
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);
  const [activePillar, setActivePillar] = useState(null);

  const handleSubmit = () => {
    track("strategy_call_requested", { company: form.company });
    setSent(true);
  };

  useEffect(() => { setTimeout(() => setReady(true), 150); }, []);

  const gutter = "clamp(24px, 5vw, 64px)";
  const maxW = 1240;

  const pillars = [
    { id: "rel", n: "01", title: "Relevance", q: "Why do businesses become invisible?", body: "Markets don't punish bad companies. They ignore irrelevant ones. Relevance is the prerequisite for every other commercial metric — and it decays faster than most leaders realize." },
    { id: "tru", n: "02", title: "Trust", q: "Why do customers hesitate to buy?", body: "Price is rarely the real barrier. Trust is. It's built through consistency between what you promise, what you deliver, and what others say when you're not in the room." },
    { id: "exp", n: "03", title: "Commercial Experience", q: "Why does CX impact revenue more than campaigns?", body: "Every interaction is a commercial event. The pharmacy counter. The onboarding call. The invoice design. Companies that treat experience as a revenue driver outperform those that treat it as a department." },
    { id: "cla", n: "04", title: "Strategic Clarity", q: "Why do confused brands lose market share?", body: "When a company can't articulate why it exists in one sentence, the market can't either. Clarity is not simplification — it's the discipline of knowing what you are and what you're not." },
    { id: "pre", n: "05", title: "Market Preference", q: "Why do customers choose competitors with inferior products?", body: "Because being chosen is not a function of being better. It's a function of being understood, trusted, and top-of-mind at the moment of decision. That's engineerable." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Outfit:wght@200;300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: ${T.bg};
          color: ${T.inkSoft};
          font-family: ${F.sans};
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          line-height: 1.7;
        }
        ::selection { background: ${T.neon}; color: ${T.ink}; }

        input, textarea { font-family: ${F.sans}; }
        input:focus, textarea:focus { outline: none; border-color: ${T.ink} !important; }

        .neon-link {
          color: ${T.ink};
          text-decoration: none;
          background-image: linear-gradient(${T.neon}, ${T.neon});
          background-size: 100% 2px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 0.3s;
        }
        .neon-link:hover {
          background-size: 100% 100%;
        }

        .pillar-row { cursor: pointer; transition: background 0.3s; }
        .pillar-row:hover { background: ${T.neonGhost} !important; }

        @media (max-width: 860px) {
          .grid-asym { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-title { font-size: 12vw !important; }
          .hero-sub { max-width: 100% !important; }
          .sect-title { font-size: 28px !important; }
          .pillar-inner { flex-direction: column !important; gap: 8px !important; }
          .pillar-inner .pillar-q { display: none !important; }
          .stats-row { flex-direction: column !important; gap: 32px !important; }
          .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; }
          .nav-items { display: none !important; }
          .work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ─── ARCHITECTURAL GRID TEXTURE (fixed background) ─── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.022,
        backgroundImage: `
          linear-gradient(${T.ink} 1px, transparent 1px),
          linear-gradient(90deg, ${T.ink} 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* ─── NEON SCROLL ACCENT ────────────────────────────── */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 200,
        height: 3,
        width: `${scrollProgress * 100}%`,
        background: T.neon,
        transition: "width 0.08s linear",
      }} />

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${gutter}`,
        background: scrollY > 40 ? "rgba(224,224,208,0.92)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
        borderBottom: scrollY > 40 ? `1px solid ${T.line}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
          <a href="#" style={{
            fontFamily: F.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.ink, textDecoration: "none",
          }}>Henry Rosas</a>
          <div className="nav-items" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Thesis", "Territory", "Work", "Connect"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 400,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: T.inkMuted, textDecoration: "none", transition: "color 0.25s",
              }}
                onMouseEnter={e => e.target.style.color = T.ink}
                onMouseLeave={e => e.target.style.color = T.inkMuted}
              >{n}</a>
            ))}
            <a href="#connect" onClick={() => track("nav_cta")} style={{
              fontFamily: F.mono, fontSize: 10, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: T.ink, textDecoration: "none",
              padding: "7px 18px",
              border: `1.5px solid ${T.ink}`,
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.target.style.background = T.neon; e.target.style.borderColor = T.neon; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = T.ink; }}
            >Let's Talk</a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO                                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: `140px ${gutter} 100px`,
        position: "relative", overflow: "hidden",
      }}>
        {/* ─ Neon geometric accent: circle ─ */}
        <div style={{
          position: "absolute",
          top: "12%", right: "6%",
          width: "clamp(280px, 32vw, 440px)",
          height: "clamp(280px, 32vw, 440px)",
          borderRadius: "50%",
          border: `2px solid ${T.neonDim}`,
          pointerEvents: "none",
          opacity: ready ? 1 : 0,
          transform: ready ? "scale(1)" : "scale(0.85)",
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s",
        }} />
        {/* Small target ring */}
        <div style={{
          position: "absolute",
          top: "28%", right: "18%",
          width: 80, height: 80,
          borderRadius: "50%",
          border: `1.5px solid ${T.neonDim}`,
          pointerEvents: "none",
          opacity: ready ? 0.6 : 0,
          transition: "opacity 0.8s ease 1s",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 6, height: 6, borderRadius: "50%",
            background: T.neon,
          }} />
        </div>

        {/* ─ Architectural thin lines ─ */}
        <div style={{
          position: "absolute", top: 0, left: "clamp(220px, 25%, 340px)",
          width: 1, height: "100%",
          background: T.line,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, right: "clamp(100px, 15%, 200px)",
          width: 1, height: "100%",
          background: T.line,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: maxW, margin: "0 auto", width: "100%", position: "relative" }}>
          {/* Dateline annotation */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 40,
            opacity: ready ? 1 : 0,
            transition: "opacity 0.7s ease 0.3s",
          }}>
            <div style={{ width: 6, height: 6, background: T.neon, borderRadius: "50%", flexShrink: 0 }} />
            <Mono style={{ color: T.inkFaint }}>Market Preference Engineering</Mono>
          </div>

          {/* ─ HEADLINE ─ */}
          <h1 className="hero-title" style={{
            fontFamily: F.serif,
            fontSize: "clamp(44px, 7vw, 96px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: T.ink,
            maxWidth: 840,
            marginBottom: 12,
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(28px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}>
            Your brand is not<br />what you say.
          </h1>

          <h1 className="hero-title" style={{
            fontFamily: F.serif,
            fontSize: "clamp(44px, 7vw, 96px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: T.ink,
            maxWidth: 840,
            marginBottom: 52,
            position: "relative",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(28px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
          }}>
            It's what the market
            <br />is willing to{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              choose.
              {/* Neon underline accent */}
              <span style={{
                position: "absolute", bottom: 4, left: 0, right: 0, height: 4,
                background: T.neon,
                transform: ready ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s",
              }} />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub" style={{
            fontFamily: F.sans,
            fontSize: 18, fontWeight: 300, lineHeight: 1.8,
            color: T.inkMuted,
            maxWidth: 520,
            marginBottom: 44,
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 0.9s",
          }}>
            We help businesses align strategy, brand, experience, and commercial execution — so the market chooses them first.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.7s ease 1.1s",
          }}>
            <a href="#connect" onClick={() => track("hero_cta")} style={{
              fontFamily: F.mono, fontSize: 11, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: T.ink, background: T.neon,
              padding: "15px 36px", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.background = T.ink; e.target.style.color = T.neon; }}
              onMouseLeave={e => { e.target.style.background = T.neon; e.target.style.color = T.ink; }}
            >
              Book a Strategy Conversation <span style={{ fontSize: 14 }}>→</span>
            </a>
            <a href="#thesis" style={{
              fontFamily: F.mono, fontSize: 11, fontWeight: 400,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: T.inkFaint, textDecoration: "none", transition: "color 0.3s",
            }}
              onMouseEnter={e => e.target.style.color = T.ink}
              onMouseLeave={e => e.target.style.color = T.inkFaint}
            >Read the thesis ↓</a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* THESIS                                                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="thesis" style={{
        padding: `120px ${gutter}`,
        background: T.bgAlt,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div className="grid-asym" style={{
            display: "grid", gridTemplateColumns: "220px 1fr", gap: 72,
          }}>
            <Reveal>
              <div>
                <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>Core Thesis</Mono>
                <div style={{ width: 36, height: 2, background: T.neon }} />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p style={{
                  fontFamily: F.serif,
                  fontSize: "clamp(26px, 3vw, 36px)",
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: T.ink,
                  marginBottom: 40,
                }}>
                  Businesses don't grow because they communicate more. They grow because the market chooses them{" "}
                  <span style={{ position: "relative", display: "inline" }}>
                    <em>faster</em>
                    <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: T.neonDim }} />
                  </span>,{" "}
                  trusts them{" "}
                  <span style={{ position: "relative", display: "inline" }}>
                    <em>deeper</em>
                    <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: T.neonDim }} />
                  </span>,{" "}
                  and remembers them{" "}
                  <span style={{ position: "relative", display: "inline" }}>
                    <em>longer</em>
                    <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: T.neonDim }} />
                  </span>.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <p style={{
                  fontSize: 16, lineHeight: 1.85, color: T.inkMuted,
                  maxWidth: 580, marginBottom: 28,
                }}>
                  Most companies invest in marketing as if attention were the goal. It's not. Preference is. The question that matters is not "do they know us?" but "when the moment of decision arrives, do they choose us?"
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{
                  fontSize: 16, lineHeight: 1.85, color: T.inkMuted,
                  maxWidth: 580, marginBottom: 44,
                }}>
                  This is not branding. It's not growth hacking. It's not management consulting. It's the disciplined work of engineering the conditions under which a market consistently prefers one business over another — across pharma, FMCG, and B2B technology, across the Middle East, Africa, and Latin America.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <div style={{
                  borderLeft: `3px solid ${T.neon}`,
                  paddingLeft: 24,
                }}>
                  <p style={{
                    fontFamily: F.serif,
                    fontSize: 22, fontStyle: "italic", lineHeight: 1.55,
                    color: T.ink,
                  }}>
                    "Why do customers choose one business over another?"
                  </p>
                  <Mono style={{ color: T.inkFaint, marginTop: 10, display: "block" }}>
                    — The question that organizes everything
                  </Mono>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TERRITORY — Five Pillars                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="territory" style={{ padding: `100px ${gutter} 120px` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>Intellectual Territory</Mono>
              <h2 className="sect-title" style={{
                fontFamily: F.serif,
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 400, lineHeight: 1.2,
                color: T.ink, maxWidth: 560,
              }}>
                Five forces that determine whether{" "}
                <span style={{ position: "relative", display: "inline" }}>
                  a market chooses you
                  <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.neonDim }} />
                </span>
              </h2>
            </div>
          </Reveal>

          <div style={{ borderTop: `1px solid ${T.lineMed}` }}>
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <div
                  className="pillar-row"
                  onClick={() => { setActivePillar(activePillar === p.id ? null : p.id); track("pillar_click", { pillar: p.title }); }}
                  style={{
                    borderBottom: `1px solid ${T.line}`,
                    padding: activePillar === p.id ? "28px 16px 32px" : "24px 16px",
                    transition: "padding 0.4s",
                  }}
                >
                  <div className="pillar-inner" style={{
                    display: "flex", alignItems: "baseline", gap: 36,
                  }}>
                    <Mono style={{ color: T.inkFaint, minWidth: 24, flexShrink: 0 }}>{p.n}</Mono>

                    <span style={{
                      fontFamily: F.serif, fontSize: 26, fontWeight: 500,
                      color: activePillar === p.id ? T.ink : T.inkSoft,
                      transition: "color 0.3s",
                      minWidth: 220, flexShrink: 0,
                    }}>{p.title}</span>

                    <span className="pillar-q" style={{
                      fontFamily: F.sans, fontSize: 14, fontStyle: "italic", fontWeight: 300,
                      color: T.inkFaint, flex: 1,
                    }}>{p.q}</span>

                    <span style={{
                      fontFamily: F.sans, fontSize: 20, fontWeight: 200,
                      color: T.inkFaint,
                      transform: activePillar === p.id ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                      flexShrink: 0,
                    }}>+</span>
                  </div>

                  <div style={{
                    maxHeight: activePillar === p.id ? 180 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    <p style={{
                      fontSize: 15, lineHeight: 1.8, color: T.inkMuted,
                      maxWidth: 560, paddingTop: 16, paddingLeft: 60,
                    }}>{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* THE WORK                                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="work" style={{
        padding: `100px ${gutter} 120px`,
        background: T.bgAlt,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
        position: "relative",
      }}>
        {/* Blueprint accent line */}
        <div style={{
          position: "absolute", top: 60, left: gutter,
          width: 1, height: "calc(100% - 120px)",
          background: `linear-gradient(180deg, ${T.neonDim}, transparent)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div className="grid-asym" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72,
          }}>
            <Reveal>
              <div>
                <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>The Work</Mono>
                <h2 className="sect-title" style={{
                  fontFamily: F.serif,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 400, lineHeight: 1.25,
                  color: T.ink, marginBottom: 28,
                }}>
                  I embed as your commercial strategy partner — not your vendor.
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: T.inkMuted, marginBottom: 36 }}>
                  30 years across Johnson & Johnson, Unilever, Mundipharma, and Strategy Tools. 15+ markets across GCC, MEA, and LATAM. The work is always the same: make the market choose you.
                </p>

                {/* Career ribbon */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["J&J", "Unilever", "Mundipharma", "Strategy Tools", "FacePhi"].map(name => (
                    <span key={name} style={{
                      fontFamily: F.mono, fontSize: 10, fontWeight: 500,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: T.inkFaint,
                      padding: "6px 14px",
                      border: `1px solid ${T.lineMed}`,
                      background: T.white,
                    }}>{name}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                {[
                  { label: "Fractional CMO", desc: "Embedded senior leadership. 2–3 days per week. I own outcomes, not reports." },
                  { label: "Commercial Strategy", desc: "Positioning, GTM architecture, and market-entry frameworks built for regional complexity." },
                  { label: "Brand as Commercial Asset", desc: "Strategy that connects brand to revenue — not brand to aesthetics." },
                  { label: "Capability Building", desc: "KAM training, commercial playbooks, and team development that transfers knowledge permanently." },
                  { label: "Omnichannel & Digital", desc: "HCP engagement, content ecosystems, and digital transformation for regulated industries." },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "22px 0",
                    borderBottom: `1px solid ${T.line}`,
                  }}>
                    <div style={{
                      fontFamily: F.sans, fontSize: 14, fontWeight: 600,
                      color: T.ink, marginBottom: 5, letterSpacing: "0.01em",
                    }}>{s.label}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: T.inkMuted }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATS                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: `72px ${gutter}`, borderBottom: `1px solid ${T.line}` }}>
        <div className="stats-row" style={{
          maxWidth: maxW, margin: "0 auto",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32,
        }}>
          {[
            { n: "30+", l: "Years" },
            { n: "15+", l: "Markets" },
            { n: "4", l: "Global MNCs" },
            { n: "50+", l: "Brand Launches" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{ textAlign: "center", minWidth: 100 }}>
                <div style={{
                  fontFamily: F.serif, fontSize: 52, fontWeight: 400,
                  color: T.ink, lineHeight: 1,
                }}>{s.n}</div>
                <Mono style={{ color: T.inkFaint, marginTop: 8, display: "block" }}>{s.l}</Mono>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TESTIMONIAL                                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: `96px ${gutter}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: "50%",
              background: T.neon, marginBottom: 28,
            }}>
              <span style={{ fontFamily: F.serif, fontSize: 28, color: T.ink, lineHeight: 1 }}>"</span>
            </div>
            <p style={{
              fontFamily: F.serif,
              fontSize: 22, fontWeight: 400, fontStyle: "italic",
              lineHeight: 1.6, color: T.ink, marginBottom: 24,
            }}>
              Henry doesn't advise from a distance — he builds the systems, trains the teams, and stays until the market responds. Two years later, the frameworks are still running.
            </p>
            <Mono style={{ color: T.inkFaint }}>Regional Commercial Director — GCC Pharma</Mono>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CONNECT                                                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="connect" style={{
        padding: `100px ${gutter} 120px`,
        background: T.bgAlt,
        borderTop: `1px solid ${T.line}`,
        position: "relative",
      }}>
        {/* Neon circle accent */}
        <div style={{
          position: "absolute", bottom: 40, right: "8%",
          width: 180, height: 180, borderRadius: "50%",
          border: `1.5px solid ${T.neonDim}`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div className="grid-asym" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start",
          }}>
            <Reveal>
              <div>
                <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>Next Step</Mono>
                <h2 className="sect-title" style={{
                  fontFamily: F.serif,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 400, lineHeight: 1.25,
                  color: T.ink, marginBottom: 24,
                }}>
                  Is the market<br />choosing you?
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: T.inkMuted, marginBottom: 32 }}>
                  A 30-minute strategy conversation. No pitch. No pressure. We'll diagnose where preference is breaking down and whether this engagement makes sense for both of us.
                </p>
                {[
                  "Map your commercial preference gaps",
                  "Identify which force to address first",
                  "Determine if there's a genuine fit",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 14 }}>
                    <Mono style={{ color: T.inkFaint }}>0{i + 1}</Mono>
                    <span style={{ fontSize: 14, color: T.inkSoft }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              {sent ? (
                <div style={{
                  padding: 56, textAlign: "center",
                  border: `1px solid ${T.lineMed}`,
                  background: T.white,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: T.neon, margin: "0 auto 20px",
                  }} />
                  <div style={{ fontFamily: F.serif, fontSize: 26, color: T.ink, marginBottom: 10 }}>Received.</div>
                  <p style={{ fontSize: 14, color: T.inkMuted }}>I'll respond within 24 hours.</p>
                </div>
              ) : (
                <div style={{
                  padding: 36,
                  border: `1px solid ${T.lineMed}`,
                  background: T.white,
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {[
                      { key: "name", label: "Name", type: "text" },
                      { key: "email", label: "Work Email", type: "email" },
                      { key: "company", label: "Company & Role", type: "text" },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: "block", marginBottom: 6 }}>
                          <Mono>{f.label}</Mono>
                        </label>
                        <input
                          type={f.type} value={form[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          style={{
                            width: "100%", padding: "12px 14px",
                            background: T.bgAlt,
                            border: `1px solid ${T.line}`,
                            color: T.ink, fontSize: 15,
                            fontFamily: F.sans,
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", marginBottom: 6 }}>
                        <Mono>Biggest commercial challenge</Mono>
                      </label>
                      <textarea
                        value={form.challenge}
                        onChange={e => setForm({ ...form, challenge: e.target.value })}
                        rows={3}
                        style={{
                          width: "100%", padding: "12px 14px",
                          background: T.bgAlt,
                          border: `1px solid ${T.line}`,
                          color: T.ink, fontSize: 15,
                          fontFamily: F.sans, resize: "vertical",
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      style={{
                        padding: "14px 32px", width: "100%",
                        background: T.ink, color: T.bg,
                        border: "none", cursor: "pointer",
                        fontFamily: F.mono, fontSize: 11, fontWeight: 500,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={e => { e.target.style.background = T.neon; e.target.style.color = T.ink; }}
                      onMouseLeave={e => { e.target.style.background = T.ink; e.target.style.color = T.bg; }}
                    >
                      Request Strategy Conversation →
                    </button>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FOOTER                                                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <footer style={{
        padding: `48px ${gutter} 36px`,
        borderTop: `1px solid ${T.lineMed}`,
      }}>
        <div className="footer-grid" style={{
          maxWidth: maxW, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32,
          paddingBottom: 36,
          borderBottom: `1px solid ${T.line}`,
        }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink, marginBottom: 10 }}>
              Henry Rosas
            </div>
            <p style={{ fontSize: 13, color: T.inkMuted, lineHeight: 1.7 }}>
              Market Preference Engineering for pharma, FMCG, and B2B technology.
            </p>
          </div>
          <div>
            <Mono style={{ display: "block", marginBottom: 10, color: T.inkFaint }}>Connect</Mono>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <a href="mailto:henry@consumerhealth.me" className="neon-link" style={{ fontSize: 13, display: "inline-block", width: "fit-content" }}>henry@consumerhealth.me</a>
              <a href="https://linkedin.com" className="neon-link" style={{ fontSize: 13, display: "inline-block", width: "fit-content" }}>LinkedIn</a>
            </div>
          </div>
          <div>
            <Mono style={{ display: "block", marginBottom: 10, color: T.inkFaint }}>Territory</Mono>
            <p style={{ fontSize: 13, color: T.inkMuted }}>Dubai, UAE</p>
            <p style={{ fontSize: 13, color: T.inkFaint, marginTop: 2 }}>GCC · Levant · North Africa · East Africa · LATAM</p>
          </div>
        </div>
        <div style={{ maxWidth: maxW, margin: "0 auto", paddingTop: 24, textAlign: "center" }}>
          <Mono style={{ color: T.inkFaint, fontSize: 9 }}>
            © 2026 Henry Rosas · ConsumerHealth.me · Market Preference Engineering™
          </Mono>
        </div>
      </footer>
    </>
  );
}
