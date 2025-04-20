import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../src/Footer";

describe("Footer", () => {
  it("Should render the footer", () => {
    render(<Footer />);
    expect(
      screen.getByText(`${__APP_NAME__} ${__APP_VERSION__}`)
    ).toBeDefined();

    expect(document.querySelector("a")?.getAttribute("href")).toBe(__APP_URL__);
  });
});
