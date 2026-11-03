// Serves the .webp twin of a product .png when the browser supports it,
// falling back to the PNG. `display: contents` keeps <picture> out of the
// flex layout so the <img> sizes exactly as before.
export default function ProductImage({ src, ...imgProps }) {
  if (!src || !src.endsWith(".png")) return <img src={src} {...imgProps} />;
  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={src.replace(/\.png$/, ".webp")} type="image/webp" />
      <img src={src} {...imgProps} />
    </picture>
  );
}
