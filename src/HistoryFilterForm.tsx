import * as dateFns from "date-fns";
import { FormEventHandler, useCallback, useState } from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { ArrowCounterclockwise, Funnel } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { DateInput } from "./DateInput";

export function HistoryFilterForm({
  defaultFromDate,
  defaultToDate,
  applyFilter
}: {
  defaultFromDate: Date;
  defaultToDate: Date;
  applyFilter: (fromDate: Date, toDate: Date) => void;
}) {
  const { t } = useTranslation();
  // filters default to current month
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      applyFilter(fromDate, toDate);
    },
    [fromDate, toDate]
  );
  const handleReset: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      setFromDate(defaultFromDate);
      setToDate(defaultToDate);
      applyFilter(defaultFromDate, defaultToDate);
    },
    [setFromDate, setToDate, defaultFromDate, defaultToDate]
  );

  const isValid =
    fromDate &&
    toDate &&
    dateFns.isValid(fromDate) &&
    dateFns.isValid(toDate) &&
    dateFns.isAfter(toDate, fromDate);
  return (
    <Form
      className="row row-cols-1 row-cols-sm-3"
      onSubmit={handleSubmit}
      onReset={handleReset}>
      <FloatingLabel
        className="col mt-1"
        controlId="fromDate"
        label={t("history.filter.fromDate.label")}>
        <DateInput
          currentValue={fromDate}
          onValueChange={setFromDate}
          required
          title={t("history.filter.fromDate.title")}
        />
      </FloatingLabel>
      <FloatingLabel
        className="col mt-1"
        controlId="toDate"
        label={t("history.filter.toDate.label")}>
        <DateInput
          currentValue={toDate}
          onValueChange={setToDate}
          required
          title={t("history.filter.toDate.title")}
        />
      </FloatingLabel>
      <Stack
        className="col mt-1"
        direction="horizontal"
        gap={2}>
        <Button
          type="submit"
          disabled={!isValid}
          title={t("history.filter.filter_btn.title")}>
          <Funnel className="mb-1 me-1" />
          {t("history.filter.filter_btn.label")}
        </Button>
        <Button
          type="reset"
          variant="secondary"
          title={t("history.filter.filter_btn_reset.title")}>
          <ArrowCounterclockwise className="me-1 mb-1" />
          <span className="visually-hidden">
            {t("history.filter.filter_btn_reset.label")}
          </span>
        </Button>
      </Stack>
    </Form>
  );
}
