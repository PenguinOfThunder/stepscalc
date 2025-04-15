import { Container, Nav, Navbar } from "react-bootstrap";
import {
  PersonWalking,
  Gear,
  ClockHistory,
  EmojiSmile
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Link as RRLink, NavLink as RRNavLink } from "react-router";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient">
      <Navbar
        expand="lg"
        variant="primary"
        className="mb-1">
        <Container fluid>
          <RRLink to="/">
            <Navbar.Brand className="mb-0 h1 icon-link">
              <PersonWalking
                className="text-primary-emphasis"
                title="Logo"
              />
              <span>{t("app.title")}</span>
            </Navbar.Brand>
          </RRLink>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link
                as={RRNavLink}
                to={"/"}
                title={t("app.nav.today.title")}>
                <EmojiSmile className="me-1 mb-1" />
                {t("app.nav.today.label")}
              </Nav.Link>
              <Nav.Link
                as={RRNavLink}
                to={"/history"}
                title={t("app.nav.history.title")}>
                <ClockHistory className="me-1 mb-1" />
                {t("app.nav.history.label")}
              </Nav.Link>
              <Nav.Link
                as={RRNavLink}
                to={"/options"}
                title={t("app.nav.options.title")}>
                <Gear className="me-1 mb-1" />
                {t("app.nav.options.label")}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
