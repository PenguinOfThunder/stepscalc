import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { HistoryChart } from "../src/HistoryChart";

describe("HistoryActivity", () => {
  const filterFromDate = new Date(2025, 3, 1);
  const filterToDate = new Date(2025, 3, 30);
  it("Should render", () => {
    render(
      <HistoryChart
        filterFromDate={filterFromDate}
        filterToDate={filterToDate}
      />
    );
  });
});
