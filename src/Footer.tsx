import { Github } from "react-bootstrap-icons";

export function Footer() {
  return (
    <footer className="container text-center">
      <div className="row">
        <div className="col text-end">
          <small className="text-secondary">
            {__APP_NAME__} {__APP_VERSION__}
          </small>
        </div>
        <div className="col text-start">
          <a
            className="link-secondary link-underline-opacity-0"
            href={__APP_URL__}
            target="_blank">
            <Github className="me-1" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

