import { useRef, useEffect } from "react";
import { products } from "../data/products";

export default function ProductNav({ open, activeIndex, onSelect }) {
  const listRef = useRef(null);

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
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}
