import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { DateInput } from "./DateInput";
import { IntegerInput } from "./IntegerInput";
import { selectAllOnFocus } from "./util";

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
  const [addSteps, setAddSteps] = useState<number>(0);
  useEffect(() => {
    setAddDate(today);
    setAddSteps(0);
  }, [stepsCompleted, today]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      addStepsEntry(addDate, addSteps);
      setAddSteps(0);
      // setAddDate(new Date());
    },
    [addDate, addSteps]
  );
  const isValid = !Number.isFinite(addSteps) || addSteps <= 0;

  return (
    <Form
      className="row row-cols-1 row-cols-sm-3"
      onSubmit={handleSubmit}>
      <FloatingLabel
        className="col mt-1"
        controlId="add_date"
        label={t("history.table.header.date")}>
        <DateInput
          required
          onValueChange={setAddDate}
          currentValue={addDate}
        />
      </FloatingLabel>
      <FloatingLabel
        label={t("history.table.header.steps")}
        controlId="add_steps"
        className="col mt-1">
        <IntegerInput
          value={addSteps}
          onValueChange={setAddSteps}
          min={0}
          required
          onFocus={selectAllOnFocus}
          autoFocus
        />
      </FloatingLabel>
      <Stack
        className="col mt-1"
        direction="horizontal"
        gap={2}>
        <Button
          type="submit"
          variant="primary"
          title={t("history.add_btn.title")}
          disabled={isValid}>
          <PlusLg className="me-1 mb-1" />
          {t("history.add_btn.label")}
        </Button>
      </Stack>
    </Form>
  );
}
