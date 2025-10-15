import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation resources
import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import mrTranslation from './locales/mr/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  mr: {
    translation: mrTranslation
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: false, // Set to true for debugging

    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Keys to store language preference
      lookupLocalStorage: 'i18nextLng',
      
      // Cache user language
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Language names for display
    supportedLngs: ['en', 'hi', 'mr'],
    
    // Namespaces
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
