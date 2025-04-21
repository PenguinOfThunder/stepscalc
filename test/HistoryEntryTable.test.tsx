import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HistoryEntryTable } from "../src/HistoryEntryTable";
import { HistoryDataEntry } from "../src/store";
import { act } from "@testing-library/react";

describe("HistoryEntryTable", () => {
  const filterFromDate = new Date(2025, 3, 1);
  const filterToDate = new Date(2025, 3, 30);
  const historyData: HistoryDataEntry[] = [
    {
      id: crypto.randomUUID(),
      date: new Date(2025, 3, 1).getTime(),
      steps: 6000
    },
    {
      id: crypto.randomUUID(),
      date: new Date(2025, 3, 2).getTime(),
      steps: 6100
    },
    {
      id: crypto.randomUUID(),
      date: new Date(2025, 3, 3).getTime(),
      steps: 6200
    }
  ];

  it("Should render", async () => {
    render(
      <HistoryEntryTable
        filterFromDate={filterFromDate}
        filterToDate={filterToDate}
        historyData={historyData}
      />
    );
    const expandBtn = screen.getByTitle("history.summary.toggle.title");
    await act(() => {
      fireEvent.click(expandBtn);
    });
    const summaryText = screen.getByText("history.table.summary");
    expect(summaryText).toBeDefined();
  });
});
