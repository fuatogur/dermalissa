/**
 * Ürün → mağaza SKU eşlemesi ("Satın Al" köprüsü).
 *
 * Mağaza tarafı (kremalderma.com) `/git/{sku}` yoluyla SKU'dan ürünün
 * GÜNCEL detay sayfasına kendisi yönlendirir — burada URL tutulmaz, yalnız
 * değişmeyen SKU tutulur. Mağazada slug/isim değişse de bu dosya eskimez;
 * SKU'su olmayan sayfalarda modal mevcut kategori linkine düşer.
 */
export const SHOP_SKUS = {
  "revitalizing-oil": "152.DRM.0002",
  "brightening-cream": "152.DRM.0003",
  "retinol-night-cream": "152.DRM.0007",
  "antioxidant-vitamin-c-cream": "152.DRM.0006",
  "ultra-hydrating-cream": "152.DRM.0008",
  "cream-for-acne-prone-skin": "152.DRM.0005",
  "anti-wrinkle-cream": "152.DRM.0004",
  "eye-contour-repair-cream": "152.DRM.0001",
  "hair-growth-stimulator": "152.DRM.0009",
};

/** Slug'dan SKU; ürün değilse (blog, contact, ana sayfa…) null. */
export function getShopSku(slug) {
  return SHOP_SKUS[slug] || null;
}
