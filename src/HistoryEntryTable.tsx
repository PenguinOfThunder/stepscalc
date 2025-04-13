import * as dateFns from "date-fns";
import { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TransitionGroup } from "react-transition-group";
import { HistoryDataRow } from "./HistoryDataRow";
import { HistoryDataEntry } from "./store";

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
  const seriesSorted = useMemo(() => {
    const interval = {
      start: dateFns.startOfDay(filterFromDate).getTime(),
      end: dateFns.endOfDay(filterToDate).getTime()
    };
    return historyData
      .filter(
        (entry) => entry.date >= interval.start && entry.date <= interval.end
      )
      .toSorted((a, b) => -dateFns.differenceInMilliseconds(a.date, b.date));
  }, [historyData, filterFromDate, filterToDate]);
  const seriesSum = seriesSorted.reduce((p, c) => p + c.steps, 0);
  const seriesAvg = seriesSum / seriesSorted.length;
  return (
    <>
      <Table
        className="mt-1"
        size="sm"
        bordered
        responsive
        hover>
        <caption style={{ captionSide: "top" }}>
          {t("history.table.caption")}
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
        <tfoot>
          <tr>
            <td colSpan={3} className="text-center">
              {t("history.table.summary", {
                count: seriesSorted.length,
                sum: seriesSum,
                avg: seriesAvg,
                fromDate: filterFromDate,
                toDate: filterToDate
              })}
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
