import { useCallback } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { PersonWalking, Sliders } from "react-bootstrap-icons";
import { createPortal } from "react-dom";
import { withTranslation } from "react-i18next";
import Options from "./Options";
import { useAppState } from "./store";

/* eslint-disable require-jsdoc */
function Header({ t }) {
  const showOptions = useAppState(state => state.showOptions);
  const setShowOptions = useAppState(state => state.setShowOptions);
  const handleShowOptionsClick = useCallback(() => {
    setShowOptions(true);
  }, [setShowOptions]);
  const handleOptionsClose = useCallback(() => {
    setShowOptions(false);
  }, [setShowOptions]);
  return (
    <header>
      <Navbar expand bg="gradient" className='bg-body-secondary text-body-secondary mb-1'>
        <Container fluid>
          <Navbar.Brand className='mb-0 h1'>
            <PersonWalking className='text-primary-emphasis me-1' title="Logo" />
            <span>{t("app.title")}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto">
              <Button variant="secondary"
                type='button'
                className='nav-item btn'
                data-bs-toggle='modal'
                data-bs-target='#optionsModal'
                onClick={handleShowOptionsClick}
                title={t("options.title")}>
                <Sliders />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {createPortal(<Options show={showOptions} handleClose={handleOptionsClose} />, document.body)}
    </header>
  );
}

export default withTranslation()(Header);
