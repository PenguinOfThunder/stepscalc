import classNames from "classnames";
import * as dateFns from "date-fns";
import { Badge, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppState } from "./store";
/**
 * Render a localized monthly calendar.
 * Uses Intl to determine names of days, months, first day of week, etc.
 */
export function MonthlyCalendar({ today }: { today: Date }) {
  const { t, i18n } = useTranslation();
  const findHistoryEntryByDate = useAppState(
    (state) => state.findHistoryEntryByDate
  );
  const interval = {
    start: dateFns.startOfMonth(today),
    end: dateFns.endOfMonth(today)
  };
  // TODO find a portable way to determine this https://caniuse.com/?search=getWeekInfo
  const weekOptions: dateFns.StartOfWeekOptions<Date> = { weekStartsOn: 0 };
  return (
    <Table
      bordered
      responsive>
      <tr>
        <th
          colSpan={8}
          className="text-center">
          {t("{{ today, datetime(year: numeric; month: long) }}", { today })}
        </th>
      </tr>
      <tr>
        <th className="border text-center">
          {/*t("history.calendar.week")*/}wk
        </th>
        {dateFns
          .eachDayOfInterval({
            start: dateFns.startOfWeek(interval.start, weekOptions),
            end: dateFns.endOfWeek(interval.start, weekOptions)
          })
          .map((dow) => (
            <th className="border text-center">
              {t("{{ dow, datetime(weekday: short) }}", { dow })}
            </th>
          ))}
      </tr>
      {dateFns.eachWeekOfInterval(interval, weekOptions).map((firstDow) => (
        <tr>
          <td className="border text-center text-muted">
            {dateFns.getWeek(firstDow, weekOptions)}
          </td>
          {dateFns
            .eachDayOfInterval({
              start: firstDow,
              end: dateFns.lastDayOfWeek(firstDow, weekOptions)
            })
            .map((day) => (
              <td
                className={classNames(["border", "text-center"], {
                  "text-success": false,
                  "text-muted": !dateFns.isSameMonth(day, today),
                  "fw-bold": dateFns.isSameMonth(day, today),
                  "text-danger": dateFns.isWeekend(day, weekOptions)
                })}>
                <Badge
                  pill
                  bg={classNames({
                    success: findHistoryEntryByDate(day.getTime())
                  })}>
                  {t("{{ val, number }}", { val: day.getDate() })}
                </Badge>
              </td>
            ))}
        </tr>
      ))}
    </Table>
  );
}
