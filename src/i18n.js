// src/i18n.js — configuración. Las traducciones viven en src/locales/ (Fase 1b).
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// html lang siempre sincronizado con el idioma activo (AGENTS.md §7).
const syncLang = (lng) => {
  document.documentElement.lang = (lng || 'en').slice(0, 2);
};
i18n.on('languageChanged', syncLang);
syncLang(i18n.language);

export default i18n;
