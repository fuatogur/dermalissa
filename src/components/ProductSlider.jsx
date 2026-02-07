import { useRef, useCallback, useEffect } from "react";
import { products } from "../data/products";

export default function ProductSlider({ onSelectCenter, activeIndex, setActiveIndex }) {
  const trackRef = useRef(null);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

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
  }, [total, setActiveIndex]);

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

  function handleItemClick(index) {
    if (hasDragged.current) return;
    const pos = getPosition(index);
    if (pos === 0) {
      onSelectCenter(products[index]);
    } else {
      setActiveIndex(index);
    }
  }

  return (
      <div className="menu-slider">
        <div className="menu-slider__track" ref={trackRef}>
          {products.map((product, index) => {
            const pos = getPosition(index);
            const absPos = Math.abs(pos);

            if (absPos > 2) return null;

            const translateX = pos * 420;
            const scale = pos === 0 ? 1.3 : 0.59;
            const zIndex = 10 - absPos;
            const opacity = pos === 0 ? 1 : absPos === 1 ? 0.6 : 0;
            const rotateY = pos * -15;

            return (
                <div
                    key={product.id}
                    className="menu-slider__item"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                      zIndex,
                      opacity,
                    }}
                    onClick={() => handleItemClick(index)}
                >
                  <div
                      className="menu-slider__card"
                      style={{
                        width: 380,
                        height: 420,
                        ...(product.bgImage && {
                          background: `url(${product.bgImage}) no-repeat`,
                          backgroundSize: "100% 100%",
                        }),
                      }}
                  >
                    <div className="menu-slider__card-images">
                      {product.image ? (
                          <img
                              src={product.image}
                              alt={product.name}
                              className="menu-slider__card-img menu-slider__card-img--center"
                              style={{ width: 200, height: 300, objectFit: "contain" }}
                          />
                      ) : (
                          <div
                              className="menu-slider__card-img menu-slider__card-img--center"
                              style={{
                                width: 140,
                                height: 280,
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
                    <div className="menu-slider__card-info">
                      <div className="menu-slider__card-name">{product.name}</div>
                      <div className="menu-slider__card-subtitle">{product.subtitle}</div>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>

        <div className="menu-slider__dot" />
      </div>
  );
}