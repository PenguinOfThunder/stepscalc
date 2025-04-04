import * as dateFns from "date-fns";

export function calc(today, stepsCompleted, stepsRequired) {
  const values = {
    today,
    stepsCompleted,
    stepsRequired,
    avgStepsPerDay: undefined,
    projDaysRemain: undefined,
    dayToComplete: undefined,
    fractionComplete: undefined,
    stepsRemaining: undefined,
    stepsRemainingPerDay: undefined
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
    const dayToComplete = dateFns.addDays(today, projDaysRemain);
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
