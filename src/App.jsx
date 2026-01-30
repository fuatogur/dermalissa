import { useState, useEffect, useCallback } from "react";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductNav from "./components/ProductNav";
import ProductSlider from "./components/ProductSlider";
import ProductDetail from "./components/ProductDetail";
import EnterButton from "./components/EnterButton";
import HomeSlider from "./components/HomeSlider";
import { products } from "./data/products";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showEnter, setShowEnter] = useState(true);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentLang = pathParts[0] || "tr";

  const currentProduct = (() => {
    if (pathParts.length >= 2) {
      const slug = pathParts[pathParts.length - 1];
      return products.find((p) => p.slug === slug) || null;
    }
    return null;
  })();

  useEffect(() => {
    if (pathParts.length <= 1) {
      setShowEnter(true);
      setMenuOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentProduct) {
      setShowEnter(false);
      setMenuOpen(false);
    }
  }, [currentProduct]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleEnterClick = useCallback(() => {
    setShowEnter(false);
    setMenuOpen(true);
  }, []);

  const handleProductsClick = useCallback(() => {
    setMenuOpen(true);
    setShowEnter(false);
  }, []);

  const handleSelectCenter = useCallback(
    (product) => {
      setMenuOpen(false);
      navigate(`/${currentLang}/${product.slug}`);
    },
    [navigate, currentLang]
  );

  const handleNavSelect = useCallback((index) => {
    setSliderIndex(index);
  }, []);

  return (
    <div className="app">
      <Header
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        currentLang={currentLang}
      />

      <ProductNav
        open={menuOpen}
        activeIndex={sliderIndex}
        onSelect={handleNavSelect}
      />

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <ProductSlider
          onSelectCenter={handleSelectCenter}
          activeIndex={sliderIndex}
          setActiveIndex={setSliderIndex}
        />
      </div>

      <main className="main">
        {!menuOpen && !currentProduct && showEnter && (
          <div className="home">
            <EnterButton onClick={handleEnterClick} />
          </div>
        )}

        {!menuOpen && !currentProduct && !showEnter && (
          <div className="home">
            <HomeSlider />
          </div>
        )}

        {!menuOpen && currentProduct && (
          <div
            style={{
              animation: "fadeSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ProductDetail product={currentProduct} />
          </div>
        )}
      </main>

      {!menuOpen && <Footer onProductsClick={handleProductsClick} />}

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tr" replace />} />
      <Route path="/:lang" element={<AppContent />} />
      <Route path="/:lang/:slug" element={<AppContent />} />
      <Route path="*" element={<Navigate to="/tr" replace />} />
    </Routes>
  );
}
