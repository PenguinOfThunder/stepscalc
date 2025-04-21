import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("Should render", () => {
    render(<App />);
  });
});
