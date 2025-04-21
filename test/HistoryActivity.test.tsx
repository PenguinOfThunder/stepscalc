import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { HistoryActivity } from "../src/HistoryActivity";

describe("HistoryActivity", () => {
  it("Should render", () => {
    render(<HistoryActivity />);
  });
});
