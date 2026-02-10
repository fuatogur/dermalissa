import useSeo from "../hooks/useSeo";

export default function Seo({ lang, page, slug, product, blogPost }) {
  useSeo({ lang, page, slug, product, blogPost });
  return null;
}
