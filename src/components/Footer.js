import React from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';
import '../styles/Footer.css';

/**
 * Footer (feedback del propietario, 2026-10-14): wordmark display, navegación
 * rápida a secciones y canales directos (email, WhatsApp, GitHub). El año se
 * calcula en runtime; los datos de contacto salen de src/data/profile.js
 * (AGENTS.md §3: contenido real del propietario).
 */
function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__wordmark">{`${t('hero_name_1')} ${t('hero_name_2')}`}</p>
          <p className="footer__tagline">{t('footer_tagline')}</p>
        </div>

        <nav className="footer__nav" aria-label={t('footer_nav')}>
          <ul className="footer__links">
            <li><a href="#about">{t('about')}</a></li>
            <li><a href="#skills">{t('skills')}</a></li>
            <li><a href="#projects">{t('proyect')}</a></li>
            <li><a href="#contact">{t('contact')}</a></li>
          </ul>
        </nav>

        <ul className="footer__contact">
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a
              href={profile.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${t('contact_whatsapp')} · ${profile.whatsapp.display}`}
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              {t('github')}
            </a>
          </li>
        </ul>
      </div>

      <p className="footer__copy">
        {`© ${year} ${t('hero_name_1')} ${t('hero_name_2')} · ${t('footer_rights')} · ${t('location')}`}
      </p>
    </footer>
  );
}

export default Footer;
