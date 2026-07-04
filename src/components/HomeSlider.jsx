import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { products } from "../data/products";

function getProductName(product, lang) {
  const name = product.name;
  if (!name) return "";
  if (typeof name === "string") return name;
  return name[lang] || name.en || "";
}

// Yatayda ürünler arasındaki mesafeyi ekran genişliğine göre ayarlar.
// Küçük ekranlarda daha küçük step -> ürünler taşmaz, keskin kalır.
function useResponsiveStep() {
  const compute = () => {
    if (typeof window === "undefined") return 380;
    const w = window.innerWidth;
    if (w < 600) return 170;
    if (w < 900) return 240;
    if (w < 1200) return 320;
    return 380;
  };
  const [step, setStep] = useState(compute);
  useEffect(() => {
    const update = () => setStep(compute());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return step;
}

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const step = useResponsiveStep();

  const currentLang = location.pathname.split("/").filter(Boolean)[0] || "tr";
  const total = products.length;

  const handleDragStart = useCallback((clientX) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = clientX;
    dragOffset.current = 0;
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging.current) return;
    dragOffset.current = clientX - dragStartX.current;
    if (Math.abs(dragOffset.current) > 10) hasDragged.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(dragOffset.current) > 60) {
      if (dragOffset.current < 0) setActiveIndex((prev) => (prev + 1) % total);
      else setActiveIndex((prev) => (prev - 1 + total) % total);
    }
    dragOffset.current = 0;
  }, [total]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onMouseDown = (e) => { e.preventDefault(); handleDragStart(e.clientX); };
    const onMouseMove = (e) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onTouchStart = (e) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  function getPosition(index) {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  function handleClick(index) {
    if (hasDragged.current) return;
    const pos = getPosition(index);
    if (pos === 0) navigate(`/${currentLang}/${products[index].slug}`);
    else setActiveIndex(index);
  }

  return (
    <div className="home-slider">
      <div className="home-slider__track" ref={trackRef}>
        {products.map((product, index) => {
          const pos = getPosition(index);
          const absPos = Math.abs(pos);
          if (absPos > 2) return null;

          const translateX = pos * step;
          const scale = pos === 0 ? 1.15 : absPos === 1 ? 0.72 : 0.5;
          const opacity = pos === 0 ? 1 : absPos === 1 ? 0.72 : 0.38;
          const rotateY = pos * -12;
          const zIndex = 10 - absPos;
          const itemClass = `home-slider__item${absPos === 2 ? " home-slider__item--far" : ""}`;
          const name = getProductName(product, currentLang);

          return (
            <div
              key={product.id}
              className={itemClass}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
              }}
              onClick={() => handleClick(index)}
            >
              <div
                className="menu-slider__card"
                style={{
                  width: 340,
                  height: 380,
                  ...(product.bgImage && { "--card-bg": `url(${product.bgImage})` }),
                }}
              >
                <div className="menu-slider__card-images">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={name}
                      className="menu-slider__card-img menu-slider__card-img--center"
                      style={{ width: 180, height: 270, objectFit: "contain" }}
                    />
                  ) : (
                    <div
                      className="menu-slider__card-img menu-slider__card-img--center"
                      style={{
                        width: 130,
                        height: 250,
                        background: `linear-gradient(135deg, ${product.color}40, ${product.color}90)`,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                        color: "white",
                        textAlign: "center",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {name}
                    </div>
                  )}
                </div>
                <div className="menu-slider__card-info">
                  <div className="menu-slider__card-name">{name}</div>
                  <div className="menu-slider__card-subtitle">{product.subtitle}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
