import { useState } from "react";

const tabKeys = [
  { key: "result", label: "Result" },
  { key: "typesOfSkin", label: "Types of Skin" },
  { key: "usage", label: "Usage" },
  { key: "application", label: "Application" },
  { key: "b2b", label: "B2B" },
];

export default function ProductDetail({ product }) {
  const [activeTab, setActiveTab] = useState("result");

  if (!product) return null;

  return (
      <div className="product-page">
        <div className="product-page__image">
          <div className="product-page__image-box">
            {product.image ? (
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-page__img"
                />
            ) : (
                <div className="product-page__placeholder">
                  <span>{product.name}</span>
                </div>
            )}
          </div>
        </div>

        <div className="product-page__info">
          <h1 className="product-page__title">{product.name}</h1>
          <p className="product-page__desc">{product.description}</p>

          <div className="product-page__detail">
            <div
                className="product-page__detail-icon"
                style={{ background: product.bgColor, color: product.color }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20.1932 12.999C21.8501 15.8688 20.8669 19.5383 17.9971 21.1952C15.1273 22.8521 11.4578 21.8688 9.80094 18.999M20.1932 12.999C18.5364 10.1293 14.8669 9.14604 11.9971 10.8029C9.12734 12.4598 8.14409 16.1293 9.80094 18.999M20.1932 12.999L9.80094 18.999" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10.0428 5.54203L15.1278 2.5374C17 1.43112 19.394 2.08763 20.4749 4.00376C21.3433 5.54315 21.1 7.4272 20 8.6822M10.0428 5.54203L4.95785 8.54667C3.08563 9.65294 2.44415 12.1031 3.52508 14.0192C4.17499 15.1713 5.29956 15.868 6.5 16M10.0428 5.54203L11.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="product-page__detail-text">
              <span className="product-page__detail-label">Indications: </span>
              {product.indications}
            </div>
          </div>

          <div className="product-page__detail">
            <div
                className="product-page__detail-icon"
                style={{ background: product.bgColor, color: product.color }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8.01562 2.00171H15.9751" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.53125 11.1499C5.53125 11.1499 8.53125 10.224 11.0313 13.0015M18.5313 11.6128C18.5313 11.6128 17.9197 12.592 17.0313 13.0017" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10.0312 18.0037L10.0399 18.0013" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.0312 14.0037L14.0399 14.0013" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.52693 2.2146V6.2572C9.52693 6.91916 9.17519 7.48994 8.59404 7.80139C5.60885 9.4012 2.80495 13.9337 5.74609 18.579C6.4044 19.7185 8.57684 21.9976 12.0001 21.9976C15.4233 21.9976 17.5957 19.7185 18.254 18.579C21.1952 13.9337 18.3913 9.4012 15.4061 7.80139C14.8249 7.48994 14.4725 6.91916 14.4725 6.2572V2.26338" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="product-page__detail-text">
              <span className="product-page__detail-label">Active Ingredients: </span>
              {product.activeIngredients}
            </div>
          </div>

          <h3 className="product-page__actions-title">Action:</h3>
          <ul className="product-page__actions-list">
            {product.actions.map((action, i) => (
                <li key={i}>{action}</li>
            ))}
          </ul>

          <div className="product-page__tabs">
            {tabKeys.map((tab) => (
                <button
                    key={tab.key}
                    className={`product-page__tab ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
            ))}
          </div>

          <div className="product-page__tab-content">
            {activeTab === "b2b" ? (
              <div className="b2b-grid">
                <div className="b2b-card">
                  <div className="b2b-card__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v4M16 2v4" />
                      <rect x="3" y="6" width="18" height="15" rx="2" />
                      <path d="M12 6v15M8 11h8M8 15h4" />
                    </svg>
                  </div>
                  <div className="b2b-card__text">
                    <span className="b2b-card__label">Product Volume</span>
                    <span className="b2b-card__value">{product.b2b.volume}</span>
                  </div>
                </div>
                <div className="b2b-card">
                  <div className="b2b-card__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6" />
                      <path d="M12 2l4 4-4 4" />
                      <rect x="15" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <div className="b2b-card__text">
                    <span className="b2b-card__label">Quantity in Box</span>
                    <span className="b2b-card__value">{product.b2b.quantityInBox}</span>
                  </div>
                </div>
                <div className="b2b-card">
                  <div className="b2b-card__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v17M8 7l4-4 4 4" />
                      <circle cx="12" cy="20" r="1" />
                      <path d="M17 13h3M4 13h3" />
                    </svg>
                  </div>
                  <div className="b2b-card__text">
                    <span className="b2b-card__label">Box Gross Weight</span>
                    <span className="b2b-card__value">{product.b2b.boxGrossWeight}</span>
                  </div>
                </div>
                <div className="b2b-card">
                  <div className="b2b-card__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" />
                      <path d="M14 14h7v7h-7z" strokeDasharray="3 2" />
                    </svg>
                  </div>
                  <div className="b2b-card__text">
                    <span className="b2b-card__label">Box Volume</span>
                    <span className="b2b-card__value">{product.b2b.boxVolume}</span>
                  </div>
                </div>
              </div>
            ) : (
              product.tabs[activeTab]
            )}
          </div>
        </div>
      </div>
  );
}