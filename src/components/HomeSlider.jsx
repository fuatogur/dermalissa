import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { products } from "../data/products";

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentLang = pathParts[0] || "tr";
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
    if (Math.abs(dragOffset.current) > 10) {
      hasDragged.current = true;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(dragOffset.current) > 60) {
      if (dragOffset.current < 0) {
        setActiveIndex((prev) => (prev + 1) % total);
      } else {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
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

  function handleSlideClick(index) {
    if (hasDragged.current) return;
    const pos = getPosition(index);
    if (pos === 0) {
      navigate(`/${currentLang}/${products[index].slug}`);
    } else {
      setActiveIndex(index);
    }
  }

  const currentProduct = products[activeIndex];

  return (
    <div className="home__slider">
      <div className="home__slider-container" ref={trackRef}>
        {products.map((product, index) => {
          const pos = getPosition(index);
          const absPos = Math.abs(pos);

          if (absPos > 2) return null;

          const translateX = pos * 320;
          const scale = pos === 0 ? 1.15 : 0.6;
          const zIndex = 10 - absPos;
          const opacity = pos === 0 ? 1 : absPos === 1 ? 0.6 : 0.2;

          return (
            <div
              key={product.id}
              className="home__slide"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                cursor: pos === 0 ? "pointer" : "default",
              }}
              onClick={() => handleSlideClick(index)}
            >
              <div
                className="home__slide-box"
                style={{
                  width: 360,
                  height: 400,
                  borderColor: pos === 0 ? product.color : "#e0e0e0",
                }}
              >
                <div
                  className="home__slide-bg"
                  style={{ background: product.color }}
                />
                <div className="home__slide-images">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="home__slide-img home__slide-img--center"
                      style={{ width: 200, height: 300, objectFit: "contain" }}
                    />
                  ) : (
                    <div
                      className="home__slide-img home__slide-img--center"
                      style={{
                        width: 130,
                        height: 260,
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
                      {product.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="home__slide-info" style={{ position: "absolute", bottom: "18%", zIndex: 20 }}>
        <div className="home__slide-name">{currentProduct.name}</div>
        <div className="home__slide-subtitle">{currentProduct.subtitle}</div>
      </div>

      <div className="home__slider-dot" />
    </div>
  );
}
