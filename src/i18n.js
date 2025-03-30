import i18next from "i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// statically imported translations
import enUSTranslation from "./locales/en/translation.json";
import nbNOTranslation from "./locales/nb/translation.json";
import nnNOTranslation from "./locales/nn/translation.json";
import esESTranslation from "./locales/es/translation.json";
// Set debug mode based on environment
const debugMode = process.env.NODE_ENV === "development";

const formatDisplayName = (lng, options) => {
  const toLang = [lng];
  if (options.to) {
    toLang.unshift(options.to);
  }
  const dnf = new Intl.DisplayNames(toLang, {
    type: "language",
    ...options
  });
  return (value) => dnf.of(value);
};

// Localize
i18next
  .use(i18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: debugMode, // toggle for development
    // "lng": "cimode", // enable for translation
    // appendNamespaceToCIMode: true,
    fallbackLng: "en",
    nonExplicitSupportedLngs: true,
    supportedLngs: ["en", "nb", "nn", "es"],
    // preload: ["en"],
    partialBundledLanguages: true,
    detection: {
      order: ["querystring", "localStorage", "navigator"]
    },
    resources: {
      en: { translation: enUSTranslation },
      nb: { translation: nbNOTranslation },
      nn: { translation: nnNOTranslation },
      es: { translation: esESTranslation }
    }
  });
i18next.services.formatter.addCached("displayName", formatDisplayName);

export default i18next;
