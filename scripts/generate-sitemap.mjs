import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "../src/data/products.js";
import { blogPosts } from "../src/data/blogPosts.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://dermalissa.com";
const LANGS = ["tr", "en", "de", "fr", "es", "it", "pt", "ru", "ar"];
const TODAY = new Date().toISOString().split("T")[0];

function urlBlock(path, lastmod, changefreq, priority) {
  const alts = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${path}" />`
  ).join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/tr${path}" />`;
  return LANGS.map(
    (l) => `  <url>
    <loc>${BASE_URL}/${l}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alts}
${xDefault}
  </url>`
  ).join("\n");
}

const entries = [];
entries.push(urlBlock("", TODAY, "weekly", "1.0"));
entries.push(urlBlock("/blog", TODAY, "weekly", "0.8"));
entries.push(urlBlock("/contact", TODAY, "yearly", "0.5"));
for (const p of products) entries.push(urlBlock(`/${p.slug}`, TODAY, "monthly", "0.9"));
for (const post of blogPosts) entries.push(urlBlock(`/blog/${post.slug}`, post.date || TODAY, "monthly", "0.7"));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

writeFileSync(resolve(__dirname, "../public/sitemap.xml"), xml);
const pathCount = 3 + products.length + blogPosts.length;
console.log(`✓ sitemap.xml written: ${pathCount} paths × ${LANGS.length} languages = ${pathCount * LANGS.length} URLs`);
