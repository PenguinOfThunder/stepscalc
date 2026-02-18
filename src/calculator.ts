import * as dateFns from "date-fns";
import { HistoryDataEntry } from "./store";

export type CalcValues = {
  today: Date;
  stepsCompleted: number;
  stepsRequired: number;
  avgStepsPerDay: number | undefined;
  projDaysRemain: number | undefined;
  dayToComplete: Date | undefined;
  fractionComplete: number | undefined;
  stepsRemaining: number | undefined;
  stepsRemainingPerDay: number | undefined;
  isBehind: boolean;
  daysRemaining: number;
  daysPast: number;
};

/**
 * Calculates various statistics related to step tracking for the current month.
 *
 * @param {Date} today - The current date.
 * @param {number} stepsCompleted - The number of steps completed so far.
 * @param {number} stepsRequired - The total number of steps required for the month.
 * @returns {Object} An object containing calculated values such as average steps per day,
 *    projected days remaining, and more.
 */
export function calc(
  today: Date,
  stepsCompleted: number,
  stepsRequired: number
): CalcValues {
  const values: CalcValues = {
    today,
    stepsCompleted,
    stepsRequired,
    avgStepsPerDay: undefined,
    projDaysRemain: undefined,
    dayToComplete: undefined,
    fractionComplete: undefined,
    stepsRemaining: undefined,
    stepsRemainingPerDay: undefined,
    isBehind: false,
    daysRemaining: 0,
    daysPast: 0
  };
  if (dateFns.isValid(today)) {
    const monthStart = dateFns.startOfMonth(today);
    const monthEnd = dateFns.endOfMonth(today);
    // This is the number of days *after* today
    const daysRemaining = dateFns.differenceInCalendarDays(monthEnd, today);
    const stepsRemaining =
      stepsRequired > 0 ? stepsRequired - stepsCompleted : 0;
    const stepsRemainingPerDay =
      daysRemaining > 0
        ? Math.ceil(stepsRemaining / daysRemaining)
        : stepsRemaining;
    const daysPast = dateFns.differenceInDays(today, monthStart) + 1;
    const avgStepsPerDay = stepsCompleted / daysPast;
    const projDaysRemain =
      avgStepsPerDay > 0
        ? Math.ceil(stepsRemaining / avgStepsPerDay)
        : undefined;
    const dayToComplete = dateFns.addDays(today, projDaysRemain ?? Infinity);
    const fractionComplete = stepsCompleted / stepsRequired;
    values.avgStepsPerDay = avgStepsPerDay;
    values.projDaysRemain = projDaysRemain;
    values.dayToComplete = dayToComplete;
    values.daysRemaining = daysRemaining;
    values.daysPast = daysPast;
    values.fractionComplete = fractionComplete;
    values.stepsRemaining = stepsRemaining;
    values.stepsRemainingPerDay = stepsRemainingPerDay;
    values.stepsCompleted = stepsCompleted;
    values.stepsRequired = stepsRequired;
    values.isBehind = dateFns.isAfter(dayToComplete, monthEnd);
  }
  return values;
}

export interface HistoryTableData {
  data: HistoryDataEntry[];
  /** Number of samples */
  n: number;
  /** Sum of all samples or 0 if none */
  sum: number;
  /** Average of samples over number of samples */
  avg: number | undefined;
  /** Start of filter interval */
  intervalStart: number;
  /** End of filter interval */
  intervalEnd: number;
  /** Actual first sample date */
  actualStart: number | undefined;
  /** Actual last sample date */
  actualEnd: number | undefined;
  /** Number of days in range */
  actualRange: number | undefined;
}

export const sortedByDate = (a: HistoryDataEntry, b: HistoryDataEntry) => dateFns.differenceInMilliseconds(a.date, b.date);

export const sortedByDateReverse = (a: HistoryDataEntry, b: HistoryDataEntry) => -dateFns.differenceInMilliseconds(a.date, b.date);

export function buildTableData(
  historyData: HistoryDataEntry[],
  filterFromDate: Date,
  filterToDate: Date
): HistoryTableData {
  const interval = {
    start: dateFns.startOfDay(filterFromDate).getTime(),
    end: dateFns.endOfDay(filterToDate).getTime()
  };
  const data = historyData
    .filter(
      (entry) => entry.date >= interval.start && entry.date <= interval.end
    )
    .toSorted(sortedByDateReverse);
  const n = data.length; // N = number of items recorded, not days!
  const sum = data.reduce((p, c) => p + c.steps, 0);
  const avg = n != 0 ? sum / n : undefined;
  // Find first actual recorded element
  const actualStart = data
    .map((e) => e.date)
    .reduce<
      number | undefined
    >((p, c) => (p === undefined || c < p ? c : p), undefined);
  // Find last actual recorded element
  const actualEnd = data
    .map((e) => e.date)
    .reduce<
      number | undefined
    >((p, c) => (p === undefined || c > p ? c : p), undefined);
  // include partial days
  const actualRange =
    actualStart && actualEnd
      ? 1 + dateFns.differenceInDays(actualEnd, actualStart)
      : undefined;
  return {
    data,
    sum,
    avg,
    n,
    intervalStart: interval.start,
    intervalEnd: interval.end,
    actualStart,
    actualEnd,
    actualRange
  };
}

export interface ChartData {
  categories: number[];
  stepsSeries: number[];
  cumSeries: number[]
}

export function buildChartData(
  historyData: HistoryDataEntry[],
  filterFromDate: Date,
  filterToDate: Date
): ChartData {
  const interval = {
    start: filterFromDate.getTime(),
    end: filterToDate.getTime()
  };

  // group data by day
  const groupedData = historyData
    // filter to range
    .filter(
      (entry) => entry.date >= interval.start && entry.date <= interval.end
    )
    // map to day and steps
    .map((e) => ({
      // stringify so it's a valid object key
      day: String(dateFns.startOfDay(e.date).getTime()),
      steps: e.steps
    }))
    // group by day, SUMing each data point
    .reduce<{ [day: string]: number }>((p, c) => {
      return { ...p, [c.day]: c.day in p ? p[c.day] + c.steps : c.steps };
    }, {});

  // turn into array sorted by keys
  // use the date interval for keys to allow sparse data
  const categories = dateFns
    .eachDayOfInterval(interval)
    .map((dt) => dt.getTime());
  const stepsSeries = categories.map(
    (c) => groupedData[String(c)] ?? undefined
  );

  // Get a cumulative sum of all steps in previous indexes
  const cumSteps = categories.map((_, i) => {
    // Handle month boundary: sum restarts at zero on the first of every month
    // find the first of the month searching backwards from current index
    const fom = categories
      .slice(0, i)
      .findLastIndex((v) => dateFns.isFirstDayOfMonth(v));
    // If found, use that as the offset, otherwise use 0 (as far back as available)
    return (
      // Include current data point + all previous back to FOM
      (stepsSeries[i] || 0) +
      stepsSeries
        .slice(fom > 0 ? fom : 0, i)
        .reduce((p, c) => (c ? p + c : p), 0)
    );
  });

  return { categories, stepsSeries, cumSeries: cumSteps };
}
