import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

// ─── Google Analytics 4 ───────────────────────────────────────
// Property: consumerhealth.me (created 2026-05-19)
const GA_MEASUREMENT_ID = "G-S9WVPT1S01";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Fire a page_view to GA4 on every client-side route change.
  // (The initial page view is fired automatically by gtag.js below.)
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const handleRouteChange = (url) => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Page title can be overridden per-page via Head in the page itself */}
        <title>Henry Rosas — Market Preference Engineering</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      {/* ─── Google Analytics 4 (gtag.js) ────────────────────── */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
