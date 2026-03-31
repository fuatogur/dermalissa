# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

No test framework is configured.

## Tech Stack

- **React 19** + **React Router DOM 7** (SPA, BrowserRouter)
- **Vite 7** for bundling
- **Vercel** for deployment (vercel.json rewrites all routes to index.html)
- No state management library, no i18n library, no CSS framework

## Architecture

### URL-Based i18n

All routes are prefixed with a language code:

```
/               → redirects to /tr
/:lang          → home
/:lang/:slug    → product detail
/:lang/blog     → blog listing
/:lang/blog/:slug → blog post
/:lang/contact  → contact page
```

Supported languages: `tr` (default), `en`, `de`, `fr`, `es`, `it`, `pt`, `ru`, `ar`.

The `lang` param is read from the URL in every component that needs it. Always fall back to `tr` when the lang is invalid: `const texts = TEXTS[lang] || TEXTS.tr`.

### Translation Pattern

There is no i18n library. Each component defines a local `TEXTS` constant keyed by language code:

```js
const TEXTS = {
  en: { title: "...", label: "..." },
  tr: { title: "...", label: "..." },
  // all 9 languages
};
const texts = TEXTS[safeLang] || TEXTS.tr;
```

**All 9 language keys must be present** when adding new UI strings.

### Product & Blog Data

`src/data/products.js` and `src/data/blogPosts.js` store multilingual content directly in the objects — every translatable field is a `{ en: "...", tr: "...", ... }` map. Access via `product.name[lang]`.

Product shape: `id`, `slug`, `subtitle`, `image`, `detailImage`, `color`, `bgColor`, `bgImage`, `name`, `description`, `indications`, `activeIngredients`, `actions` (array per lang), `tabs` (result/typesOfSkin/usage/application per lang), `b2b` (volume, quantityInBox, boxGrossWeight, boxVolume — language-neutral).

### Routing Logic

`App.jsx` renders a single `<AppContent />` component for all routes. It reads `useParams()` and `useLocation()` to determine which view to show. All page-level components live in `src/components/`.

### SEO

`src/hooks/useSeo.js` + `src/components/Seo.jsx` manage `<meta>` tags, OpenGraph, hreflang alternates. Call `useSeo` with per-language content on each page.
