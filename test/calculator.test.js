import { describe, expect, it } from "vitest";
import { calc } from "../src/calculator";

describe("calculator", () => {
  const stepsRequired = 180000;

  it("works for invalid date", () => {
    const today = undefined;
    const stepsCompleted = Number.NaN;
    const c = calc(today, stepsCompleted, stepsRequired);
    expect(c.today).toBe(today);
    expect(c.stepsCompleted).toBe(stepsCompleted);
    expect(c.stepsRequired).toBe(stepsRequired);

    expect(c.stepsRemaining).toBeUndefined();
    expect(c.stepsRemainingPerDay).toBeUndefined();
  });

  it("works for the first of the month", () => {
    const today = new Date("2025-03-01 00:00");
    const stepsCompleted = 0;
    const stepsRemaining = stepsRequired - stepsCompleted;
    const daysRemaining = 30;
    const c = calc(today, stepsCompleted, stepsRequired);
    // console.log(c);
    expect(c.today).toEqual(today);
    expect(c.stepsCompleted, "stepsCompleted").toBe(stepsCompleted);
    expect(c.stepsRequired, "stepsRequired").toBe(stepsRequired);
    expect(c.stepsRemaining, "stepsRemaining").toBe(stepsRemaining);
    expect(c.fractionComplete, "fractionComplete").toBe(0);
    expect(c.avgStepsPerDay, "avgStepsPerDay").toBe(0);
    expect(c.projDaysRemain, "projDaysRemain").toBe(Infinity);
    // expect(c.dayToComplete).toBeUndefined();
    expect(c.stepsRemainingPerDay, "stepsReaminingPerDay").toBe(
      Math.ceil(stepsRemaining / daysRemaining)
    );
  });

  it("works for near the end of the month", () => {
    const today = new Date("2025-03-30 00:00");
    const stepsCompleted = 175000;
    const daysRemaining = 1;
    const c = calc(today, stepsCompleted, stepsRequired);
    // console.log(c);
    expect(c.today).toEqual(today);
    expect(c.stepsCompleted).toBe(stepsCompleted);
    expect(c.stepsRequired).toBe(stepsRequired);

    expect(c.fractionComplete, "fractionComplete").toBeCloseTo(
      stepsCompleted / stepsRequired,
      2
    );
    expect(c.avgStepsPerDay, "avgStepsPerDay").toBeCloseTo(175000 / 30.0, -5);
    expect(c.projDaysRemain, "projDaysRemain").toBe(1);
    expect(c.dayToComplete, "dayToComplete").toEqual(new Date("2025-03-31 00:00"));
    expect(c.stepsRemainingPerDay, "stepsReaminingPerDay").toBe(
      Math.ceil((stepsRequired - stepsCompleted) / daysRemaining)
    );
  });
});
