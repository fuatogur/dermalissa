import useSeo from "../hooks/useSeo";

export default function Seo({ lang, page, slug, product }) {
  useSeo({ lang, page, slug, product });
  return null;
}
