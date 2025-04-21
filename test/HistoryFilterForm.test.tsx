import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { HistoryFilterForm } from "../src/HistoryFilterForm";

describe("HistoryFilterForm", () => {
  it("Should render with defaults", () => {
    const defaultFromDate = new Date(2025, 3, 1);
    const defaultToDate = new Date(2025, 3, 30);

    render(
      <HistoryFilterForm
        defaultFromDate={defaultFromDate}
        defaultToDate={defaultToDate}
        applyFilter={() => undefined}
      />
    );

    const fromDateEl = screen.getByTitle(
      "history.filter.fromDate.title"
    ) as HTMLInputElement;
    expect(fromDateEl.value).toBe("2025-04-01");

    const toDateEl = screen.getByTitle(
      "history.filter.toDate.title"
    ) as HTMLInputElement;
    expect(toDateEl.value).toBe("2025-04-30");
  });
  it("Calls applyFilter", () => {
    const defaultFromDate = new Date(2025, 3, 1);
    const defaultToDate = new Date(2025, 3, 30);
    const applyFilter = vi.fn(function (fromDate: Date, toDate: Date) {
      console.log(fromDate, toDate);
    });
    render(
      <HistoryFilterForm
        defaultFromDate={defaultFromDate}
        defaultToDate={defaultToDate}
        applyFilter={applyFilter}
      />
    );
    const applyBtn = screen.getByTitle("history.filter.filter_btn.title");
    act(() => {
      fireEvent.click(applyBtn);
    });
    expect(applyFilter).toBeCalledWith(defaultFromDate, defaultToDate);
  });
});
