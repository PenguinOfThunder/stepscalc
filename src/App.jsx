/* eslint-disable require-jsdoc */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import { usePreferredColorScheme } from "./hooks.js";
import { useAppState } from "./store.js";

function App() {
  const { t, i18n } = useTranslation();
  const themePref = useAppState((state) => state.theme);
  const theme = usePreferredColorScheme();
  useEffect(() => {
    if (themePref != "dark" && themePref != "light") {
      document.documentElement.setAttribute("data-bs-theme", theme);
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
      <Main />
      <Footer />
    </>
  );
}

export default App;
