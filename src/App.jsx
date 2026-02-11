import { useState, useEffect, useCallback, useRef } from "react";
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
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import Contact from "./components/Contact";
import Seo from "./components/Seo";
import { products } from "./data/products";
import { blogPosts } from "./data/blogPosts";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showEnter, setShowEnter] = useState(true);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentLang = pathParts[0] || "tr";

  const isBlogList = pathParts.length >= 2 && pathParts[1] === "blog" && !pathParts[2];
  const isBlogDetail = pathParts.length >= 3 && pathParts[1] === "blog" && pathParts[2];
  const isContact = pathParts.length >= 2 && pathParts[1] === "contact";
  const blogSlug = isBlogDetail ? pathParts[2] : null;
  const currentBlogPost = isBlogDetail ? blogPosts.find((p) => p.slug === blogSlug) || null : null;

  const currentProduct = (() => {
    if (isBlogList || isBlogDetail || isContact) return null;
    if (pathParts.length >= 2) {
      const slug = pathParts[pathParts.length - 1];
      return products.find((p) => p.slug === slug) || null;
    }
    return null;
  })();

  useEffect(() => {
    if (pathParts.length <= 1 && !isBlogList && !isBlogDetail && !isContact) {
      setShowEnter(true);
      setMenuOpen(false);
    }
    if (isBlogList || isBlogDetail || isContact) {
      setShowEnter(false);
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

  const navAnimRef = useRef(null);
  const overlayRef = useRef(null);
  const sliderIndexRef = useRef(sliderIndex);
  useEffect(() => { sliderIndexRef.current = sliderIndex; }, [sliderIndex]);
  useEffect(() => { return () => clearTimeout(navAnimRef.current); }, []);

  const handleNavSelect = useCallback((targetIndex) => {
    clearTimeout(navAnimRef.current);

    const currentIndex = sliderIndexRef.current;
    if (targetIndex === currentIndex) return;

    const total = products.length;
    const fwd = (targetIndex - currentIndex + total) % total;
    const bwd = (currentIndex - targetIndex + total) % total;
    const dir = fwd <= bwd ? 1 : -1;
    const steps = Math.min(fwd, bwd);

    if (steps <= 1) {
      overlayRef.current?.classList.remove("menu-overlay--stepping");
      setSliderIndex(targetIndex);
      return;
    }

    overlayRef.current?.classList.add("menu-overlay--stepping");

    const delay = Math.max(150, Math.min(280, 560 / steps));
    let done = 0;

    const tick = () => {
      done++;
      if (done >= steps) {
        setSliderIndex(targetIndex);
        navAnimRef.current = setTimeout(() => {
          overlayRef.current?.classList.remove("menu-overlay--stepping");
        }, 350);
      } else {
        setSliderIndex((prev) => (prev + dir + total) % total);
        navAnimRef.current = setTimeout(tick, delay);
      }
    };

    tick();
  }, []);

  const pageType = isBlogDetail
    ? "blogDetail"
    : isBlogList
      ? "blog"
      : isContact
        ? "contact"
        : currentProduct
          ? "product"
          : "home";

  return (
    <div className="app">
      <Seo
        lang={currentLang}
        page={pageType}
        slug={currentProduct?.slug || blogSlug}
        product={currentProduct}
        blogPost={currentBlogPost}
      />
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

      <div ref={overlayRef} className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <ProductSlider
          onSelectCenter={handleSelectCenter}
          activeIndex={sliderIndex}
          setActiveIndex={setSliderIndex}
        />
      </div>

      <main className="main">
        {!menuOpen && !currentProduct && !isBlogList && !isBlogDetail && !isContact && showEnter && (
          <div className="home">
            <EnterButton onClick={handleEnterClick} />
          </div>
        )}

        {!menuOpen && !currentProduct && !isBlogList && !isBlogDetail && !isContact && !showEnter && (
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

        {!menuOpen && isBlogList && (
          <div
            style={{
              animation: "fadeSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Blog />
          </div>
        )}

        {!menuOpen && isBlogDetail && (
          <div
            style={{
              animation: "fadeSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <BlogDetail />
          </div>
        )}

        {!menuOpen && isContact && (
          <div
            style={{
              animation: "fadeSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Contact />
          </div>
        )}
      </main>

      {!menuOpen && <Footer onProductsClick={handleProductsClick} currentLang={currentLang} />}

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
      <Route path="/:lang/blog" element={<AppContent />} />
      <Route path="/:lang/blog/:slug" element={<AppContent />} />
      <Route path="/:lang/contact" element={<AppContent />} />
      <Route path="/:lang/:slug" element={<AppContent />} />
      <Route path="*" element={<Navigate to="/tr" replace />} />
    </Routes>
  );
}
