/**
 * Ürün → SES Kimya SKU eşlemesi ("Satın Al" linkleri).
 *
 * SKU, `marketplaceLinks.js`'deki (kremalderma.com'dan gelen) satırı
 * seçer; oradan Kremalderma slug'ı + Trendyol/Hepsiburada ürün URL'leri
 * okunur. Burada URL tutulmaz, yalnız değişmeyen SKU tutulur.
 *
 * JSON'da karşılığı olmayan SKU modalda mağaza vitrinine düşer
 * (pazaryeri satırları gizlenir).
 */
export const SHOP_SKUS = {
  "eye-contour-repair-cream": "152.DRM.0001",
  "revitalizing-oil": "152.DRM.0002",
  "brightening-cream": "152.DRM.0003",
  "anti-wrinkle-cream": "152.DRM.0004",
  "cream-for-acne-prone-skin": "152.DRM.0005",
  "antioxidant-vitamin-c-cream": "152.DRM.0006",
  "retinol-night-cream": "152.DRM.0007",
  "ultra-hydrating-cream": "152.DRM.0008",
  "hair-growth-stimulator": "152.DRM.0009",
};

/** Slug'dan SKU; ürün değilse (blog, contact, ana sayfa…) null. */
export function getShopSku(slug) {
  return SHOP_SKUS[slug] || null;
}
