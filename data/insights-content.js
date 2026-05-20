import fs from "fs";
import path from "path";

/* ───────────────────────────────────────────────────────────────
 * INSIGHTS — markdown file reader (SERVER-ONLY)
 * ───────────────────────────────────────────────────────────────
 * This module uses Node's `fs` and must ONLY be imported inside
 * getStaticProps / getStaticPaths (never in a client component).
 * Article metadata lives in data/insights.js (safe to import anywhere).
 * ─────────────────────────────────────────────────────────────── */

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

// Reads the raw markdown body for an article. Strips the leading H1
// (the title is rendered separately in the page header).
export function getArticleMarkdown(slug) {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return raw.replace(/^#\s+.*(\r?\n)+/, "");
}
