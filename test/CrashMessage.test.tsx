import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { CrashMessage } from "../src/CrashMessage";

describe("CrashMessage", () => {
  it("Should render", async () => {
    const error: Error = {
      name: "TEST",
      message: "UNIT TEST"
    };
    const resetErrorBoundary = vi.fn(function () {});
    render(
      <CrashMessage
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeDefined();
    expect(errorMessage.innerHTML).toBe(error.message);

    const reportLink = screen.getByTestId("bug-report-link");
    expect(reportLink.getAttribute("href")).toBe(__APP_BUG_REPORT_URL__);

    const resetButton = screen.getByTestId("reset-error-boundary-button");
    await act(() => {
      fireEvent.click(resetButton);
    });
    expect(resetErrorBoundary).toBeCalled();
  });
});
