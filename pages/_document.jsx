import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ─── Primary Meta ─────────────────────────────────── */}
        <meta charSet="utf-8" />
        <meta name="description" content="Henry Rosas — Market Preference Engineering for Healthcare, Consumer Goods, DIV, and B2B technology. Fractional CMO and commercial strategy partner across GCC, MEA, and LATAM." />
        <meta name="keywords" content="market preference, fractional CMO, commercial strategy, brand strategy, pharma marketing, GCC, MEA, LATAM, Henry Rosas" />
        <meta name="author" content="Henry Rosas" />
        <meta name="robots" content="index, follow" />

        {/* ─── Open Graph ───────────────────────────────────── */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Henry Rosas — Market Preference Engineering" />
        <meta property="og:description" content="Your brand is not what you say. It's what the market is willing to choose. Strategic commercial advisory across pharma, FMCG, and B2B technology." />
        <meta property="og:site_name" content="Henry Rosas" />
        <meta property="og:locale" content="en_US" />
        {/* TODO: Add og:image (1200x630 px) and og:url once deployed */}
        {/* <meta property="og:url" content="https://consumerhealth.me" /> */}
        {/* <meta property="og:image" content="https://consumerhealth.me/og-image.png" /> */}

        {/* ─── Twitter Card ─────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Henry Rosas — Market Preference Engineering" />
        <meta name="twitter:description" content="Your brand is not what you say. It's what the market is willing to choose." />

        {/* ─── Theme & Favicon ──────────────────────────────── */}
        <meta name="theme-color" content="#E0E0D0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ─── Font Preconnect (faster Google Fonts load) ───── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Outfit:wght@200;300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
