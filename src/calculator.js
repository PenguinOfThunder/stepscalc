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
    const daysRemaining = dateFns.differenceInDays(monthEnd, today);
    const stepsRemaining =
      stepsRequired > 0 ? stepsRequired - stepsCompleted : 0;
    const stepsRemainingPerDay = Math.ceil(stepsRemaining / daysRemaining);
    const daysPast = dateFns.differenceInDays(today, monthStart) + 1;
    const avgStepsPerDay = stepsCompleted / daysPast;
    const projDaysRemain = Math.ceil(stepsRemaining / avgStepsPerDay);
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
  }
  return values;
}
