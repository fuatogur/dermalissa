export default function Footer({ onProductsClick }) {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        &copy; 2026 Dermalissa. Tum haklari saklidir.
      </div>

      <div className="footer__center">
        <img src="/ses-kimya.svg" alt="SES Kimya A.S." className="footer__partner-logo" />
      </div>

      <nav className="footer__nav">
        <span className="footer__nav-link" onClick={onProductsClick}>
          Urunler
        </span>
        <span className="footer__nav-link">Blog</span>
        <span className="footer__nav-link">Iletisim</span>
      </nav>
    </footer>
  );
}
