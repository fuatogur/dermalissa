# Dermalissa — SEO Fix Notları (elvons reçetesinin aynısı)

> Tarayıcı tarafında Search Console + canlı site denetiminden çıktı.
> Terminaldeki Claude'un uygulaması için. Production branch: **main**.
> Stack: Vite + React SPA (yenidermalissa), canlıda apex → www yönlendiriyor.

## Teşhis (elvons'takiyle birebir aynı)
- Canlı: `dermalissa.com` → **308 → www.dermalissa.com** (www servis ediliyor)
- Ama kod/sitemap/robots **www'suz** → Search Console'da **25 "yönlendirilmiş sayfa"** bundan
- Sitemap Search Console'da **bayat** (son okuma Ekim 2025, ~10 ay)
- `<title>` sadece **"Dermalissa"** — zayıf, anahtar kelime yok

## 1) www birleştirme — tüm `https://dermalissa.com` → `https://www.dermalissa.com`
Değişecek yerler (6 nokta + sitemap):
- `src/hooks/useSeo.js:6` → `const BASE_URL = "https://www.dermalissa.com";`
- `scripts/generate-sitemap.mjs:8` → `const BASE_URL = "https://www.dermalissa.com";`
- `src/components/BlogDetail.jsx:6` → BASE_URL www
- `src/components/Contact.jsx:139` ve `:143` → www
- `public/robots.txt` → `Sitemap: https://www.dermalissa.com/sitemap.xml`
- Sonra **sitemap'i yeniden üret** (`npm run sitemap` veya build prebuild) → `public/sitemap.xml` içindeki 198 URL www olacak
- Teyit: `grep -rniE "https://dermalissa\.com" src scripts public index.html` → **boş çıkmalı** (www'suz kalmasın)

## 2) Title (anahtar kelime)
`index.html` `<title>Dermalissa</title>` ve runtime SEO (useSeo) title'ı zenginleştir:
- Örn: `Dermalissa — Doğal Cilt Bakımı` (dermalissa'nın gerçek kategorisine göre: dermokozmetik / cilt bakımı — Yusuf'a doğrula)
- 9 dilli ise `strings`'ten çekilmeli.

## 3) On-page (elvons'taki checklist)
- Home + ürün/kategori liste sayfalarında **tek H1** var mı? Yoksa **sr-only H1** ekle (görünür yazı ekleyemiyorsan).
- Ürün detay h1 = ürün adı olmalı (elvons'ta öyleydi).
- Ürün liste görsellerinde `alt` = ürün adı (boş `alt=""` bırakma).
- Organization yapısal verisine `description` + net kategori (bebek/temizlik DEĞİL, gerçek kategori).
- ❌ meta keywords, ❌ ürünlere fiyat/offers/aggregateRating ekleme.

## 4) Deploy sonrası (tarayıcı Claude yapar)
- www fix canlıya çıkınca **Search Console'da sitemap yeniden gönderilecek** (bayat, tazelenmeli) + ana sayfaya indeksleme isteği.
- Bunu yomapazar hesabından yapabiliyorum, deploy olunca haber ver.

## Referans
- Aynı işi elvons'ta yaptık; detay: elvons projesindeki `SEO-NOTLARI.md`.
