/* eslint-disable require-jsdoc */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { HistoryActivity } from "./HistoryModal.jsx";
import Main from "./Main";
import { OptionsActivity } from "./Options.jsx";
import { usePreferredColorScheme } from "./hooks.js";
import { useAppState } from "./store.js";

function App() {
  const { t, i18n } = useTranslation();
  const themePref = useAppState((state) => state.theme);
  const theme = usePreferredColorScheme();
  useEffect(() => {
    if (themePref != "dark" && themePref != "light") {
      if (theme === undefined) {
        document.documentElement.removeAttribute("data-bs-theme");
      } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
      }
    } else {
      document.documentElement.setAttribute("data-bs-theme", themePref);
    }
  }, [theme, themePref]);

  useEffect(() => {
    // Update title on language change
    document.title = t("app.title");
  }, [i18n.language]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Main />}
          />
          <Route
            path="/history"
            element={<HistoryActivity />}
          />
          <Route
            path="/options"
            element={<OptionsActivity />}
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
