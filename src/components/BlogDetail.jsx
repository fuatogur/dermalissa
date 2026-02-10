import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const BREADCRUMB_TEXTS = {
  tr: "Blog",
  en: "Blog",
  de: "Blog",
  fr: "Blog",
  es: "Blog",
  it: "Blog",
  pt: "Blog",
  ru: "Блог",
  ar: "المدونة",
};

export default function BlogDetail() {
  const { lang, slug } = useParams();
  const safeLang = lang || "tr";

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="blog-detail__not-found">
        <p>{safeLang === "tr" ? "Yazı bulunamadı." : "Post not found."}</p>
        <Link to={`/${safeLang}/blog`}>
          &larr; {BREADCRUMB_TEXTS[safeLang] || "Blog"}
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
          {BREADCRUMB_TEXTS[safeLang] || "Blog"}
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
