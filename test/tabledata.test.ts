import * as dateFns from "date-fns";
import { describe, expect, it } from "vitest";
import { buildChartData, buildTableData } from "../src/calculator";
import { HistoryDataEntry } from "../src/store";

const fromDate = new Date(2025, 3, 1);
const toDate = new Date(2025, 3, 30);
const daysInRange = 30;

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
    it("actualRange", () => expect(actual.actualRange).toBe(daysInRange));
  });
});


describe("buildChartData", () => {
  describe("empty set", () => {
    const { categories, cumSeries, stepsSeries } = buildChartData(emptySampleData, fromDate, toDate);
    it("categories length", () => {
      expect(categories).not.toBeUndefined();
      expect(categories.length).toBe(daysInRange);
    });
    it("cumSeries length", () => {
      expect(cumSeries).not.toBeUndefined();
      expect(cumSeries.length).toBe(daysInRange);
    });
    it("stepsSeries length", () => {
      expect(stepsSeries).not.toBeUndefined();
      expect(stepsSeries.length).toBe(daysInRange);
    });
    it("all stepsSeries are undefined", () => {
      expect(stepsSeries).toSatisfy(
        (a: number[]) => a.every(n => n === undefined)
      );
    });
    it("all cumSeries are zero", () => {
      expect(cumSeries).toSatisfy(
        (a: number[]) => a.every(n => n === 0)
      );
    });
  });

  describe("not empty set", () => {
    const { categories, cumSeries, stepsSeries } = buildChartData(testSampleData, fromDate, toDate);
    it("categories length", () => {
      expect(categories).not.toBeUndefined();
      expect(categories.length).toBe(daysInRange);
    });
    it("cumSeries length", () => {
      expect(cumSeries).not.toBeUndefined();
      expect(cumSeries.length).toBe(daysInRange);
    });
    it("stepsSeries length", () => {
      expect(stepsSeries).not.toBeUndefined();
      expect(stepsSeries.length).toBe(daysInRange);
    });
    it("all stepsSeries are not undefined", () => {
      expect(stepsSeries).toSatisfy(
        (a: number[]) => a.every(n => n !== undefined && n > 0)
      );
    });
    it("all cumSeries are not zero", () => {
      expect(cumSeries).toSatisfy(
        (a: number[]) => a.every(n => n !== 0 && n > 0)
      );
    });
  });
});
