import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";

function getProductName(product, lang) {
  const name = product.name;
  if (!name) return "";
  if (typeof name === "string") return name;
  return name[lang] || name.en || "";
}

export default function ProductNav({ open, activeIndex, onSelect }) {
  const listRef = useRef(null);
  const location = useLocation();
  const currentLang = location.pathname.split("/").filter(Boolean)[0] || "tr";

  useEffect(() => {
    if (open && listRef.current) {
      const activeEl = listRef.current.children[activeIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeIndex, open]);

  return (
    <div className={`product-nav ${open ? "open" : ""}`}>
      <div className="product-nav__list" ref={listRef}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`product-nav__item ${index === activeIndex ? "active" : ""}`}
            onClick={() => onSelect(index)}
          >
            {getProductName(product, currentLang)}
          </div>
        ))}
      </div>
    </div>
  );
}
