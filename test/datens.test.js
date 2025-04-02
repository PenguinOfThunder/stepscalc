import * as dateFns from "date-fns";
import { describe, expect, it } from "vitest";

// Validate that our assumptions of how date-fns works are accurate
describe("date-fns sanity check", () => {
  it("parses date", () => {
    const today = dateFns.parseISO("2025-03-21");
    expect(today.getFullYear(), "year").toBe(2025);
    expect(today.getMonth(), "month").toBe(2); // index
    expect(today.getDate(), "day").toBe(21);
  });

  it("startOfMonth works", () => {
    const today = dateFns.parseISO("2025-03-21");
    const expectedDate = dateFns.parseISO("2025-03-01");
    const monthStart = dateFns.startOfMonth(today);
    expect(monthStart).toEqual(expectedDate);
  });
  it("endOfMonth works", () => {
    const today = dateFns.parseISO("2025-03-21");
    const expectedDate = dateFns.parseISO("2025-03-31T23:59:59.999");
    const monthEnd = dateFns.endOfMonth(today);
    expect(monthEnd, "endOfMonth").toEqual(expectedDate);
  });
  it("differenceInDays works (first and last)", () => {
    const date1 = dateFns.parseISO("2025-03-01");
    const date2 = dateFns.parseISO("2025-03-31");
    const actualDays = dateFns.differenceInDays(date1, date2);
    expect(actualDays).toBe(-30);
  });

  it("differenceInDays works (same day)", () => {
    const date1 = dateFns.parseISO("2025-03-31");
    const date2 = dateFns.parseISO("2025-03-31");
    const actualDays = dateFns.differenceInDays(date1, date2);
    expect(actualDays).toBe(0);
  });

  it("differenceInDays works (first)", () => {
    const date1 = dateFns.parseISO("2025-03-01");
    const date2 = dateFns.parseISO("2025-03-01");
    const actualDays = dateFns.differenceInDays(date1, date2);
    expect(actualDays).toBe(0);
  });

  it("addDays works", () => {
    const today = dateFns.parseISO("2025-03-21");
    const expectedDate = dateFns.parseISO("2025-03-24");
    const actualDate = dateFns.addDays(today, 3);
    expect(actualDate, "addDays").toEqual(expectedDate);
  });
});
