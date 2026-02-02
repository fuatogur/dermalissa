import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const languages = [
  { code: "tr", label: "Türkçe", flag: "/tr.svg" },
  { code: "en", label: "English", flag: "/sh.svg" },
  { code: "de", label: "Deutsch", flag: "/de.svg" },
  { code: "fr", label: "Français", flag: "/fr.svg" },
  { code: "es", label: "Español", flag: "/es.svg" },
  { code: "it", label: "Italiano", flag: "/it.svg" },
  { code: "pt", label: "Português", flag: "/pt.svg" },
  { code: "ru", label: "Русский", flag: "/ru.svg" },
  { code: "ar", label: "العربية", flag: "/sa.svg" },
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
          <img src={currentLanguage.flag} alt={currentLanguage.label} style={{ width: "auto", height: 20 }} />
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
              <img src={lang.flag} alt={lang.label} style={{ width: "auto", height: 18 }} /> {lang.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
