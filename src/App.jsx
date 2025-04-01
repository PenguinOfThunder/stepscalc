/* eslint-disable require-jsdoc */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";

function App() {
  const { t, i18n } = useTranslation();

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
