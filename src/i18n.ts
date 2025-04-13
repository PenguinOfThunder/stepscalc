import i18next from "i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// statically imported translations
import enUSTranslation from "./locales/en/translation.json";
import esESTranslation from "./locales/es/translation.json";
import nbNOTranslation from "./locales/nb/translation.json";
import nnNOTranslation from "./locales/nn/translation.json";
// Set debug mode based on environment
const debugMode = process.env.NODE_ENV === "development";

/**
 * Creates a function to format language display names using the Intl.DisplayNames API.
 *
 * @param {string} lng - The primary language to use for formatting.
 * @param {Object} [options={}] - Additional options for configuring the formatter.
 * @param {string} [options.to] - An optional secondary language to prioritize in formatting.
 * @param {string} [options.type="language"] - The type of names to format (default is "language").
 * @param {Object} [options.localeMatcher] - The locale matching algorithm to use ("lookup" or "best fit").
 * @returns {Function} A function that takes a language code and returns its formatted display name.
 *
 * @example
 * const formatName = formatDisplayName('en', { to: 'fr' });
 * console.log(formatName('es')); // Outputs the display name of 'es' in French, falling back to English.
 */
export function formatDisplayName(lng: string | undefined, options: any = {}) {
  const toLang: string[] = lng ? [lng] : [];
  if (options.to) {
    toLang.unshift(options.to);
  }
  const dnf = new Intl.DisplayNames(toLang, {
    type: "language",
    ...options
  });
  return (value: any): string => value === undefined ? "" : dnf.of(value) ?? "";
}

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
    // update when localizations are added
    supportedLngs: ["en", "es", "nb", "nn"],
    partialBundledLanguages: true,
    // detection: {
    //   order: ["querystring", "localStorage", "navigator"]
    // },
    resources: {
      en: { translation: enUSTranslation },
      es: { translation: esESTranslation },
      nb: { translation: nbNOTranslation },
      nn: { translation: nnNOTranslation }
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });
i18next.services.formatter?.addCached("displayName", formatDisplayName);
i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});
export default i18next;
