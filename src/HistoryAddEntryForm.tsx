import * as dateFns from "date-fns";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function HistoryAddEntryForm({
  addStepsEntry,
  today,
  stepsCompleted
}: {
  addStepsEntry: (date: Date, steps: number) => void;
  today: Date;
  stepsCompleted: number;
}) {
  const { t } = useTranslation();
  const [addDate, setAddDate] = useState<Date>(today);
  const [addSteps, setAddSteps] = useState<number>(stepsCompleted);
  useEffect(() => {
    setAddDate(today);
    setAddSteps(stepsCompleted);
  }, [stepsCompleted, today]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      addStepsEntry(addDate, addSteps);
      setAddSteps(0);
      setAddDate(new Date());
    },
    [addDate, addSteps]
  );

  return (
    <Form
      className="row"
      onSubmit={handleSubmit}>
      <FloatingLabel
        className="col col-5"
        controlId="add_date"
        label={t("history.table.header.date")}>
        <Form.Control
          type="date"
          value={dateFns.formatISO(addDate, { representation: "date" })}
          onChange={(e) => setAddDate(dateFns.parseISO(e.target.value))}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        label={t("history.table.header.steps")}
        controlId="add_steps"
        className="col col-5">
        <Form.Control
          type="number"
          min="0"
          value={addSteps}
          required
          onChange={(e) => setAddSteps(parseInt(e.target.value, 10))}
          autoFocus
        />
      </FloatingLabel>
      <Form.Group className="col">
        <Button
          className="mt-3"
          type="submit"
          variant="primary"
          title={t("history.add_btn.title")}
          disabled={!Number.isFinite(addSteps) || addSteps <= 0}>
          {t("history.add_btn.label")}
        </Button>
      </Form.Group>
    </Form>
  );
}
