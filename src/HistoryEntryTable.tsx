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
          classNames="item"
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
            <td
              colSpan={3}
              className="text-end text-muted">
              <small>
                {t("history.table.summary", {
                  count: seriesSorted.length,
                  fromDate: filterFromDate,
                  toDate: filterToDate
                })}
              </small>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
