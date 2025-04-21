import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { HistoryAddEntryForm } from "../src/HistoryAddEntryForm";

describe("HistoryAddEntryForm", () => {
  it("Should render", async () => {
    const today = new Date(2025, 3, 15);
    const stepsCompleted = 123456;
    const addStepsEntry = vi.fn(function (date, steps) {});
    render(
      <HistoryAddEntryForm
        today={today}
        stepsCompleted={stepsCompleted}
        addStepsEntry={addStepsEntry}
      />
    );
    const form = screen.getByTestId("add-entry-form");
    await act(() => {
      fireEvent.submit(form);
    });
    expect(addStepsEntry).toBeCalledWith(today, 0);
  });
});
