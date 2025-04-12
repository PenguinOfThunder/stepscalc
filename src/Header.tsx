import { useCallback } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { PersonWalking, Sliders } from "react-bootstrap-icons";
import { createPortal } from "react-dom";
import { useTranslation, withTranslation } from "react-i18next";
import Options from "./Options";
import { useAppState } from "./store";

/* eslint-disable require-jsdoc */
function Header() {
  const { t } = useTranslation();
  const showOptions = useAppState((state) => state.showOptions);
  const setShowOptions = useAppState((state) => state.setShowOptions);
  const handleShowOptionsClick = useCallback(() => {
    setShowOptions(true);
  }, [setShowOptions]);
  const handleOptionsClose = useCallback(() => {
    setShowOptions(false);
  }, [setShowOptions]);
  return (
    <header className="bg-gradient">
      <Navbar
        expand
        variant="primary"
        className="mb-1">
        <Container fluid>
          <Navbar.Brand className="mb-0 h1 icon-link">
            <PersonWalking
              className="text-primary-emphasis"
              title="Logo"
            />
            <span>{t("app.title")}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 200, hide: 200 }}
                overlay={(p) => <Tooltip {...p}>{t("options.title")}</Tooltip>}>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleShowOptionsClick}
                  title={t("options.title")}>
                  <Sliders className="mb-1" />
                </Button>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {createPortal(
        <Options
          show={showOptions}
          handleClose={handleOptionsClose}
        />,
        document.body
      )}
    </header>
  );
}

export default Header;
