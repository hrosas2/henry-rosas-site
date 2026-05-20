import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// SiteHeader — shared header for interior pages, matching the
// homepage nav (mono wordmark, mono uppercase links, full link
// set, "Let's Talk" CTA). variant: "light" (cream pages) or
// "dark" (the AI Commercial page). active: key of the current page.
// ─────────────────────────────────────────────────────────────

const MONO = "'IBM Plex Mono', 'Courier New', monospace";
const NEON = "#DFFF00";

const LINKS = [
  { key: "thesis", label: "Thesis", href: "/#thesis" },
  { key: "services", label: "Services", href: "/services" },
  { key: "ai-commercial", label: "AI Commercial", href: "/ai-commercial" },
  { key: "engagements", label: "Engagements", href: "/#work" },
  { key: "work", label: "Case Studies", href: "/work" },
  { key: "insights", label: "Insights", href: "/insights" },
  { key: "connect", label: "Connect", href: "/#connect" },
];

const THEMES = {
  light: {
    bg: "rgba(224,224,208,0.9)",
    ink: "#1A1A1A",
    link: "#4A4A40",
    linkHover: "#1A1A1A",
    active: "#1A1A1A",
    border: "1px solid rgba(26,26,26,0.10)",
    ctaText: "#1A1A1A",
    ctaBorder: "#1A1A1A",
  },
  dark: {
    bg: "rgba(20,20,18,0.85)",
    ink: "#E0E0D0",
    link: "rgba(224,224,208,0.6)",
    linkHover: "#E0E0D0",
    active: NEON,
    border: "1px solid rgba(224,224,208,0.12)",
    ctaText: "#E0E0D0",
    ctaBorder: "rgba(224,224,208,0.5)",
  },
};

export default function SiteHeader({ variant = "light", active = "" }) {
  const t = THEMES[variant] || THEMES.light;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: "@media (max-width:760px){.site-header-links{display:none!important}}" }} />
      <nav aria-label="Primary" className="site-header" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "block", padding: "0 48px", background: t.bg,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: t.border,
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
          <Link href="/" style={{
            fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em",
            textTransform: "uppercase", color: t.ink, textDecoration: "none",
          }}>Henry Rosas</Link>

          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <div className="site-header-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {LINKS.map((n) => {
                const isActive = active === n.key;
                return (
                  <Link key={n.key} href={n.href} style={{
                    fontFamily: MONO, fontSize: 10, fontWeight: 400, letterSpacing: "0.12em",
                    textTransform: "uppercase", textDecoration: "none",
                    color: isActive ? t.active : t.link, transition: "color 0.25s",
                  }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = t.linkHover; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = t.link; }}
                  >{n.label}</Link>
                );
              })}
            </div>

            <Link href="/#connect" style={{
              fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", color: t.ctaText, textDecoration: "none",
              padding: "8px 18px", background: "transparent",
              border: `1.5px solid ${t.ctaBorder}`, transition: "all 0.25s", whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = NEON; e.currentTarget.style.borderColor = NEON; e.currentTarget.style.color = "#1A1A1A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = t.ctaBorder; e.currentTarget.style.color = t.ctaText; }}
            >Let&apos;s Talk</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
