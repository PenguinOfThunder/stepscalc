/* eslint-disable max-len */
/* eslint-env browser */
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/+esm';
import * as dateFns from "https://cdn.jsdelivr.net/npm/date-fns@3.3.1/+esm";
import ChainedBackend from "https://cdn.jsdelivr.net/npm/i18next-chained-backend@4.6.2/+esm";
import LocalStorageBackend from "https://cdn.jsdelivr.net/npm/i18next-localstorage-backend@4.2.0/+esm";
import HttpBackend from "https://cdn.jsdelivr.net/npm/i18next-http-backend@3.0.2/+esm";
import i18nextBrowserLanguageDetector from "https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.4/+esm"
import i18next from "https://cdn.jsdelivr.net/npm/i18next@24.2.3/+esm"
import locI18next from "https://cdn.jsdelivr.net/npm/loc-i18next@0.1.6/+esm";

import {
  followColorScheme,
  getPreferredTheme,
  setTheme,
  setStoredTheme
} from "./bootstrap-helpers.js";

/**
 * Handles the language change event and updates the UI accordingly.
 * @returns {void}
 */
function handleLanguageChanged() {
  locI18next.init(i18next, {
    selectorAttr: "data-i18n"
  })("*[data-i18n]");
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
    .use(ChainedBackend)
    .init({
      "debug": false, // toggle for development
      // "lng": "cimode", // enable for translation
      // appendNamespaceToCIMode: true,
      fallbackLng: "en-US",
      // nonExplicitSupportedLngs: true,
      "supportedLngs": ["en-US", "nb-NO", "es-ES"],
      "preload": ["en-US"],
      "partialBundledLanguages": true,
      "resources": {},
      // Chained backends:
      "backend": {
        "backends": [
          LocalStorageBackend,
          HttpBackend
        ],
        "backendOptions": [
          // local storage
          {
            // "debug": true,
            "expirationTime": 1 * 24 * 60 * 60 * 1000 // 1 day
          },
          // http
          {
            // "debug": true,
            "loadPath": "locales/{{lng}}/{{ns}}.json",
            "crossDomain": true,
          }
        ]
      }
    }).then(() => {
      i18next.on("languageChanged", handleLanguageChanged);
      // window.i18next = i18next;// for interactive debugging
      calc();// force update of calculated text
    });
}

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
      const msgEl = document.getElementById("message");
      if (Number.isFinite(avgStepsPerDay) && projDaysRemain > 0) {
        msgEl.innerText = i18next.t("predicted_days.text",
          {
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
          }
        );
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
    } else {
      form.elements.steps_remaining.value = "";
      form.elements.steps_remaining_per_day.value = "";
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
