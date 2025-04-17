import * as dateFns from "date-fns";
import { describe, expect, it } from "vitest";
import { buildTableData } from "../src/calculator";
import { HistoryDataEntry } from "../src/store";

const fromDate = new Date(2025, 3, 1);
const toDate = new Date(2025, 3, 30);

const fromDateBOD = dateFns.startOfDay(fromDate);
const toDateEOD = dateFns.endOfDay(toDate);

const emptySampleData: HistoryDataEntry[] = [];

const testSampleData: HistoryDataEntry[] = dateFns
  .eachDayOfInterval({ start: fromDate, end: toDate })
  .map((d) => ({
    id: crypto.randomUUID(),
    date: d.getTime(),
    steps: 6000
  }));

// console.dir(testSampleData, { compact: false });

describe("buildTableData", () => {
  describe("empty data set", () => {
    const actual = buildTableData(emptySampleData, fromDate, toDate);
    it("n", () => expect(actual.n).toBe(0));
    it("sum", () => expect(actual.sum).toBe(0));
    it("avg", () => expect(actual.avg).toBeUndefined());
    it("intervalStart", () =>
      expect(actual.intervalStart).toBe(fromDateBOD.getTime()));
    it("intervalEnd", () =>
      expect(actual.intervalEnd).toBe(toDateEOD.getTime()));
    it("actualStart", () => expect(actual.actualStart).toBeUndefined());
    it("actualEnd", () => expect(actual.actualEnd).toBeUndefined());
    it("actualRange", () => expect(actual.actualRange).toBeUndefined());
  });

  describe("populated set", () => {
    const actual = buildTableData(testSampleData, fromDate, toDate);
    it("n", () => expect(actual.n).toBe(testSampleData.length));
    it("sum", () => expect(actual.sum).toBe(6000 * testSampleData.length));
    it("avg", () => expect(actual.avg).toBe(6000));
    it("intervalStart", () =>
      expect(actual.intervalStart).toBe(fromDateBOD.getTime()));
    it("intervalEnd", () =>
      expect(actual.intervalEnd).toBe(toDateEOD.getTime()));
    it("actualStart", () =>
      expect(actual.actualStart).toBe(fromDate.getTime()));
    it("actualEnd", () => expect(actual.actualEnd).toBe(toDate.getTime()));
    it("actualRange", () => expect(actual.actualRange).toBe(29));
  });
});
