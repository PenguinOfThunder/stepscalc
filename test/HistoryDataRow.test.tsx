import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { HistoryDataRow } from "../src/HistoryDataRow";
import { HistoryDataEntry } from "../src/store";

describe("HistoryDataRow", () => {
  it("Should render", () => {
    const entry: HistoryDataEntry = {
      id: crypto.randomUUID(),
      date: new Date().getTime(),
      steps: 6000
    };
    render(<HistoryDataRow entry={entry} />);
  });
});
