/**
 * kremalderma.com'un ürettiği marketplace-links.json'u siteye taşır.
 *
 *   npm run marketplace                       # ../kremal/storage/app/marketplace-links.json
 *   npm run marketplace -- /yol/dosya.json    # başka kaynak
 *
 * Kaynak dosya kremal tarafında pazaryeri API'lerinden üretilir (Trendyol
 * content_id, Hepsiburada hb_sku). Burada yalnız SKU → { slug, trendyol,
 * hepsiburada } özeti çıkarılır; pasif listeler atılır. Çıktı:
 * src/data/marketplaceLinks.js (retailers.js bunu okur) — ELLE DÜZENLEME.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, process.argv[2] || "../kremal/storage/app/marketplace-links.json");
const target = resolve(root, "src/data/marketplaceLinks.js");

const raw = JSON.parse(readFileSync(source, "utf8"));

const links = {};
for (const p of raw.products) {
  const entry = { slug: p.slug };
  if (p.trendyol?.active && p.trendyol.url) entry.trendyol = p.trendyol.url;
  if (p.hepsiburada?.active && p.hepsiburada.url) entry.hepsiburada = p.hepsiburada.url;
  links[p.sku] = entry;
}

const header = [
  "// OTOMATİK ÜRETİLDİ — `npm run marketplace` (scripts/sync-marketplace-links.mjs). ELLE DÜZENLEME.",
  `// Kaynak: kremalderma.com marketplace-links.json, ${raw.generated_at}.`,
  "// SKU → { slug (kremalderma.com/urun/<slug>), trendyol?, hepsiburada? }; pasif listeler alınmaz.",
  "",
].join("\n");
writeFileSync(target, `${header}export const MARKETPLACE_LINKS = ${JSON.stringify(links, null, 2)};\n`);

const n = Object.keys(links).length;
const ty = Object.values(links).filter((l) => l.trendyol).length;
const hb = Object.values(links).filter((l) => l.hepsiburada).length;
console.log(`marketplaceLinks.js: ${n} SKU (trendyol ${ty}, hepsiburada ${hb}) ← ${source}`);
