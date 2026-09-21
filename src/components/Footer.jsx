import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {getShopSku} from '../data/shopSkus';
import {MARKETPLACE_LINKS} from '../data/marketplaceLinks';

const TEXTS = {
    tr: { products: "Ürünler", blog: "Blog", contact: "İletişim", buy: "Satın Al", rights: "Tüm hakları saklıdır.", comingSoon: "Bu bölge için satış noktaları yakında eklenecek." },
    en: { products: "Products", blog: "Blog", contact: "Contact", buy: "Buy Now", rights: "All rights reserved.", comingSoon: "Points of sale for this region are coming soon." },
    de: { products: "Produkte", blog: "Blog", contact: "Kontakt", buy: "Kaufen", rights: "Alle Rechte vorbehalten.", comingSoon: "Verkaufsstellen für diese Region folgen in Kürze." },
    fr: { products: "Produits", blog: "Blog", contact: "Contact", buy: "Acheter", rights: "Tous droits réservés.", comingSoon: "Points de vente pour cette région bientôt disponibles." },
    es: { products: "Productos", blog: "Blog", contact: "Contacto", buy: "Comprar", rights: "Todos los derechos reservados.", comingSoon: "Los puntos de venta para esta región llegarán pronto." },
    it: { products: "Prodotti", blog: "Blog", contact: "Contatti", buy: "Acquista", rights: "Tutti i diritti riservati.", comingSoon: "I punti vendita per questa regione arriveranno presto." },
    pt: { products: "Produtos", blog: "Blog", contact: "Contacto", buy: "Comprar", rights: "Todos os direitos reservados.", comingSoon: "Os pontos de venda para esta região chegarão em breve." },
    ru: { products: "Продукция", blog: "Блог", contact: "Контакты", buy: "Купить", rights: "Все права защищены.", comingSoon: "Точки продаж для этого региона скоро появятся." },
    ar: { products: "المنتجات", blog: "المدونة", contact: "اتصل بنا", buy: "اشتري", rights: "جميع الحقوق محفوظة.", comingSoon: "نقاط البيع لهذه المنطقة ستتوفر قريبًا." },
};

// Satın al modal linkleri (SADECE Türkiye içi satış). Bu mağaza linkleri yalnızca `tr`
// dilinde gösterilir; diğer dillerde bölgesel satış noktası henüz olmadığı için modalde
// texts.comingSoon mesajı görünür. Eklemek/silmek için sadece bu listeyi düzenleyin.
//
// ÜRÜN LİNKİ (manuel URL YOK): ziyaretçi bir ürün sayfasındayken her satır o
// ürünün pazaryerindeki DOĞRUDAN ürün sayfasına gider. SKU `shopSkus.js`'ten,
// SKU → link `marketplaceLinks.js`'ten (kremalderma.com'un ürettiği JSON'dan
// `npm run marketplace` ile yenilenir) okunur. `key` o dosyadaki alan adıdır;
// "kremalderma" özel: JSON'daki slug ile `{base}/urun/{slug}` kurulur.
// `requiresListing` true ise ürün bağlamında SKU'nun aktif listelemesi yoksa
// satır GİZLENİR. Ürün bağlamı yoksa `href` kullanılır (mağaza vitrini).
const BUY_LINKS = [
    { id: "kremalderma", key: "kremalderma", logo: "/kremalderma.svg", label: "Kremalderma", base: "https://kremalderma.com", href: "https://kremalderma.com/kategori/dermokozmetik" },
    // Çiğdem + Cleanay TASLAK — şimdilik gizli; açmak için satırı yorumdan çıkar.
    // { id: "cigdem", logo: "/cigdem.svg", label: "Çiğdem Cosmetic", href: "https://cigdemcosmetic.com" },
    // { id: "cleanay", logo: "/cleanay.svg", label: "Cleanay Cosmetic", href: "https://cleanaycosmetic.com" },
    { id: "trendyol", key: "trendyol", logo: "/trendyol.svg", label: "Trendyol", href: "https://www.trendyol.com/magaza/cleanay-cosmetic-m-112996?sst=0", requiresListing: true },
    { id: "hepsiburada", key: "hepsiburada", logo: "/hepsiburada.svg", label: "Hepsiburada", href: "https://www.hepsiburada.com/magaza/cleanay-cosmetic", requiresListing: true },
];

/** SKU'nun bu mağazadaki ürün sayfası URL'i; listeleme yoksa null. */
function listingUrl(link, sku) {
    const entry = sku ? MARKETPLACE_LINKS[sku] : null;
    if (!entry || !link.key) return null;
    if (link.key === "kremalderma") {
        return entry.slug ? `${link.base}/urun/${entry.slug}` : null;
    }
    return entry[link.key] || null;
}

// Sabit banner görseli (örn. "/buy-banner.jpg"). null bırakılırsa gradient + Dermalissa logosu gösterilir.
const BUY_BANNER_IMAGE = null;

export default function Footer({onProductsClick, currentLang}) {
    const [buyOpen, setBuyOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const texts = TEXTS[currentLang] || TEXTS.tr;

    // Ürün sayfasındaysak (/:lang/:slug) o ürünün SKU'su — modal linkleri
    // doğrudan ürün sayfasına gider; ürün değilse (ana sayfa, blog, contact)
    // null → mağaza vitrini.
    const segments = location.pathname.split('/').filter(Boolean);
    const productSku = segments.length === 2 ? getShopSku(segments[1]) : null;
    const buyHref = (link) => listingUrl(link, productSku) || link.href;
    // Ürün bağlamında requiresListing'li pazaryerleri yalnız o SKU'nun aktif
    // listelemesi varsa gösterilir; ürünsüz modalda hepsi vitrin linkiyle görünür.
    const visibleBuyLinks = BUY_LINKS.filter((link) => !productSku || !link.requiresListing || listingUrl(link, productSku));

    // Satın al modalını Esc ile kapat
    useEffect(() => {
        if (!buyOpen) return undefined;
        const onKeyDown = (e) => {
            if (e.key === "Escape") setBuyOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [buyOpen]);

    return (
        <footer className="footer">

            <div className="footer__main">
                <div className="footer__logo-box">
                    <a href="https://seskimya.com" target="_blank" rel="noopener noreferrer" className="footer__center">
                        <img src="/ses-kimya.svg" alt="SES Kimya A.S." className="footer__partner-logo"/>
                    </a>
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
            </div>

            <div className="footer__bottom">
                <div className="footer__copyright">
                    &copy; {new Date().getFullYear()} <strong>SES Kimya A.Ş.</strong> — Dermalissa. {texts.rights}
                </div>
            </div>

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
                        {currentLang === 'tr' ? (
                            <div className="buy-modal__links">
                                {visibleBuyLinks.map((link) => (
                                    <a key={link.id} href={buyHref(link)} className="buy-modal__link-box" target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                                        {link.logo ? (
                                            <img src={link.logo} alt={link.label} className="buy-modal__link-logo"/>
                                        ) : (
                                            <span className="buy-modal__link-label">{link.label}</span>
                                        )}
                                        <span className="buy-modal__link-arrow" aria-hidden="true">&rarr;</span>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="buy-modal__coming-soon">{texts.comingSoon}</p>
                        )}
                    </div>
                </div>
            )}
        </footer>
    );
}
