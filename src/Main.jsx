/* eslint-disable require-jsdoc */
import * as dateFns from "date-fns";
import { useCallback, useMemo } from "react";
import { Alert, Button, Form, InputGroup, ProgressBar } from "react-bootstrap";
import { Calculator, CalendarDate, Icon123 } from "react-bootstrap-icons";
import { withTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import { useAppState } from "./store";

function calc(today, stepsCompleted, stepsRequired) {
  const values = {
    today,
    stepsCompleted,
    stepsRequired,
    avgStepsPerDay: Number.NaN,
    projDaysRemain: Number.NaN,
    dayToComplete: undefined,
    fractionComplete: 0,
    stepsRemaining: Number.NaN,
    stepsRemainingPerDay: Number.NaN
  };
  if (dateFns.isValid(today)) {
    const monthStart = dateFns.startOfMonth(today);
    const monthEnd = dateFns.endOfMonth(today);
    const daysRemaining = dateFns.differenceInDays(monthEnd, today);
    const stepsRemaining =
      stepsRequired > 0 ? stepsRequired - stepsCompleted : 0;
    const stepsRemainingPerDay = Math.ceil(stepsRemaining / daysRemaining);
    const daysPast = dateFns.differenceInDays(today, monthStart) + 1;
    const avgStepsPerDay = stepsCompleted / daysPast;
    const projDaysRemain = Math.ceil(stepsRemaining / avgStepsPerDay);
    const dayToComplete = dateFns.addDays(today, projDaysRemain);
    const fractionComplete = stepsCompleted / stepsRequired;
    values.avgStepsPerDay = avgStepsPerDay;
    values.projDaysRemain = projDaysRemain;
    values.dayToComplete = dayToComplete;
    values.fractionComplete = fractionComplete;
    values.stepsRemaining = stepsRemaining;
    values.stepsRemainingPerDay = stepsRemainingPerDay;
    values.stepsCompleted = stepsCompleted;
    values.stepsRequired = stepsRequired;
  }
  return values;
}

function Main({ t }) {
  const { today, setToday, stepsCompleted, setStepsCompleted, stepsRequired } =
    useAppState(
      useShallow((state) => ({
        today: state.today,
        setToday: state.setToday,
        stepsCompleted: state.stepsCompleted,
        stepsRequired: state.stepsRequired,
        setStepsCompleted: state.setStepsCompleted
      }))
    );
  const cv = calc(today, stepsCompleted, stepsRequired);
  // Determine message text
  const message = useMemo(() => {
    if (
      Number.isFinite(cv.avgStepsPerDay) &&
      Number.isFinite(cv.projDaysRemain) &&
      cv.projDaysRemain > 0
    ) {
      return t("predicted_days.text", {
        avgStepsPerDay: cv.avgStepsPerDay,
        projDaysRemain: cv.projDaysRemain,
        dayToComplete: cv.dayToComplete,
        formatParams: {
          projDaysRemain: { style: "long", numeric: "auto" },
          dayToComplete: {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          }
        }
      });
    } else if (cv.projDaysRemain <= 0) {
      // "Congratulations, you are done with your steps for the month!";
      return t("congrats.text");
    } else {
      // "Hint: Fill in the form and press Calculate";
      return t("hint.text");
    }
  }, [
    cv.today,
    cv.avgStepsPerDay,
    cv.projDaysRemain,
    cv.dayToComplete,
    cv.stepsCompleted,
    cv.stepsRequired,
    cv,
    t
  ]);

  const handleChangeToday = useCallback((e) => {
    const newDate = dateFns.parseISO(e.currentTarget.value);
    if (dateFns.isValid(newDate)) {
      setToday(newDate);
    }
  }, []);

  const handleChangeStepsCompleted = useCallback(
    (e) => {
      const count = Number.parseInt(e.currentTarget.value);
      if (Number.isFinite(count, 10)) {
        setStepsCompleted(count);
      }
    },
    [setStepsCompleted]
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  return (
    <main>
      <Form
        id="calc-form"
        className="needs-validation"
        action="#"
        method="post"
        noValidate
        onSubmit={handleSubmit}>
        <InputGroup className="mb-1 form-floating">
          <Form.Control
            id="today"
            name="today"
            type="date"
            value={dateFns.formatISO(today, { representation: "date" })}
            onChange={handleChangeToday}
            required
            placeholder={t("today.placeholder")}
          />
          <Form.Label htmlFor="today">{t("today.label")}</Form.Label>
          <InputGroup.Text>
            <CalendarDate />
          </InputGroup.Text>
        </InputGroup>
        <InputGroup className="form-floating mb-1">
          <Form.Control
            id="steps_completed"
            name="steps_completed"
            type="number"
            min="0"
            step="100"
            required
            placeholder="nnnnnn"
            autoFocus
            value={stepsCompleted}
            onChange={handleChangeStepsCompleted}
          />
          <Form.Label htmlFor="steps_completed">
            {t("steps_completed.label")}
          </Form.Label>
          <InputGroup.Text>
            <Icon123 />
          </InputGroup.Text>
        </InputGroup>
        <InputGroup className="form-floating mb-1">
          <Form.Control
            id="steps_required"
            name="steps_required"
            type="number"
            value={stepsRequired}
            min="0"
            step="1000"
            required
            readOnly
            placeholder="nnnnnn"
          />
          <Form.Label htmlFor="steps_required">
            {t("steps_required.label")}
          </Form.Label>
          <InputGroup.Text>
            <Icon123 />
          </InputGroup.Text>
        </InputGroup>
        <InputGroup className="form-floating mb-1">
          <Form.Control
            id="steps_remaining"
            name="steps_remaining"
            readOnly
            placeholder="nnnnnn"
            value={cv.stepsRemaining}
          />
          <Form.Label htmlFor="steps_remaining">
            {t("steps_remaining.label")}
          </Form.Label>
        </InputGroup>
        <InputGroup className="form-floating mb-1">
          <Form.Control
            id="steps_remaining_per_day"
            name="steps_remaining_per_day"
            readOnly
            placeholder="nnnn"
            value={cv.stepsRemainingPerDay}
          />
          <Form.Label htmlFor="steps_remaining_per_day">
            {t("steps_remaining_per_day.label")}
          </Form.Label>
        </InputGroup>
        <div className="mt-2 mb-2">
          <Button
            variant="primary"
            type="submit">
            <Calculator className="me-1 mb-1" />
            {t("calc-btn.label")}
          </Button>
        </div>
      </Form>
      <ProgressBar
        variant="success"
        className="overflow-visible"
        now={cv.fractionComplete * 100}
        min={0}
        max={100}
        label={t("progress.text", { fractionComplete: cv.fractionComplete })}
      />

      <Alert
        variant="info"
        className="mt-2">
        {message}
      </Alert>
    </main>
  );
}

export default withTranslation()(Main);
