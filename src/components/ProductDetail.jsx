import { useState } from "react";

const tabKeys = [
  { key: "result", label: "Result" },
  { key: "typesOfSkin", label: "Types of Skin" },
  { key: "usage", label: "Usage" },
  { key: "application", label: "Application" },
];

export default function ProductDetail({ product }) {
  const [activeTab, setActiveTab] = useState("result");

  if (!product) return null;

  return (
    <div className="product-page">
      <div className="product-page__image">
        <div className="product-page__image-box">
          <div
            className="product-page__image-bg"
            style={{ background: product.color }}
          />
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
            &#x2727;
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
            &#x2727;
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
          {product.tabs[activeTab]}
        </div>
      </div>
    </div>
  );
}
