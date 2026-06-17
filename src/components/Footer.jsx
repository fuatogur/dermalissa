import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const TEXTS = {
    tr: { products: "Ürünler", blog: "Blog", contact: "İletişim", buy: "Satın Al", rights: "Tüm hakları saklıdır." },
    en: { products: "Products", blog: "Blog", contact: "Contact", buy: "Buy Now", rights: "All rights reserved." },
    de: { products: "Produkte", blog: "Blog", contact: "Kontakt", buy: "Kaufen", rights: "Alle Rechte vorbehalten." },
    fr: { products: "Produits", blog: "Blog", contact: "Contact", buy: "Acheter", rights: "Tous droits réservés." },
    es: { products: "Productos", blog: "Blog", contact: "Contacto", buy: "Comprar", rights: "Todos los derechos reservados." },
    it: { products: "Prodotti", blog: "Blog", contact: "Contatti", buy: "Acquista", rights: "Tutti i diritti riservati." },
    pt: { products: "Produtos", blog: "Blog", contact: "Contacto", buy: "Comprar", rights: "Todos os direitos reservados." },
    ru: { products: "Продукция", blog: "Блог", contact: "Контакты", buy: "Купить", rights: "Все права защищены." },
    ar: { products: "المنتجات", blog: "المدونة", contact: "اتصل بنا", buy: "اشتري", rights: "جميع الحقوق محفوظة." },
};

// Satın al modal linkleri. Eklemek/silmek/değiştirmek için sadece bu listeyi düzenleyin.
// `logo` = public/ içindeki SVG yolu, `label` = aria/alt metin, `href` = mağaza linki.
// Not: Şimdilik tek liste — tüm dillerde aynı mağazalar görünür. Dile özel mağaza
// gerektiğinde href'i { tr: "...", default: "..." } objesine çevirip resolve eden
// küçük bir yardımcı ekleyebiliriz.
const BUY_LINKS = [
    { id: "trendyol", logo: "/trendyol.svg", label: "Trendyol", href: "https://www.trendyol.com" },
    { id: "hepsiburada", logo: "/hepsiburada.svg", label: "Hepsiburada", href: "https://www.hepsiburada.com" },
    { id: "kremalderma", logo: "/kremalderma.svg", label: "Kremalderma", href: "https://kremalderma.com/kategori/dermokozmetik" },
];

// Sabit banner görseli (örn. "/buy-banner.jpg"). null bırakılırsa gradient + Dermalissa logosu gösterilir.
const BUY_BANNER_IMAGE = null;

export default function Footer({onProductsClick, currentLang}) {
    const [buyOpen, setBuyOpen] = useState(false);
    const navigate = useNavigate();
    const texts = TEXTS[currentLang] || TEXTS.tr;

    return (
        <footer className="footer">

            <div className="footer__logo-box">
                <a href="https://seskimya.com" target="_blank" rel="noopener noreferrer" className="footer__center">
                    <img src="/ses-kimya.svg" alt="SES Kimya A.S." className="footer__partner-logo"/>
                </a>
                <div className="footer__copyright">
                    &copy; {new Date().getFullYear()} dermalissa. {texts.rights}
                </div>
            </div>

            <nav className="footer__nav">
                <span className="footer__nav-link" onClick={onProductsClick}>{texts.products}</span>
                <span className="footer__nav-link" onClick={() => navigate(`/${currentLang || 'tr'}/blog`)}>{texts.blog}</span>
                <span className="footer__nav-link"
                      onClick={() => navigate(`/${currentLang || 'tr'}/contact`)}>{texts.contact}</span>
                <button className="footer__buy-btn" onClick={() => setBuyOpen(true)}>
                    <img src="/basket.svg" alt="" className="footer__buy-icon"/>
                    {texts.buy}
                </button>
            </nav>

            {buyOpen && (
                <div className="buy-modal-overlay" onClick={() => setBuyOpen(false)}>
                    <div className="buy-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={texts.buy}>
                        <button className="buy-modal__close" aria-label="Close" onClick={() => setBuyOpen(false)}>×</button>
                        <div className={`buy-modal__banner${BUY_BANNER_IMAGE ? '' : ' buy-modal__banner--fallback'}`}>
                            {BUY_BANNER_IMAGE ? (
                                <img src={BUY_BANNER_IMAGE} alt=""/>
                            ) : (
                                <img src="/logo.svg" alt="Dermalissa" className="buy-modal__banner-logo"/>
                            )}
                        </div>
                        <div className="buy-modal__links">
                            {BUY_LINKS.map((link) => (
                                <a key={link.id} href={link.href} className="buy-modal__link-box" target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                                    <img src={link.logo} alt={link.label} className="buy-modal__link-logo"/>
                                    <span className="buy-modal__link-arrow" aria-hidden="true">&rarr;</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
