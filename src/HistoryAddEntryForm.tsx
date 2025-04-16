import * as dateFns from "date-fns";
import {
  ChangeEvent,
  EventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState
} from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
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

  const handleStepsInput: EventHandler<ChangeEvent<HTMLInputElement>> =
    useCallback(
      (e) => {
        // since we only expect integers, strip out any extra characters like spaces, periods, and commas
        const val = e.currentTarget.value.replaceAll(/\P{digit}/gu, "");
        const num = val.trim() === "" ? 0 : Number.parseInt(val, 10);
        if (Number.isFinite(num)) {
          setAddSteps(num);
        }
      },
      [setAddSteps]
    );

  return (
    <Form
      className="row row-cols-1 row-cols-sm-3"
      onSubmit={handleSubmit}>
      <FloatingLabel
        className="col mt-1"
        controlId="add_date"
        label={t("history.table.header.date")}>
        <Form.Control
          type="date"
          value={dateFns.formatISO(addDate, { representation: "date" })}
          onChange={(e) => {
            const d = dateFns.parseISO(e.currentTarget.value);
            if (dateFns.isValid(d)) setAddDate(d);
          }}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        label={t("history.table.header.steps")}
        controlId="add_steps"
        className="col mt-1">
        <Form.Control
          type="text"
          min="0"
          value={addSteps}
          required
          onChange={handleStepsInput}
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
          disabled={!Number.isFinite(addSteps) || addSteps <= 0}>
          <PlusLg className="me-1 mb-1" />
          {t("history.add_btn.label")}
        </Button>
      </Stack>
    </Form>
  );
}
