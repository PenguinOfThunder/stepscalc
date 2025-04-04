/* eslint-disable require-jsdoc */
import * as dateFns from "date-fns";
import { useCallback, useMemo } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  InputGroup,
  ProgressBar
} from "react-bootstrap";
import {
  Calculator,
  CalendarDate,
  Icon123,
  ExclamationTriangle,
  HandThumbsUp,
  Trophy
} from "react-bootstrap-icons";
import { useTranslation, withTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import { calc } from "./calculator";
import { useAppState } from "./store";

function selectAllOnFocus(e) {
  e.currentTarget.select();
}

function Main() {
  const { t, i18n } = useTranslation();

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
      const count = Number.parseInt(e.currentTarget.value, 10);
      if (Number.isFinite(count)) {
        setStepsCompleted(count);
      } else {
        setStepsCompleted(0);
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
    <Container as={"main"}>
      <Form
        className="needs-validation"
        action="#"
        method="post"
        noValidate
        onSubmit={handleSubmit}>
        <Form.Group controlId="today">
          <InputGroup className="mb-1 form-floating">
            <Form.Control
              name="today"
              type="date"
              value={dateFns.formatISO(today, { representation: "date" })}
              onChange={handleChangeToday}
              required
              placeholder={t("today.placeholder")}
            />
            <Form.Label>{t("today.label")}</Form.Label>
            <InputGroup.Text onClick={() => setToday(new Date())}>
              <CalendarDate />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="steps_completed">
          <InputGroup className="form-floating mb-1">
            <Form.Control
              name="steps_completed"
              type="number"
              min="0"
              step="100"
              required
              placeholder="nnnnnn"
              autoFocus
              value={stepsCompleted}
              onChange={handleChangeStepsCompleted}
              onFocus={selectAllOnFocus}
            />
            <Form.Label>{t("steps_completed.label")}</Form.Label>
            <InputGroup.Text>
              <Icon123 />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* -- remove this permanently since it's already in options? --
        <Form.Group controlId="steps_required">
          <InputGroup className="form-floating mb-1">
            <Form.Control
              name="steps_required"
              type="number"
              value={stepsRequired}
              min="0"
              step="1000"
              required
              readOnly
              placeholder="nnnnnn"
            />
            <Form.Label>{t("steps_required.label")}</Form.Label>
            <InputGroup.Text>
              <Icon123 />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        */}
        <Form.Group controlId="steps_remaining">
          <InputGroup className="form-floating mb-1">
            <Form.Control
              name="steps_remaining"
              readOnly
              placeholder="nnnnnn"
              value={t("steps_remaining.value", { value: cv.stepsRemaining })}
            />
            <Form.Label>{t("steps_remaining.label")}</Form.Label>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="steps_remaining_per_day">
          <InputGroup className="form-floating mb-1">
            <Form.Control
              name="steps_remaining_per_day"
              readOnly
              placeholder="nnnn"
              value={t("steps_remaining_per_day.value", {
                value: cv.stepsRemainingPerDay
              })}
            />
            <Form.Label>{t("steps_remaining_per_day.label")}</Form.Label>
          </InputGroup>
        </Form.Group>

        <div className="mt-2 mb-2">
          <Button
            variant="primary"
            type="submit"
            className="icon-link">
            <Calculator />
            {t("calc-btn.label")}
          </Button>
        </div>
      </Form>
      <ProgressBar
        className="fw-bold fs-6 p-1"
        variant="success"
        now={cv.fractionComplete * 100}
        min={0}
        max={100}
        style={{ height: "2em" }}
        label={t("progress.text", {
          fractionComplete: cv.fractionComplete,
          stepsCompleted: cv.stepsCompleted,
          stepsRequired: cv.stepsRequired
        })}
      />

      <Alert
        variant={
          cv.isBehind ? "danger" : cv.projDaysRemain <= 0 ? "success" : "info"
        }
        className="mt-2 d-flex align-items-center shadow">
        {cv.isBehind ? (
          <ExclamationTriangle
            className="flex-shrink-0"
            size={"24"}
          />
        ) : cv.projDaysRemain <= 0 ? (
          <Trophy
            className="flex-shrink-0"
            size={"24"}
          />
        ) : (
          <HandThumbsUp
            className="flex-shrink-0"
            size={"24"}
          />
        )}
        <div className="ms-2">{message}</div>
      </Alert>
    </Container>
  );
}

export default Main;
