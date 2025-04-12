import * as dateFns from "date-fns";

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
export function calc(today: Date, stepsCompleted: number, stepsRequired: number): CalcValues {
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
    // Add 1 to include the last day of the month
    const daysRemaining = dateFns.differenceInDays(monthEnd, today) + 1;
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
