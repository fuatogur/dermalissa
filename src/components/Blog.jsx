import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts, blogCategories } from "../data/blogPosts";

const BLOG_TEXTS = {
  tr: {
    title: "Blog",
    description:
      "Cilt bakımı, kozmetik bilimi ve güzellik ipuçları hakkında uzman içeriklerimizi keşfedin. Sağlıklı ve parlak bir cilt için bilmeniz gereken her şey Dermalissa Blog'da.",
  },
  en: {
    title: "Blog",
    description:
      "Discover our expert content on skincare, cosmetic science, and beauty tips. Everything you need to know for healthy, glowing skin is on the Dermalissa Blog.",
  },
  de: {
    title: "Blog",
    description:
      "Entdecken Sie unsere Experteninhalte zu Hautpflege, Kosmetikwissenschaft und Beauty-Tipps.",
  },
  fr: {
    title: "Blog",
    description:
      "Découvrez nos contenus experts sur les soins de la peau, la science cosmétique et les conseils beauté.",
  },
  es: {
    title: "Blog",
    description:
      "Descubre nuestro contenido experto sobre cuidado de la piel, ciencia cosmética y consejos de belleza.",
  },
  it: {
    title: "Blog",
    description:
      "Scopri i nostri contenuti esperti su cura della pelle, scienza cosmetica e consigli di bellezza.",
  },
  pt: {
    title: "Blog",
    description:
      "Descubra nosso conteúdo especializado sobre cuidados com a pele, ciência cosmética e dicas de beleza.",
  },
  ru: {
    title: "Блог",
    description:
      "Откройте для себя экспертный контент по уходу за кожей, косметической науке и советам по красоте.",
  },
  ar: {
    title: "المدونة",
    description:
      "اكتشف محتوانا المتخصص حول العناية بالبشرة وعلم التجميل ونصائح الجمال.",
  },
};

export default function Blog() {
  const { lang } = useParams();
  const safeLang = lang || "tr";
  const [activeCategory, setActiveCategory] = useState("all");

  const texts = BLOG_TEXTS[safeLang] || BLOG_TEXTS.tr;

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="blog-page">
      <div className="blog-page__header">
        <h1 className="blog-page__title">{texts.title}</h1>
        <p className="blog-page__description">{texts.description}</p>
      </div>

      <nav className="blog-page__categories" aria-label="Blog categories">
        {blogCategories.map((cat) => (
          <button
            key={cat.id}
            className={`blog-page__category-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label[safeLang] || cat.label.tr}
          </button>
        ))}
      </nav>

      <div className="blog-page__grid">
        {filteredPosts.map((post) => (
          <article key={post.id} className="blog-card">
            <Link
              to={`/${safeLang}/blog/${post.slug}`}
              className="blog-card__link"
            >
              <div className="blog-card__image-wrapper">
                <img
                  src={post.image}
                  alt={post.title[safeLang] || post.title.tr}
                  className="blog-card__image"
                  loading="lazy"
                />
              </div>
              <h2 className="blog-card__title">
                {post.title[safeLang] || post.title.tr}
              </h2>
              <p className="blog-card__excerpt">
                {post.excerpt[safeLang] || post.excerpt.tr}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
