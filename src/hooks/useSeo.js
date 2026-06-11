import { useEffect, useMemo } from "react";

const SUPPORTED_LANGS = ["tr", "en", "de", "fr", "es", "it", "pt", "ru", "ar"];

const SITE_NAME = "Dermalissa";
const BASE_URL = "https://dermalissa.com";

const FALLBACK = {
  home: {
    tr: { title: "Dermalissa - Aktif Kozmetik", description: "Dermalissa Aktif Kozmetik - Premium cilt bakım ürünleri" },
    en: { title: "Dermalissa - Active Cosmetics", description: "Dermalissa Active Cosmetics - Premium skincare products" },
    de: { title: "Dermalissa - Aktive Kosmetik", description: "Dermalissa Aktive Kosmetik - Premium Hautpflegeprodukte" },
    fr: { title: "Dermalissa - Cosmétiques Actifs", description: "Dermalissa Cosmétiques Actifs - Produits de soins premium" },
    es: { title: "Dermalissa - Cosméticos Activos", description: "Dermalissa Cosméticos Activos - Productos premium para el cuidado de la piel" },
    it: { title: "Dermalissa - Cosmetici Attivi", description: "Dermalissa Cosmetici Attivi - Prodotti premium per la cura della pelle" },
    pt: { title: "Dermalissa - Cosméticos Ativos", description: "Dermalissa Cosméticos Ativos - Produtos premium para cuidados com a pele" },
    ru: { title: "Dermalissa - Активная Косметика", description: "Dermalissa Активная Косметика - Премиальные средства по уходу за кожей" },
    ar: { title: "Dermalissa - مستحضرات التجميل الفعالة", description: "Dermalissa مستحضرات التجميل الفعالة - منتجات العناية بالبشرة المتميزة" },
  },
  blog: {
    tr: { title: "Blog - Dermalissa", description: "Cilt bakımı, kozmetik bilimi ve güzellik ipuçları hakkında uzman içerikler. Sağlıklı ve parlak bir cilt için bilmeniz gereken her şey Dermalissa Blog'da." },
    en: { title: "Blog - Dermalissa", description: "Expert content on skincare, cosmetic science, and beauty tips. Everything you need to know for healthy, glowing skin on Dermalissa Blog." },
    de: { title: "Blog - Dermalissa", description: "Experteninhalte zu Hautpflege, Kosmetikwissenschaft und Beauty-Tipps. Alles, was Sie für gesunde, strahlende Haut wissen müssen, finden Sie im Dermalissa Blog." },
    fr: { title: "Blog - Dermalissa", description: "Contenus experts sur les soins de la peau, la science cosmétique et les conseils beauté. Tout ce que vous devez savoir pour une peau saine et éclatante se trouve sur le Blog Dermalissa." },
    es: { title: "Blog - Dermalissa", description: "Contenido experto sobre cuidado de la piel, ciencia cosmética y consejos de belleza. Todo lo que necesitas saber para una piel sana y radiante está en el Blog Dermalissa." },
    it: { title: "Blog - Dermalissa", description: "Contenuti esperti su cura della pelle, scienza cosmetica e consigli di bellezza. Tutto ciò che devi sapere per una pelle sana e luminosa è sul Blog Dermalissa." },
    pt: { title: "Blog - Dermalissa", description: "Conteúdo especializado sobre cuidados com a pele, ciência cosmética e dicas de beleza. Tudo o que precisa de saber para uma pele saudável e radiante está no Blog Dermalissa." },
    ru: { title: "Блог - Dermalissa", description: "Экспертный контент по уходу за кожей, косметической науке и советам по красоте. Всё, что нужно знать для здоровой и сияющей кожи — в блоге Dermalissa." },
    ar: { title: "المدونة - Dermalissa", description: "محتوى متخصص حول العناية بالبشرة وعلم التجميل ونصائح الجمال. كل ما تحتاج إلى معرفته للحصول على بشرة صحية ومشرقة تجده في مدونة Dermalissa." },
  },
  contact: {
    tr: { title: "İletişim - Dermalissa", description: "Dermalissa ile iletişime geçin. Cilt bakımı ve ürünlerimiz hakkında merak ettiğiniz her şeyi bizimle paylaşabilirsiniz. WhatsApp, telefon ve e-posta ile bize ulaşın." },
    en: { title: "Contact - Dermalissa", description: "Get in touch with Dermalissa. Share anything you are curious about regarding skincare and our products. Reach us via WhatsApp, phone, or email." },
    de: { title: "Kontakt - Dermalissa", description: "Kontaktieren Sie Dermalissa. Teilen Sie uns alles mit, was Sie über Hautpflege und unsere Produkte wissen möchten. Erreichen Sie uns per WhatsApp, Telefon oder E-Mail." },
    fr: { title: "Contact - Dermalissa", description: "Contactez Dermalissa. Partagez avec nous tout ce qui vous intéresse concernant les soins de la peau et nos produits. Joignez-nous par WhatsApp, téléphone ou e-mail." },
    es: { title: "Contacto - Dermalissa", description: "Póngase en contacto con Dermalissa. Comparta con nosotros cualquier consulta sobre el cuidado de la piel y nuestros productos. Contáctenos por WhatsApp, teléfono o correo electrónico." },
    it: { title: "Contatti - Dermalissa", description: "Contatta Dermalissa. Condividi con noi qualsiasi domanda sulla cura della pelle e i nostri prodotti. Raggiungici tramite WhatsApp, telefono o e-mail." },
    pt: { title: "Contacto - Dermalissa", description: "Entre em contacto com a Dermalissa. Partilhe connosco qualquer questão sobre cuidados com a pele e os nossos produtos. Contacte-nos por WhatsApp, telefone ou e-mail." },
    ru: { title: "Контакты - Dermalissa", description: "Свяжитесь с Dermalissa. Поделитесь с нами любыми вопросами об уходе за кожей и нашей продукции. Свяжитесь с нами через WhatsApp, телефон или электронную почту." },
    ar: { title: "اتصل بنا - Dermalissa", description: "تواصل مع Dermalissa. شاركنا أي استفسار حول العناية بالبشرة ومنتجاتنا. تواصل معنا عبر واتساب أو الهاتف أو البريد الإلكتروني." },
  },
};

const LOCALE_MAP = {
  tr: "tr_TR", en: "en_US", de: "de_DE", fr: "fr_FR",
  es: "es_ES", it: "it_IT", pt: "pt_PT", ru: "ru_RU", ar: "ar_SA",
};

function setMeta(name, content, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, key, value, extra = {}) {
  const selector = Object.entries(extra)
    .map(([k, v]) => `[${k}="${v}"]`)
    .join("");
  let el = document.querySelector(`link[rel="${rel}"]${selector}`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(key, value);
}

export default function useSeo({ lang = "tr", page = "home", slug = null, product = null, blogPost = null }) {
  const safeLang = SUPPORTED_LANGS.includes(lang) ? lang : "tr";

  const seo = useMemo(() => {
    if (page === "product" && product) {
      const rawName = product.name;
      const resolvedName = rawName
        ? (typeof rawName === "object" ? (rawName[safeLang] || rawName.en || "") : rawName)
        : "";
      const rawDesc = product.description;
      const resolvedDesc = rawDesc
        ? (typeof rawDesc === "object" ? (rawDesc[safeLang] || rawDesc.en || "") : rawDesc)
        : "";
      const productTitle = resolvedName ? `${resolvedName} - ${SITE_NAME}` : SITE_NAME;
      return {
        title: productTitle,
        description: resolvedDesc || FALLBACK.home[safeLang]?.description || "",
        ogImage: product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/og-image.jpg`,
        canonical: `${BASE_URL}/${safeLang}/${slug}`,
        locale: LOCALE_MAP[safeLang] || "tr_TR",
        ogType: "website",
      };
    }

    if (page === "blog") {
      const fb = FALLBACK.blog[safeLang] || FALLBACK.blog.tr;
      return {
        title: fb.title,
        description: fb.description,
        ogImage: `${BASE_URL}/og-image.jpg`,
        canonical: `${BASE_URL}/${safeLang}/blog`,
        locale: LOCALE_MAP[safeLang] || "tr_TR",
        ogType: "website",
      };
    }

    if (page === "contact") {
      const fb = FALLBACK.contact[safeLang] || FALLBACK.contact.tr;
      return {
        title: fb.title,
        description: fb.description,
        ogImage: `${BASE_URL}/og-image.jpg`,
        canonical: `${BASE_URL}/${safeLang}/contact`,
        locale: LOCALE_MAP[safeLang] || "tr_TR",
        ogType: "website",
      };
    }

    if (page === "blogDetail" && blogPost) {
      const postTitle = blogPost.title[safeLang] || blogPost.title.tr;
      const postExcerpt = blogPost.excerpt[safeLang] || blogPost.excerpt.tr;
      return {
        title: `${postTitle} - ${SITE_NAME}`,
        description: postExcerpt,
        ogImage: blogPost.heroImage || `${BASE_URL}/og-image.jpg`,
        canonical: `${BASE_URL}/${safeLang}/blog/${slug}`,
        locale: LOCALE_MAP[safeLang] || "tr_TR",
        ogType: "article",
      };
    }

    const fb = FALLBACK.home[safeLang] || FALLBACK.home.tr;
    return {
      title: fb.title,
      description: fb.description,
      ogImage: `${BASE_URL}/og-image.jpg`,
      canonical: `${BASE_URL}/${safeLang}`,
      locale: LOCALE_MAP[safeLang] || "tr_TR",
      ogType: "website",
    };
  }, [safeLang, page, slug, product, blogPost]);

  useEffect(() => {
    document.documentElement.lang = safeLang;
    document.title = seo.title;

    setMeta("description", seo.description);

    // Open Graph
    setMeta("og:type", seo.ogType || "website", "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:title", seo.title, "property");
    setMeta("og:description", seo.description, "property");
    setMeta("og:image", seo.ogImage, "property");
    setMeta("og:url", seo.canonical, "property");
    setMeta("og:locale", seo.locale, "property");

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("twitter:image", seo.ogImage);

    // Canonical
    setLink("canonical", "href", seo.canonical);

    // Hreflang
    SUPPORTED_LANGS.forEach((l) => {
      let href;
      if (page === "contact") href = `${BASE_URL}/${l}/contact`;
      else if (page === "blog") href = `${BASE_URL}/${l}/blog`;
      else if (page === "blogDetail" && slug) href = `${BASE_URL}/${l}/blog/${slug}`;
      else if (slug) href = `${BASE_URL}/${l}/${slug}`;
      else href = `${BASE_URL}/${l}`;
      setLink("alternate", "href", href, { hreflang: l });
    });
    const defaultHref = page === "contact"
      ? `${BASE_URL}/tr/contact`
      : page === "blog"
        ? `${BASE_URL}/tr/blog`
        : page === "blogDetail" && slug
          ? `${BASE_URL}/tr/blog/${slug}`
          : slug
            ? `${BASE_URL}/tr/${slug}`
            : `${BASE_URL}/tr`;
    setLink("alternate", "href", defaultHref, { hreflang: "x-default" });
  }, [seo, safeLang, slug, page]);
}
