/* eslint-disable max-len */
/* eslint-env browser */
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import * as dateFns from "date-fns";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";
import locI18next from "loc-i18next";
import {
  followColorScheme,
  getPreferredTheme,
  setTheme,
  setStoredTheme
} from "./bootstrap-helpers.js";
import DisplayNamesPostProcessor from "./i18nextDisplayNamesPostProcessor.js";
// statically imported translations
import enUSTranslation from "./locales/en/translation.json";
import nbNOTranslation from "./locales/nb/translation.json";
import nnNOTranslation from "./locales/nn/translation.json";
import esESTranslation from "./locales/es/translation.json";
// Set debug mode based on environment
const debugMode = process.env.NODE_ENV === "development";

/**
 * Handles the language change event and updates the UI accordingly.
 * @returns {void}
 */
function handleLanguageChanged() {
  locI18next.init(i18next, {
    selectorAttr: "data-i18n",
    useOptionsAttr: true
  })("*[data-i18n]");
  const langSelect = document.getElementById("app-lang-select");
  if (langSelect) {
    langSelect.value = i18next.resolvedLanguage;
  }
  calc();
}

/**
 * Initializes the language settings for the application.
 * Sets up i18next with chained backends, language detection, and localization.
 * @returns {void}
 */
function initI18n() {
  // Localize
  i18next
    .use(i18nextBrowserLanguageDetector)
    .use(DisplayNamesPostProcessor)
    // .use(ChainedBackend)
    .on("languageChanged", handleLanguageChanged);
  i18next.init({
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
  handleLanguageChanged();
}

const formatDisplayName = (lng, options) => {
  const toLang = [lng];
  if (options["to"]) {
    toLang.unshift(options["to"]);
  }
  const dnf = new Intl.DisplayNames(toLang, {
    type: "language",
    ...options
  });
  return (value) => dnf.of(value);
};

/**
 * Update calculated values
 * @returns {void}
 */
function calc() {
  try {
    /** @type {HTMLFormElement} */
    const form = document.getElementById("calc-form");
    const stepsCompleted = Number.parseInt(
      form.elements.steps_completed.value,
      10
    );
    const stepsRequired = Number.parseInt(
      form.elements.steps_required.value,
      10
    );
    const progressBarContainer = document.getElementById("steps_progress");
    const progressBar = progressBarContainer.querySelector(".progress-bar");
    // Calculate
    const today = dateFns.parseISO(form.elements.today.value);
    if (dateFns.isValid(today)) {
      const monthStart = dateFns.startOfMonth(today);
      const monthEnd = dateFns.endOfMonth(today);
      const daysRemaining = dateFns.differenceInDays(monthEnd, today);
      const stepsRemaining =
        stepsRequired > 0 ? stepsRequired - stepsCompleted : 0;
      const stepsRemainingPerDay = Math.ceil(stepsRemaining / daysRemaining);
      const daysPast = dateFns.differenceInDays(today, monthStart) + 1;
      const avgStepsPerDay = stepsCompleted / daysPast;
      const projDaysRemain = Math.ceil(stepsRemaining / avgStepsPerDay);
      const dayToComplete = dateFns.addDays(today, projDaysRemain);
      const fractionComplete = stepsCompleted / stepsRequired;
      const msgEl = document.getElementById("message");
      if (Number.isFinite(avgStepsPerDay) && projDaysRemain > 0) {
        msgEl.innerText = i18next.t("predicted_days.text", {
          avgStepsPerDay,
          projDaysRemain,
          dayToComplete,
          formatParams: {
            projDaysRemain: { style: "long", numeric: "auto" },
            dayToComplete: {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric"
            }
          }
        });
      } else if (projDaysRemain <= 0) {
        // "Congratulations, you are done with your steps for the month!";
        msgEl.innerText = i18next.t("congrats.text");
      } else {
        // "Hint: Fill in the form and press Calculate";
        msgEl.innerText = i18next.t("hint.text");
      }
      // set form values
      form.elements.steps_remaining.value = Number.isFinite(stepsRemaining)
        ? `${stepsRemaining.toLocaleString()}`
        : i18next.t("not.available");
      form.elements.steps_remaining_per_day.value = Number.isFinite(
        stepsRemainingPerDay
      )
        ? `${stepsRemainingPerDay.toLocaleString()}`
        : i18next.t("not.available");
      // Set progress bar
      if (Number.isFinite(fractionComplete)) {
        // progressBarContainer.classList.add("invisible");
        progressBar.innerText = i18next.t("progress.text", {
          fractionComplete
        });
        progressBar.style.width = `${Math.ceil(fractionComplete * 100)}%`;
        progressBar.setAttribute(
          "aria-valuenow",
          Math.ceil(fractionComplete * 100)
        );
      } else {
        // progressBarContainer.classList.add("invisible");
      }
    } else {
      form.elements.steps_remaining.value = "";
      form.elements.steps_remaining_per_day.value = "";
      progressBar.innerText = "";
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

/**
 * Restore the saved step goal from localStorage
 * @returns {void}
 */
function restoreSavedGoal() {
  const savedGoal = Number.parseInt(localStorage.getItem("steps_required"), 10);
  if (Number.isInteger(savedGoal)) {
    document.getElementById("steps_required").value = String(savedGoal);
  }
}

/**
 * Initialize defaults and event handlers
 * @returns {void} Nothing
 */
function init() {
  try {
    // Handle theme
    setTheme(getPreferredTheme());
    followColorScheme();

    initI18n();

    // Fill in defaults
    /** @type {HTMLFormElement} */
    const form = document.getElementById("calc-form");
    form.elements.today.value = dateFns.format(new Date(), "yyyy-MM-dd");

    // Wire up event handlers
    document
      .getElementById("app-theme-select")
      .addEventListener("change", (e) => {
        const theme = e.target.value;
        setTheme(theme);
        setStoredTheme(theme);
      });
    document
      .getElementById("daily-step-goal")
      .addEventListener("change", (e) => {
        const newVal = e.target.value;
        const form = document.getElementById("calc-form");
        form.elements.steps_required.value = newVal;
        localStorage.setItem("steps_required", newVal);
      });
    document
      .getElementById("app-lang-select")
      .addEventListener("change", (e) => {
        const newVal = e.target.value;
        i18next.changeLanguage(newVal);
      });

    const optionsModal = document.getElementById("optionsModal");
    optionsModal.addEventListener("show.bs.modal", () => {
      const form = document.getElementById("calc-form");
      const optForm = document.getElementById("optionsForm");
      optForm.elements["daily-step-goal"].value =
        form.elements.steps_required.value;
    });
    optionsModal.addEventListener("hidden.bs.modal", () => {
      calc();
    });
    // Recalculate when window is focused
    window.addEventListener("focus", calc, false);

    // Handle form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
      }
      // form.classList.add("was-validated");
      calc();
      return false;
    });
    // Recalculate when an input is updated
    ["today", "steps_completed", "steps_required"].forEach((id) => {
      const e = document.getElementById(id);
      e.addEventListener("change", () => {
        calc();
      });
    });
    document
      .getElementById("steps_completed")
      .addEventListener("focus", (e) => {
        e.target.select(); // select all when focused
      });
    // Calculate initial value
    restoreSavedGoal();
    calc();
  } catch (err) {
    console.error(err);
    window.alert(`ERROR: ${err}`);
  }
}

// Wait for page to be fully loaded
window.addEventListener("DOMContentLoaded", init, false);
