import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { OptionsActivity } from "../src/Options";

describe("OptionsActivity", () => {
  it("Should render", () => {
    render(<OptionsActivity />);
  });
});
