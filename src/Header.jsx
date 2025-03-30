import { useState } from "react";
import { PersonWalking, Sliders } from "react-bootstrap-icons";
import { createPortal } from "react-dom";
import { withTranslation } from "react-i18next";
import Options from "./Options";

/* eslint-disable require-jsdoc */
function Header({ t }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <header>
      <nav className='navbar navbar-expand bg-gradient bg-body-secondary text-body-secondary mb-1'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1'>
            <PersonWalking className='text-primary-emphasis me-1' />
            <span>{t("app.title")}</span>
          </span>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse'
            id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto'>
              <button
                type='button'
                className='nav-item btn'
                data-bs-toggle='modal'
                data-bs-target='#optionsModal'
                onClick={() => setShowOptions(true)}
                title={t("options.title")}>
                <Sliders />
              </button>
            </ul>
          </div>
        </div>
      </nav>
      {createPortal(<Options show={showOptions} />, document.body)}
    </header>
  );
}

export default withTranslation()(Header);
