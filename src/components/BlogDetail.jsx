import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const TEXTS = {
  tr: { breadcrumb: "Blog", notFound: "Yazı bulunamadı.", backToBlog: "Blog'a Dön" },
  en: { breadcrumb: "Blog", notFound: "Post not found.", backToBlog: "Back to Blog" },
  de: { breadcrumb: "Blog", notFound: "Beitrag nicht gefunden.", backToBlog: "Zurück zum Blog" },
  fr: { breadcrumb: "Blog", notFound: "Article introuvable.", backToBlog: "Retour au Blog" },
  es: { breadcrumb: "Blog", notFound: "Publicación no encontrada.", backToBlog: "Volver al Blog" },
  it: { breadcrumb: "Blog", notFound: "Articolo non trovato.", backToBlog: "Torna al Blog" },
  pt: { breadcrumb: "Blog", notFound: "Artigo não encontrado.", backToBlog: "Voltar ao Blog" },
  ru: { breadcrumb: "Блог", notFound: "Запись не найдена.", backToBlog: "Назад к блогу" },
  ar: { breadcrumb: "المدونة", notFound: "المقال غير موجود.", backToBlog: "العودة إلى المدونة" },
};

export default function BlogDetail() {
  const { lang, slug } = useParams();
  const safeLang = lang || "tr";
  const texts = TEXTS[safeLang] || TEXTS.tr;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="blog-detail__not-found">
        <p>{texts.notFound}</p>
        <Link to={`/${safeLang}/blog`}>
          &larr; {texts.backToBlog}
        </Link>
      </div>
    );
  }

  const title = post.title[safeLang] || post.title.tr;
  const content = post.content[safeLang] || post.content.tr;

  return (
    <article className="blog-detail">
      <nav className="blog-detail__breadcrumb" aria-label="Breadcrumb">
        <Link to={`/${safeLang}/blog`}>
          {texts.breadcrumb}
        </Link>
        <span className="blog-detail__breadcrumb-sep">&gt;</span>
        <span className="blog-detail__breadcrumb-current">{title}</span>
      </nav>

      <div className="blog-detail__hero">
        <img
          src={post.heroImage}
          alt={title}
          className="blog-detail__hero-img"
        />
      </div>

      <div className="blog-detail__content">
        <h1 className="blog-detail__title">{title}</h1>

        {content.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2 key={index} className="blog-detail__subtitle">
                {block.text}
              </h2>
            );
          }
          return (
            <p key={index} className="blog-detail__paragraph">
              {block.text}
            </p>
          );
        })}
      </div>
    </article>
  );
}
