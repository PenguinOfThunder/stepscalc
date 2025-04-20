import { render } from "@testing-library/react";
import { HashRouter } from "react-router";
import { describe, it } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("Should render", () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
  });
});
