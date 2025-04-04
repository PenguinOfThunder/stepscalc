import { describe, expect, it } from "vitest";
import { formatDisplayName } from "../src/i18n";

describe("formatDisplayName", () => {
  it("Can do English to English", () => {
    expect(formatDisplayName("en")("en")).toBe("English");
  });
  it("Can do Spanish to English", () => {
    expect(formatDisplayName("en", { to: "en" })("es")).toBe("Spanish");
  });
  it("Can do Spanish to Spanish", () => {
    expect(formatDisplayName("es", { to: "es" })("es")).toBe("español");
  });
  it("Can do Norwegian to English", () => {
    expect(formatDisplayName("en")("no")).toBe("Norwegian");
  });
});
