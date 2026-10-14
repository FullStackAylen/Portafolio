import React, { useEffect, useRef, useState } from 'react';
import '../styles/Header.css';
import { motion } from 'motion/react';
import { FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

/**
 * Header — barra sticky del sistema (DESIGN_SYSTEM.md §6.6).
 * Mobile-first: botón real con aria-expanded/aria-controls que abre un drawer;
 * Escape y el clic fuera cierran (§6.7). El idioma se elige con un botón +
 * menú; el activo lleva aria-current. El h1 de la página vive en el Hero
 * (AGENTS.md §7: un solo h1) — acá el nombre es texto con la voz display.
 */
function Header() {
  const { t } = useTranslation();
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const currentLang = (i18n.language || 'en').slice(0, 2);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setNavOpen(false);
        setLangOpen(false);
      }
    };
    const onPointerDown = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const closeNav = () => setNavOpen(false);

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="header__container">
        <p className="logo">{`${t('hero_name_1')} ${t('hero_name_2')}`}</p>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={navOpen}
          aria-controls="site-nav"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span aria-hidden="true">{navOpen ? <FaTimes /> : <FaBars />}</span>
          <span className="visually-hidden">
            {navOpen ? t('nav_close') : t('nav_open')}
          </span>
        </button>

        <nav
          id="site-nav"
          aria-label={t('nav_label')}
          className={navOpen ? 'header__nav header__nav--open' : 'header__nav'}
        >
          <ul className="nav-links">
            <li><a href="#about" onClick={closeNav}>{t('about')}</a></li>
            <li><a href="#skills" onClick={closeNav}>{t('skills')}</a></li>
            <li><a href="#projects" onClick={closeNav}>{t('proyect')}</a></li>
            <li><a href="#contact" onClick={closeNav}>{t('contact')}</a></li>
            <li className="language" ref={langRef}>
              <button
                type="button"
                className="language__toggle"
                aria-haspopup="true"
                aria-expanded={langOpen}
                aria-controls="language-menu"
                onClick={() => setLangOpen((open) => !open)}
              >
                <FaGlobe aria-hidden="true" />
                <span className="visually-hidden">{t('language_label')}</span>
              </button>
              {langOpen && (
                <ul id="language-menu" className="language__menu">
                  <li>
                    <button
                      type="button"
                      aria-current={currentLang === 'en' ? 'true' : undefined}
                      onClick={() => changeLanguage('en')}
                    >
                      {t('en')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      aria-current={currentLang === 'es' ? 'true' : undefined}
                      onClick={() => changeLanguage('es')}
                    >
                      {t('es')}
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;
