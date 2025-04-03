/* eslint-disable require-jsdoc */
import { useCallback, useMemo } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import {
  CircleHalf,
  PersonWalking,
  Sliders,
  Translate
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useAppState } from "./store";

const goalSuggestions = [6000, 7000, 10_000, 15_000].map((ds) => ({
  daily_steps: ds,
  monthly_steps: ds * 30
}));

function Options({ show, handleClose }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const lngList = useMemo(
    () => i18n.options.supportedLngs.filter((l) => l !== "cimode"),
    [i18n]
  );
  const changeTheme = useAppState((state) => state.changeTheme);
  const theme = useAppState((state) => state.theme);
  const changeGoal = useAppState((state) => state.changeGoal);
  const stepsRequired = useAppState((state) => state.stepsRequired);

  const handleGoalChange = useCallback((e) => {
    const newGoal = Number.parseInt(e.currentTarget.value, 10);
    if (Number.isFinite(newGoal)) {
      changeGoal(newGoal);
    } else {
      changeGoal(0);
    }
  }, []);

  const handleThemeChange = useCallback(
    (e) => {
      changeTheme(e.currentTarget.value);
    },
    [changeTheme]
  );

  const handleLanguageChange = useCallback(
    (e) => {
      const newLang = e.currentTarget.value;
      i18n.changeLanguage(newLang);
    },
    [i18n]
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation
      backdrop="static"
      scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          <Sliders className="mb-1 me-2" />
          {t("options.title")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="daily-step-goal">
            <Form.Label>{t("monthly_step_goal.label")}</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <PersonWalking />
              </InputGroup.Text>
              <Form.Control
                name="daily-step-goal"
                type="number"
                min="0"
                step="1000"
                value={stepsRequired}
                onChange={handleGoalChange}
                list="goal-suggestions"
              />
              <datalist id="goal-suggestions">
                {goalSuggestions.map((gs) => (
                  <option
                    key={gs.monthly_steps}
                    value={gs.monthly_steps}>
                    {t("goal-suggestions.option.label", gs)}
                  </option>
                ))}
              </datalist>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="app-theme-select">
            <Form.Label>{t("theme.label")}</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <CircleHalf />
              </InputGroup.Text>
              <Form.Select
                name="app-theme"
                value={theme}
                onChange={handleThemeChange}>
                <option value="auto">{t("theme.auto")}</option>
                <option value="light">{t("theme.light")}</option>
                <option value="dark">{t("theme.dark")}</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="app-lang-select">
            <Form.Label>{t("app-lang.label")}</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Translate />
              </InputGroup.Text>
              <Form.Select
                name="app-lang"
                value={lng}
                onChange={handleLanguageChange}>
                {lngList.map((lc) => (
                  <option
                    key={lc}
                    value={lc}
                    lang={lc}>
                    {t("app-lang.option.label", { lang: lc, to: lc })} ({lc})
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Options;
