import * as dateFns from "date-fns";
import { useCallback, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import { HistoryAddEntryForm } from "./HistoryAddEntryForm";
import { HistoryEntryTable } from "./HistoryEntryTable";
import { HistoryFilterForm } from "./HistoryFilterForm";
import { HistoryDataEntry, useAppState } from "./store";

export function HistoryActivity() {
  const { t } = useTranslation();
  const { addHistoryEntry, stepsCompleted, today } = useAppState(
    useShallow((state) => ({
      addHistoryEntry: state.addHistoryEntry,
      stepsCompleted: state.stepsCompleted,
      today: state.today
    }))
  );

  const historyData = useAppState((state) => state.historyData);
  const [filterFromDate, setFilterFromDate] = useState(
    dateFns.startOfMonth(today)
  );
  const [filterToDate, setFilterToDate] = useState(dateFns.endOfMonth(today));
  const handleApplyFilter = useCallback(
    (fromDate: Date, toDate: Date) => {
      console.log(`Apply filter: ${fromDate} to ${toDate}`);
      setFilterFromDate(fromDate);
      setFilterToDate(toDate);
    },
    [setFilterFromDate, setFilterToDate]
  );

  const addStepsEntry = useCallback(
    (date: Date, steps: number) => {
      const newEntry: HistoryDataEntry = {
        id: crypto.randomUUID(),
        date: date.getTime(),
        steps: steps
      };
      addHistoryEntry(newEntry);
    },
    [addHistoryEntry, today, stepsCompleted]
  );

  return (
    <Container>
      <Tabs
        className="mb-2"
        defaultActiveKey="addEntry">
        <Tab
          eventKey="addEntry"
          title={t("history.tabs.add.title")}>
          <HistoryAddEntryForm
            addStepsEntry={addStepsEntry}
            today={today}
            stepsCompleted={stepsCompleted}
          />
        </Tab>
        <Tab
          eventKey="filter"
          title={t("history.tabs.filter.title")}>
          <HistoryFilterForm
            applyFilter={handleApplyFilter}
            defaultFromDate={dateFns.startOfMonth(today)}
            defaultToDate={dateFns.endOfMonth(today)}
          />
        </Tab>
      </Tabs>
      <HistoryEntryTable
        historyData={historyData}
        filterFromDate={filterFromDate}
        filterToDate={filterToDate}
      />
    </Container>
  );
}
