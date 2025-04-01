/* eslint-disable require-jsdoc */
import { useCallback } from "react";
import { Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppState } from "./store";
import { Sliders } from "react-bootstrap-icons";

function Options({ show, handleClose }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const changeTheme = useAppState(state => state.changeTheme);
  const theme = useAppState(state => state.theme);
  const changeGoal = useAppState(state => state.changeGoal);
  const stepsRequired = useAppState(state => state.stepsRequired);

  const handleGoalChange = useCallback((e) => {
    const newGoal = Number.parseInt(e.currentTarget.value, 10);
    if (Number.isFinite(newGoal) && newGoal > 0) {
      changeGoal(newGoal);
    }
  }, []);

  const handleThemeChange = useCallback((e) => {
    changeTheme(e.currentTarget.value);
  }, [changeTheme]);

  const handleLanguageChange = useCallback(e => {
    const newLang = e.currentTarget.value;
    i18n.changeLanguage(newLang);
  }, [i18n]);

  return (
    <Modal show={show} onHide={handleClose} animation backdrop="static">
      <div className='modal-content'>
        <Modal.Header closeButton>
          <Modal.Title>
            <Sliders className="mb-1 me-2" />
            {t("options.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='optionsForm'>
            <Form.Group>
              <Form.Label htmlFor='daily-step-goal'>
                {t("monthly_step_goal.label")}
              </Form.Label>
              <Form.Control
                id='daily-step-goal'
                name='daily-step-goal'
                type='number'
                min='0'
                step='1000'
                value={stepsRequired}
                onChange={handleGoalChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='app-theme-select'>{t("theme.label")}</Form.Label>
              <Form.Select
                id='app-theme-select'
                name='app-theme'
                value={theme}
                onChange={handleThemeChange}
              >
                <option value='auto'>{t("theme.auto")}</option>
                <option value='light'>{t("theme.light")}</option>
                <option value='dark'>{t("theme.dark")}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("app-lang.label")}</Form.Label>
              <Form.Select
                id='app-lang-select'
                name='app-lang'
                value={lng}
                onChange={handleLanguageChange}
              >
                {i18n.options.supportedLngs
                  .filter(l => l !== "cimode")
                  .map(lng => (<option key={lng} value={lng} lang={lng}>
                    {t("app-lang.option.label", { lang: lng, to: lng })} ({lng})
                  </option>))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default Options;
