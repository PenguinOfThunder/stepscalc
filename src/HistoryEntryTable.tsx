import * as dateFns from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import {
  BarChartLineFill,
  ChevronDown,
  ChevronRight
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { TransitionGroup } from "react-transition-group";
import { HistoryChart } from "./HistoryChart";
import { HistoryDataRow } from "./HistoryDataRow";
import { HistoryDataEntry } from "./store";

function buildTableData(
  historyData: HistoryDataEntry[],
  filterFromDate: Date,
  filterToDate: Date
) {
  const interval = {
    start: dateFns.startOfDay(filterFromDate).getTime(),
    end: dateFns.endOfDay(filterToDate).getTime()
  };
  return historyData
    .filter(
      (entry) => entry.date >= interval.start && entry.date <= interval.end
    )
    .toSorted((a, b) => -dateFns.differenceInMilliseconds(a.date, b.date));
}

export function HistoryEntryTable({
  historyData,
  filterFromDate,
  filterToDate
}: {
  historyData: HistoryDataEntry[];
  filterFromDate: Date;
  filterToDate: Date;
}) {
  const { t } = useTranslation();
  const [showChart, setShowChart] = useState(false);
  const handleOpenChartClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      setShowChart(true);
    },
    [setShowChart]
  );
  const handleCloseChartClick = useCallback(() => {
    setShowChart(false);
  }, [setShowChart]);

  const seriesSorted = useMemo(
    () => buildTableData(historyData, filterFromDate, filterToDate),
    [historyData, filterFromDate, filterToDate]
  );
  const seriesSum = seriesSorted.reduce((p, c) => p + c.steps, 0);
  const seriesAvg = seriesSum / seriesSorted.length;
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = useCallback(() => {
    setShowDetails(!showDetails);
  }, [setShowDetails, showDetails]);
  return (
    <>
      {/* TODO decide if we need the title bar */}
      <Modal
        show={showChart}
        fullscreen
        scrollable
        onEscapeKeyDown={handleCloseChartClick}>
        <Modal.Header
          closeButton
          closeLabel={t("history.close_btn.label")}
          onHide={handleCloseChartClick}>
          {t("history.table.caption")}
        </Modal.Header>
        <Modal.Body>
          <HistoryChart {...{ filterFromDate, filterToDate }} />
        </Modal.Body>
      </Modal>
      <Table
        className="mt-1"
        size="sm"
        bordered
        responsive
        hover>
        <caption style={{ captionSide: "top" }}>
          <Button
            variant="info"
            size="sm"
            onClick={toggleDetails}
            title={t("history.summary.toggle.title")}
            className="float-start me-1 icon-link">
            {showDetails ? <ChevronDown /> : <ChevronRight />}
          </Button>
          <Button
            size="sm"
            variant="info"
            onClick={handleOpenChartClick}
            className="float-end icon-link me-1"
            title={t("history.open_chart_btn.title")}>
            <BarChartLineFill />
            <span className="visually-hidden">
              {t("history.open_chart_btn.label")}
            </span>
          </Button>
          <div className="mx-auto">{t("history.table.caption")}</div>
          <Alert
            className="mt-1"
            variant="info"
            show={showDetails}
            transition={true}>
            {t("history.table.summary", {
              count: seriesSorted.length,
              sum: seriesSum,
              avg: seriesAvg,
              fromDate: filterFromDate,
              toDate: filterToDate
            })}
          </Alert>
        </caption>
        <thead>
          <tr>
            <th className="col-5 text-center">
              {t("history.table.header.date")}
            </th>
            <th className="col-5 text-center">
              {t("history.table.header.steps")}
            </th>
            <th className="col-2 text-center">&nbsp;</th>
          </tr>
        </thead>
        <TransitionGroup
          component={"tbody"}
          className="item-list"
          appear
          exit
          enter>
          {(seriesSorted || []).map((entry) => (
            <HistoryDataRow
              key={entry.id}
              entry={entry}
            />
          ))}
        </TransitionGroup>
      </Table>
    </>
  );
}
