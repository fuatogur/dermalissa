const TEXTS = {
  tr: "Ürünleri İncele",
  en: "Explore Products",
  de: "Produkte entdecken",
  fr: "Découvrir les produits",
  es: "Explorar productos",
  it: "Esplora i prodotti",
  pt: "Explorar produtos",
  ru: "Смотреть продукты",
  ar: "استعرض المنتجات",
};

export default function EnterButton({ onClick, currentLang }) {
  const label = TEXTS[currentLang] || TEXTS.tr;
  return (
    <div className="enter-button">
      <div className="enter-button__circle" onClick={onClick}>
        <span className="enter-button__icon">&#x2192;</span>
      </div>
      <div className="enter-button__text">{label}</div>
    </div>
  );
}
