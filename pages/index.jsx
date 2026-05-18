import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getPublishedCaseStudies } from "../data/case-studies";

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

// ─── CONFIGURATION ────────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkoenzqw";
const LINKEDIN_URL = "https://www.linkedin.com/in/henry-rosas/";
const CONTACT_EMAIL = "henry.rosas@rosashenry.com";

// ─── DESIGN TOKENS ────────────────────────────────────────────
// Note: inkMuted and inkFaint darkened from original to meet WCAG AA contrast
// on the #E0E0D0 background.
const T = {
  bg:        "#E0E0D0",
  bgAlt:     "#F5F5EE",
  bgDark:    "#D4D4C4",
  ink:       "#1A1A1A",
  inkSoft:   "#333333",
  inkMuted:  "#4A4A40", // was #6B6B60 — darkened for WCAG AA
  inkFaint:  "#707064", // was #9E9E90 — darkened for WCAG AA
  neon:      "#DFFF00",
  neonDim:   "rgba(223,255,0,0.35)",
  neonGhost: "rgba(223,255,0,0.08)",
  line:      "rgba(26,26,26,0.08)",
  lineMed:   "rgba(26,26,26,0.14)",
  white:     "#FAFAF5",
  error:     "#B0271A",
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

// Counter — counts up from 0 to target when scrolled into view
// Accepts strings like "30+", "15+", "4", "50+" — strips suffix, animates number, re-appends suffix
function Counter({ value, duration = 1400 }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [ref, inView] = useInView(0.3);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return <span ref={ref} className="counter">{n}{suffix}</span>;
}

// CustomCursor — subtle dot follows mouse, grows on interactive hover
function CustomCursor() {
  const dotRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let cx = x, cy = y;

    const onMove = (e) => { x = e.clientX; y = e.clientY; dot.classList.remove("hidden"); };
    const onLeave = () => dot.classList.add("hidden");
    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [role='button'], input, textarea, label");
      if (interactive) dot.classList.add("hover");
      else dot.classList.remove("hover");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onOver);

    let raf;
    const tick = () => {
      // Lerp for smoothness
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot hidden" aria-hidden="true" />;
}

function track(name, props = {}) {
  if (typeof window !== "undefined" && window.posthog) window.posthog.capture(name, props);
}

// ─── VALIDATION ───────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Required";
  if (!form.email.trim()) errors.email = "Required";
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = "Enter a valid email";
  if (!form.company.trim()) errors.company = "Required";
  return errors;
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function MarketPreferencePage() {
  const { y: scrollY, progress: scrollProgress } = useScroll();
  const [form, setForm] = useState({ name: "", email: "", company: "", challenge: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);
  const [activePillar, setActivePillar] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const v = validateForm(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    track("strategy_call_requested", { company: form.company });

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          challenge: form.challenge,
          _subject: `New strategy conversation request — ${form.name} (${form.company})`,
        }),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setSent(true);
    } catch (err) {
      setSubmitError("Something went wrong. Please email henry.rosas@rosashenry.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { setTimeout(() => setReady(true), 150); }, []);

  const gutter = "clamp(24px, 5vw, 64px)";
  const maxW = 1240;

  // Nav items — supports both same-page anchors (href: "#…") and routes (href: "/…")
  const navItems = [
    { label: "Thesis", href: "#thesis" },
    { label: "Engagements", href: "#work" },
    { label: "Case Studies", href: "/work" },
    { label: "Connect", href: "#connect" },
  ];

  const pillars = [
    { id: "rel", n: "01", title: "Relevance", q: "Why do businesses become invisible?", body: "Markets don't punish bad companies. They ignore irrelevant ones. Relevance is the prerequisite for every other commercial metric — and it decays faster than most leaders realize." },
    { id: "tru", n: "02", title: "Trust", q: "Why do customers hesitate to buy?", body: "Price is rarely the real barrier. Trust is. It's built through consistency between what you promise, what you deliver, and what others say when you're not in the room." },
    { id: "exp", n: "03", title: "Commercial Experience", q: "Why does CX impact revenue more than campaigns?", body: "Every interaction is a commercial event. The pharmacy counter. The onboarding call. The invoice design. Companies that treat experience as a revenue driver outperform those that treat it as a department." },
    { id: "cla", n: "04", title: "Strategic Clarity", q: "Why do confused brands lose market share?", body: "When a company can't articulate why it exists in one sentence, the market can't either. Clarity is not simplification — it's the discipline of knowing what you are and what you're not." },
    { id: "pre", n: "05", title: "Market Preference", q: "Why do customers choose competitors with inferior products?", body: "Because being chosen is not a function of being better. It's a function of being understood, trusted, and top-of-mind at the moment of decision. That's engineerable." },
  ];

  const formFields = [
    { key: "name", label: "Name", type: "text", autoComplete: "name" },
    { key: "email", label: "Work Email", type: "email", autoComplete: "email" },
    { key: "company", label: "Company & Role", type: "text", autoComplete: "organization" },
  ];

  return (
    <>
      {/* Global styles live in /styles/globals.css (imported in _app.jsx).
          This avoids React hydration mismatches caused by inline <style> blocks. */}

      {/* ─── CUSTOM CURSOR ────────────────────────────────── */}
      <CustomCursor />

      {/* ─── ARCHITECTURAL GRID TEXTURE (fixed background) ─── */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.022,
        backgroundImage: `
          linear-gradient(${T.ink} 1px, transparent 1px),
          linear-gradient(90deg, ${T.ink} 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* ─── NEON SCROLL ACCENT ────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, zIndex: 200,
        height: 3,
        width: `${scrollProgress * 100}%`,
        background: T.neon,
        transition: "width 0.08s linear",
      }} />

      {/* ═══════ NAV ═══════ */}
      <nav aria-label="Primary" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${gutter}`,
        background: scrollY > 40 ? "rgba(224,224,208,0.92)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrollY > 40 ? "blur(16px)" : "none",
        borderBottom: scrollY > 40 ? `1px solid ${T.line}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
          <a href="#top" style={{
            fontFamily: F.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.ink, textDecoration: "none",
          }}>Henry Rosas</a>
          <div className="nav-items" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navItems.map(n => {
              const isRoute = n.href.startsWith("/");
              const Tag = isRoute ? Link : "a";
              return (
                <Tag key={n.label} href={n.href} style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 400,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: T.inkMuted, textDecoration: "none", transition: "color 0.25s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = T.ink}
                  onMouseLeave={e => e.currentTarget.style.color = T.inkMuted}
                >{n.label}</Tag>
              );
            })}
            <a href="#connect" onClick={() => track("nav_cta")} style={{
              fontFamily: F.mono, fontSize: 10, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: T.ink, textDecoration: "none",
              padding: "7px 18px",
              border: `1.5px solid ${T.ink}`,
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = T.neon; e.currentTarget.style.borderColor = T.neon; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.ink; }}
            >Let's Talk</a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ═══════ MOBILE MENU OVERLAY ═══════ */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: T.bg,
          padding: "100px 32px 40px",
          display: "flex", flexDirection: "column", gap: 8,
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? "visible" : "hidden",
          transition: "opacity 0.35s ease, visibility 0.35s ease",
        }}
      >
        {navItems.map((n, i) => (
          <a
            key={n.label}
            href={n.href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontFamily: F.serif, fontSize: 32, fontWeight: 400,
              color: T.ink, textDecoration: "none",
              padding: "14px 0",
              borderBottom: `1px solid ${T.line}`,
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileMenuOpen ? 1 : 0,
              transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`,
            }}
          >{n.label}</a>
        ))}
        <a
          href="#connect"
          onClick={() => { setMobileMenuOpen(false); track("mobile_nav_cta"); }}
          style={{
            marginTop: 24,
            fontFamily: F.mono, fontSize: 12, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: T.ink, background: T.neon,
            padding: "16px 32px", textDecoration: "none",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileMenuOpen ? 1 : 0,
            transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + navItems.length * 0.05}s`,
          }}
        >Book a Strategy Conversation →</a>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO                                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <header id="top" style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: `140px ${gutter} 100px`,
        position: "relative", overflow: "hidden",
      }}>
        {/* ─ Hero video background (optional) ────────────────── */}
        {/* Drop a looping MP4 at /public/hero-loop.mp4 to enable.
            Falls back silently when no video file exists. */}
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          >
            <source src="/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ─ Neon geometric accent: circle ─ */}
        <div aria-hidden="true" style={{
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
        <div aria-hidden="true" style={{
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
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "clamp(220px, 25%, 340px)",
          width: 1, height: "100%",
          background: T.line,
          pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
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
            <div aria-hidden="true" style={{ width: 6, height: 6, background: T.neon, borderRadius: "50%", flexShrink: 0 }} />
            <Mono style={{ color: T.inkFaint }}>Market Preference Engineering</Mono>
          </div>

          {/* ─ HEADLINE (single H1 for SEO) ─ */}
          <h1 className="hero-title" style={{
            fontFamily: F.serif,
            fontSize: "clamp(44px, 7vw, 96px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: T.ink,
            maxWidth: 840,
            marginBottom: 52,
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(28px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}>
            <span style={{ display: "block" }}>Your brand is not</span>
            <span style={{ display: "block", marginBottom: 4 }}>what you say.</span>
            <span style={{ display: "block", fontStyle: "italic" }}>It's what the market</span>
            <span style={{ display: "block", fontStyle: "italic" }}>
              is willing to{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                choose.
                <span aria-hidden="true" style={{
                  position: "absolute", bottom: 4, left: 0, right: 0, height: 4,
                  background: T.neon,
                  transform: ready ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s",
                }} />
              </span>
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
              onMouseEnter={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.color = T.neon; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.neon; e.currentTarget.style.color = T.ink; }}
            >
              Book a Strategy Conversation <span style={{ fontSize: 14 }} aria-hidden="true">→</span>
            </a>
            <a href="#thesis" style={{
              fontFamily: F.mono, fontSize: 11, fontWeight: 400,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: T.inkFaint, textDecoration: "none", transition: "color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = T.ink}
              onMouseLeave={e => e.currentTarget.style.color = T.inkFaint}
            >Read the thesis <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* THESIS                                                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="thesis" aria-labelledby="thesis-heading" style={{
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
                <h2 id="thesis-heading">
                  <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>Core Thesis</Mono>
                </h2>
                <div aria-hidden="true" style={{ width: 36, height: 2, background: T.neon }} />
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
                    <span aria-hidden="true" style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: T.neonDim }} />
                  </span>,{" "}
                  trusts them{" "}
                  <span style={{ position: "relative", display: "inline" }}>
                    <em>deeper</em>
                    <span aria-hidden="true" style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: T.neonDim }} />
                  </span>,{" "}
                  and remembers them{" "}
                  <span style={{ position: "relative", display: "inline" }}>
                    <em>longer</em>
                    <span aria-hidden="true" style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: T.neonDim }} />
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
                <blockquote style={{
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
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TERRITORY — Five Pillars                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="territory" aria-labelledby="territory-heading" style={{ padding: `100px ${gutter} 120px` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>Intellectual Territory</Mono>
              <h2 id="territory-heading" className="sect-title" style={{
                fontFamily: F.serif,
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 400, lineHeight: 1.2,
                color: T.ink, maxWidth: 560,
              }}>
                Five forces that determine whether{" "}
                <span style={{ position: "relative", display: "inline" }}>
                  a market chooses you
                  <span aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.neonDim }} />
                </span>
              </h2>
            </div>
          </Reveal>

          <div style={{ borderTop: `1px solid ${T.lineMed}` }}>
            {pillars.map((p, i) => {
              const expanded = activePillar === p.id;
              const panelId = `pillar-panel-${p.id}`;
              return (
                <Reveal key={p.id} delay={i * 0.05}>
                  <button
                    type="button"
                    className="pillar-row"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => { setActivePillar(expanded ? null : p.id); track("pillar_click", { pillar: p.title }); }}
                    style={{
                      padding: expanded ? "28px 16px 32px" : "24px 16px",
                      display: "block",
                    }}
                  >
                    <div className="pillar-inner" style={{
                      display: "flex", alignItems: "baseline", gap: 36,
                    }}>
                      <Mono style={{ color: T.inkFaint, minWidth: 24, flexShrink: 0 }}>{p.n}</Mono>

                      <span style={{
                        fontFamily: F.serif, fontSize: 26, fontWeight: 500,
                        color: expanded ? T.ink : T.inkSoft,
                        transition: "color 0.3s",
                        minWidth: 220, flexShrink: 0,
                      }}>{p.title}</span>

                      <span className="pillar-q" style={{
                        fontFamily: F.sans, fontSize: 14, fontStyle: "italic", fontWeight: 300,
                        color: T.inkFaint, flex: 1,
                      }}>{p.q}</span>

                      <span aria-hidden="true" style={{
                        fontFamily: F.sans, fontSize: 20, fontWeight: 200,
                        color: T.inkFaint,
                        transform: expanded ? "rotate(45deg)" : "rotate(0)",
                        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                        flexShrink: 0,
                      }}>+</span>
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-label={`${p.title} detail`}
                      style={{
                        maxHeight: expanded ? 240 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      <p className="pillar-body-pad" style={{
                        fontSize: 15, lineHeight: 1.8, color: T.inkMuted,
                        maxWidth: 560, paddingTop: 16, paddingLeft: 60,
                      }}>{p.body}</p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* THE WORK                                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="work" aria-labelledby="work-heading" style={{
        padding: `100px ${gutter} 120px`,
        background: T.bgAlt,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
        position: "relative",
      }}>
        <div aria-hidden="true" style={{
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
                <h2 id="work-heading" className="sect-title" style={{
                  fontFamily: F.serif,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 400, lineHeight: 1.25,
                  color: T.ink, marginBottom: 28,
                }}>
                  I embed as your commercial strategy partner — not your vendor.
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: T.inkMuted, marginBottom: 16 }}>
                  30 years across Johnson & Johnson, Unilever, Mundipharma, and Strategy Tools. 15+ markets across GCC, MEA, and LATAM. The work is always the same: make the market choose you.
                </p>
                {/* Portrait slot — drop a photo at /public/henry-portrait.jpg to populate */}
                <div className="portrait-wrap" style={{ marginTop: 28, maxWidth: 360 }}>
                  <img
                    src="/henry-portrait.jpg"
                    alt="Henry Rosas, Market Preference Engineering"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="portrait-placeholder">Portrait — add henry-portrait.jpg</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <ul style={{ listStyle: "none" }}>
                {[
                  { label: "Fractional CMO", desc: "Embedded senior leadership. 2–3 days per week. I own outcomes, not reports." },
                  { label: "Commercial Strategy", desc: "Positioning, GTM architecture, and market-entry frameworks built for regional complexity." },
                  { label: "Brand as Commercial Asset", desc: "Strategy that connects brand to revenue — not brand to aesthetics." },
                  { label: "Capability Building", desc: "KAM training, commercial playbooks, and team development that transfers knowledge permanently." },
                  { label: "Omnichannel & Digital", desc: "HCP engagement, content ecosystems, and digital transformation for regulated industries." },
                ].map((s, i) => (
                  <li key={i} style={{
                    padding: "22px 0",
                    borderBottom: `1px solid ${T.line}`,
                  }}>
                    <div style={{
                      fontFamily: F.sans, fontSize: 14, fontWeight: 600,
                      color: T.ink, marginBottom: 5, letterSpacing: "0.01em",
                    }}>{s.label}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: T.inkMuted }}>{s.desc}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* BRAND MARQUEE                                            */}
      {/* ═══════════════════════════════════════════════════════ */}
      {/* Logo files go in /public/logos/. If a file is missing the chip
          falls back to the brand name in editorial mono — works either way. */}
      <section aria-label="Companies Henry has worked with" style={{
        padding: `48px 0`,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
        background: T.bg,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto 28px", padding: `0 ${gutter}` }}>
          <Mono style={{ color: T.inkFaint }}>Shaped commercial work at</Mono>
        </div>
        <div className="marquee">
          {/* Duplicate the list so the scroll loops seamlessly */}
          {[0, 1].map(set => (
            <div key={set} className="marquee-track" aria-hidden={set === 1 ? "true" : undefined}>
              {[
                { name: "Johnson & Johnson", logo: "/logos/jj.svg" },
                { name: "Unilever", logo: "/logos/unilever.svg" },
                { name: "Mundipharma", logo: "/logos/mundipharma.svg" },
                { name: "Strategy Tools", logo: "/logos/strategy-tools.svg" },
                { name: "FacePhi", logo: "/logos/facephi.svg" },
              ].map((b, i) => (
                <div key={i} className="brand-chip">
                  {/* Image is hidden by default; only revealed if the file loads.
                      Text is shown by default. No flash of broken-image icon. */}
                  <img
                    src={b.logo}
                    alt=""
                    style={{ display: "none" }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                      const fallback = e.currentTarget.nextSibling;
                      if (fallback) fallback.style.display = "none";
                    }}
                  />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SELECTED WORK (teaser linking to /work)                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section aria-labelledby="selected-work-heading" style={{ padding: `100px ${gutter} 120px` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
              <div>
                <Mono style={{ color: T.inkFaint, display: "block", marginBottom: 14 }}>Selected Work</Mono>
                <h2 id="selected-work-heading" className="sect-title" style={{
                  fontFamily: F.serif,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 400, lineHeight: 1.2,
                  color: T.ink, maxWidth: 560,
                }}>
                  Engagements where the market <em>chose</em>.
                </h2>
              </div>
              <Link href="/work" style={{
                fontFamily: F.mono, fontSize: 11, fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: T.ink, textDecoration: "none",
                padding: "12px 24px",
                border: `1.5px solid ${T.ink}`,
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = T.neon; e.currentTarget.style.borderColor = T.neon; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.ink; }}
              >See all case studies →</Link>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}>
            {getPublishedCaseStudies().slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.07}>
                <Link href={`/work/${c.slug}`} style={{
                  display: "block",
                  background: T.white,
                  border: `1px solid ${T.lineMed}`,
                  textDecoration: "none",
                  color: "inherit",
                  height: "100%",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.boxShadow = `0 12px 30px rgba(26,26,26,0.08)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = T.lineMed; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{
                    aspectRatio: "16 / 10",
                    background: `linear-gradient(135deg, ${T.bgAlt}, ${T.bgDark})`,
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                      <div style={{ fontFamily: F.serif, fontSize: 44, fontWeight: 400, lineHeight: 1, color: T.ink }}>{c.headlineStat}</div>
                      <Mono style={{ color: T.inkMuted, marginTop: 6, display: "block" }}>{c.headlineLabel}</Mono>
                    </div>
                  </div>
                  <div style={{ padding: 22 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                      <Mono style={{ color: T.inkFaint }}>{c.industry}</Mono>
                      <Mono style={{ color: T.inkFaint }}>·</Mono>
                      <Mono style={{ color: T.inkFaint }}>{c.region}</Mono>
                    </div>
                    <h3 style={{
                      fontFamily: F.serif, fontSize: 20, fontWeight: 500,
                      lineHeight: 1.3, color: T.ink, marginBottom: 10,
                    }}>{c.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: T.inkMuted }}>{c.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATS                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section aria-label="Career statistics" style={{ padding: `72px ${gutter}`, borderBottom: `1px solid ${T.line}` }}>
        <dl className="stats-row" style={{
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
                <dt style={{
                  fontFamily: F.serif, fontSize: 52, fontWeight: 400,
                  color: T.ink, lineHeight: 1,
                }}><Counter value={s.n} /></dt>
                <dd>
                  <Mono style={{ color: T.inkFaint, marginTop: 8, display: "block" }}>{s.l}</Mono>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TESTIMONIAL                                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section aria-label="Client testimonial" style={{ padding: `96px ${gutter}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div aria-hidden="true" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: "50%",
              background: T.neon, marginBottom: 28,
            }}>
              <span style={{ fontFamily: F.serif, fontSize: 28, color: T.ink, lineHeight: 1 }}>"</span>
            </div>
            <blockquote>
              <p style={{
                fontFamily: F.serif,
                fontSize: 22, fontWeight: 400, fontStyle: "italic",
                lineHeight: 1.6, color: T.ink, marginBottom: 24,
              }}>
                Henry doesn't advise from a distance — he builds the systems, trains the teams, and stays until the market responds. Two years later, the frameworks are still running.
              </p>
              <footer>
                <Mono style={{ color: T.inkFaint }}>Regional Commercial Director — GCC Pharma</Mono>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CONNECT                                                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="connect" aria-labelledby="connect-heading" style={{
        padding: `100px ${gutter} 120px`,
        background: T.bgAlt,
        borderTop: `1px solid ${T.line}`,
        position: "relative",
      }}>
        <div aria-hidden="true" style={{
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
                <h2 id="connect-heading" className="sect-title" style={{
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
                <ol style={{ listStyle: "none" }}>
                  {[
                    "Map your commercial preference gaps",
                    "Identify which force to address first",
                    "Determine if there's a genuine fit",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 14 }}>
                      <Mono style={{ color: T.inkFaint }}>0{i + 1}</Mono>
                      <span style={{ fontSize: 14, color: T.inkSoft }}>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              {sent ? (
                <div role="status" aria-live="polite" style={{
                  padding: 56, textAlign: "center",
                  border: `1px solid ${T.lineMed}`,
                  background: T.white,
                }}>
                  <div aria-hidden="true" style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: T.neon, margin: "0 auto 20px",
                  }} />
                  <div style={{ fontFamily: F.serif, fontSize: 26, color: T.ink, marginBottom: 10 }}>Received.</div>
                  <p style={{ fontSize: 14, color: T.inkMuted }}>I'll respond within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    padding: 36,
                    border: `1px solid ${T.lineMed}`,
                    background: T.white,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {formFields.map(f => {
                      const fieldId = `field-${f.key}`;
                      const errId = `${fieldId}-error`;
                      const hasErr = !!errors[f.key];
                      return (
                        <div key={f.key}>
                          <label htmlFor={fieldId} style={{ display: "block", marginBottom: 6 }}>
                            <Mono>{f.label}</Mono>
                          </label>
                          <input
                            id={fieldId}
                            name={f.key}
                            type={f.type}
                            autoComplete={f.autoComplete}
                            value={form[f.key]}
                            onChange={e => { setForm({ ...form, [f.key]: e.target.value }); if (errors[f.key]) setErrors({ ...errors, [f.key]: undefined }); }}
                            aria-invalid={hasErr}
                            aria-describedby={hasErr ? errId : undefined}
                            required
                            style={{
                              width: "100%", padding: "12px 14px",
                              background: T.bgAlt,
                              border: `1px solid ${hasErr ? T.error : T.line}`,
                              color: T.ink, fontSize: 15,
                              fontFamily: F.sans,
                            }}
                          />
                          {hasErr && (
                            <div id={errId} role="alert" style={{
                              fontFamily: F.mono, fontSize: 10, letterSpacing: "0.1em",
                              textTransform: "uppercase", color: T.error, marginTop: 6,
                            }}>{errors[f.key]}</div>
                          )}
                        </div>
                      );
                    })}
                    <div>
                      <label htmlFor="field-challenge" style={{ display: "block", marginBottom: 6 }}>
                        <Mono>Biggest commercial challenge</Mono>
                      </label>
                      <textarea
                        id="field-challenge"
                        name="challenge"
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

                    {submitError && (
                      <div role="alert" style={{
                        fontFamily: F.mono, fontSize: 11, letterSpacing: "0.1em",
                        color: T.error, padding: "10px 12px",
                        border: `1px solid ${T.error}`, background: "rgba(176,39,26,0.04)",
                      }}>{submitError}</div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: "14px 32px", width: "100%",
                        background: submitting ? T.inkMuted : T.ink,
                        color: T.bg,
                        border: "none", cursor: submitting ? "wait" : "pointer",
                        fontFamily: F.mono, fontSize: 11, fontWeight: 500,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = T.neon; e.currentTarget.style.color = T.ink; } }}
                      onMouseLeave={e => { if (!submitting) { e.currentTarget.style.background = T.ink; e.currentTarget.style.color = T.bg; } }}
                    >
                      {submitting ? "Sending…" : "Request Strategy Conversation →"}
                    </button>
                  </div>
                </form>
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
              <a href={`mailto:${CONTACT_EMAIL}`} className="neon-link" style={{ fontSize: 13, display: "inline-block", width: "fit-content" }}>{CONTACT_EMAIL}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="neon-link" style={{ fontSize: 13, display: "inline-block", width: "fit-content" }}>LinkedIn</a>
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
            © {new Date().getFullYear()} Henry Rosas · ConsumerHealth.me · Market Preference Engineering™
          </Mono>
        </div>
      </footer>
    </>
  );
}
