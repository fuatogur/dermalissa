import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const languages = [
  { code: "tr", label: "Turkce", flag: "\ud83c\uddf9\ud83c\uddf7" },
  { code: "en", label: "English", flag: "\ud83c\uddec\ud83c\udde7" },
  { code: "de", label: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea" },
  { code: "fr", label: "Francais", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { code: "es", label: "Espanol", flag: "\ud83c\uddea\ud83c\uddf8" },
  { code: "it", label: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9" },
  { code: "pt", label: "Portugues", flag: "\ud83c\uddf5\ud83c\uddf9" },
  { code: "ru", label: "Russkiy", flag: "\ud83c\uddf7\ud83c\uddfa" },
  { code: "ar", label: "Al-Arabiyyah", flag: "\ud83c\uddf8\ud83c\udde6" },
];

export default function Header({ menuOpen, onToggleMenu, currentLang }) {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const navigate = useNavigate();

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLangChange(code) {
    setLangOpen(false);
    if (code !== currentLang) {
      window.location.href = `/${code}`;
    }
  }

  return (
    <header className="header">
      <button
        className={`header__menu-btn ${menuOpen ? "active" : ""}`}
        onClick={onToggleMenu}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="header__logo" onClick={() => navigate(`/${currentLang}`)} style={{ cursor: "pointer" }}>
        <img src="/logo.svg" alt="Dermalissa" />
      </div>

      <div className="header__right" ref={langRef}>
        <div className="header__lang" onClick={() => setLangOpen(!langOpen)}>
          <span style={{ fontSize: 20 }}>{currentLanguage.flag}</span>
          <span>{currentLang.toUpperCase()}</span>
        </div>
        <div className={`header__lang-dropdown ${langOpen ? "open" : ""}`}>
          {languages.map((lang) => (
            <a
              key={lang.code}
              onClick={() => handleLangChange(lang.code)}
              style={{
                fontWeight: lang.code === currentLang ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {lang.flag} {lang.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
