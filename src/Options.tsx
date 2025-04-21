/* eslint-disable require-jsdoc */
import { ChangeEvent, useCallback, useMemo } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { CircleHalf, PersonWalking, Translate } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useAppState } from "./store";

// These are listed as a drop-down for browsers that support data lists
const goalSuggestions = [6000, 7000, 10_000, 15_000].map((ds) => ({
  daily_steps: ds,
  monthly_steps: ds * 30
}));

export function OptionsActivity() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const lngList = useMemo<string[]>(
    () =>
      i18n.options.supportedLngs
        ? i18n.options.supportedLngs.filter((l: string) => l !== "cimode")
        : [],
    [i18n]
  );
  const changeTheme = useAppState((state) => state.changeTheme);
  const theme = useAppState((state) => state.theme);
  const changeGoal = useAppState((state) => state.changeGoal);
  const stepsRequired = useAppState((state) => state.stepsRequired);

  const handleGoalChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newGoal = Number.parseInt(e.currentTarget.value, 10);
    if (Number.isFinite(newGoal)) {
      changeGoal(newGoal);
    } else {
      changeGoal(0);
    }
  }, []);

  const handleThemeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      changeTheme(e.currentTarget.value);
    },
    [changeTheme]
  );

  const handleLanguageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newLang = e.currentTarget.value;
      i18n.changeLanguage(newLang);
    },
    [i18n]
  );

  return (
    <Container>
      <Form>
        <fieldset>
          <legend>{t("options.sections.goal.legend")}</legend>
          <Form.Group controlId="options-daily-step-goal">
            <Form.Label>{t("options.monthly_step_goal.label")}</Form.Label>
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
                autoFocus
              />
              <datalist id="goal-suggestions">
                {goalSuggestions.map((gs) => (
                  <option
                    key={gs.monthly_steps}
                    value={gs.monthly_steps}>
                    {t("options.monthly_step_goal.suggestions.label", gs)}
                  </option>
                ))}
              </datalist>
            </InputGroup>
            <Form.Text>{t("options.monthly_step_goal.help")}</Form.Text>
          </Form.Group>
        </fieldset>
        <fieldset>
          <legend>{t("options.sections.app.legend")}</legend>
          <Form.Group controlId="options-theme-select">
            <Form.Label>{t("options.theme.label")}</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <CircleHalf />
              </InputGroup.Text>
              <Form.Select
                value={theme}
                onChange={handleThemeChange}>
                <option value="auto">
                  {t("options.theme.options.auto.label")}
                </option>
                <option value="light">
                  {t("options.theme.options.light.label")}
                </option>
                <option value="dark">
                  {t("options.theme.options.dark.label")}
                </option>
              </Form.Select>
            </InputGroup>
            <Form.Text>{t("options.theme.help")}</Form.Text>
          </Form.Group>
          <Form.Group controlId="options-lang-select">
            <Form.Label>{t("options.lang.label")}</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Translate />
              </InputGroup.Text>
              <Form.Select
                value={lng}
                onChange={handleLanguageChange}>
                {lngList.map((lc) => (
                  <option
                    key={lc}
                    value={lc}
                    lang={lc}>
                    {t("options.lang.option.label", { lang: lc, to: lc })} ({lc}
                    )
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Text>{t("options.lang.help")}</Form.Text>
          </Form.Group>
        </fieldset>
      </Form>
    </Container>
  );
}

export default OptionsActivity;
