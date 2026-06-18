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
        <svg className="enter-button__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      </div>
      <div className="enter-button__text">{label}</div>
    </div>
  );
}
