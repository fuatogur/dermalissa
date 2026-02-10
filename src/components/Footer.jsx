import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer({ onProductsClick, currentLang }) {
  const [buyOpen, setBuyOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__copyright">
        &copy; 2026 Dermalissa. Tum haklari saklidir.
      </div>

      <a href="https://seskimya.com" target="_blank" rel="noopener noreferrer" className="footer__center">
        <img src="/ses-kimya.svg" alt="SES Kimya A.S." className="footer__partner-logo" />
      </a>

      <nav className="footer__nav">
        <span className="footer__nav-link" onClick={onProductsClick}>
          Urunler
        </span>
        <span className="footer__nav-link" onClick={() => navigate(`/${currentLang || 'tr'}/blog`)}>Blog</span>
        <span className="footer__nav-link">Iletisim</span>
        <button className="footer__buy-btn" onClick={() => setBuyOpen(true)}>
          <img src="/basket.svg" alt="" className="footer__buy-icon" />
          Satin Al
        </button>
      </nav>

      {buyOpen && (
        <div className="buy-modal-overlay" onClick={() => setBuyOpen(false)}>
          <div className="buy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="buy-modal__banner">
              <img src="https://dummyimage.com/600x260" alt="Banner" />
            </div>
            <div className="buy-modal__links">
              <a href="#" className="buy-modal__link-box" target="_blank" rel="noopener noreferrer">
                <img src="/trendyol.svg" alt="Trendyol" className="buy-modal__link-logo" />
                <span className="buy-modal__link-arrow">&rarr;</span>
              </a>
              <a href="#" className="buy-modal__link-box" target="_blank" rel="noopener noreferrer">
                <img src="/hepsiburada.svg" alt="Hepsiburada" className="buy-modal__link-logo" />
                <span className="buy-modal__link-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
