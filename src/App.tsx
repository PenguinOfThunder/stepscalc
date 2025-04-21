import { useEffect, lazy } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter, Route, Routes } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { usePreferredColorScheme } from "./hooks";
import { useAppState } from "./store";

const HistoryActivity = lazy(() => import("./HistoryActivity"));
const OptionsActivity = lazy(() => import("./Options"));

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
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;
