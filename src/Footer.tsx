import { Github, Bug } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="container text-center">
      <div className="row">
        <div className="col text-end">
          <small className="text-secondary">
            {__APP_NAME__} {__APP_VERSION__}
          </small>
        </div>
        <div className="col-auto text-center">
          <a id="report-bug-link"
            className="icon-link link-secondary link-underline-opacity-0"
            href={__APP_BUG_REPORT_URL__}
            target="_blank">
            <Bug className="me-1" />
            <span>{t("app.footer.issues")}</span>
          </a>
        </div>
        <div className="col text-start">
          <a id="source-code-link"
            className="icon-link link-secondary link-underline-opacity-0"
            href={__APP_SOURCE_CODE_URL__}
            target="_blank">
            <Github className="me-1" />
            <span>{t("app.footer.github")}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

